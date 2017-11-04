import { Quandl } from './quandl';
import * as assert from 'power-assert';

const quandl = new Quandl(require('config').quandl);

const testDataset = async (done: () => void) => {
  const res: { [Attr: string]: any } = await quandl.dataset({
    symbol: '6553',
    from: '2017-09-01',
    to: '2017-11-02'
  });
  console.log(
    'dataset:%s\n%s\n...\n%s',
    JSON.stringify(res.dataset.column_names),
    JSON.stringify(res.dataset.data[1], null, 2),
    JSON.stringify(res.dataset.data[res.dataset.data.length - 1], null, 2)
  );
  assert(res.dataset.data.length !== 0);
  done();
}

const testMetadata = async (done: () => void) => {
  const res: { [Attr: string]: any } = await quandl.metadata('6553');
  console.log(
    'dataset:%s\n%s\n...\n%s',
    JSON.stringify(res.dataset.column_names),
    JSON.stringify(res.dataset.data[1], null, 2),
    JSON.stringify(res.dataset.data[res.dataset.data.length - 1], null, 2)
  );
  assert(res.dataset.data.length !== 0);
  done();
}

describe('quandl测试', () => {
  it('dataset', function (done) {
    this.timeout(10000);
    testDataset(done);
  });
  it('metedata', function (done) {
    this.timeout(10000);
    testMetadata(done);
  });
});

// 全市场列表
// https://www.quandl.com/api/v3/databases/TSE/codes
