import { LOCALES } from '../const'

export default {
  [LOCALES.ENGLISH]: {
    header: `The First General Census of the Russian Empire of 1897. 
      Breakdown of population by native language and districts in Governorates of the Russia.`,
    tableRegions: {
      header: {
        position: '#',
        name: 'Region',
      },
      labelRowsPerPage: 'Rows:',
    },
    tableCensus: {
      header: {
        position: '#',
        language: 'Language',
        langGroup: 'Language Group',
        male: 'Males',
        female: 'Females',
        bothSexes: 'Both Sexes',
        percentOfTotal: '% Of Total',
      },
      total: 'Total',
    },

    search: 'Search',
    //In Russian Empire east slavic languages counted as a russian dialect. Switch it to the reality.
    langFix: {
      eastSlavicGroup: 'East Slavic languages*',
      ukrainian: 'Ukrainian (Malorussian*)',
      russian: 'Russian',
      belarussian: 'Belarussian',
    },
    regionFilterPlaceholder: 'Type the region name',
  },
}
