import { CensusRecord } from '@app/types';
import { Prisma, PrismaClient } from '@prisma/client';
import { getNameByLocale } from './utils/get-name-by-locale';
import { parsePropNames } from './utils/parse-prop-names';

const prisma = new PrismaClient();

export const addCensus = async (census: CensusRecord[]) => {
  const censusData: Prisma.CensusUncheckedCreateInput[] = census;

  await Promise.all(
    censusData.map(async (census) => {
      await prisma.census.create({
        data: census,
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

export const getCensusByRegionId = async (locale: string, regionId: string) => {
  const nameByLocale = getNameByLocale(locale);

  const censusData = await prisma.census.findMany({
    orderBy: {
      language: {
        id: 'asc',
        // langGroup: {
        //     [nameByLocale]: 'asc',
        // },
        // [nameByLocale]: 'asc',
      },
    },
    select: {
      id: true,
      males: true,
      females: true,

      language: {
        select: {
          id: true,
          languageGroupId: false,
          [nameByLocale]: true,
          languageGroup: {
            select: {
              id: true,
              [nameByLocale]: true,
            },
          },
        },
      },
    },

    where: {
      regionId: Number(regionId),
    },
  });

  const census = parsePropNames(censusData);

  return census;
};

export const getCensusByRegionName = async (locale: string, region: string) => {
  const nameByLocale = getNameByLocale(locale);

  const regionIdResp = await prisma.region.findFirst({
    where: {
      [nameByLocale]: { contains: `%${region}%`, mode: 'insensitive' },
    },
  });

  const regionId = regionIdResp?.id;

  if (!regionId) return;

  const censusData = await prisma.census.findMany({
    orderBy: {
      language: {
        id: 'asc',
        // langGroup: {
        //     [nameByLocale]: 'asc',
        // },
        // [nameByLocale]: 'asc',
      },
    },
    select: {
      id: true,
      males: true,
      females: true,

      language: {
        select: {
          id: true,
          languageGroupId: false,
          [nameByLocale]: true,
          languageGroup: {
            select: {
              id: true,
              [nameByLocale]: true,
            },
          },
        },
      },
    },
    where: {
      // [nameByLocale]: region,
      regionId: Number(regionId),
    },
  });

  const census = parsePropNames(censusData);

  return census;
};
