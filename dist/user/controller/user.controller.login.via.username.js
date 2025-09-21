"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllerLoginViaUsername = void 0;
const user_routes_1 = require("../user.routes");
const user_services_1 = require("../user.services");
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const webtoken_service_1 = require("../../webtoken/webtoken.service");
const hash_manager_1 = require("../../util/hash.manager");
const login_service_1 = require("../../login/login.service");
const modi_1 = require("../../modi");
const client_1 = require("@prisma/client");
class UserControllerLoginViaUsername {
    /**
     - To create a user: POST on UserRoute User ("/user-login-via-username")
     */
    constructor(app) {
        app.post(user_routes_1.UserRoutes.UserLoginViaUsername, async (req, res) => {
            const prisma = (modi_1.Modi.dbConnectionOpen === 'false') ? new client_1.PrismaClient() : null;
            try {
                const username = req.body.username;
                const password = req.body.password;
                const user = await (0, user_services_1.getUserByUsername)(username, prisma);
                // console.log(user)
                if (user !== null && (user.username === username) && user.passwordHash && (await hash_manager_1.HashManager.compare(password, user.passwordHash))) {
                    // 1. Generate access token
                    const accessToken = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
                    // 2. Generate refresh token
                    const refreshToken = crypto_1.default.randomBytes(64).toString("hex");
                    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days                      
                    await (0, webtoken_service_1.saveRefreshToken)({ userId: user.id, token: refreshToken, expiresAt: expiresAt });
                    await (0, login_service_1.createLoginLog)({ userId: user.id, success: true }, prisma);
                    res.status(200).json({
                        success: true,
                        message: `Logged in via e-mail succefully.`,
                        data: { accessToken, refreshToken }
                    });
                }
                else {
                    if (user) {
                        await (0, login_service_1.createLoginLog)({ userId: user.id, success: false }, prisma);
                    }
                    res.status(500).json({
                        success: false,
                        message: "Failed to login via e-mail.",
                        data: null
                    });
                }
            }
            catch (error) {
                // console.error(error);
                // we could log things that dont have a refrence.. like programms that would just try usernames and passwords.. just to be aware it happens. risk-cost-management. Is it worth to be maintained?
                res.status(500).json({
                    success: false,
                    message: "Failed to login via e-mail.",
                    data: null
                    // error: error instanceof Error ? error.message : error
                });
            }
            finally {
                prisma ? await prisma.$disconnect() : null;
            }
        });
    }
}
exports.UserControllerLoginViaUsername = UserControllerLoginViaUsername;
