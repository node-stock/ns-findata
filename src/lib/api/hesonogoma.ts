import { SymbolInfo, Bar } from '../types';
import { Util, Log, tryCatch } from 'ns-common';

const baseUrl = 'https://hesonogoma.com/stocks/';

/**
 * 株価一覧表
 */
export enum Price {
  /**
   * 日本株全銘柄
   */
  All = 'All',
  /**
   * 日経225 構成銘柄
   */
  Nikkei225 = 'Nikkei225',
  /**
   * 東証一部
   */
  FirstSection = 'FirstSection',
  /**
   * 東証二部
   */
  SecondSection = 'SecondSection',
  /**
   * 東証マザーズ
   */
  Mothers = 'Mothers',
  /**
   * JASDAQ
   */
  Jasdaq = 'Jasdaq',
  /**
   * 地方市場
   */
  Local = 'Local',
  /**
   * 東証 ETF・ETN
   */
  ETF = 'ETF',
  /**
   * 東証 REIT
   */
  REIT = 'REIT',
  /**
   * 東証 ファンド・他
   */
  Fund = 'Fund'
};
const PriceType: { [attr: string]: any } = {
  All: {
    desc: '日本株全銘柄 株価一覧表',
    url: 'data/japan-all-stock-prices.json'
  },
  Nikkei225: {
    desc: '日経225 構成銘柄',
    url: 'data/nikkei225-stock-prices.json'
  },
  FirstSection: {
    desc: '東証一部',
    url: 'data/tosho-1st-stock-prices.json'
  },
  SecondSection: {
    desc: '東証二部',
    url: 'data/tosho-2nd-stock-prices.json'
  },
  Mothers: {
    desc: '東証マザーズ',
    url: 'data/tosho-mothers-stock-prices.json'
  },
  Jasdaq: {
    desc: 'JASDAQ',
    url: 'data/tosho-jasdaq-stock-prices.json'
  },
  Local: {
    desc: '地方市場',
    url: 'data/japan-local-exchange-stock-prices.json'
  },
  ETF: {
    desc: '東証 ETF・ETN 株価一覧表',
    url: 'data/tosho-etf-stock-prices.json'
  },
  REIT: {
    desc: '東証 REIT 株価一覧表',
    url: 'data/tosho-reit-stock-prices.json'
  },
  Fund: {
    desc: '東証 ファンド・他 株価一覧表',
    url: 'data/tosho-fund-and-others-stock-prices.json'
  }
};

/**
 * 投資指標データ
 */
export enum Data {
  /**
   * 日本株全銘柄
   */
  All = 'All',
  /**
   * 日経225 構成銘柄
   */
  Nikkei225 = 'Nikkei225',
  /**
   * 東証一部
   */
  FirstSection = 'FirstSection',
  /**
   * 東証二部
   */
  SecondSection = 'SecondSection',
  /**
   * 東証マザーズ
   */
  Mothers = 'Mothers',
  /**
   * JASDAQ
   */
  Jasdaq = 'Jasdaq',
  /**
   * 地方市場
   */
  Local = 'Local',
  /**
   * 決算・財務・業績データ
   */
  Financial = 'Financial',
  /**
   * 日証金 融資貸株残高データ
   */
  JsfBalance = 'JsfBalance',
  /**
   * 日証金 逆日歩銘柄一覧データ
   */
  JsfPremiums = 'JsfPremiums',
  /**
   * 銘柄基本データ（浮動株比率等）
   */
  BaseInfo = 'BaseInfo'
};
const DataType: { [attr: string]: any } = {
  All: {
    desc: '日本株全銘柄 投資指標データ',
    url: 'data/japan-all-stock-data.json'
  },
  Nikkei225: {
    desc: '日経225 構成銘柄',
    url: 'data/nikkei225-stock-data.json'
  },
  FirstSection: {
    desc: '東証一部',
    url: 'data/tosho-1st-stock-data.json'
  },
  SecondSection: {
    desc: '東証二部',
    url: 'data/tosho-2nd-stock-data.json'
  },
  Mothers: {
    desc: '東証マザーズ',
    url: 'data/tosho-mothers-stock-data.json'
  },
  Jasdaq: {
    desc: 'JASDAQ',
    url: 'data/tosho-jasdaq-stock-data.json'
  },
  Local: {
    desc: '地方市場',
    url: 'data/japan-local-exchange-stock-data.json'
  },
  Financial: {
    desc: '決算・財務・業績データ',
    url: 'data/japan-all-stock-financial-results.json'
  },
  JsfBalance: {
    desc: '日証金 融資貸株残高データ',
    url: 'data/jsf-balance-data.json'
  },
  JsfPremiums: {
    desc: '日証金 逆日歩銘柄一覧データ',
    url: 'data/jsf-gyakuhibu-data.json'
  },
  BaseInfo: {
    desc: '銘柄基本データ（浮動株比率等）',
    url: 'data/tosho-fund-and-others-stock-prices.json'
  }
}

export const CsvType = {
  Margin: {
    desc: '信用取引残高データ',
    url: 'download/csv/japan-all-stock-margin-transactions/weekly/japan-all-stock-margin-transactions.csv'
  },
  BaseInfo: {
    desc: '銘柄基本データ（浮動株比率等）',
    url: 'download/csv/japan-all-stock-information/monthly/shareholding-ratio.csv'
  }
}

/**
 * @class
 * @classdesc {@link https://hesonogoma.com/stocks/|hesonogoma接口}
 */
export class Hesonogoma {

  /**
   * 株価一覧表
   */
  Price = Price;

  /**
   * 投資指標データ
   */
  Data = Data;

  /**
  * 获取历史数据
  */
  @tryCatch('获取历史数据')
  getBars(type: Data) {
    if (DataType[type]) {
      console.log('xx:', DataType[type].url);
    }
  }

  /**
   * 株価一覧表を取得する
   */
  @tryCatch('株価一覧表を取得する')
  async getFindPriceInfo(type: Price) {
    if (PriceType[type]) {
      const url = baseUrl + PriceType[type].url;
      const res = await Util.fetch(url);
      return await res.json();
    }
  }

  /**
   *投資指標データを取得する
   */
  @tryCatch('投資指標データを取得する')
  async getFindDataInfo(type: Data) {
    if (DataType[type]) {
      const url = baseUrl + DataType[type].url;
      const res = await Util.fetch(url);
      return await res.json();
    }
  }
}
