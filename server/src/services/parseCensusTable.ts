import * as cheerio from 'cheerio'
import { LanguageGroup, Language, CensusRecord, CensusPageData } from '../types'


export const parseCensusTable = (cheerioAPI: cheerio.CheerioAPI, selectorTable: string, regionId: number, parseLangs: boolean, maxRegId: number): CensusPageData => {

    const $ = cheerioAPI
    let langGroupId = 0
    let langId = 0
    const censusByReg: CensusRecord[] = []
    const languages: Language[] = []
    const langGroups: LanguageGroup[] = []

    $(selectorTable).each((parentIndex, parentElem) => {

        const tableRow = $((parentElem as cheerio.Element).children)

        let arrIdxShift = 0
        let langGroup: LanguageGroup
        let lang: Language
        let langGroupNameRu = ''
        let langNameRu = ''
        let censusRecord: CensusRecord
        let isFirstCell = true

        //The first table row has the language group name and contains 5 cells, all others - 4. 
        //But if there is an empty (last?) cell - an additional 'text' element presents. Solve it.
        if ((tableRow.length === 5 && tableRow.last()[0].type !== 'text') || (tableRow.length === 6 && tableRow.last()[0].type === 'text')) {

            arrIdxShift = 1

            //Extract the language groups when pass the first region
            if (parseLangs && isFirstCell) {

                langGroupId++

                langGroupNameRu = $(tableRow[0]).text().trim()

                langGroup = {
                    id: langGroupId,
                    name_ua: null,
                    name_en: null,
                    name_ru: langGroupNameRu
                }

                langGroups.push(langGroup)

                isFirstCell = false

            }


        } else {
            isFirstCell = true
            arrIdxShift = 0
        }

        //Extract languages during a first pass
        langNameRu = $(tableRow[arrIdxShift + 0]).text().trim()

        if (langNameRu !== 'Итого') {

            langId++


            if (parseLangs) {

                langNameRu = langNameRu || langGroupNameRu

                lang = {
                    id: langId,
                    name_ua: null,
                    name_en: null,
                    name_ru: langNameRu,
                    langGroupId: langGroupId
                }

                languages.push(lang)
            }

            const males = Number($(tableRow[arrIdxShift + 1]).text().match(/\d+/g)?.join('')) || 0
            const females = Number($(tableRow[arrIdxShift + 2]).text().match(/\d+/g)?.join('')) || 0
            let regId = maxRegId + regionId

            censusRecord = {
                males: males,
                females: females,
                langId: langId,
                regionId: regId
            }

            censusByReg.push(censusRecord)

        }
    })



    return { censusByReg, langGroups, languages }

}
