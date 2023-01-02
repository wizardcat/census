import { Prisma, PrismaClient } from '@prisma/client'
import { LanguageGroup } from '../types'

const prisma = new PrismaClient()

export const addLanguageGroups = async (languageGroups: LanguageGroup[]) => {
    let langGroups: Prisma.LangGroupCreateInput[] = languageGroups

    await Promise.all(
        langGroups.map(async (langGroup) => {
            await prisma.langGroup.create({
                data: langGroup,
                // data: {
                //     id: langGroup.id,
                //     name_ua: langGroup.name_ua,
                //     name_en: langGroup.name_en,
                //     name_ru: langGroup.name_ru,
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