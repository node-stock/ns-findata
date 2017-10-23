/**
 * 响应信息
 *
 * @interface
 */
export interface ResMsg {
  /**
  * 状态码。 预期值:ok|error|no_data
  */
  s: string,
  /**
  * 只在s = 'error'时出现
  */
  errmsg?: string
}

/**
 * K线集数据
 *
 * @interface
 */
export interface Bars extends ResMsg {
  /**
  * K线时间. unix时间戳 (UTC)
  */
  t: number[],
  /**
  * 收盘价
  */
  c: number[],
  /**
  * 开盘价
  */
  o?: number[],
  /**
  * 最高价
  */
  h?: number[],
  /**
  * 最低价
  */
  l?: number[],
  /**
  * 成交量
  */
  v?: number[],
  /**
  * 下一个K线柱的时间
  */
  nextTime?: string
}

/**
 * K线数据
 *
 * @interface
 */
export interface Bar {
  /**
  * K线时间. unix时间戳 (UTC)
  */
  time?: number,
  /**
  * K线格式化时间. (YYYY-MM-DD)
  */
  date?: string,
  /**
  * 收盘价
  */
  close: number,
  /**
  * 开盘价
  */
  open: number,
  /**
  * 最高价
  */
  high: number,
  /**
  * 最低价
  */
  low: number,
  /**
  * 成交量
  */
  volume?: number
}

/**
 * K线高级数据
 *
 * @interface
 */
export interface ProBar extends Bar {
  /**
  * 成交额
  */
  turnover?: number,
  /**
  * 趋势
  */
  trend?: number,
  /**
  * k值
  */
  k?: number,
  /**
  * d值
  */
  d?: number
}


/**
 * 报价数据
 *
 * @interface
 */
export interface QuoteData extends ResMsg {
  /**
  * 商品名称。此值必须与请求中完全相同
  */
  n: string,
  /**
  * 商品报价对象
  */
  v: {
    /**
    * 价格变动（通常从当天的开盘价计算）
    */
    ch: number,
    /**
    * 价格变动百分比
    */
    chp: string,
    /**
    * 商品略称
    */
    short_name: string,
    /**
    * 交易所名称
    */
    exchange: string,
    /**
    * 商品的简短描述
    */
    description: string,
    /**
    * 最终成交价
    */
    lp: number,
    /**
    * 买盘价
    */
    ask: number,
    /**
    * 卖盘价
    */
    bid: number,
    /**
    * 费率
    */
    spread: number,
    /**
    * 当天开盘价
    */
    open_price: number,
    /**
    * 当天最高价
    */
    high_price: number,
    /**
    * 当天最低价
    */
    low_price: number,
    /**
    * 昨天收盘价
    */
    prev_close_price: number,
    /**
    * 当天成交量
    */
    volume: number,
  }
}

/**
 * 报单对象
 *
 * @interface
 */
export interface Quotes extends ResMsg {
  /**
  * 报价数组
  */
  d: QuoteData[]
}
