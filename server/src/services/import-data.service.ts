import { DATA_SOURCE_CONFIG } from '@app/config';
import { getData } from './utils/get-data';
import { processCensusByRegion } from './utils/process-census-by-region';
import { processRegions } from './utils/process-regions';

export const importData = async (dataSourceConfigName: keyof typeof DATA_SOURCE_CONFIG) => {
  const { sourceURL } = DATA_SOURCE_CONFIG[dataSourceConfigName];
  let isFirstRegion = true;
  let page;

  try {
    page = await getData(`${sourceURL}?reg=0`);
    const regions = await processRegions(dataSourceConfigName, page);

    for (const region of regions) {
      page = await getData(`${sourceURL}?reg=${region.regionSourceId}`);

      const data = await processCensusByRegion({
        dataSourceConfigName,
        regionId: region.id,
        page,
        isFirstRegion,
      });
      isFirstRegion = false;

      // return { regions, ...data };
      // return { regions };
      // return { data: data?.censusPageData.censusByReg };
      // return {
      //   langGroups: data?.censusPageData.languageGroups,
      //   languages: data?.censusPageData.languages,
      // };
    }
  } catch (err) {
    return {
      status: 'Error',
      errorMessage: err,
    };
  }

  return { status: 'Done' };
};
