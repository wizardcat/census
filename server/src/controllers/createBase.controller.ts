import { Request, Response } from "express";
import { grabCensusData } from '../services/grabCensusData'
import { SOURCE_URL_RU_EUROPE, SOURCE_URL_RU_NO_EUROPE, SOURCE_URL_RU_OBL } from '../config'

export const extractCensusData = async (req: Request, res: Response) => {
    try {
        // const { page, createDict } = req.params
        console.log('extractCensusData');

        // await grabCensusData(SOURCE_URL_RU_EUROPE)

        await grabCensusData(SOURCE_URL_RU_NO_EUROPE)

        return res.status(200).json('Ok');
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}
