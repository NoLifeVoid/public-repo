"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebtokenRefresh = void 0;
const webtoken_routes_1 = require("./webtoken.routes");
const webtoken_service_1 = require("./webtoken.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const modi_1 = require("../modi");
const client_1 = require("@prisma/client");
class WebtokenRefresh {
    constructor(app) {
        app.post(webtoken_routes_1.WebtokenRoutes.refresh, async (req, res) => {
            const prisma = (modi_1.Modi.dbConnectionOpen === 'false') ? new client_1.PrismaClient() : null;
            try {
                const { refreshToken } = req.body;
                if (!refreshToken) {
                    return res.status(400).json({ message: "Refresh token required" });
                }
                const tokenRecord = await (0, webtoken_service_1.findRefreshToken)(refreshToken);
                if (!tokenRecord || tokenRecord.token !== refreshToken || tokenRecord.expiresAt < new Date()) {
                    return res.status(401).json({ message: "Invalid or expired refresh token" });
                }
                // Issue new access token
                const newAccessToken = jsonwebtoken_1.default.sign({ userId: tokenRecord.userId }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
                // Optional: rotate refresh token
                const newRefreshToken = crypto_1.default.randomBytes(64).toString("hex");
                const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                await (0, webtoken_service_1.updateRefreshToken)(tokenRecord.userId, { token: newRefreshToken, expiresAt });
                res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "Internal server error", data: null });
            }
            finally {
                prisma ? await prisma.$disconnect() : null;
            }
        });
    }
}
exports.WebtokenRefresh = WebtokenRefresh;
