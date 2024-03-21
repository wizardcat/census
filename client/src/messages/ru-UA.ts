import { locales } from '@app/constants';

export default {
  [locales.RUSSIAN]: {
    header: `Первая всеобщая перепись населения Российской Империи 1897 г. 
    Распределение населения по родному языку и уездам России`,
    tableRegions: {
      header: {
        position: '№',
        name: 'Регион',
      },
      labelRowsPerPage: 'Строк:',
    },
    tableCensus: {
      header: {
        position: '№',
        language: 'Язык',
        langGroup: 'Языковая группа',
        male: 'Мужчины',
        female: 'Женщины',
        bothSexes: 'Оба пола',
        percentOfTotal: '% от общего числа',
      },
      total: 'Всего',
    },

    search: 'Поиск',

    //In Russian Empire east slavic languages counted as a russian dialect. Switch it to the reality.
    languageReplace: {
      eastSlavicGroup: 'Восточно-словянские языки*',
      ukrainian: 'Украинский (Малорусский*)',
      russian: 'Русский',
      belarussian: 'Беларусский',
    },
    regionFilterPlaceholder: 'Введите название региона',
  },
};
