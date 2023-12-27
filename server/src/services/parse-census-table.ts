import * as cheerio from 'cheerio';
import { DATA_SOURCE_CONFIG } from '../config';
import { CensusPageData, CensusRecord, Language, LanguageGroup } from '../types';

type ParseCensusTableParams = {
  page: cheerio.CheerioAPI;
  selectorTable: string;
  dataSourceConfigName: keyof typeof DATA_SOURCE_CONFIG;
  regionId: number;
  isFirstRegion: boolean;
};

export const parseCensusTable = (
  parseCensusTableParams: ParseCensusTableParams,
): CensusPageData => {
  const { page, selectorTable, dataSourceConfigName, regionId, isFirstRegion } =
    parseCensusTableParams;

  const $ = page;
  const censusByReg: CensusRecord[] = [];
  const languages: Language[] = [];
  const langGroups: LanguageGroup[] = [];
  let languageGroupId = 0;
  let languageId = 0;
  let lastLangGroupName = '';

  $(selectorTable).each((parentIndex, parentElem) => {
    const tableRow = $((parentElem as cheerio.Element).children);

    const firstCellValue = $(tableRow[0]).text().trim();

    if (firstCellValue.toLowerCase() === 'итого') return;

    const hasLanguageGroup =
      (dataSourceConfigName !== 'byOblastsOfEmpire' &&
        ((tableRow.length === 5 && tableRow.last()[0].type !== 'text') ||
          (tableRow.length === 6 && tableRow.last()[0].type === 'text'))) ||
      (dataSourceConfigName === 'byOblastsOfEmpire' &&
        tableRow.length === 6 &&
        tableRow.last()[0].type === 'tag');

    //Create language groups array when pass the first region
    // lastLangGroupName !== firstCellValue - fix for group name dublication
    if (isFirstRegion && hasLanguageGroup && lastLangGroupName !== firstCellValue) {
      languageGroupId++;
      const langGroup: LanguageGroup = {
        id: languageGroupId,
        name_uk: null,
        name_en: null,
        name_ru: firstCellValue,
      };

      lastLangGroupName = firstCellValue;
      langGroups.push(langGroup);
    }

    const langCellValue = $(tableRow[tableRow.length - 4])
      .text()
      .trim();

    const langNameRu =
      langCellValue ||
      $(tableRow[tableRow.length - 5])
        .text()
        .trim();

    if (langNameRu.toLowerCase() === 'итого') return;

    languageId++;

    //Create languages array during the first pass
    if (isFirstRegion) {
      const lang = {
        id: languageId,
        name_uk: null,
        name_en: null,
        name_ru: langNameRu || firstCellValue,
        langGroupId: languageGroupId,
      };

      languages.push(lang);
    }

    const males =
      Number(
        $(tableRow[tableRow.length - 3])
          .text()
          .match(/\d+/g)
          ?.join(''),
      ) || 0;
    const females =
      Number(
        $(tableRow[tableRow.length - 2])
          .text()
          .match(/\d+/g)
          ?.join(''),
      ) || 0;

    const censusRecord: CensusRecord = {
      males: males,
      females: females,
      langId: languageId,
      regionId,
    };

    censusByReg.push(censusRecord);
  });

  return { censusByReg, langGroups, languages };
};
