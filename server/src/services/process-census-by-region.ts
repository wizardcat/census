import { CheerioAPI } from 'cheerio';
import { DATA_SOURCE_CONFIG } from '../config';
import { parseCensusTable } from './parse-census-table';

type ProcessCensusByRegionProps = {
  dataSourceConfigName: keyof typeof DATA_SOURCE_CONFIG;
  regionId: number;
  page: CheerioAPI;
  isFirstRegion: boolean;
};

export const processCensusByRegion = async (
  processCensusByRegionProps: ProcessCensusByRegionProps,
) => {
  const { dataSourceConfigName, regionId, page, isFirstRegion } = processCensusByRegionProps;
  const { selectorTable } = DATA_SOURCE_CONFIG[dataSourceConfigName];

  const censusPageData = parseCensusTable({
    page,
    selectorTable,
    dataSourceConfigName,
    regionId,
    isFirstRegion,
  });

  try {
    if (isFirstRegion) {
      console.log('Language Groups adding');
      // const lgr = await addLanguageGroups(censusPageData.langGroups);
      console.log('Language Groups has been added');

      console.log('Language adding');
      // const lg = await addLanguages(censusPageData.languages);
      console.log('Languages has been added');
    }

    console.log(`Censuses  for region ${regionId} adding`);
    // const cen = await addCensuses(censusPageData.censusByReg);
    console.log(`Census for region ${regionId} has been added`);
    return { censusPageData };
  } catch (err) {
    console.log(err);
  }
};
