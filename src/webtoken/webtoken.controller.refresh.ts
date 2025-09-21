import { Application, Request, Response } from "express"
import {WebtokenRoutes} from "./webtoken.routes"
import {findRefreshToken, updateRefreshToken} from "./webtoken.service"
import jwt from "jsonwebtoken";
import crypto from "crypto"
import { Modi } from "../modi";
import { PrismaClient } from "@prisma/client";

export class WebtokenRefresh{
    constructor(app:Application){
        app.post(WebtokenRoutes.refresh, async(req:Request,res:Response)=>{
            const prisma = (Modi.dbConnectionOpen==='false')?new PrismaClient():null
          try {
              const { refreshToken } = req.body;

  if (!refreshToken) {
  return res.status(400).json({ message: "Refresh token required" });
}
  const tokenRecord = await  findRefreshToken(refreshToken);
  if (!tokenRecord || tokenRecord.token !== refreshToken || tokenRecord.expiresAt < new Date()) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }

  // Issue new access token
  const newAccessToken = jwt.sign({ userId:tokenRecord.userId }, process.env.ACCESS_SECRET!, { expiresIn: "15m" });

  // Optional: rotate refresh token
  const newRefreshToken = crypto.randomBytes(64).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await updateRefreshToken(tokenRecord.userId, { token: newRefreshToken, expiresAt });


  res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });

          } catch (error) {
             console.error(error);
  res.status(500).json({success:false, message: "Internal server error",data:null });
          }finally{
                    prisma ? await prisma.$disconnect():null
                }


});

     
    }
}