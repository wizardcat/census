import { Language } from '@app/types';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addLanguages = async (languages: Language[]) => {
  let lang: Prisma.LanguageUncheckedCreateInput[] = languages;

  await Promise.all(
    lang.map(async (language) => {
      await prisma.language.create({
        data: language,
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
