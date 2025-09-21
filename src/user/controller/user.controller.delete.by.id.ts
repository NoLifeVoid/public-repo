import { Application, Request, Response } from "express";
import { UserRoutes } from "../user.routes";
import { User } from "../user.interfaces";
import {  deleteUserById } from "../user.services";
import { Modi } from "../../modi";
import { PrismaClient } from "@prisma/client";

export class UserControllerDeleteById{ 
/**
 - To create a user: POST on UserRoute User ("/user-by-id")
 */
    constructor(app : Application){

        app.post(UserRoutes.UserDeleteById, async(req : Request,res : Response)=>{
          const prisma = (Modi.dbConnectionOpen==='false')?new PrismaClient():null
            try {
                    const id : string = req.body.id
                    console.log(id)
                    const user:User|null|undefined  = await deleteUserById(id,prisma)

                    console.log(user)

                  if(user&&user.username){
                        res.status(200).json({
                        success : true,
                        message : `Deleted user by id ${id} successfully.`,
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
                        message : "Failed to delete user by id.",
                        data : null
                        // error: error instanceof Error ? error.message : error
                    });
                }finally{
                   prisma ? await prisma.$disconnect():null 
                }

        })
    }
}