import { Kdb } from './api/kdb';
import { SymbolInfo, Bar } from './types';
import * as assert from 'power-assert';
import { DataProvider } from './findata';
import { Log, Util } from 'ns-common';
import { Store as db } from 'ns-store';
import { filter } from 'lodash';


const testGetSymbolList = async (done: () => void) => {

  const findata = new DataProvider();
  const res = await findata.getSymbolList();
  if (res) {
    console.log(
      '%s\n...\n%s',
      JSON.stringify(res[0], null, 2),
      JSON.stringify(res[res.length - 1], null, 2)
    );
    console.log(res.length);
    assert(res.length !== 0)
  }
  done();
}
const testGetMarkets = async (done: () => void) => {
  const findata = new DataProvider();
  const markets = await findata.getMarkets();
  if (markets) {
    console.log(markets.length);
    assert(markets.length !== 0)
  }
  done();
}

describe('findata数据接口', () => {
  before(async () => {
    const config = require('../../config/config');
    await db.init(config);
    await db.buildTable();
    console.log('测试预处理');
    Log.init(Log.category.system, Log.level.ALL);
  });
  it('测试获取股票列表', function (done) {
    this.timeout(20000);
    testGetSymbolList(done);
  });
  it('测试获取市场数据', function (done) {
    this.timeout(20000);
    testGetMarkets(done);
  });
  after(async () => {
    await db.close();
    console.log('测试后处理');
  });
});
