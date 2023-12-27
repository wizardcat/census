import { CheerioAPI } from 'cheerio';
import { DATA_SOURCE_CONFIG } from '../config';
import { Region } from '../types';
import { parseRegions } from './parse-regions';

export const processRegions = async (
  dataSourceConfigName: keyof typeof DATA_SOURCE_CONFIG,
  page: CheerioAPI,
): Promise<Region[]> => {
  const { censusDocumentId, selectorRegions } = DATA_SOURCE_CONFIG[dataSourceConfigName];

  const regionsData = await parseRegions({
    page,
    selectorRegions,
    censusDocumentId,
  });

  try {
    console.log('Regions adding');
    // console.log(regionsData);
    // await addRegions(regionsData);
    console.log(`${regionsData.length} regions has been added`);
  } catch (err) {
    console.log(err);
  }

  return regionsData;
};
