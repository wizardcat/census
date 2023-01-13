import { Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import { Region } from '../types'
import { parsePropNames } from './utils'

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

    const { locale, lastId, skip, take, name } = req.query

    const regionsData = await prisma.region.findMany({

        take: Number(take) || 5,

        select: {
            id: true,
            parentId: true,
            name_uk: locale === 'uk',
            name_en: locale === 'en',
            name_ru: locale === 'ru',
        },

        orderBy: {
            id: 'asc',
        },
        where: {
            id: { gt: Number(lastId) || 0 }
        },


    })

    let queryCount = {}
    if (locale === 'uk') {
        queryCount = {
            where: {
                name_en: { contains: name as string },
            },
        }
    } else if (locale === 'en') {
        queryCount = {
            where: {
                name_en: { contains: name as string },
            },
        }
    }
    else if (locale === 'ru') {
        queryCount = {
            where: {
                name_en: { contains: name as string },
            },
        }
    }

    const regionsCount = await prisma.region.count(queryCount)

    const regions = parsePropNames(regionsData)

    const regData = { regions, regionsCount }

    try {
        return res.status(200).json(regData);
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}

export const getRegionsCountByName = async (req: Request, res: Response) => {

    const { name } = req.query

    const regionsCount = await prisma.region.count({
        where: {
            name_en: { contains: name as string }
        },
    })

    try {
        return res.status(200).json(regionsCount);
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
