import dotenv from 'dotenv';
import { Application } from "express";

dotenv.config()

export class Listener{
    constructor(app:Application){


        const port :number = Number(process.env.BACKEND_PORT) || 3000
        app.listen(port,()=>{console.log(`💍 User-Management-API blings on port ${port}`)})
    }
}