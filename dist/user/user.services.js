"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.getAllUsers = getAllUsers;
exports.getUserByUsername = getUserByUsername;
exports.getUserByEmail = getUserByEmail;
exports.getUserById = getUserById;
exports.deleteUserById = deleteUserById;
exports.updateUserById = updateUserById;
exports.updatePasswordHashByUsername = updatePasswordHashByUsername;
exports.updateEmailByUsername = updateEmailByUsername;
const client_1 = require("@prisma/client");
const client_2 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function registerUser(data, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    const user = await db.user.create({
        data: {
            username: data.username,
            emailHash: data.email,
            //passwordHash: data.passwordHash || null,
            // countries array
            countries: {
                connectOrCreate: data.countries.map(name => ({
                    where: { name },
                    create: { name },
                })),
            },
            // companies array
            companies: {
                connectOrCreate: data.companies.map(name => ({
                    where: { name },
                    create: { name },
                })),
            },
            // groups array
            groups: data.groups?.length
                ? {
                    connectOrCreate: data.groups.map(name => ({
                        where: { name },
                        create: { name },
                    })),
                }
                : undefined,
            // rights array
            rights: data.rights?.length
                ? {
                    connectOrCreate: data.rights.map(name => ({
                        where: { name },
                        create: { name },
                    })),
                }
                : undefined,
            // rights array
            manufacturers: data.manufacturers?.length
                ? {
                    connectOrCreate: data.manufacturers.map(name => ({
                        where: { name },
                        create: { name },
                    })),
                }
                : undefined,
            // sets array
            sets: data.sets?.length
                ? {
                    connectOrCreate: data.sets.map(name => ({
                        where: { name },
                        create: { name },
                    })),
                }
                : undefined,
        },
    });
    return user;
}
async function getAllUsers(prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    const users = await db.user.findMany({
        include: {
            countries: true,
            companies: true,
            groups: true,
            rights: true,
            manufacturers: true,
            sets: true,
        },
    });
    return users;
}
async function getUserByUsername(username, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    const user = await db.user.findUnique({
        where: { username: username },
        include: {
            countries: true,
            companies: true,
            groups: true,
            rights: true,
            manufacturers: true,
            sets: true,
        },
    });
    return user;
}
async function getUserByEmail(email, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    const user = await db.user.findUnique({
        where: { emailHash: email },
        include: {
            countries: true,
            companies: true,
            groups: true,
            rights: true,
            manufacturers: true,
            sets: true,
        },
    });
    return user;
}
async function getUserById(id, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    const user = await db.user.findUnique({
        where: { id: id },
        include: {
            countries: true,
            companies: true,
            groups: true,
            rights: true,
            manufacturers: true,
            sets: true,
        },
    });
    return user;
}
async function deleteUserById(id, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    try {
        const user = await db.user.delete({
            where: { id },
            include: {
                countries: true,
                companies: true,
                groups: true,
                rights: true,
                manufacturers: true,
                sets: true,
            },
        });
        return user;
    }
    catch (error) {
        // P2025 = "Record to delete does not exist"
        if (error instanceof client_2.Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return null;
        }
        throw error; // re-throw other errors
    }
}
async function updateUserById(id, data, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    const user = await db.user.update({
        where: { id },
        data: {
            username: data.username,
            // emailHash: data.emailHash,
            // passwordHash: data.passwordHash,
            // update countries if provided
            countries: data.countries?.length
                ? {
                    set: [], // clear existing relations first
                    connectOrCreate: data.countries.map(name => ({
                        where: { name },
                        create: { name },
                    })),
                }
                : undefined,
            // update companies if provided
            companies: data.companies?.length
                ? {
                    set: [],
                    connectOrCreate: data.companies.map(name => ({
                        where: { name },
                        create: { name },
                    })),
                }
                : undefined,
            // update groups if provided
            groups: data.groups?.length
                ? {
                    set: [],
                    connectOrCreate: data.groups.map(name => ({
                        where: { name },
                        create: { name },
                    })),
                }
                : undefined,
            // update rights if provided
            rights: data.rights?.length
                ? {
                    set: [],
                    connectOrCreate: data.rights.map(name => ({
                        where: { name },
                        create: { name },
                    })),
                }
                : undefined,
            // update manufacturers if provided
            manufacturers: data.manufacturers?.length
                ? {
                    set: [],
                    connectOrCreate: data.manufacturers.map(name => ({
                        where: { name },
                        create: { name },
                    })),
                }
                : undefined,
            // update sets if provided
            sets: data.sets?.length
                ? {
                    set: [],
                    connectOrCreate: data.sets.map(name => ({
                        where: { name },
                        create: { name },
                    })),
                }
                : undefined,
        },
        include: {
            countries: true,
            companies: true,
            groups: true,
            rights: true,
            manufacturers: true,
            sets: true,
        },
    });
    return user;
}
async function updatePasswordHashByUsername(username, passwordHash, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    const user = await db.user.update({
        where: { username },
        data: { passwordHash },
        select: { id: true, username: true, emailHash: true }, // return only relevant fields
    });
    if (!prisma)
        await db.$disconnect();
    return user;
}
async function updateEmailByUsername(username, emailHash, prisma) {
    const db = prisma ?? new client_1.PrismaClient();
    const user = await db.user.update({
        where: { username },
        data: { emailHash },
        select: { id: true, username: true, emailHash: true },
    });
    if (!prisma)
        await db.$disconnect();
    return user;
}
