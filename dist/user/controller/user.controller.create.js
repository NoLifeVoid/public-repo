"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllerCreate = void 0;
const user_routes_1 = require("../user.routes");
const mailer_1 = require("../../mailer/mailer");
const client_1 = require("@prisma/client");
const modi_1 = require("../../modi");
const user_services_1 = require("../user.services");
const log_token_per_for_password_set_and_reset_1 = require("../../passwordreset/log.token.per.for.password.set.and.reset");
class UserControllerCreate {
    /**
     - To create a user: POST on UserRoute User ("/user")
     */
    constructor(app) {
        app.post(user_routes_1.UserRoutes.UserCreate, async (req, res) => {
            const prisma = (modi_1.Modi.dbConnectionOpen === 'false') ? new client_1.PrismaClient() : null;
            try {
                console.log("CREATE TRY BLOCK START");
                const newUserData = req.body;
                const user = await (0, user_services_1.registerUser)(newUserData, prisma);
                console.log("user:", user);
                const token = await (0, log_token_per_for_password_set_and_reset_1.createPasswordResetTokenAndDBrecord)(user.id);
                console.log("token:", token);
                console.log((user));
                console.log((!!user.username));
                const mailSent = (!!user.username && token) ? await mailer_1.Mailer.sendRegistrationMail(newUserData.email, user.username, token) : false;
                if ((!!user.username) && mailSent) {
                    res.status(201).json({
                        success: true,
                        message: "User created successfully.",
                        data: null
                    });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: "Failed to create user.",
                        data: null
                    });
                }
                console.log("CREATE TRY BLOCK END");
            }
            catch (error) {
                // console.error(error)
                res.status(500).json({
                    success: false,
                    message: "Failed to create user.",
                    data: null
                    // error : error instanceof Error ? error.message : error
                });
            }
            finally {
                prisma ? await prisma.$disconnect() : null;
            }
        });
    }
}
exports.UserControllerCreate = UserControllerCreate;
