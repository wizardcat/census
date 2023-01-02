import { Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import { Region } from '../types'

const prisma = new PrismaClient()

export const addRegions = async (regions: Region[]) => {
    let regs: Prisma.RegionCreateInput[] = regions

    await Promise.all(
        regs.map(async (reg) => {
            await prisma.region.create({
                data: reg,
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

export const getRegions = async (req: Request, res: Response) => {

    const { lang } = req.params

    const regions = await prisma.region.findMany({
        orderBy: {
            name_ru: 'asc',
        },
        select: {
            id: true,
            parentId: false,
            name_ua: true,
            name_en: true,
            name_ru: true,
            // name_ua: lang === 'ua',
            // name_en: lang === 'en',
            // name_ru: lang === 'ru',
        },
        where: { id: { in: [1, 2] } },
    })

    try {
        return res.status(200).json(regions);
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}

export const getMaxRegionsId = async () => {

    const maxRegionsId = await prisma.region.aggregate({
        _max: {
            id: true,
        }

    })
    return maxRegionsId._max.id || 0
}


export const getRegionById = async (req: Request, res: Response) => { }
