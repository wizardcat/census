import { GetRegionParams, Region } from '@app/types';
import { Prisma, PrismaClient } from '@prisma/client';
import { getNameByLocale } from './utils/get-name-by-locale';
import { parsePropNames } from './utils/parse-prop-names';

const prisma = new PrismaClient();

export const addRegions = async (regions: Region[]) => {
  const regionsData: Prisma.RegionUncheckedCreateInput[] = regions.map((region) => {
    return {
      documentId: region.documentId,
      id: region.id,
      nameEN: region.nameEN,
      nameRU: region.nameRU,
      nameUK: region.nameUK,
      parentId: region.parentId,
    };
  });

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

export const getRegions = async ({ locale, lastId, skip, take, region }: GetRegionParams) => {
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

  return regData;
};

export const getRegionsCountByName = async (name: string) => {
  const regionsCount = await prisma.region.count({
    where: {
      nameEN: { contains: name as string },
    },
  });

  return regionsCount;
};

export const getRegionIdByName = async (locale: string, name: string) => {
  const nameByLocale = getNameByLocale(locale as string);

  const regionId = await prisma.region.findFirst({
    where: {
      [nameByLocale]: { contains: name as string },
    },
  });

  return regionId;
};

export const getMaxRegionId = async () => {
  const maxRegionId = await prisma.region.aggregate({
    _max: {
      id: true,
    },
  });
  return maxRegionId._max.id || 0;
};

export const getRegionsByName = async (locale: string, name: string) => {
  const nameByLocale = getNameByLocale(locale as string);

  const regions = await prisma.region.findMany({
    where: {
      [nameByLocale]: { contains: name as string },
    },
  });

  return regions;
};
