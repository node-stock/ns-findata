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
  submarkets: {
    /**
     * 子市场名称
     */
    name: string,
    /**
     * 商品数组
     */
    symbols?: Symbol[]
  }[]
}
