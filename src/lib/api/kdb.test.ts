import { Kdb } from './kdb';
import { SymbolInfo, Bar } from '../types';
import * as assert from 'power-assert';
import { DataProvider } from '../findata';
import { Log } from 'ns-common';


const testGetSymbolInfo = async (done: () => void) => {
  const symbolInfo: SymbolInfo = <SymbolInfo>{};
  symbolInfo.symbol = '6553';
  const kdb = new Kdb();
  const res: SymbolInfo = await kdb.getSymbolInfo('6553')
  console.log(res);
  assert.ok(res.description);
  done();
}
const testGetHistory = async (done: () => void) => {
  const symbolInfo: SymbolInfo = <SymbolInfo>{};
  symbolInfo.symbol = '6553';
  const kdb = new Kdb();
  const res = await kdb.getHistory('6553')
  Log[Log.category.system].info(
    'getHistory:%s\n...\n%s',
    JSON.stringify(res[1], null, 2),
    JSON.stringify(res[res.length - 1], null, 2)
  );
  assert(res.length !== 0);
  done();
}


describe('Kdb数据接口', () => {
  const dataProvider = new DataProvider();
  // dataProvider.getMarkets();
  Log.init(Log.category.system, Log.level.ALL);
 // dataProvider.getMarketTest();
//  it('测试获取历史数据', testGetBars);
  it('测试获取商品信息', function(done) {
    this.timeout(10000);
    testGetSymbolInfo(done);
  });
  it('测试获取历史数据', function(done) {
    this.timeout(10000);
    testGetHistory(done);
  });

});
