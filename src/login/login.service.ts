import { PrismaClient } from '@prisma/client';
import { newUser } from '../user/user.interfaces';
import { Prisma } from "@prisma/client";
import { Login } from './login.interface';


const prisma = new PrismaClient();

/**
 * Create a new login log for a user
 */
export async function createLoginLog(data: Login, prisma: PrismaClient|null) {
  const db = prisma ?? new PrismaClient(); 
  const log = await db.loginLog.create({
    data: {
      userId: data.userId,
      success: data.success,
      createdAt: data.timestamp || new Date(),
    },
  });

  return log;
}

/**
 * Optional: fetch all login logs for a user
 */
export async function getUserLoginLogs(userId: string, prisma: PrismaClient|null) {
  const db = prisma ?? new PrismaClient(); 
  const logs = await db.loginLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }, 
  });

  return logs;
}