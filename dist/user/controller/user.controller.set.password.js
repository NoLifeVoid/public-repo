"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetPassword = void 0;
const user_routes_1 = require("../user.routes");
const user_services_1 = require("../user.services");
const modi_1 = require("../../modi");
const client_1 = require("@prisma/client");
const hash_manager_1 = require("../../util/hash.manager");
const token_service_1 = require("../../passwordreset/token.service");
class UserSetPassword {
    /**
     - To create a user: POST on UserRoute User ("/user-by-id")
     */
    constructor(app) {
        app.post(user_routes_1.UserRoutes.UserSetPassword, async (req, res) => {
            const prisma = (modi_1.Modi.dbConnectionOpen === 'false') ? new client_1.PrismaClient() : null;
            try {
                console.log("SET PASSWORD TRY BLOCK START");
                const password = req.body.password;
                const token = req.body.token;
                const user = await (0, token_service_1.getUserByPasswordResetToken)(token);
                // const user : User | null = await getUserByEmail(email,prisma)
                //const newPassword : string = PasswordGenerator.generate()
                //const newHashedPassword : string = await HashManager.hash(newPassword)
                const tokenExpired = await (0, token_service_1.isTokenExpired)(token);
                if (tokenExpired) {
                    res.status(404).json({
                        success: false,
                        message: "Token expired.",
                        data: null
                    });
                }
                else {
                    if (user === null) {
                        res.status(404).json({
                            success: false,
                            message: "Token not found.",
                            data: null
                        });
                    }
                    else {
                        //is this user exists and not expires??
                        const hashedPassord = await hash_manager_1.HashManager.hash(password);
                        console.log("hashedPassord:", hashedPassord);
                        console.log("password", password);
                        const updatedUser = (user && user.username) ? await (0, user_services_1.updatePasswordHashByUsername)(user.username, hashedPassord, prisma) : null;
                        //TODO flag used in userpasswordreset table true
                        const flagTokenAsUsed = await (0, token_service_1.declarePasswordResetTokenAsUsed)(token);
                        //const emailSent = (user && user.emailHash) ? await Mailer.sendNewPasswordMail(email,user.username,newPassword) : false
                        if (user && user.username && updatedUser && updatedUser.username && flagTokenAsUsed && (!tokenExpired)) {
                            res.status(200).json({
                                success: true,
                                message: `Password set for user ${user.username} successfully.`,
                                data: null
                            });
                        }
                        else {
                            res.status(404).json({
                                success: true,
                                message: "token not found.",
                                data: null
                                // TO BE ASKED: Eventually replace status by 500 and replace maessage by a neutral message that doesn't provide information about e-mail in database.
                            });
                        }
                    }
                }
                console.log("SET PASSWORD TRY BLOCK END");
            }
            catch (error) {
                // console.error(error);
                res.status(500).json({
                    success: false,
                    message: `Failed to set password.`,
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
exports.UserSetPassword = UserSetPassword;
