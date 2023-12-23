import { DATA_SOURCE_CONFIG } from '../config';
import { Region } from '../types';
import { getData } from './get-data.';
import { processCensusByRegion } from './process-census-by-region';
import { processRegions } from './process-regions';

export const grabCensusData = async (dataSourceConfigName: keyof typeof DATA_SOURCE_CONFIG) => {
  const { sourceURL } = DATA_SOURCE_CONFIG[dataSourceConfigName];
  let regionListId = 0;
  let regions: Region[] = [];
  let isFirstRegion = true;
  // do {
  const page = await getData(`${sourceURL}${regionListId}`);

  if (isFirstRegion) {
    regions = await processRegions(dataSourceConfigName, page);
  }

  const data = await processCensusByRegion({
    dataSourceConfigName,
    regionId: regions[regionListId].id,
    page,
    isFirstRegion,
  });
  isFirstRegion = false;

  return { regions, ...data };
  //   regionListId++;
  // } while (regionListId === regions.length - 1);
};

