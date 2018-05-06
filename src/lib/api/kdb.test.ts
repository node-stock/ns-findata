import { Kdb } from './kdb';
import { SymbolInfo, Bar } from 'ns-types';
import * as assert from 'power-assert';


const testGetSymbolInfo = async () => {
  const symbolInfo: SymbolInfo = <SymbolInfo>{};
  symbolInfo.symbol = '6553';
  const kdb = new Kdb();
  const res: SymbolInfo = await kdb.getSymbolInfo('6553')
  console.log(res);
  assert.ok(res.description);
}
const testGetHistory = async () => {
  const symbolInfo: SymbolInfo = <SymbolInfo>{};
  symbolInfo.symbol = '6553';
  const kdb = new Kdb();
  const res = await kdb.getHistory('6553')
  console.log(
    'getHistory:%s\n...\n%s',
    JSON.stringify(res[1], null, 2),
    JSON.stringify(res[res.length - 1], null, 2)
  );
  assert(res.length !== 0);
}


describe('Kdb数据接口', () => {
  it('测试获取商品信息', testGetSymbolInfo);
  it('测试获取历史数据', testGetHistory);

});
