import { Symbology, Bar } from './types';
import { DataProvider } from './findata';
import { Util } from 'ns-common';
import * as cio from 'cheerio';

const baseUrl = 'http://k-db.com/stocks/';

/**
 * @class
 * @classdesc {@link http://k-db.com/stocks/|Kdb接口}
 */
export class Kdb implements DataProvider {

  /**
  * 获取历史数据
  */
  getBars(symbolInfo: Symbology, resolution?: string, from?: number, to?: number) {

  }

  /**
   * 获取商品信息
   */
  async getSymbolInfo(symbol: string) {
    let url = baseUrl + symbol;
    if (url.indexOf('-T') === -1) {
      url += '-T';
    }

    const resPromise = await Util.fetch(url);
    const res: string = await resPromise.text();
    const $ = cio.load(res);

    const symbolInfo: Symbology = <Symbology>{};
    symbolInfo.symbol = symbol;
    symbolInfo.description = $('h1').text();
    return symbolInfo;
  }

  /**
  * 订阅实时数据
  */
  subscribeBars(symbolInfo: Symbology, resolution: string) {

  }

  /**
  * 退订实时数据
  */
  unsubscribeBars(symbol: Symbology, resolution: string) {

  }

}
