process.env.debug = 'findata:gapi';
import { GoogleFinance } from './google-finance';
import * as assert from 'power-assert';

const testGetHistory = async (done: any) => {
  const opt = {
    q: '6553',
    x: 'TYO',
    p: '6M',
    i: 86400
  };
  const stock = await GoogleFinance.getHistory(opt);
  console.log(
    'stock:%s\n...\n%s',
    JSON.stringify(stock[0], null, 2),
    JSON.stringify(stock[stock.length - 1], null, 2)
  );
  assert(stock.length !== 0);
  done();
}

describe('谷歌数据接口', () => {
  it('测试获取股票数据', function (done) {
    this.timeout(10000);
    testGetHistory(done);
  });
});
