import express,{ Application } from "express";
import { Controller } from "./controller";
import { Middleware } from "./middleware";
import { Listener } from "./listener";

export class Server{
    constructor(){
        console.log(new Date().toISOString()," : Starting Server")

        const app : Application = express()

        new Middleware(app)
        new Controller(app)
        new Listener(app)
        
    }
}