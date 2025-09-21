import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RefreshTokenData {
  userId: string;
  token: string;
  expiresAt: Date;
}

// Create a refresh token (or replace if one already exists)
export async function createRefreshToken(data: RefreshTokenData, prisma: PrismaClient|null) {
  const db = prisma ?? new PrismaClient(); 
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
export async function updateRefreshToken(userId: string, data: Partial<RefreshTokenData>) {
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
export async function getRefreshToken(token: string) {
  const refreshToken = await prisma.refreshToken.findUnique({
    where: { token },
    include: {
      user: true,
    },
  });

  return refreshToken;
}

// Optional: delete refresh token by userId
export async function deleteRefreshToken(userId: string) {
  const refreshToken = await prisma.refreshToken.delete({
    where: { userId },
  });

  return refreshToken;
}

export async function saveRefreshToken(data: RefreshTokenData) {
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


export async function findWebtokenByUserId(id: string) {
  const refreshToken = await prisma.refreshToken.findUnique({
    where: { userId: id },
  });
  return refreshToken;
}

export async function findRefreshToken(token: string) {
  return prisma.refreshToken.findUnique({ where: { token } });
}