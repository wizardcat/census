import * as services from '@app/services';
import { GetRegionParams } from '@app/types';
import { Request, Response } from 'express';

export const getRegions = async (req: Request, res: Response) => {
  const {
    params: { locale },
  } = req;
  const queryParams = req.query as GetRegionParams;

  if (!queryParams.lastId) {
    return res.status(400).json({ err: `Parameter ':lastId' can not be empty` });
  }
  if (!queryParams.skip) {
    return res.status(400).json({ err: `Parameter ':skip' can not be empty` });
  }
  if (!queryParams.take) {
    return res.status(400).json({ err: `Parameter ':take' can not be empty` });
  }
  if (!queryParams.region) {
    return res.status(400).json({ err: `Parameter ':region' can not be empty` });
  }

  try {
    const regions = await services.getRegions(locale, queryParams);

    return res.status(200).json(regions);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getRegionsCountByName = async (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ err: `Parameter ':name' can not be empty` });
  }

  try {
    const regionsCount = await services.getRegionsCountByName(name as string);

    return res.status(200).json(regionsCount);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getRegionIdByName = async (req: Request, res: Response) => {
  const {
    params: { locale },
  } = req;
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ err: `Parameter ':name' can not be empty` });
  }

  try {
    const regionId = await services.getRegionIdByName(locale, name as string);

    return res.status(200).json(regionId);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getMaxRegionId = async () => {
  const maxRegionId = await services.getMaxRegionId;
  return maxRegionId;
};

export const getRegionsByName = async (req: Request, res: Response) => {
  const {
    params: { locale },
  } = req;
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ err: `Parameter ':name' can not be empty` });
  }

  try {
    const regions = await services.getRegionsByName(locale, name as string);

    return res.status(200).json(regions);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
