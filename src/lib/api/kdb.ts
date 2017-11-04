import { SymbolInfo, Bar } from 'ns-types';
import { Util } from 'ns-common';
import * as cio from 'cheerio';

const baseUrl = 'http://k-db.com/stocks/';
export enum Timeframe {
  M5 = '5m',
  M15 = '15m',
  M30 = '30m',
  H1 = '1h',
  H4 = '4h'
}
/**
 * @class
 * @classdesc {@link http://k-db.com/stocks/ |Kdb接口}
 */
export class Kdb {

  /**
  * 获取历史数据
  */
  getHistory(symbol: string, timeframe?: Timeframe) {
    let url = baseUrl + symbol;
    if (url.indexOf('-T') === -1) {
      url += '-T';
    }
    if (timeframe) {
      url += '/' + timeframe
    }
    url += '?download=csv';
    return Util.getCsvData(url);
  }

  /**
   * 获取商品信息(描述信息)
   */
  async getSymbolInfo(symbol: string) {
    let url = baseUrl + symbol;
    if (url.indexOf('-T') === -1) {
      url += '-T';
    }

    const resPromise = await Util.fetch(url);
    const res: string = await resPromise.text();
    const $ = cio.load(res);

    const symbolInfo: SymbolInfo = <SymbolInfo>{};
    symbolInfo.symbol = symbol;
    symbolInfo.description = $('h1').text();
    return symbolInfo;
  }
}
