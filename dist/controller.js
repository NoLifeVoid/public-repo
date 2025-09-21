"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const user_controller_1 = require("./user/user.controller");
const webtoken_controller_refresh_1 = require("./webtoken/webtoken.controller.refresh");
class Controller {
    constructor(app) {
        new user_controller_1.UserController(app);
        new webtoken_controller_refresh_1.WebtokenRefresh(app);
    }
}
exports.Controller = Controller;
