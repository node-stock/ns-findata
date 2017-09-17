import { Symbol } from './symbol';

/**
 * 时区
 */
export enum TimeZone {
  /**
   * UTC时区
   */
  UTC = 'UTC',
  /**
   * 上海时区
   */
  Shanghai = 'Asia/Shanghai',
  /**
   * 东京时区
   */
  Tokyo = 'Asia/Tokyo'
}

/**
 * 交易所对象
 */
export enum Exchange {
  /**
   * 深圳证券交易所指数
   * 实时
   */
  SHE = '深圳证券交易所指数',
  /**
   * 上海证券交易所
   * 1分延迟
   */
  SHA = '上海证券交易所',
  /**
   * 东京证券交易所
   * 20分延迟
   */
  TYO = '东京证券交易所'
}

/**
 * 东京证券交易所市场
 */
export enum TyoMarket {
  /**
   * 東証一部
   */
  FirstSection = '東証一部',
  /**
   * 東証二部
   */
  SecondSection = '東証二部',
  /**
   * マザーズ
   */
  Mothers = 'マザーズ',
  /**
   * JASDAQ
   */
  Jasdaq = 'JASDAQ'
}

/**
 * 交易市场集
 *
 * @interface
 */
export interface Market {
  /**
   * 市场名称
   */
  name: string,
  /**
   * 子市场
   */
  submarkets: [{
    /**
     * 子市场名称
     */
    name: string,
    /**
     * 商品数组
     */
    symbols: Symbol[]
  }]
}
