import { Prisma, PrismaClient } from '@prisma/client'
import { Language } from '../types'

const prisma = new PrismaClient()

export const addLanguages = async (languages: Language[]) => {
    let lang: Prisma.LangUncheckedCreateInput[] = languages

    await Promise.all(
        lang.map(async (lng) => {
            await prisma.lang.create({
                data: lng,
                // data: {
                //     id: lng.id,
                //     name_ua: lng.name_ua,
                //     name_en: lng.name_en,
                //     name_ru: lng.name_ru,
                //     langGroupId: lng.langGroupId,
                // }
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