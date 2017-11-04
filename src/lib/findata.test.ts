import { Kdb } from './api/kdb';
import { SymbolInfo, Bar } from 'ns-types';
import * as assert from 'power-assert';
import { DataProvider } from './findata';
import { Store as db } from 'ns-store';
import { filter } from 'lodash';

const findata = new DataProvider();
const testBefore = async (done: () => void) => {
  process.env.debug = 'findata:*';
  console.log('测试预处理');
  const config = require('config');
  await findata.init(config);
  // await db.buildTable();
  done();
};

const testGetSymbolList = async (done: () => void) => {

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
  const markets = await findata.getMarkets();
  if (markets) {
    console.log(markets.length);
    assert(markets.length !== 0)
  }
  done();
}

const testGetLast5minBars = async (done: () => void) => {
  const bars = await findata.getLast5minBar('6664');
  if (bars) {
    console.log(bars, ',len: ' + bars.length);
  }
  done();
}

const testGet5minBars = async (done: () => void) => {
  const bars = await findata.get5minBar({ symbol: '6664', date: '2017-11-02' });
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
  const bars: Bar[] = [
    { open: 2010, low: 1980, high: 2080, close: 2050 },
    { open: 2020, low: 1990, high: 2090, close: 2060 },
    { open: 2015, low: 1985, high: 2085, close: 2056 },
    { open: 2010, low: 1980, high: 2080, close: 2050 },
    { open: 2015, low: 1985, high: 2085, close: 2056 },
    { open: 2010, low: 1980, high: 2080, close: 2050 },
    { open: 2015, low: 1985, high: 2085, close: 2056 },
    { open: 2010, low: 1980, high: 2080, close: 2050 },
    { open: 2015, low: 1985, high: 2085, close: 2056 },
    { open: 2010, low: 1980, high: 2080, close: 2050 },
    { open: 2015, low: 1985, high: 2085, close: 2056 },
    { open: 2010, low: 1980, high: 2080, close: 2050 }
  ];

  const kdList = findata.getStochastic(bars);
  assert(kdList.length !== 0);
  console.log('kdList:', kdList);
}

describe('findata数据接口', () => {
  before(function (done) {
    this.timeout(30000)
    testBefore(done);
  })
  it('测试获取股票列表', function (done) {
    this.timeout(20000);
    testGetSymbolList(done);
  });
  it('测试获取市场数据', function (done) {
    this.timeout(20000);
    testGetMarkets(done);
  });

  it('测试获取最近半小时的5分钟K线数据', function (done) {
    this.timeout(20000);
    testGetLast5minBars(done);
  });
  it('测试获取5分钟K线数据', function (done) {
    this.timeout(20000);
    testGet5minBars(done);
  });
  it('测试获取KD值', testGetStochastic);
  after(async () => {
    await findata.close();
    console.log('测试后处理');
  });
});
