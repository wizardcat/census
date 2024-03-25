import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';

export const getData = async (url: string): Promise<cheerio.CheerioAPI> => {
  axiosRetry(axios, { retries: 20, retryDelay: axiosRetry.exponentialDelay });
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    responseEncoding: 'binary',
  });
  const html_data = iconv.decode(Buffer.from(response.data), 'windows-1251');
  const api = cheerio.load(html_data);
  return api;
};
