import { SymbolInfo, Market, Exchange, Symbol } from './types';
import { Kdb } from './kdb';

/**
 * 财经数据实现类
 */
export abstract class DataProvider implements IDataProvider {
  /**
  * 获取市场数据
  */
  getMarkets() {

    const markets: Market[] = [{
      name: Exchange.TYO,
      submarkets: [{
        name: '全市場',
        symbols: this.getSymbolList()
      }]
    }];

    return markets;
  }

  /**
  * 获取股票列表
  */
  getSymbolList() {
    const obj: Symbol[] = [];
    return obj;
  }


  abstract getBars(symbolInfo: SymbolInfo, resolution?: string, from?: number, to?: number): any
  abstract getSymbolInfo(symbol: string): SymbolInfo | any
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
  getMarkets(): Market[];

  /**
  * 获取股票列表
  */
  getSymbolList(): Symbol[];

  /**
  * 获取历史数据
  */
  getBars(symbolInfo: SymbolInfo, resolution?: string, from?: number, to?: number): any,

  /**
   * 获取商品信息
   */
  getSymbolInfo(symbol: string): SymbolInfo | any
}
