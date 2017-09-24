import { Kdb } from './api/kdb';
import { SymbolInfo, Bar } from './types';
import * as assert from 'power-assert';
import { DataProvider } from './findata';
import { Log, Util } from 'ns-common';


const testGetSymbolInfo = async () => {
  const zz: SymbolInfo = <SymbolInfo>{};
  zz.symbol = '6553';
  const kdb = new Kdb();
  const symbolInfo: SymbolInfo = await kdb.getSymbolInfo('6553')
  console.log(symbolInfo.description);
  assert.ok(symbolInfo.description);
}
const testGetBars = async (done: any) => {
  const url = 'https://hesonogoma.com/stocks/data/japan-all-stock-data.json';
  const test = await Util.fetch(url);
  const res = await test.text();
  console.log(res);
  done();
}



// dataProvider.getMarkets();
describe('findata数据接口', () => {
  before(() => {
    console.log('测试预处理');
    // const config = require('../../config/config');
    // Store.init(config);
    const dataProvider = new DataProvider();
    // dataProvider.getMarkets();
    Log.init(Log.category.system, Log.level.ALL);
  });
  it('接口测试', function (done) {
    this.timeout(20000);
    testGetBars(done);
  });
  it('findAll查询数据', function (done) {
    // testFindAll(done);
  });
  after(function () {
    console.log('测试后处理');
    // Store.close();
  });
  // dataProvider.getMarketTest();
  // it('测试获取历史数据', testGetBars);
  // it('测试获取商品信息', testGetSymbolInfo);

});
