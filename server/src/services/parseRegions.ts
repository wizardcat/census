import * as cheerio from 'cheerio'
import { Region } from '../types'

export const parseRegions = (cheerioAPI: cheerio.CheerioAPI, selectorRegions: string, europePart: number, maxRegId: number): Region[] => {

  const $ = cheerioAPI
  const regionsList: Region[] = []
  let parentId = 0;
  let regionId = maxRegId || 0

  $(selectorRegions).each((parentIndex, parentElem) => {

    const regionName = $(parentElem).text()

    // if (!regionName.includes('----------')) {
    //     parentId = 0
    //     // regionId = regionId + Number((parentElem as cheerio.Element).attribs.value) + 1
    //     regionId++
    // }
    // else {
    //     regionId++
    //     // regionId = regionId + Number((parentElem as cheerio.Element).attribs.value) + 1
    // }

    regionId++
    
    parentId = regionName.includes('----------') ? regionId : 0

    //.replace('г.', '- г.')
    const regionNameRu = regionName.replaceAll('--', '').replace('вся', '(вся)').replace('весь', '(весь)').trim().replace('без города', '(без города)')

    const region = {
      id: regionId,
      parentId: parentId,
      name_uk: null,
      name_en: null,
      name_ru: regionNameRu,
      europePart: europePart
    }

    // if (parentId === 0) parentId = regionId

    regionsList.push(region)

  })

  return regionsList

}