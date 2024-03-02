import { CensusRecord } from '@app/types';
import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { getNameByLocale, parsePropNames } from './utils';
const prisma = new PrismaClient();

export const addCensuses = async (census: CensusRecord[]) => {
  let censusData: Prisma.CensusUncheckedCreateInput[] = census;

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

export const getCensusByRegionId = async (req: Request, res: Response) => {
  const { locale, regionId } = req.query;

  const nameByLocale = getNameByLocale(locale as string);

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

  try {
    const census = parsePropNames(censusData);

    return res.status(200).json(census);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getCensusByRegionName = async (req: Request, res: Response) => {
  const { locale, region } = req.query;

  const nameByLocale = getNameByLocale(locale as string);

  const regionIdResp = await prisma.region.findFirst({
    where: {
      [nameByLocale]: { contains: region as string },
      // [nameByLocale]: region
    },
  });

  const regionId = regionIdResp?.id;

  if (!regionId) return;

  // console.log('regionId: ' + regionId);
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

  try {
    const census = parsePropNames(censusData);
    // console.log('census: ' + JSON.stringify(census).length);
    return res.status(200).json(census);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
