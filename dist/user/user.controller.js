"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_controller_create_1 = require("./controller/user.controller.create");
const user_controller_read_all_1 = require("./controller/user.controller.read.all");
const user_controller_read_by_id_1 = require("./controller/user.controller.read.by.id");
const user_controller_login_via_username_1 = require("./controller/user.controller.login.via.username");
const user_controller_login_via_email_1 = require("./controller/user.controller.login.via.email");
const user_controller_update_by_is_1 = require("./controller/user.controller.update.by.is");
const user_controller_delete_by_id_1 = require("./controller/user.controller.delete.by.id");
const user_controller_set_password_1 = require("./controller/user.controller.set.password");
const user_new_password_request_by_email_1 = require("./controller/user.new.password.request.by.email");
class UserController {
    /**
     - Initialize User Controllers
     */
    constructor(app) {
        new user_controller_create_1.UserControllerCreate(app);
        new user_controller_read_all_1.UserControllerReadAll(app);
        new user_controller_read_by_id_1.UserControllerReadById(app);
        new user_controller_login_via_username_1.UserControllerLoginViaUsername(app);
        new user_controller_login_via_email_1.UserControllerLoginViaEmail(app);
        new user_controller_update_by_is_1.UserControllerUpdateById(app);
        new user_controller_delete_by_id_1.UserControllerDeleteById(app);
        new user_controller_set_password_1.UserSetPassword(app);
        new user_new_password_request_by_email_1.UserSendNewPasswordRequestByEmail(app);
    }
}
exports.UserController = UserController;
