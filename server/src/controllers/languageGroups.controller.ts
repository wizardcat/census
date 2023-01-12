import { Prisma, PrismaClient } from '@prisma/client'
import { LanguageGroup } from '../types'

const prisma = new PrismaClient()

export const addLanguageGroups = async (languageGroups: LanguageGroup[]) => {
    let langGroups: Prisma.LangGroupCreateInput[] = languageGroups

    await Promise.all(
        langGroups.map(async (langGroup) => {
            await prisma.langGroup.create({
                data: langGroup,
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