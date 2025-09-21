"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSendNewPasswordRequestByEmail = void 0;
const user_routes_1 = require("../user.routes");
const mailer_1 = require("../../mailer/mailer");
const client_1 = require("@prisma/client");
const modi_1 = require("../../modi");
const user_services_1 = require("../user.services");
const log_token_per_for_password_set_and_reset_1 = require("../../passwordreset/log.token.per.for.password.set.and.reset");
class UserSendNewPasswordRequestByEmail {
    /**
     - To create a user: POST on UserRoute User ("/user")
     */
    constructor(app) {
        app.post(user_routes_1.UserRoutes.UserNewPasswordRequest, async (req, res) => {
            const prisma = (modi_1.Modi.dbConnectionOpen === 'false') ? new client_1.PrismaClient() : null;
            try {
                const email = req.body.email;
                //@@@@@@@@@@@@@@@ IMPORTAT @@@@@@@@@@@@@@@@
                // const unhashedPassword:string = PasswordGenerator.generate()
                // const hashedPassord:string = await HashManager.hash(unhashedPassword)
                // console.log(hashedPassord)
                // newUserData.passwordHash = hashedPassord
                //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                // console.log(newUserData)
                console.log("hi from try block");
                // try {
                //   const user2 = await registerUser(newUserData, prisma);
                // } catch (err) {
                //   console.error("❌ Error inside registerUser:", err);
                // }                
                const user = await (0, user_services_1.getUserByEmail)(email, prisma);
                if ((!user) || (!user.id) || (!user.username)) {
                    res.status(500).json({
                        success: false,
                    });
                }
                else {
                    console.log("user:", user);
                    const token = await (0, log_token_per_for_password_set_and_reset_1.createPasswordResetTokenAndDBrecord)(user.id);
                    console.log("token:", token);
                    console.log((user));
                    console.log((!!user.username));
                    const mailSent = (!!user.username && token) ? await mailer_1.Mailer.sendNewPasswordMail(email, user.username, token) : false;
                    // console.log('logs user:',user)
                    // console.log('logs mailSent:',mailSent)       
                    if ((!!user.username) && token) {
                        res.status(201).json({
                            success: true,
                            message: "Request for new Password processed.",
                            data: null
                        });
                    }
                    else {
                        res.status(500).json({
                            success: false,
                            message: "Failed to process request user.",
                            data: null
                        });
                    }
                }
            }
            catch (error) {
                // console.error(error)
                res.status(500).json({
                    success: false,
                    message: "Failed to process request user.",
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
exports.UserSendNewPasswordRequestByEmail = UserSendNewPasswordRequestByEmail;
