import * as services from '@app/services';
import { Request, Response } from 'express';

export const getCensusByRegionId = async (req: Request, res: Response) => {
  const locale = req.query.locale as string;
  const regionId = req.query.regionId as string;
  // const {
  //   params: { locale, regionId },
  // } = req;
  // if (!locale || !regionId) {
  //   return;
  // }

  const census = await services.getCensusByRegionId(locale, regionId);

  try {
    return res.status(200).json(census);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getCensusByRegionName = async (req: Request, res: Response) => {
  const locale = req.query.locale as string;
  const region = req.query.region as string;

  const census = await services.getCensusByRegionName(locale, region);

  try {
    return res.status(200).json(census);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
