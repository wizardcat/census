import * as cheerio from 'cheerio';
import { CensusPageData, CensusRecord, Language, LanguageGroup } from '../types';

type ParseCensusTableParams = {
  page: cheerio.CheerioAPI;
  selectorTable: string;
  regionId: number;
  isFirstRegion: boolean;
};

export const parseCensusTable = (
  parseCensusTableParams: ParseCensusTableParams,
): CensusPageData => {
  const { page, selectorTable, regionId, isFirstRegion } = parseCensusTableParams;

  const $ = page;
  let languageGroupId = 0;
  let languageId = 0;
  const censusByReg: CensusRecord[] = [];
  const languages: Language[] = [];
  const langGroups: LanguageGroup[] = [];

  $(selectorTable).each((parentIndex, parentElem) => {
    const tableRow = $((parentElem as cheerio.Element).children);

    let arrIdxShift = 0;
    let langGroup: LanguageGroup;
    let lang: Language;
    let langGroupNameRu = '';
    let langNameRu = '';
    let censusRecord: CensusRecord;
    let isFirstCell = true;

    //The first table row has the language group name and contains 5 cells, all others - 4.
    //But if there is an empty (last?) cell - an additional 'text' element presents. Solve it.
    if (
      (tableRow.length === 5 && tableRow.last()[0].type !== 'text') ||
      (tableRow.length === 6 && tableRow.last()[0].type === 'text')
    ) {
      arrIdxShift = 1;

      //Create language groups array when pass the first region
      if (isFirstRegion && isFirstCell) {
        // processLanguageGroups(langGroups, $(tableRow[0]).text().trim());
        languageGroupId++;

        langGroupNameRu = $(tableRow[0]).text().trim();

        langGroup = {
          id: languageGroupId,
          name_uk: null,
          name_en: null,
          name_ru: langGroupNameRu,
        };

        langGroups.push(langGroup);

        isFirstCell = false;
      }
    } else {
      isFirstCell = true;
      arrIdxShift = 0;
    }

    langNameRu = $(tableRow[arrIdxShift + 0])
      .text()
      .trim();

    if (langNameRu !== 'Итого') {
      languageId++;

      //Create languages array during the first pass
      if (isFirstRegion) {
        langNameRu = langNameRu || langGroupNameRu;

        lang = {
          id: languageId,
          name_uk: null,
          name_en: null,
          name_ru: langNameRu,
          langGroupId: languageGroupId,
        };

        languages.push(lang);
      }

      const males =
        Number(
          $(tableRow[arrIdxShift + 1])
            .text()
            .match(/\d+/g)
            ?.join(''),
        ) || 0;
      const females =
        Number(
          $(tableRow[arrIdxShift + 2])
            .text()
            .match(/\d+/g)
            ?.join(''),
        ) || 0;

      censusRecord = {
        males: males,
        females: females,
        langId: languageId,
        regionId,
      };

      censusByReg.push(censusRecord);
    }
  });

  return { censusByReg, langGroups, languages };
};
