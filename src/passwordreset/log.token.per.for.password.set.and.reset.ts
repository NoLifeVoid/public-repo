import crypto from "crypto";
import { PrismaClient } from '@prisma/client';

import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export async function createPasswordResetTokenAndDBrecord(userId: string) {
  const token = crypto.randomBytes(48).toString("hex");
 // const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
// const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 1 hour
 const success= await prisma.passwordReset.create({
    data: { token, userId, used: false, }
  });

  // send a link to the user — include token in URL path or query:
  // https://example.com/reset-password?token=...
return (success&&success.id)?token:null
}
