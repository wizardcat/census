export const URL = 'http://localhost';
export const PORT = '3001';

export const DATA_SOURCE_CONFIG = {
  europeanPart: {
    sourceURL: 'http://www.demoscope.ru/weekly/ssp/rus_lan_97_uezd.php?reg=',
    selectorRegions:
      'body > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > center > table:nth-child(3) > tbody > tr > td > form > div > select > option:not(:first-of-type)',
    selectorTable:
      'body > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > center > table:nth-child(5) > tbody > tr:nth-child(n+3)',
    censusDocumentId: 1,
    censusDocumentName: `The First General Census of the Russian Empire of 1897.
                Breakdown of population by mother tongue and districts* in 50 Governorates of the European Russia`,
    header_ru: `Первая всеобщая перепись населения Российской Империи 1897 г.
                Распределение населения по родному языку и уездам 50 губерний Европейской России`,
    data_source_ru: `Первая Всеобщая перепись населения Российской Империи 1897 г. 
                    Таблица XIII. Распределение населения по родному языку. Т.Т.1-50. С.-Петербург: 1903-1905`,
    remarks_ru: `* Здесь представлен языковый состав населения всех уездов Российской империи. Хотя в публикации итогов переписи население 
              распределено по всем языкам, на данной странице показаны только те языки, которые назвали родными более 100 человек одного пола
              (как правило, мужского) в каждой губернии, (великорусский, малорусский и белорусский языки показаны везде).
              *** Последняя строка «Остальные» образована как раз из таких языков, на которых во всей губернии говорит менее 200 человек.
              В книгах публикации итогов этой строки нет, поскольку там были распределены все до 1 человека.`,
  },
  noEuropeanPart: {
    sourceURL: 'http://www.demoscope.ru/weekly/ssp/emp_lan_97_uezd.php?reg=',
    selectorRegions:
      'body > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > center > table:nth-child(2) > tbody > tr > td > form > div > select > option:not(:first-of-type)',
    selectorTable:
      'body > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > center > table:nth-child(4) > tbody > tr:nth-child(n+3)',
    censusDocumentId: 0,
    censusDocumentName: `The first general census of the population of the Russian Empire in 1897
                  Population distribution by mother tongue and counties
                  Russian Empire except for the provinces of European Russia`,

    header_ru: `Первая всеобщая перепись населения Российской Империи 1897 г.
                Распределение населения по родному языку и уездам
                Российской Империи кроме губерний Европейской России`,
    data_source_ru: `Первая Всеобщая перепись населения Российской Империи 1897 г. 
                    Таблица XIII. Распределение населения по родному языку. (Губернские итоги). Т.Т.51-89. С.-Петербург: 1903-1905`,
    remarks_ru: `* Здесь представлен языковый состав населения всех уездов Российской империи. Хотя в публикации итогов переписи население 
              распределено по всем языкам, на данной странице показаны только те языки, которые назвали родными более 100 человек одного пола
              (как правило, мужского) в каждой губернии, (великорусский, малорусский и белорусский языки показаны везде).
              *** Последняя строка «Остальные» образована как раз из таких языков, на которых во всей губернии говорит менее 200 человек.
              В книгах публикации итогов этой строки нет, поскольку там были распределены все до 1 человека.
              **** Уссурийская округа - города не было; местопребывание управление село Никольское (муж 8744, жен. 2124), ныне город Никольск-Уссурийский`,
  },
  byOblastsOfEmpire: {
    sourceURL: 'http://www.demoscope.ru/weekly/ssp/rus_lan_97.php?reg=',
    selectorRegions:
      'body > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > center > table:nth-child(2) > tbody > tr > td > form > div > select > option:not(:first-of-type)',
    selectorTable:
      'body > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > center > table:nth-child(4) > tbody > tr:nth-child(n+2)',
    censusDocumentId: 3,
    censusDocumentName: `The first general census of the population of the Russian Empire in 1897
                  Distribution of the population by native language, provinces and regions`,

    header_ru: `Первая всеобщая перепись населения Российской Империи 1897 г.
                Распределение населения по родному языку, губерниям и областям`,
    data_source_ru: `Первая Всеобщая перепись населения Российской Империи 1897 г. Под ред. Н.А.Тройницкого. т.II. 
                    Общий свод по Империи результатов разработки данных Первой Всеобщей переписи населения, произведенной 28 января 1897 года.
                    С.-Петербург, 1905. Таблица XIII. Распределение населения по родному языку.`,
    remarks_ru: ``,
  },
};

