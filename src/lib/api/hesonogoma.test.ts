import { Hesonogoma } from './hesonogoma';
import { Log } from 'ns-common';
import * as assert from 'power-assert';

const testGetNikkei225 = async (done: any) => {
  const res = await hg.getFindDataInfo(hg.Data.Financial);
  const nikkei225 = res['nikkei225-stock-prices'];
  Log[Log.category.system].info(
    'nikkei225:%s\n...\n%s',
    JSON.stringify(nikkei225[0], null, 2),
    JSON.stringify(nikkei225[nikkei225.length - 1], null, 2)
  );
  assert.equal(225, nikkei225.length);
  done();
}
const testGetFindPriceInfo = async (done: any) => {
  const res = await hg.getFindPriceInfo(hg.Price.ETF);
  console.log(res)
  /* const res = await hg.getBars(hg.Data.Financial);
  const nikkei225 = res['nikkei225-stock-prices'];
  Log[Log.category.system].info(
    'nikkei225:%s\n...\n%s',
    JSON.stringify(nikkei225[0], null, 2),
    JSON.stringify(nikkei225[nikkei225.length - 1], null, 2)
  );
  assert.equal(225, nikkei225.length);*/
  done();
}

const hg: Hesonogoma = new Hesonogoma();
describe('Hesonogoma数据接口', () => {
  before(() => {
    console.log('测试预处理');
    Log.init(Log.category.system, Log.level.ALL);
  });
  it('测试获取日经225股票', function(done) {
    this.timeout(10000);
    testGetNikkei225(done);
  });
  it('测试Hesonogoma接口', function(done) {
    this.timeout(10000);
    testGetFindPriceInfo(done);
  });
});
