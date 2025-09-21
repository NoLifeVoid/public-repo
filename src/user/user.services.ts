import { PrismaClient } from '@prisma/client';
import { newUser, User } from './user.interfaces';
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();


  export async function registerUser(data: newUser, prisma: PrismaClient|null) {
  const db = prisma ?? new PrismaClient(); 
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


export async function getAllUsers( prisma: PrismaClient|null) {
  const db = prisma ?? new PrismaClient(); 
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


export async function getUserByUsername(username: string, prisma: PrismaClient|null) {
  const db = prisma ?? new PrismaClient(); 
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

export async function getUserByEmail(email: string, prisma: PrismaClient|null) {
  const db = prisma ?? new PrismaClient(); 
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

export async function getUserById(id: string, prisma: PrismaClient|null) {
  const db = prisma ?? new PrismaClient(); 
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
export async function deleteUserById(id: string, prisma: PrismaClient|null): Promise<User | null | undefined> {
  const db = prisma ?? new PrismaClient(); 
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
  } catch (error: any) {
    // P2025 = "Record to delete does not exist"
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return null;
    }
    throw error; // re-throw other errors
  }
}

export async function updateUserById(id: string, data: newUser, prisma: PrismaClient|null) {
  const db = prisma ?? new PrismaClient(); 
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

export async function updatePasswordHashByUsername(
  username: string,
  passwordHash: string,
  prisma: PrismaClient | null
) {
  const db = prisma ?? new PrismaClient();

  const user = await db.user.update({
    where: { username },
    data: { passwordHash },
    select: { id: true, username: true, emailHash: true }, // return only relevant fields
  });

  if (!prisma) await db.$disconnect();
  return user;
}

export async function updateEmailByUsername(
  username: string,
  emailHash: string,
  prisma: PrismaClient | null
) {
  const db = prisma ?? new PrismaClient();

  const user = await db.user.update({
    where: { username },
    data: { emailHash },
    select: { id: true, username: true, emailHash: true },
  });

  if (!prisma) await db.$disconnect();
  return user;
}


