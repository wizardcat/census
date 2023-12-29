import { Prisma, PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { Region } from '../types';
import { getNameByLocale, parsePropNames } from './utils';

const prisma = new PrismaClient();

export const addRegions = async (regions: Region[]) => {
  const regionsData: Prisma.RegionUncheckedCreateInput[] = regions;

  await Promise.all(
    regionsData.map(async (region) => {
      await prisma.region.create({
        data: region,
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

export const getRegions = async (req: Request, res: Response) => {
  const { locale, lastId, skip, take, region } = req.query;

  const nameByLocale = getNameByLocale(locale as string);

  const regionsData = await prisma.region.findMany({
    take: Number(take) || 5,
    select: {
      id: true,
      parentId: true,
      [nameByLocale]: true,
    },
    orderBy: {
      id: 'asc',
    },
    where: {
      id: { gt: Number(lastId) || 0 },
      [nameByLocale]: { contains: region as string },
    },
  });

  const regionsCount = await prisma.region.count({
    where: {
      [nameByLocale]: {
        contains: region as string,
      },
    },
  });

  const regions = parsePropNames(regionsData);

  const regData = { regions, regionsCount };

  try {
    return res.status(200).json(regData);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getRegionsCountByName = async (req: Request, res: Response) => {
  const { name } = req.query;

  const regionsCount = await prisma.region.count({
    where: {
      nameEN: { contains: name as string },
    },
  });

  try {
    return res.status(200).json(regionsCount);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getRegionIdByName = async (req: Request, res: Response) => {
  const { locale, name } = req.query;

  const nameByLocale = getNameByLocale(locale as string);

  const regionId = await prisma.region.findFirst({
    where: {
      [nameByLocale]: { contains: name as string },
    },
  });

  try {
    return res.status(200).json(regionId);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getMaxRegionId = async () => {
  const maxRegionId = await prisma.region.aggregate({
    _max: {
      id: true,
    },
  });
  return maxRegionId._max.id || 0;
};

export const getRegionsByName = async (req: Request, res: Response) => {
  const { locale, name } = req.query;

  const nameByLocale = getNameByLocale(locale as string);

  const regions = await prisma.region.findMany({
    where: {
      [nameByLocale]: { contains: name as string },
    },
  });

  try {
    return res.status(200).json(regions);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
