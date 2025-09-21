"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllerReadById = void 0;
const user_routes_1 = require("../user.routes");
const user_services_1 = require("../user.services");
const modi_1 = require("../../modi");
const client_1 = require("@prisma/client");
class UserControllerReadById {
    /**
     - To create a user: POST on UserRoute User ("/user-by-id")
     */
    constructor(app) {
        app.post(user_routes_1.UserRoutes.UserReadById, async (req, res) => {
            const prisma = (modi_1.Modi.dbConnectionOpen === 'false') ? new client_1.PrismaClient() : null;
            try {
                const id = req.body.id;
                const user = await (0, user_services_1.getUserById)(id, prisma);
                console.log(user);
                if (!!user?.username) {
                    res.status(200).json({
                        success: true,
                        message: `Fecthed user by id ${id} successfully.`,
                        data: user
                    });
                }
                else {
                    res.status(404).json({
                        success: false,
                        message: "Id not found.",
                        data: null
                    });
                }
            }
            catch (error) {
                // console.error(error);
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch user by id.",
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
exports.UserControllerReadById = UserControllerReadById;
