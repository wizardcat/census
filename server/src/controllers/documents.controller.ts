import { Document } from '@app/types';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addDocuments = async (documents: Document[]) => {
  const docs: Prisma.DocumentUncheckedCreateInput[] = documents;

  await Promise.all(
    docs.map(async (document) => {
      await prisma.document.create({
        data: document,
      });
    }),
  )
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
};
