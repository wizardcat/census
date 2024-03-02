import { getMaxRegionId } from '@app/controllers/regions.controller';
import { Region } from '@app/types';
import * as cheerio from 'cheerio';

type ParseRegionsParams = {
  page: cheerio.CheerioAPI;
  selectorRegions: string;
  documentId: number;
};

export const parseRegions = async (parseRegionsParams: ParseRegionsParams): Promise<Region[]> => {
  const { page, selectorRegions, documentId } = parseRegionsParams;
  const $ = page;
  const regionsList: Region[] = [];
  let parentId = 0;
  let regionId = await getMaxRegionId();

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
      nameUK: null,
      nameEN: null,
      nameRU: regionNameRu,
      documentId,
    };

    regionsList.push(region);
  });

  return regionsList;
};
