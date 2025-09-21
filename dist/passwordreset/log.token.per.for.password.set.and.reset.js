"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPasswordResetTokenAndDBrecord = createPasswordResetTokenAndDBrecord;
const crypto_1 = __importDefault(require("crypto"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createPasswordResetTokenAndDBrecord(userId) {
    const token = crypto_1.default.randomBytes(48).toString("hex");
    // const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    // const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 1 hour
    const success = await prisma.passwordReset.create({
        data: { token, userId, used: false, }
    });
    // send a link to the user — include token in URL path or query:
    // https://example.com/reset-password?token=...
    return (success && success.id) ? token : null;
}
