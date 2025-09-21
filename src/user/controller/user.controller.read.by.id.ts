import { Application, Request, Response } from "express";
import { UserRoutes } from "../user.routes";
import { User } from "../user.interfaces";
import { getUserById } from "../user.services";
import { Modi } from "../../modi";
import { PrismaClient } from "@prisma/client";

export class UserControllerReadById{ 
/**
 - To create a user: POST on UserRoute User ("/user-by-id")
 */
    constructor(app : Application){

        app.post(UserRoutes.UserReadById, async(req : Request,res : Response)=>{
                    const prisma = (Modi.dbConnectionOpen==='false')?new PrismaClient():null
            try {
                    const id : string = req.body.id
                    const user : User | null = await getUserById(id,prisma);

                    console.log(user)

                    if(!!user?.username){
                        res.status(200).json({
                        success : true,
                        message : `Fecthed user by id ${id} successfully.`,
                        data : user
                    })


                    }else{
                        res.status(404).json({
                        success : false,
                        message : "Id not found.",
                        data : null
                     })

                    }
        
                }catch (error) 
                {
                    
                    // console.error(error);
                    
                    res.status(500).json({
                        success : false,
                        message : "Failed to fetch user by id.",
                        data : null
                        // error: error instanceof Error ? error.message : error
                    });
                }finally{
                    prisma ? await prisma.$disconnect():null
                }




          


        })
    }
}