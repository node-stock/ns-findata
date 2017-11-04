import { ReqParam, GApiOutPut } from '../types';
import { Util } from 'ns-common';
import * as querystring from 'querystring';
import * as moment from 'moment';
const debug = require('debug')('findata:gapi');

const baseUrl = 'https://finance.google.com/finance/getprices?';

/**
 * @class
 * @classdesc {@link https://www.google.com/intl/zh-CN/googlefinance/disclaimer/ |谷歌接口说明}
 */
export class GoogleFinance {

  /**
  * 获取历史数据
  */
  static async getHistory(reqParam: ReqParam): Promise<GApiOutPut[]> {
    if (!reqParam.f) {
      reqParam.f = 'd,o,c,h,l,v';
    }
    const url = baseUrl + querystring.stringify(reqParam);
    debug('getHistory url: ', url);
    const res = await Util.fetch(url);
    const text = await res.text();
    // 数据转换为数组
    const array: string[] = text.split('\n');
    // 去掉头部信息
    const tickArray: string[] = array.slice(8, array.length - 1);
    if (tickArray.length === 0) {
      return [];
    }
    const colName = array[4].split('=')[1];
    const intervalRow = array[3];
    const columnArray = colName.split(',');
    const interval = Number(intervalRow.split('=')[1]);
    // console.log(columnArray);
    const firstColumn = tickArray[0].split(',');
    let baseTime = 0;

    const results: GApiOutPut[] = [];
    for (let i = 0; i < tickArray.length; i++) {
      const txt = tickArray[i];
      const component = txt.split(',');
      let tradeTime = Number(component[0]);

      if (isNaN(tradeTime)) {
        const timeString = component[0];
        tradeTime = Number(timeString.substring(1, timeString.length));
        baseTime = tradeTime;
      } else {
        tradeTime = baseTime + (tradeTime * interval);
      }
      tradeTime *= 1000;
      const utc = moment(tradeTime);
      const date = utc.format('YYYY-MM-DD HH:mm:ss');

      const tickComponent = txt.split(',');
      const tickData: GApiOutPut = { 'time': tradeTime, 'symbol': reqParam.q };
      for (let j = 1; j < columnArray.length; j++) {
        const columnName = columnArray[j];
        tickData[columnName.toLowerCase()] = Number(tickComponent[j]);
      }
      // console.log(tickData);
      results.push(tickData);
    }
    return results;
  }
}
