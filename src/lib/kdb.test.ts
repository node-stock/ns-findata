import { Kdb } from './kdb';
import { Symbology, Bar } from './types';
import * as assert from 'power-assert';

const testGetSymbolInfo = async () => {
  const zz: Symbology = <Symbology>{};
  zz.symbol = '6553';
  const kdb = new Kdb();
  const symbolInfo: Symbology = await kdb.getSymbolInfo('6553')
  console.log(symbolInfo.description);
  assert.ok(symbolInfo.description);
}
const testGetBars = async () => {
  const zz: Symbology = <Symbology>{};
  zz.symbol = '6553';
  const kdb = new Kdb();
  await kdb.getSymbolInfo('6553')
  console.log();
}


describe('Kdb数据接口', () => {

  // it('测试获取历史数据', testGetBars);
  it('测试获取商品信息', testGetSymbolInfo);

});
