import { Kdb } from './api/kdb';
import { SymbolInfo, Bar } from './types';
import * as assert from 'power-assert';
import { DataProvider } from './findata';
import { Log, Util } from 'ns-common';
import { Store as db } from 'ns-store';


const testGetSymbolList = async (done: () => void) => {

  const findata = new DataProvider();
  const res = await findata.getSymbolList();
  if (res) {
    console.log(
      '%s\n...\n%s',
      JSON.stringify(res[0], null, 2),
      JSON.stringify(res[res.length - 1], null, 2)
    );
    assert(res.length !== 0)
    done();
  }
}
const testGetBars = async (done: () => void) => {
  const url = 'https://hesonogoma.com/stocks/data/japan-all-stock-data.json';
  const test = await Util.fetch(url);
  const res = await test.text();
  console.log(res);
  done();
}



// dataProvider.getMarkets();
describe('findata数据接口', () => {
  before(async () => {
    // const config = require('../../config/config');
    // await db.init(config);
    // await db.buildTable();
    console.log('测试预处理');
    // const dataProvider = new DataProvider();
    // dataProvider.getMarkets();
    Log.init(Log.category.system, Log.level.ALL);
  });
  it('测试获取股票列表', function(done) {
    this.timeout(10000);
    testGetSymbolList(done);
  });
  /*
  it('接口测试', function (done) {
    this.timeout(20000);
  //  testGetBars(done);
  });
  it('findAll查询数据', function (done) {
    // testFindAll(done);
  });
  after(function () {
    console.log('测试后处理');
    // Store.close();
  });*/
  // dataProvider.getMarketTest();
  // it('测试获取商品信息', testGetSymbolInfo);

});
