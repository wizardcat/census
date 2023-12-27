import * as cheerio from 'cheerio';
import { getMaxRegionId } from '../controllers/regions.controller';
import { Region } from '../types';

type ParseRegionsParams = {
  page: cheerio.CheerioAPI;
  selectorRegions: string;
  censusDocumentId: number;
};

export const parseRegions = async (parseRegionsParams: ParseRegionsParams): Promise<Region[]> => {
  const { page, selectorRegions, censusDocumentId } = parseRegionsParams;
  const $ = page;
  const regionsList: Region[] = [];
  let parentId = 0;
  let regionId = await getMaxRegionId();
  console.log('selectorRegions: ' + selectorRegions);
  console.log('length: ' + $(selectorRegions).length);

  $(selectorRegions).each((parentIndex, parentElem) => {
    const regionName = $(parentElem).text();

    regionId++;

    const isParent = !regionName.includes('----------');

    if (isParent) parentId = regionId;

    //.replace('г.', '- г.')
    const regionNameRu = regionName
      .replaceAll('--', '')
      .replace('вся', '(вся)')
      .replace('весь', '(весь)')
      .trim()
      .replace('без города', '(без города)');

    const region = {
      id: regionId,
      parentId: isParent ? 0 : parentId,
      name_uk: null,
      name_en: null,
      name_ru: regionNameRu,
      censusDocumentId,
    };

    regionsList.push(region);
  });

  return regionsList;
};
