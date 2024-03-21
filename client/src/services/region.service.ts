import { config } from '@app/constants';
import { QueryGetRegionsParams } from '@app/types';
import axios from 'axios';

const url = config.url.BASE_URL;

export const getRegionsAll = async (params: QueryGetRegionsParams) => {
  const paramsList = Object.keys(params)
    .map((key) => key + '=' + params[key as keyof QueryGetRegionsParams])
    .join('&');
  const data = await axios.get(`${url}/api/regions/?${paramsList}`);

  return data;
};

export const getRegionsCountByName = async (regName: string) => {
  try {
    const { data } = await axios.get(`${url}/api/regions/?regName=${regName}`);

    return data;
  } catch (error) {
    return error;
  }
};
