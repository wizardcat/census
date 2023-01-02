import { EUROPE_REG_CONFIG, NOT_EUROPE_REG_CONFIG } from '../config'
import { Region } from '../types'
import { addRegions, getMaxRegionsId } from '../controllers/regions.controller'
import { addLanguageGroups } from '../controllers/languageGroups.controller'
import { addLanguages } from '../controllers/languages.controller'
import { addCensuses } from '../controllers/census.controller'
import { parseRegions } from './parseRegions';
import { getData } from './getData'
import { parseCensusTable } from './parseCensusTable';


export const grabCensusData = async (url: string) => {

    let regionsData: Region[] = []
    let parseLangs = true
    let regId = 0

    let maxRegId = await getMaxRegionsId()

    while (regId < 2000) {

        let cheerioAPI = await getData(`${url}${regId}`)

        if (regId === 0) {

            let selectorRegions: string
            let europePart: number

            if (url === EUROPE_REG_CONFIG.sourceURL) {
                selectorRegions = EUROPE_REG_CONFIG.selectorRegions
                europePart = 1

            } else {
                selectorRegions = NOT_EUROPE_REG_CONFIG.selectorRegions
                europePart = 0
            }

            regionsData = parseRegions(cheerioAPI, selectorRegions, europePart, maxRegId)


            try {
                console.log('Regions adding')
                const reg = await addRegions(regionsData)
                console.log('Regions has been added')

            } catch (err) {

                console.log(err)
            }
        }

        //regId starts from 1 for the database
        regId++

        let selectorTable: string

        if (url === EUROPE_REG_CONFIG.sourceURL) {
            selectorTable = EUROPE_REG_CONFIG.selectorTable
            parseLangs = true
        } else {
            selectorTable = NOT_EUROPE_REG_CONFIG.selectorTable
            parseLangs = false
        }

        const censusPageData = parseCensusTable(cheerioAPI, selectorTable, regId, parseLangs, 1777)

        try {
            if (parseLangs) {
                console.log('Language Groups adding')
                const lgr = await addLanguageGroups(censusPageData.langGroups)
                console.log('Language Groups has been added')

                console.log('Language adding')
                const lg = await addLanguages(censusPageData.languages)
                console.log('Languages has been added')
            }

            console.log(`Censuses  for region ${regId} adding`)
            const cen = await addCensuses(censusPageData.censusByReg)
            console.log(`Census for region ${regId} has been added`)

        } catch (err) {
            console.log(err)
        }

        if (regId === regionsData.length) break

    }

}