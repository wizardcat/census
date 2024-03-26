import { TypedRequestQuery } from '@app/interfaces';
import * as services from '@app/services';
import { GetRegionParams } from '@app/types';
import { Request, Response } from 'express';

export const getRegions = async (req: TypedRequestQuery<GetRegionParams>, res: Response) => {
  const regions = await services.getRegions(req.query);

  try {
    return res.status(200).json(regions);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getRegionsCountByName = async (req: Request, res: Response) => {
  const name = req.query.name as string;

  const regionsCount = await services.getRegionsCountByName(name);

  try {
    return res.status(200).json(regionsCount);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getRegionIdByName = async (req: Request, res: Response) => {
  const locale = req.query.locale as string;
  const name = req.query.name as string;

  const regionId = await services.getRegionIdByName(locale, name);

  try {
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
  const locale = req.query.locale as string;
  const name = req.query.name as string;

  const regions = await services.getRegionsByName(locale, name);

  try {
    return res.status(200).json(regions);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
