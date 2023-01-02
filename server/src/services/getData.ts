import axios from 'axios'
import axiosRetry from 'axios-retry';
import * as cheerio from 'cheerio'
import * as iconv from 'iconv-lite'

export const getData = async (url: string): Promise<cheerio.CheerioAPI> => {

    let html_data = ''

    axiosRetry(axios, { retries: 10, retryDelay: axiosRetry.exponentialDelay });
    const response = await axios.get(url, {
        responseType: 'arraybuffer',
        responseEncoding: 'binary',

        //Site is blocked in Ukraine, use proxy
        //149.129.239.170 46.101.28.37
        // proxy: {
        //     protocol: 'http',
        //     host: '149.129.239.170',
        //     port: 8080
        // }
    })
        .then(response => {
            html_data = iconv.decode(Buffer.from(response.data), 'windows-1251')
        })
        .catch(err => console.error(err))

    const api = cheerio.load(html_data)

    return api
}