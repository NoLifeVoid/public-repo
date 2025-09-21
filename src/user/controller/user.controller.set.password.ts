import { Application, Request, Response } from "express";
import { UserRoutes } from "../user.routes";
import { minalUser as MinalUser } from "../user.interfaces";
import {  updatePasswordHashByUsername, } from "../user.services";
import { Modi } from "../../modi";
import { PrismaClient } from "@prisma/client";
import { HashManager } from "../../util/hash.manager";

import { declarePasswordResetTokenAsUsed, getUserByPasswordResetToken, isTokenExpired } from "../../passwordreset/token.service";

export class UserSetPassword{ 
/**
 - To create a user: POST on UserRoute User ("/user-by-id")
 */
    constructor(app : Application){

        app.post(UserRoutes.UserSetPassword, async(req : Request,res : Response)=>{

                    const prisma = (Modi.dbConnectionOpen === 'false') ? new PrismaClient():null;
            try {

                     console.log("SET PASSWORD TRY BLOCK START")

                    const password : string = req.body.password
                    const token : string = req.body.token

                    const user = await getUserByPasswordResetToken(token)
                   // const user : User | null = await getUserByEmail(email,prisma)
                    //const newPassword : string = PasswordGenerator.generate()

                    //const newHashedPassword : string = await HashManager.hash(newPassword)


                    const tokenExpired = await isTokenExpired(token)

                    if(tokenExpired){
                        res.status(404).json({
                        success : false,
                        message : "Token expired.",
                        data:null
                    })


                    }else{





                    if(user===null){


       res.status(404).json({
                        success : false,
                        message : "Token not found.",
                        data:null
                    })

          
                    }else{

//is this user exists and not expires??


               
           


                   
                    const hashedPassord = await HashManager.hash(password) 
                   console.log("hashedPassord:",hashedPassord)
                    console.log("password",password)
                    const updatedUser : MinalUser|null = (user && user.username)? await updatePasswordHashByUsername(user.username,hashedPassord,prisma):null

                    //TODO flag used in userpasswordreset table true
                    const flagTokenAsUsed= await declarePasswordResetTokenAsUsed(token)
                    //const emailSent = (user && user.emailHash) ? await Mailer.sendNewPasswordMail(email,user.username,newPassword) : false

                    if(user && user.username && updatedUser && updatedUser.username && flagTokenAsUsed  && (!tokenExpired)){

                    
                        res.status(200).json({
                        success : true,
                        message : `Password set for user ${user.username} successfully.`,
                        data : null
                    })


                    }else{
                        res.status(404).json({
                        success : true,
                        message : "token not found.",
                        data : null
                        // TO BE ASKED: Eventually replace status by 500 and replace maessage by a neutral message that doesn't provide information about e-mail in database.
                     })

                    }}     }
                    console.log("SET PASSWORD TRY BLOCK END")
                }catch (error) 
                {
                    
                    // console.error(error);
                    
                    res.status(500).json({
                        success : false,
                        message : `Failed to set password.`,
                        data : null
                        // error: error instanceof Error ? error.message : error
                    });
                }finally{
                    prisma ? await prisma.$disconnect():null
                }




          


        })
    }
}