import { CheerioAPI } from 'cheerio';
import { DATA_SOURCE_CONFIG } from '../config';
import { Region } from '../types';
import { parseRegions } from './parse-regions';

export const processRegions = async (
  dataSourceConfigName: keyof typeof DATA_SOURCE_CONFIG,
  page: CheerioAPI,
): Promise<Region[]> => {
  const { europePart, selectorRegions } = DATA_SOURCE_CONFIG[dataSourceConfigName];

  // let selectorRegions: string;
  // let europePart: number;

  // if (url === EUROPE_REG_CONFIG.sourceURL) {
  //   selectorRegions = EUROPE_REG_CONFIG.selectorRegions;
  //   europePart = 1;
  // } else {
  //   selectorRegions = NOT_EUROPE_REG_CONFIG.selectorRegions;
  //   europePart = 0;
  // }

  const regionsData = await parseRegions({
    page,
    selectorRegions,
    europePart,
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
