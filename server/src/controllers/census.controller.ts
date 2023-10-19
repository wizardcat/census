import { Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import { CensusRecord } from '../types'
import { parsePropNames } from './utils'
const prisma = new PrismaClient()

export const addCensuses = async (censuses: CensusRecord[]) => {
  let censusesData: Prisma.CensusUncheckedCreateInput[] = censuses

  await Promise.all(
    censusesData.map(async (census) => {
      await prisma.census.create({
        data: census,
      })
    })).then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })
}

export const getCensusByRegionId = async (req: Request, res: Response) => {

  const { locale, regionId } = req.query

  const nameByLocale = `name_${locale}`;

  const censusData = await prisma.census.findMany({
    orderBy: {
      lang: {
        id: 'asc'
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

      lang: {
        select: {
          id: true,
          langGroupId: false,
          [nameByLocale]: true,
          langGroup: {
            select: {
              id: true,
              [nameByLocale]: true,
            }

          }
        }

      },

    },

    where: {
      regionId: Number(regionId),
    }
  })

  try {

    const census = parsePropNames(censusData)

    return res.status(200).json(census);
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}

export const getCensusByRegionName = async (req: Request, res: Response) => {

  const { locale, region } = req.query

  const nameByLocale = `name_${locale}`;

  const regionIdResp = await prisma.region.findFirst({
    where: {
      [nameByLocale]: { contains: region as string }
      // [nameByLocale]: region
    },
  });

  const regionId = regionIdResp?.id;
console.log(JSON.stringify(regionIdResp));

  if (!regionId) return;

  // console.log('regionId: ' + regionId);
  const censusData = await prisma.census.findMany({
    orderBy: {
      lang: {
        id: 'asc'
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

      lang: {
        select: {
          id: true,
          langGroupId: false,
          [nameByLocale]: true,
          langGroup: {
            select: {
              id: true,
              [nameByLocale]: true,
            }

          }
        }

      },

    },
    where: {
      // [nameByLocale]: region,
      regionId: Number(regionId),
    }
  })

  try {

    const census = parsePropNames(censusData)
    // console.log('census: ' + JSON.stringify(census).length);
    return res.status(200).json(census);
  } catch (error) {
    return res.status(500).json({ err: error })
  }
}
