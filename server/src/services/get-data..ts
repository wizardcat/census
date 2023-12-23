import axios from 'axios';
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio';
import * as iconv from 'iconv-lite';

export const getData = async (url: string): Promise<cheerio.CheerioAPI> => {
  let html_data = '';
  // const httpsAgent = new HttpsProxyAgent({
  //   host: '3.12.144.146',
  //   port: '3128',
  //   // auth: 'username:password',
  // });
  // axios = axios.create({ httpsAgent });

  axiosRetry(axios, { retries: 10, retryDelay: axiosRetry.exponentialDelay });
  await axios
    .get(url, {
      responseType: 'arraybuffer',
      responseEncoding: 'binary',
      // httpsAgent,

      //Site is blocked in Ukraine, use proxy
      //149.129.239.170 46.101.28.37
      // proxy: {
      //   protocol: 'http',
      //   host: '77.111.247.53',
      //   port: 8080,
      // },
      // proxy: {
      //   protocol: 'https',
      //   host: '3.12.144.146',
      //   port: 3128,
      // },
    })
    .then((response) => {
      html_data = iconv.decode(Buffer.from(response.data), 'windows-1251');
    })
    .catch((err) => console.error(err));

  const api = cheerio.load(html_data);

  return api;
};
