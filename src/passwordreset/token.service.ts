import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();


export async function getPasswordResetRecord(token: string) {
  const record = await prisma.passwordReset.findFirst({
    where: {
      token: token,
      used: false,      // ensure the token hasn't been used
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


export async function getUserByPasswordResetToken(token: string): Promise<User | null> {
  const resetRecord = await prisma.passwordReset.findUnique({
    where: { token ,used:false,
      // expiresAt: {
      //   gt: new Date(), // expiresAt must be greater than now
      // },
    },
    include: { user: true},
  });

  return resetRecord?.user ?? null;
}

export async function isTokenExpired(token: string): Promise<boolean> {
  const resetRecord = await prisma.passwordReset.findUnique({
    where: { token ,
      expiresAt: {
        lt: new Date(), // expiresAt must be greater than now
      },}
  });

  return resetRecord? true:false;
}

export async function declarePasswordResetTokenAsUsed(token: string): Promise<boolean> {
  const result = await prisma.passwordReset.updateMany({
    where: { token, used: false },
    data: { used: true },
  });

  return result.count > 0; // true if at least one record was updated
}


export async function getUserIdByPasswordResetToken(token: string): Promise<string | null> {
  const resetRecord = await prisma.passwordReset.findUnique({
    where: { token },
  });

  return resetRecord?.userId ?? null;
}
