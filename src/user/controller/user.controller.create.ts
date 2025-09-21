import { newUser } from './../user.interfaces';
import { Application, Request, Response } from "express"
import { UserRoutes } from "../user.routes"
import { Mailer } from "../../mailer/mailer"
import { HashManager } from "../../util/hash.manager"
import { PrismaClient, User } from '@prisma/client';
import { Modi } from '../../modi';
import { PasswordGenerator } from '../../util/password.generator';
import { registerUser } from '../user.services';
import { createPasswordResetTokenAndDBrecord } from '../../passwordreset/log.token.per.for.password.set.and.reset';

export class UserControllerCreate{ 
/**
 - To create a user: POST on UserRoute User ("/user")
 */
    constructor(app:Application){

        app.post(UserRoutes.UserCreate, async(req : Request,res : Response)=>{
        const prisma = ( Modi.dbConnectionOpen === 'false' ) ? new PrismaClient() : null
            try {
               console.log("CREATE TRY BLOCK START")
                    const newUserData : newUser = req.body


                    const user = await registerUser(newUserData,prisma)
                    console.log("user:",user)
                    const token = await createPasswordResetTokenAndDBrecord(user.id)
                    console.log("token:",token)
                    console.log((user))
                    console.log((!!user.username))

              
                  
                    const mailSent = (!!user.username && token)? await Mailer.sendRegistrationMail(newUserData.email,user.username,token) : false
    

                    if((!!user.username) && mailSent){

                        res.status(201).json({
                        success :true,
                        message : "User created successfully.",
                        data : null
                        })

                    }else{

                        res.status(500).json({
                        success :false,
                        message : "Failed to create user.",
                        data : null
                        })
                }
 console.log("CREATE TRY BLOCK END")
                }catch (error) 
                {
                    // console.error(error)

                    res.status(500).json({
                        success : false,
                        message : "Failed to create user.",
                        data : null
                        // error : error instanceof Error ? error.message : error
                        })
            }finally{
              prisma ? await prisma.$disconnect():null
            }


        })
    }
}