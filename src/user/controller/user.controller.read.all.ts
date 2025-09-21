import { Application, Request, Response } from "express";
import { UserRoutes } from "../user.routes";
import { User } from "../user.interfaces";
import { getAllUsers } from "../user.services";
import { Modi } from "../../modi";
import { PrismaClient } from "@prisma/client";

export class UserControllerReadAll{ 
/**
 - To create a user: POST on UserRoute User ("/users")
 */
    constructor(app : Application){

        app.post(UserRoutes.UsersRead, async(req : Request, res : Response)=>{
                    const prisma = (Modi.dbConnectionOpen==='false')?new PrismaClient():null


            try {
                    const users : User[] = await getAllUsers(prisma);

                    // console.log(users)

                    res.status(200).json({
                        success : true,
                        message : "Fecthed all users successfully.",
                        data : users
                    })
        
                }catch (error) 
                {
                    
                    // console.error(error);
                    
                    res.status(500).json({
                        success : false,
                        message : "Failed to fetch users.",
                        data : null

                        // error: error instanceof Error ? error.message : error
                        
                    });
                }finally{
                    prisma ? await prisma.$disconnect():null
                }




          


        })
    }
}