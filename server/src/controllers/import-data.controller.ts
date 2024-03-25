import * as services from '@app/services';
import { Request, Response } from 'express';

export const importData = async (req: Request, res: Response) => {
  try {
    // const { page, createDict } = req.params
    console.log('importCensusData');

    // const data = await grabCensusData('europeanPart');
    // const data = await grabCensusData('noEuropeanPart');
    const data = await services.importData('byOblastsOfEmpire');

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
