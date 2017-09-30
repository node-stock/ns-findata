import { Symbol, SymbolType, Bar, HemaType, HemaPrice, HemaData, MarketMap } from '../types';
import { Util, Log, tryCatch } from 'ns-common';
import { Store } from 'ns-store';
import { filter } from 'lodash';

const debug = require('debug')('findata:hema');
const baseUrl = 'https://hesonogoma.com/stocks/';
const authBaseUrl = 'https://trial:PW%4020170129@hesonogoma.com/stocks/';

/**
 * @class
 * @classdesc {@link https://hesonogoma.com/stocks/ |hesonogoma接口}
 */
export class Hesonogoma {

  /**
   * 株価一覧表
   */
  Price = HemaPrice;

  /**
   * 投資指標データ
   */
  Data = HemaData;

  /**
  * 获取接口数据
  */
  @tryCatch('获取接口数据')
  private async getFindInfo(url: string) {
    if (url) {
      const res = await Util.fetch(url);
      debug('getFindInfo url: ', url);
      const jsonRes: { [index: string]: any } = await res.json()
      if (Object.keys(jsonRes).length !== 0) {
        return jsonRes[Object.keys(jsonRes)[0]];
      }
      return null;
    }
  }

  /**
   * 株価一覧表を取得する
   */
  @tryCatch('株価一覧表を取得する')
  getFindPriceInfo(type: HemaPrice) {
    const url = (HemaType.PriceType[type].auth ? authBaseUrl : baseUrl) + HemaType.PriceType[type].url;
    return this.getFindInfo(url);
  }

  /**
   *投資指標データを取得する
   */
  @tryCatch('投資指標データを取得する')
  getFindDataInfo(type: HemaData) {
    const url = (HemaType.DataType[type].auth ? authBaseUrl : baseUrl) + HemaType.DataType[type].url;
    return this.getFindInfo(url);
  }

  /**
   *TSEの全株を取得する
   */
  @tryCatch('TSEの全株を取得する')
  async getTseStocks(): Promise<Symbol[]> {
    let symbols = await this.getFindDataInfo(HemaData.All);
    symbols = filter(symbols, (symbol: string) => {
      return symbol[2] === '東証一部'
          || symbol[2] ===  '東証二部'
          || symbol[2] ===  'JQS'
          || symbol[2] ===  '東証マザ';
    });
    const symbolInfoList = new Array();
    for (const sym of symbols) {
      const currMarket = MarketMap.find((o) => o.name === sym[2]);
      const currSector = Store.data.SectorList.find((o) => o.name === sym[3]);
      const symbolInfo: Symbol = {
        symbol: sym[0],
        exchange: 'TSE',
        type: SymbolType.stock,
        name: sym[1],
        market: currMarket ? currMarket.code : '',
        sector: currSector ? currSector.code : '',
      }
      symbolInfoList.push(symbolInfo);
    }

    return symbolInfoList;
  }

}
