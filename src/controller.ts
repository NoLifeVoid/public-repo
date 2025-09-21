import { Application } from "express";
import { UserController } from "./user/user.controller";
import { WebtokenRefresh } from "./webtoken/webtoken.controller.refresh";

export class Controller{
    constructor(app:Application){
        new UserController(app)
        new WebtokenRefresh(app)
    }
}