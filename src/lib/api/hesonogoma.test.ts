process.env.debug = 'findata:hema';
import { Hesonogoma } from './hesonogoma';
import * as assert from 'power-assert';

const hg: Hesonogoma = new Hesonogoma();
const testGetFindDataInfo = async (done: any) => {
  const nikkei225 = await hg.getFindDataInfo(hg.Data.Nikkei225);
  console.log(
    'nikkei225:%s\n...\n%s',
    JSON.stringify(nikkei225[0], null, 2),
    JSON.stringify(nikkei225[nikkei225.length - 1], null, 2)
  );
  assert.equal(225, nikkei225.length);
}
const testGetFindPriceInfo = async (done: any) => {
  const res = await hg.getFindPriceInfo(hg.Price.ETF);
  assert(res.length !== 0);
}

const testGetFindAuthInfo = async (done: any) => {
  const res = await hg.getFindDataInfo(hg.Data.BaseInfo);
  assert(res.length !== 0);
}

describe('Hesonogoma数据接口', () => {
  it('测试获取日经225股票', testGetFindDataInfo);
  it('测试投資指標データ接口', testGetFindPriceInfo);
  it('测试认证数据接口', testGetFindAuthInfo);
});
