import { Request, Response } from "express";
import { Prisma, PrismaClient } from '@prisma/client'
import { CensusRecord } from '../types'

const prisma = new PrismaClient()

export const addCensuses = async (censuses: CensusRecord[]) => {
    let censusesData: Prisma.CensusUncheckedCreateInput[] = censuses

    await Promise.all(
        censusesData.map(async (census) => {
            await prisma.census.create({
                data: census,
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

export const getCensusById = async (req: Request, res: Response) => {

    const { lang, id } = req.params

    const census = await prisma.census.findMany({
        orderBy: {
            lang: {
                id: 'asc'
                // langGroup: {
                //     name_ru: 'asc',
                // },
                // name_ru: 'asc',
            },
        },
        select: {

            id: true,
            males: true,
            females: true,

            lang: {
                select: {
                    id: true,
                    name_ua: true,
                    name_en: true,
                    name_ru: true,
                    langGroupId: false,
                    // name_ua: lang === 'ua',
                    // name_en: lang === 'en',
                    // name_ru: lang === 'ru',
                    langGroup: {
                        select: {
                            id: true,
                            name_ua: true,
                            name_en: true,
                            name_ru: true,
                            // name_ua: lang === 'ua',
                            // name_en: lang === 'en',
                            // name_ru: lang === 'ru',
                        }

                    }
                }

            },

        },

        where: {
            regionId: Number(id),
        }
    })

    try {
        return res.status(200).json(census);
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}
