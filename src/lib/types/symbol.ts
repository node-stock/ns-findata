import { TimeZone } from './market';

/**
 * 商品类型
 */
export enum SymbolType {
  /**
   * 股票
   */
  stock = 'stock',
  /**
   * 指数
   */
  index = 'index',
  /**
   * 外汇
   */
  forex = 'forex',
  /**
   * 期货
   */
  futures = 'futures',
  /**
   * 比特币
   */
  bitcoin = 'bitcoin',
  /**
   * 价差期权
   */
  spread = 'spread',
  /**
   * 差价合约
   */
  cfd = 'cfd'
}

/**
 * 商品对象
 */
export interface Symbol {
  /**
   * 商品代码
   */
  symbol: string,
  /**
  * 商品名称
  */
  name: string,
  /**
   * 商品全称
   */
  full_name?: string,
  /**
  * 交易所略称
  */
  exchange: string,
  /**
  * 交易市场名
  */
  market: string,
  /**
  * 商品的唯一标识符(ticker如果未明确指定，则被视为等于symbol)
  */
  ticker?: string,
  /**
  * 商品说明
  */
  description?: string,
  /**
  * 商品类型
  */
  type: SymbolType,
  /**
  * 板块
  */
  sector: string,
  /**
  * 行业
  */
  industry?: string
}

/**
 * 商品体系
 *
 * @interface
 */
export interface SymbolInfo extends Symbol {
  /**
  * 交易时间
  */
  session: string,
  /**
  * 交易所略称
  */
  listed_exchange: string,
  /**
  * 时区
  */
  timezone: TimeZone,
  /**
  * 最小波动
  */
  minmov: number,
  /**
  * 最小波动2
  */
  minmov2: number,
  /**
  * 价格精度，pricescale的倒數乘上minmov=价格跳动单位，(1/100:pricescale)×25:minmov=0.25
  */
  pricescale: number,
  /**
  * 是否具有日内（分钟）历史数据
  */
  has_intraday: boolean,
  /**
  * 分辨率 ["D", "2D", "3D", "W", "3W", "M", "6M"]
  */
  supported_resolutions: string[],
  /**
  * 日内分辨率  ["1", "5", "15"]
  */
  intraday_multipliers: string[],
  /**
  * 是否具有以秒为单位的历史数据
  */
  has_seconds: boolean,
  /**
  * 秒分辨率 ["1", "5", "15"]
  */
  seconds_multipliers: string[],
  /**
  * 是否具有以日为单位的历史数据
  */
  has_daily: boolean,
  /**
  * 是否具有以周和月为单位的历史数据
  */
  has_weekly_and_monthly: boolean,
  /**
  * 是否会生成空的K柱
  */
  has_empty_bars: boolean,
  /**
  * 是否会随着当前交易而过滤K柱
  */
  force_session_rebuild: boolean,
  /**
  * 是否拥有成交量数据
  */
  has_no_volume: boolean,
  /**
  * 整数显示此商品的成交量数字的小数位。0:整数 1:保留1位小数
  */
  volume_precision: number,
  /**
  * 数据状态码
  * 支持的值：
  * streaming(流动中)、
  * endofday(已收盘)、
  * pulsed(脉冲)、
  * delayed_streaming(延迟流动中)
  */
  data_status: string,
  /**
   * 是否为到期的期货合约
   */
  expired: boolean,
  /**
  * 货币代码
  */
  currency_code: string
}
