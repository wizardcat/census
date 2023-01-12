import { Prisma, PrismaClient } from '@prisma/client'
import { Language } from '../types'

const prisma = new PrismaClient()

export const addLanguages = async (languages: Language[]) => {
    let lang: Prisma.LangUncheckedCreateInput[] = languages

    await Promise.all(
        lang.map(async (lng) => {
            await prisma.lang.create({
                data: lng,
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