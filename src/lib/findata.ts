import { SymbolInfo, Market, Symbol } from './types';
import { Kdb } from './api/kdb';
import { Store as db } from 'ns-store';
import { tryCatch, Util as util } from 'ns-common';
import { filter } from 'lodash';

/**
 * 财经数据实现类
 */
export class DataProvider implements IDataProvider {
  /**
  * 获取市场数据
  */
  @tryCatch('获取市场数据')
  getMarkets() {
    const markets: Market[] = [];
    // 交易所
    for (const exchange of db.data.ExchangeList) {
      // 交易市场
      const market = <Market>{
        name: exchange.name,
        submarkets: []
      };
      const marketList = filter(db.data.MarketList, { 'exchange': exchange.code });
      for (const ml of marketList) {
        market.submarkets.push({name: ml.name});
        // 交易股票
      }
      markets.push(market);
    }
    // console.log(JSON.stringify(markets));

    return markets;
  }

  @tryCatch('获取市场数据')
  getMarketTest() {
    console.log(db.data.ExchangeList);
    const markets: Market[] = [{
      name: '', // Store.data.ExchangeList.TYO,
      submarkets: [{
        name: '全市場',
        symbols: this.getSymbolList()
      }]
    }];
  }

  /**
  * 获取股票列表
  */
  @tryCatch('获取股票列表')
  getSymbolList() {
    const obj: Symbol[] = [];
    return obj;
  }
}

/**
 * 财经数据接口
 *
 * @interface
 */
export interface IDataProvider {
  /**
  * 获取市场数据
  */
  getMarkets(): Market[] | Promise<Market[]>;

  /**
  * 获取股票列表
  */
  getSymbolList(): Symbol[];

  /**
  * 获取历史数据
  */
  // getBars(symbolInfo: SymbolInfo, resolution?: string, from?: number, to?: number): any,

  /**
   * 获取商品信息
   */
  // getSymbolInfo(symbol: string): SymbolInfo | any
}
