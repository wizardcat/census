import { grabCensusData } from '@app/services/grab-census-data';
import { Request, Response } from 'express';

export const extractCensusData = async (req: Request, res: Response) => {
  try {
    // const { page, createDict } = req.params
    console.log('extractCensusData');

    // const data = await grabCensusData('europeanPart');
    // const data = await grabCensusData('noEuropeanPart');
    const data = await grabCensusData('byOblastsOfEmpire');

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
