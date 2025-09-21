"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = createRefreshToken;
exports.updateRefreshToken = updateRefreshToken;
exports.getRefreshToken = getRefreshToken;
exports.deleteRefreshToken = deleteRefreshToken;
exports.saveRefreshToken = saveRefreshToken;
exports.findWebtokenByUserId = findWebtokenByUserId;
exports.findRefreshToken = findRefreshToken;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a refresh token (or replace if one already exists)
async function createRefreshToken(data, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    const refreshToken = await db.refreshToken.upsert({
        where: { userId: data.userId }, // 1-to-1 relation
        update: {
            token: data.token,
            expiresAt: data.expiresAt,
        },
        create: {
            userId: data.userId,
            token: data.token,
            expiresAt: data.expiresAt,
        },
        include: {
            user: true, // include the associated user
        },
    });
    return refreshToken;
}
// Update an existing refresh token by userId
async function updateRefreshToken(userId, data) {
    const refreshToken = await prisma.refreshToken.update({
        where: { userId },
        data: {
            token: data.token,
            expiresAt: data.expiresAt,
        },
        include: {
            user: true,
        },
    });
    return refreshToken;
}
// Optional: fetch refresh token by token string
async function getRefreshToken(token) {
    const refreshToken = await prisma.refreshToken.findUnique({
        where: { token },
        include: {
            user: true,
        },
    });
    return refreshToken;
}
// Optional: delete refresh token by userId
async function deleteRefreshToken(userId) {
    const refreshToken = await prisma.refreshToken.delete({
        where: { userId },
    });
    return refreshToken;
}
async function saveRefreshToken(data) {
    const refreshToken = await prisma.refreshToken.upsert({
        where: { userId: data.userId }, // look for existing token
        update: {
            token: data.token,
            expiresAt: data.expiresAt,
        },
        create: {
            userId: data.userId,
            token: data.token,
            expiresAt: data.expiresAt,
        },
        include: { user: true }, // include associated user
    });
    return refreshToken;
}
async function findWebtokenByUserId(id) {
    const refreshToken = await prisma.refreshToken.findUnique({
        where: { userId: id },
    });
    return refreshToken;
}
async function findRefreshToken(token) {
    return prisma.refreshToken.findUnique({ where: { token } });
}
