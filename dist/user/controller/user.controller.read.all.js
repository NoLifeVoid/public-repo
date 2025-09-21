"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllerReadAll = void 0;
const user_routes_1 = require("../user.routes");
const user_services_1 = require("../user.services");
const modi_1 = require("../../modi");
const client_1 = require("@prisma/client");
class UserControllerReadAll {
    /**
     - To create a user: POST on UserRoute User ("/users")
     */
    constructor(app) {
        app.post(user_routes_1.UserRoutes.UsersRead, async (req, res) => {
            const prisma = (modi_1.Modi.dbConnectionOpen === 'false') ? new client_1.PrismaClient() : null;
            try {
                const users = await (0, user_services_1.getAllUsers)(prisma);
                // console.log(users)
                res.status(200).json({
                    success: true,
                    message: "Fecthed all users successfully.",
                    data: users
                });
            }
            catch (error) {
                // console.error(error);
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch users.",
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
exports.UserControllerReadAll = UserControllerReadAll;
