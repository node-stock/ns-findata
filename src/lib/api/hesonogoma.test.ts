process.env.debug = 'findata:hema';
import { Hesonogoma } from './hesonogoma';
import { Log } from 'ns-common';
import * as assert from 'power-assert';

const hg: Hesonogoma = new Hesonogoma();
const testGetFindDataInfo = async (done: any) => {
  const nikkei225 = await hg.getFindDataInfo(hg.Data.Nikkei225);
  Log.system.info(
    'nikkei225:%s\n...\n%s',
    JSON.stringify(nikkei225[0], null, 2),
    JSON.stringify(nikkei225[nikkei225.length - 1], null, 2)
  );
  assert.equal(225, nikkei225.length);
  done();
}
const testGetFindPriceInfo = async (done: any) => {
  const res = await hg.getFindPriceInfo(hg.Price.ETF);
  assert(res.length !== 0);
  done();
}

const testGetFindAuthInfo = async (done: any) => {
  const res = await hg.getFindDataInfo(hg.Data.BaseInfo);
  assert(res.length !== 0);
  done();
}

describe('Hesonogoma数据接口', () => {
  it('测试获取日经225股票', function(done) {
    this.timeout(10000);
    testGetFindDataInfo(done);
  });
  it('测试投資指標データ接口', function(done) {
    this.timeout(10000);
    testGetFindPriceInfo(done);
  });
  it('测试认证数据接口', function(done) {
    this.timeout(10000);
    testGetFindAuthInfo(done);
  });
});
