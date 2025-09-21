import { newUser } from './../user.interfaces';
import { Application, Request, Response } from "express"
import { UserRoutes } from "../user.routes"
import { Mailer } from "../../mailer/mailer"
import { HashManager } from "../../util/hash.manager"
import { PrismaClient, User } from '@prisma/client';
import { Modi } from '../../modi';
import { PasswordGenerator } from '../../util/password.generator';
import { getUserByEmail, registerUser } from '../user.services';
import { createPasswordResetTokenAndDBrecord } from '../../passwordreset/log.token.per.for.password.set.and.reset';

export class UserSendNewPasswordRequestByEmail{ 
/**
 - To create a user: POST on UserRoute User ("/user")
 */
    constructor(app:Application){

        app.post(UserRoutes.UserNewPasswordRequest, async(req : Request,res : Response)=>{
        const prisma = ( Modi.dbConnectionOpen === 'false' ) ? new PrismaClient() : null
            try {
               
                    const email : string = req.body.email

                    //@@@@@@@@@@@@@@@ IMPORTAT @@@@@@@@@@@@@@@@
                  
                    // const unhashedPassword:string = PasswordGenerator.generate()
                    // const hashedPassord:string = await HashManager.hash(unhashedPassword)
                    // console.log(hashedPassord)
                    // newUserData.passwordHash = hashedPassord

                    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                    
                    // console.log(newUserData)
console.log("hi from try block");

// try {
//   const user2 = await registerUser(newUserData, prisma);
// } catch (err) {
//   console.error("❌ Error inside registerUser:", err);
// }                


                    const user = await getUserByEmail(email,prisma)
                    if((!user) || (!user.id)||(!user.username)){
                    res.status(500).json({
                        success :false,})}else{
                    console.log("user:",user)
                    const token = await createPasswordResetTokenAndDBrecord(user.id)
                    console.log("token:",token)
                    console.log((user))
                    console.log((!!user.username))

              
                  
                   const mailSent =(!!user.username && token)? await Mailer.sendNewPasswordMail(email,user.username,token) : false
                 
                    // console.log('logs user:',user)
                    // console.log('logs mailSent:',mailSent)       

                    if((!!user.username)&&token){

                        res.status(201).json({
                        success :true,
                        message : "Request for new Password processed.",
                        data : null
                        })

                    }else{

                        res.status(500).json({
                        success :false,
                        message : "Failed to process request user.",
                        data : null
                        })
                }}

                }catch (error) 
                {
                    // console.error(error)

                    res.status(500).json({
                        success : false,
                          message : "Failed to process request user.",
                        data : null
                        // error : error instanceof Error ? error.message : error
                        })
            }finally{
              prisma ? await prisma.$disconnect():null
            }


        })
    }
}