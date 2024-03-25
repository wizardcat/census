import { LanguageGroup } from '@app/types';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addLanguageGroups = async (languageGroups: LanguageGroup[]) => {
  let langGroups: Prisma.LanguageGroupCreateInput[] = languageGroups;

  await Promise.all(
    langGroups.map(async (languageGroup) => {
      await prisma.languageGroup.create({
        data: languageGroup,
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
