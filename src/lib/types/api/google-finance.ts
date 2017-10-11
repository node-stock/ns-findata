/**
 * 请求参数
 */
export interface ReqParam {
  /**
   * 銘柄コード
   */
  q: string,
  /**
   * 市場
   */
  x: string,
  /**
   * 间隔(秒), 例：日线：86400、5分钟线：300
   */
  i: number,
  /**
   * 区间, 例：１年=1Y、2ヶ月=2M、3日=3d、40分=40m
   */
  p: string,
  /**
   * 取得项目, 例：d=日時,c=終値,o=始値,h=高値,l=安値,v=出来高
   */
  f?: string
}

/**
 * 输出结构
 */
export interface GApiOutPut {
  [key: string]: any,
  /**
   * timestamp
   */
  time: number,
  /**
   * 股票代码
   */
  symbol: string,
  /**
   * 收盘价
   */
  close?: number,
  /**
   * 最高价
   */
  high?: number,
  /**
   * 最低价
   */
  low?: number,
  /**
   * 开盘价
   */
  open?: number,
  /**
   * 成交量
   */
  volume?: number
}
