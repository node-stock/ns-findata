process.env.debug = 'findata:*';
import { Market, Symbol } from './types';
import { Kdb, Hesonogoma } from './api';
import { Store as db } from 'ns-store';
import { tryCatch, Util as util, Log } from 'ns-common';
import { filter } from 'lodash';
import { Model, Sequelize } from 'sequelize-typescript';

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
export class DataProvider {
  /**
  * 获取市场数据
  */
  @tryCatch('获取市场数据')
  async getMarkets() {
    // 交易股票列表取得
    const symbolList: Symbol[] = await this.getSymbolList();

    // filter(symbolList, { 'exchange': exchange.code });
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
        market.submarkets.push({
          name: ml.name,
          // 交易股票
          symbols: filter(symbolList, { 'exchange': exchange.name, 'market': ml.name })
        });
      }
      markets.push(market);
    }

    return markets;
  }

  /**
  * 获取股票列表
  */
  @tryCatch('获取股票列表')
  async getSymbolList(): Promise<Symbol[]> {
    const hesonogoma = new Hesonogoma();
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
      // raw: true,
      attributes: ['symbol', 'exchange', 'market', 'name', 'type', 'sector'],
      include: [
        {
          model: db.model.Exchange,
          attributes: ['name']
        },
        {
          model: db.model.Market,
          attributes: ['name'],
          where: { exchange: 'TSE' }
        },
        {
          model: db.model.Sector,
          attributes: ['name'],
          where: { exchange: 'TSE' }
        }
      ],
      order: Sequelize.col('symbol')
    });
    const plainSymbolList: Symbol[] = symbolList.map((node: Model<{}>) => {
      const plainNode = node.get({ plain: true });
      return {
        symbol: plainNode.symbol,
        exchange: plainNode.ex.name,
        market: plainNode.ma.name,
        name: plainNode.name,
        type: plainNode.type,
        sector: plainNode.se.name
      };
    });
    return plainSymbolList;
  }
}

export { Kdb, Hesonogoma };
