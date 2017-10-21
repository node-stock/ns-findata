import { Kdb } from './api/kdb';
import { SymbolInfo, Bar } from './types';
import * as assert from 'power-assert';
import { DataProvider } from './findata';
import { Store as db } from 'ns-store';
import { filter } from 'lodash';

const testBefore = async (done: () => void) => {
  console.log('测试预处理');
  const config = require('../../config/config');
  await db.init(config);
  await db.buildTable();
  done();
};

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

const testGetLast5minBars = async (done: () => void) => {
  const findata = new DataProvider();
  const bars = await findata.getLast5minBar('6664');
  if (bars) {
    console.log(bars, ',len: ' + bars.length);
  }
  done();
}

const testGet5minBars = async (done: () => void) => {
  const findata = new DataProvider();
  const bars = await findata.get5minBar({ symbol: '6664', date: '2017-10-13' });
  if (bars) {
    console.log(
      '%s\n...\n%s',
      JSON.stringify(bars[0], null, 2),
      JSON.stringify(bars[bars.length - 1], null, 2)
    );
    console.log('len: ' + bars.length);
  }
  done();
}


const testGetStochastic = () => {
  // TODO
}

describe('findata数据接口', () => {
  before(function (done) {
    this.timeout(20000)
    testBefore(done);
  })
  it('测试获取股票列表', function (done) {
    this.timeout(20000);
    testGetSymbolList(done);
  });
  it('测试获取市场数据', function (done) {
    this.timeout(20000);
    testGetMarkets(done);
  }); /*
  it('测试获取最近半小时的5分钟K线数据', function (done) {
    this.timeout(20000);
    testGetLast5minBars(done); // done()
  });
  it('测试获取5分钟K线数据', function (done) {
    this.timeout(20000);
    testGet5minBars(done); // done()
  });*/
  after(async () => {
    await db.close();
    console.log('测试后处理');
  });
});
