import { LOCALES } from '../const'

export default {
  [LOCALES.UKRAINIAN]: {
    header: `Перший загальний перепис населення Російскої Імперії 1897 р. 
    Розподіл населення по рідній мові та повітам Росії`,
    tableRegions: {
      header: {
        position: '№',
        name: 'Регіон',
      },
      labelRowsPerPage: 'Рядків:',
    },
    tableCensus: {
      header: {
        position: '№',
        language: 'Мова',
        langGroup: 'Мовна група',
        male: 'Чоловіки',
        female: 'Жінки',
        bothSexes: 'Обидва пола',
        percentOfTotal: '% від загального',
      },
      total: 'Загалом',
    },

    search: 'Пошук',

    //In Russian Empire east slavic languages counted as a russian dialect. Switch it to the reality.
    langFix: {
      eastSlavicGroup: `Східно-слов'янські мови`,
      ukrainian: 'Українська (Малоруська*)',
      russian: 'Російська',
      belarussian: 'Білоруська',
    },
  },
}
