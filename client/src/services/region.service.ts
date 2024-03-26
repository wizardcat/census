import { config } from '@app/constants';
import { QueryGetRegionsParams } from '@app/types';
import axios from 'axios';

const url = config.url.BASE_URL;

export const getRegionsAll = async (params: QueryGetRegionsParams) => {
  const { lastId, skip, take, locale, region } = params;

  const searchRegion = region ? `&region=${region}` : '';

  const data = await axios.get(
    `${url}/api/regions/${locale}?lastId=${lastId}&skip=${skip}&take=${take}${searchRegion}`,
  );
  return data;
};

export const getRegionsCountByName = async (regName: string) => {
  try {
    const { data } = await axios.get(`${url}/api/regions?regName=${regName}`);

    return data;
  } catch (error) {
    return error;
  }
};
