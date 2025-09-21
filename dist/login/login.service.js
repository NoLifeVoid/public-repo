"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoginLog = createLoginLog;
exports.getUserLoginLogs = getUserLoginLogs;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Create a new login log for a user
 */
async function createLoginLog(data, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
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
async function getUserLoginLogs(userId, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    const logs = await db.loginLog.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
    return logs;
}
