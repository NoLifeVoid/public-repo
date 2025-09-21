"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasswordResetRecord = getPasswordResetRecord;
exports.getUserByPasswordResetToken = getUserByPasswordResetToken;
exports.isTokenExpired = isTokenExpired;
exports.declarePasswordResetTokenAsUsed = declarePasswordResetTokenAsUsed;
exports.getUserIdByPasswordResetToken = getUserIdByPasswordResetToken;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getPasswordResetRecord(token) {
    const record = await prisma.passwordReset.findFirst({
        where: {
            token: token,
            used: false, // ensure the token hasn't been used
        },
    });
    return record; // null if not found
}
// export async function markPasswordResetTokenUsed(id: string) {
//   const updated = await prisma.passwordReset.update({
//     where: { id },
//     data: { used: true },
//   });
//   return updated; // returns the updated record
// }
async function getUserByPasswordResetToken(token) {
    const resetRecord = await prisma.passwordReset.findUnique({
        where: { token, used: false,
            // expiresAt: {
            //   gt: new Date(), // expiresAt must be greater than now
            // },
        },
        include: { user: true },
    });
    return resetRecord?.user ?? null;
}
async function isTokenExpired(token) {
    const resetRecord = await prisma.passwordReset.findUnique({
        where: { token,
            expiresAt: {
                lt: new Date(), // expiresAt must be greater than now
            }, }
    });
    return resetRecord ? true : false;
}
async function declarePasswordResetTokenAsUsed(token) {
    const result = await prisma.passwordReset.updateMany({
        where: { token, used: false },
        data: { used: true },
    });
    return result.count > 0; // true if at least one record was updated
}
async function getUserIdByPasswordResetToken(token) {
    const resetRecord = await prisma.passwordReset.findUnique({
        where: { token },
    });
    return resetRecord?.userId ?? null;
}
