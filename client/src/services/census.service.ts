import { config } from '@app/constants';
import { QueryGetCensusParams } from '@app/types';
import axios from 'axios';

const url = config.url.BASE_URL;

export const getCensus = async (params: QueryGetCensusParams) => {
  const paramsList = Object.keys(params)
    .map((key) => key + '=' + params[key as keyof QueryGetCensusParams])
    .join('&');
  const data = await axios.get(`${url}/api/census/?${paramsList}`);

  return data;
};
