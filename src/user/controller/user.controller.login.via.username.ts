import { Application, Request, Response } from "express";
import { UserRoutes } from "../user.routes";
import { User } from "../user.interfaces";
import  { getUserByUsername } from "../user.services";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { saveRefreshToken } from "../../webtoken/webtoken.service";
import { HashManager } from "../../util/hash.manager";
import { createLoginLog } from "../../login/login.service";
import { Modi } from "../../modi";
import { PrismaClient } from "@prisma/client";

export class UserControllerLoginViaUsername{ 
/**
 - To create a user: POST on UserRoute User ("/user-login-via-username")
 */
    constructor(app : Application){

        app.post(UserRoutes.UserLoginViaUsername, async(req : Request,res : Response)=>{
                    const prisma = (Modi.dbConnectionOpen==='false')?new PrismaClient():null

                    try {
                                const username : string = req.body.username
                                const password : string = req.body.password
                                const user : User | null = await getUserByUsername(username,prisma);
        
                                // console.log(user)
        
                                if(user !== null && (user.username === username)&& user.passwordHash && (await HashManager.compare(password,user.passwordHash))){
                               
                                // 1. Generate access token
        
                                const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_SECRET!, { expiresIn: "15m" });
        
                                // 2. Generate refresh token
        
                                const refreshToken = crypto.randomBytes(64).toString("hex");
                                const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days                      
                               
                                await saveRefreshToken({userId: user.id ,token: refreshToken, expiresAt:expiresAt });
                                    
                                await createLoginLog({userId:user.id,success:true},prisma)

                                res.status(200).json({
                                success : true,
                                message : `Logged in via e-mail succefully.`,
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
                            // we could log things that dont have a refrence.. like programms that would just try usernames and passwords.. just to be aware it happens. risk-cost-management. Is it worth to be maintained?
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