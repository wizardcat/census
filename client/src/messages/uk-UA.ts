import { locales } from '@app/constants';

export default {
  [locales.UKRAINIAN]: {
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
    languageReplace: {
      eastSlavicGroup: `Східно-слов'янські мови*`,
      ukrainian: 'Українська (Малоруська*)',
      russian: 'Російська (Великоросійська*)',
      belarussian: 'Білоруська',
    },
    regionFilterPlaceholder: 'Введіть назву регіона',
  },
};
