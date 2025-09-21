import { Application, Request, Response } from "express";
import { UserRoutes } from "../user.routes";
import { User } from "../user.interfaces";
import { getUserByEmail } from "../user.services";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { saveRefreshToken } from "../../webtoken/webtoken.service";
import { HashManager } from "../../util/hash.manager";
import { createLoginLog } from "../../login/login.service";
import { Modi } from "../../modi";
import { PrismaClient } from "@prisma/client";

export class UserControllerLoginViaEmail{ 
/**
 - To create a user: POST on UserRoute User ("/user-login-via-username")
 */
    constructor(app : Application){

        app.post(UserRoutes.UserLoginViaEmail, async(req : Request,res : Response)=>{
            const prisma = (Modi.dbConnectionOpen === 'false')?new PrismaClient():null
            try {
                        const email : string = req.body.email
                        const password : string = req.body.password
                        const user : User | null |undefined= await getUserByEmail(email,prisma);

                        //console.log(user)

                        const match = (user && user.username && password  && user.passwordHash) ? await HashManager.compare(password,user.passwordHash) : false

                        //console.log(match)
                        if(user !== null && (user.emailHash === email) && match){
                       
                    
                        // 1. Generate access token

                        const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_SECRET!, { expiresIn: "15m" });

                        // 2. Generate refresh token

                        const refreshToken = crypto.randomBytes(64).toString("hex");
                        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days                      
                       
                        await saveRefreshToken({userId: user.id ,token: refreshToken, expiresAt:expiresAt });
                       
                        await createLoginLog({userId:user.id,success:true},prisma)

                        res.status(200).json({
                        success : true,
                        message : `Logged in via e-mail successfully.`,
                        data : { accessToken, refreshToken }
                        })

                    }else{
                        if(user){await createLoginLog({userId:user.id,success:false},prisma)}
                        res.status(500).json({
                        success : false,
                        message : "Failed to login via e-mail.",
                        data : null

                     })

                    }
        
                }catch (error) 
                {
                    
                    // console.error(error);
                    
                    res.status(500).json({
                        success : false,
                        message : "Failed to login via e-mail.",
                        data : null
                        // error: error instanceof Error ? error.message : error
                    });
                }finally{
                    prisma ? await prisma.$disconnect():null
                }




          


        })
    }
}