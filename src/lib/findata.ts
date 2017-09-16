import { Symbology, Bar, ProBar } from './types';
import { Kdb } from './kdb';

/**
 * 财经数据接口
 *
 * @interface
 */
export interface DataProvider {
  /**
  * 获取历史数据
  */
  getBars(symbolInfo: Symbology, resolution?: string, from?: number, to?: number): Bar[] | ProBar[] | any,
  /**
   * 获取商品信息
   */
  getSymbolInfo(symbol: string): Symbology | any,
  /**
  * 订阅实时数据
  */
  subscribeBars(symbolInfo: Symbology, resolution: string): void,
  /**
  * 退订实时数据
  */
  unsubscribeBars(symbolInfo: Symbology, resolution: string): void
}
