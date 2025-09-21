import { Application } from "express";
import { UserControllerCreate } from "./controller/user.controller.create";
import { UserControllerReadAll } from "./controller/user.controller.read.all";
import { UserControllerReadById } from "./controller/user.controller.read.by.id";
import { UserControllerLoginViaUsername } from "./controller/user.controller.login.via.username";
import { UserControllerLoginViaEmail } from "./controller/user.controller.login.via.email";
import { UserControllerUpdateById } from "./controller/user.controller.update.by.is";
import { UserControllerDeleteById } from "./controller/user.controller.delete.by.id";
import { UserSetPassword } from "./controller/user.controller.set.password";
import { UserSendNewPasswordRequestByEmail } from "./controller/user.new.password.request.by.email";

export class UserController{
/**
 - Initialize User Controllers
 */
    constructor(app:Application){

        new UserControllerCreate(app)
        new UserControllerReadAll(app)
        new UserControllerReadById(app)
        new UserControllerLoginViaUsername(app)
        new UserControllerLoginViaEmail(app)
        new UserControllerUpdateById(app)
        new UserControllerDeleteById(app)
        new UserSetPassword(app)
        new UserSendNewPasswordRequestByEmail(app)
        

    }

}