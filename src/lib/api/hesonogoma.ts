import { SymbolInfo, Bar, HemaType, HemaPrice, HemaData } from '../types';
import { Util, Log, tryCatch } from 'ns-common';

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
  async getFindInfo(url: string) {
    if (url) {
      const res = await Util.fetch(url);
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
  async getFindPriceInfo(type: HemaPrice) {
    if (HemaType.PriceType[type]) {
      const url = (HemaType.PriceType[type].auth ? authBaseUrl : baseUrl) + HemaType.PriceType[type].url;
      return this.getFindInfo(url);
    }
  }

  /**
   *投資指標データを取得する
   */
  @tryCatch('投資指標データを取得する')
  async getFindDataInfo(type: HemaData) {
    if (HemaType.DataType[type]) {
      const url = (HemaType.DataType[type].auth ? authBaseUrl : baseUrl) + HemaType.DataType[type].url;
      return this.getFindInfo(url);
    }
  }
}
