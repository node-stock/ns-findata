process.env.debug = 'findata:*';
import { Market, Symbol } from './types';
import { Kdb, Hesonogoma } from './api';
import { Store as db } from 'ns-store';
import { tryCatch, Util as util, Log } from 'ns-common';
import { filter } from 'lodash';
import { Model } from 'sequelize-typescript';


const config = require('../../config/config');
Log.init(Log.category.system, Log.level.ALL);

/**
 * 财经数据接口
 *
 * @interface
 */
export interface IDataProvider {
  /**
  * 获取市场数据
  */
  getMarkets(): Market[] | Promise<Market[]>;

  /**
  * 获取股票列表
  */
  getSymbolList(): Symbol[];

  /**
  * 获取历史数据
  */
  // getBars(symbolInfo: SymbolInfo, resolution?: string, from?: number, to?: number): any,

  /**
   * 获取商品信息
   */
  // getSymbolInfo(symbol: string): SymbolInfo | any
}

/**
 * 财经数据实现类
 */
export class DataProvider implements IDataProvider {
  /**
  * 获取市场数据
  */
  @tryCatch('获取市场数据')
  getMarkets() {
    const markets: Market[] = [];
    // 交易所
    for (const exchange of db.data.ExchangeList) {
      // 交易市场
      const market = <Market>{
        name: exchange.name,
        submarkets: []
      };
      const marketList = filter(db.data.MarketList, { 'exchange': exchange.code });
      for (const ml of marketList) {
        market.submarkets.push({ name: ml.name });
        // 交易股票
      }
      markets.push(market);
    }
    // console.log(JSON.stringify(markets));

    return markets;
  }

  @tryCatch('获取市场数据')
  getMarketTest() {
    console.log(db.data.ExchangeList);
    const markets: Market[] = [{
      name: '', // Store.data.ExchangeList.TYO,
      submarkets: [{
        name: '全市場',
        symbols: this.getSymbolList()
      }]
    }];
  }

  /**
  * 获取股票列表
  */
  @tryCatch('获取股票列表')
  async getSymbolList(): Promise<Symbol[] | Model<Symbol>[] | undefined> {
    try {
      process.env.debug = 'findata:*';
      // const obj: Symbol[] = [];
      const hesonogoma = new Hesonogoma();
      config.logging = (args: any) => Log.system.info(args);
      db.init(config);
      await db.buildTable();
      const count = await db.model.SymbolInfo.count();
      // 数据库为找到股票信息
      if (count === 0) {
        // 通过api取数据
        const symbols = await hesonogoma.getTseStocks();
        if (symbols && symbols.length !== 0) {
          await db.model.SymbolInfo.bulkCreate(symbols);
        }
      }
      const symbolList = await db.model.SymbolInfo.findAll({
        raw: true,
        attributes: ['symbol', 'exchange', 'market', 'name', 'type', 'sector'],
        include: [
          {
            model: db.model.Exchange,
            attributes: ['name']
          },
          {
            model: db.model.Market,
            attributes: ['name'],
            where: {exchange: 'TSE'}
          }
        ]
      });
      db.close();
      return symbolList;
    } catch (e) {
      db.close();
      throw e;
    }
  }
}
