import { Application, Request, Response } from "express";
import { UserRoutes } from "../user.routes";
import { newUser, User } from "../user.interfaces";
import { updateUserById } from "../user.services";
import { Modi } from "../../modi";
import { PrismaClient } from "@prisma/client";

export class UserControllerUpdateById{ 
/**
 - To create a user: POST on UserRoute User ("/user-by-id")
 */
    constructor(app : Application){

        app.post(UserRoutes.UserUpdateById, async(req : Request,res : Response)=>{
                    const prisma = (Modi.dbConnectionOpen === 'false') ? new PrismaClient() : null
            try {
                    const id : string = req.body.id
                    const newUserData: newUser = req.body.user
                    const user : User | null = await updateUserById(id,newUserData,prisma);

                    // console.log(users)

                    if(user.username){
                        res.status(200).json({
                        success : true,
                        message : `Updated user by id ${id} successfully.`,
                        data : user
                    })


                    }else{
                        res.status(404).json({
                        success : true,
                        message : "Id not found.",
                        data : null
                     })

                    }
        
                }catch (error) 
                {
                    
                    // console.error(error);
                    
                    res.status(500).json({
                        success : false,
                        message : "Failed to update user by id.",
                        data : null
                        // error: error instanceof Error ? error.message : error
                    });
                }finally{
                    prisma ? await prisma.$disconnect():null
                }




          


        })
    }
}