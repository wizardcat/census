import { config } from '@app/constants';
import { QueryGetCensusParams } from '@app/types';
import axios from 'axios';

const url = config.url.BASE_URL;

export const getCensus = async ({ locale, regionId }: QueryGetCensusParams) => {
  const data = await axios.get(`${url}/api/census/${locale}/${regionId}`);

  return data;
};
