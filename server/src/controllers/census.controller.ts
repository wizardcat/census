import * as services from '@app/services';
import { Request, Response } from 'express';

export const getCensusByRegionId = async (req: Request, res: Response) => {
  const {
    params: { locale, regionId },
  } = req;

  if (!locale) {
    return res.status(400).json({ err: `Parameter ':locale' can not be empty` });
  }
  if (!regionId) {
    return res.status(400).json({ err: `Parameter ':regionId' can not be empty` });
  }

  try {
    const census = await services.getCensusByRegionId(locale, regionId);

    return res.status(200).json(census);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

export const getCensusByRegionName = async (req: Request, res: Response) => {
  const {
    params: { locale },
  } = req;
  const { region } = req.query;

  if (!region) {
    return res.status(400).json({ err: `Parameter ':region' can not be empty` });
  }

  try {
    const census = await services.getCensusByRegionName(locale, region as string);

    return res.status(200).json(census);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
