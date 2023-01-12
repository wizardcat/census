export const URL = 'http://localhost'
export const PORT = '3001'

// The First General Census of the Russian Empire of 1897.
// Breakdown of population by mother tongue and districts* in 50 Governorates of the European Russia
export const SOURCE_URL_EN_EUROPE = 'http://www.demoscope.ru/weekly/ssp/rus_lan_97_uezd_eng.php?reg='

export const SOURCE_URL_RU_EUROPE = 'http://www.demoscope.ru/weekly/ssp/rus_lan_97_uezd.php?reg='


export const EUROPE_REG_CONFIG = {
    sourceURL: 'http://www.demoscope.ru/weekly/ssp/rus_lan_97_uezd.php?reg=',
    selectorRegions: 'body > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > center > table:nth-child(3) > tbody > tr > td > form > div > select > option:not(:first-of-type)',
    selectorTable: 'body > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > center > table:nth-child(5) > tbody > tr:nth-child(n+3)'
}

Object.freeze(EUROPE_REG_CONFIG);

export const NOT_EUROPE_REG_CONFIG = {
    sourceURL: 'http://www.demoscope.ru/weekly/ssp/emp_lan_97_uezd.php?reg=',
    selectorRegions: 'body > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > center > table:nth-child(2) > tbody > tr > td > form > div > select > option:not(:first-of-type)',
    selectorTable: 'body > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > center > table:nth-child(4) > tbody > tr:nth-child(n+3)'
}

Object.freeze(NOT_EUROPE_REG_CONFIG);

// The first general census of the population of the Russian Empire in 1897
// Population distribution by mother tongue and counties
// Russian Empire except for the provinces of European Russia
export const SOURCE_URL_RU_NO_EUROPE = 'http://www.demoscope.ru/weekly/ssp/emp_lan_97_uezd.php?reg='

// The first general census of the population of the Russian Empire in 1897
// Distribution of the population by native language, provinces and regions
export const SOURCE_URL_RU_OBL = 'http://www.demoscope.ru/weekly/ssp/rus_lan_97.php?reg='
