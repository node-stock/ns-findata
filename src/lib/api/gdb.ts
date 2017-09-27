const googleFinance = require('google-finance2');
import * as util from 'util';

export class Gdb {
  async getHistorical(symbol: string, from: string, to: string) {
    const res = await googleFinance.historical({ symbol, from, to });
    console.log(util.format(
      '=== %s (%d) ===',
      symbol,
      res.length
    ));
    if (res[0]) {
      console.log(
        '%s\n...\n%s',
        JSON.stringify(res[0], null, 2),
        JSON.stringify(res[res.length - 1], null, 2)
      );
    } else {
      console.log('N/A');
    }
  }
}

const gdb = new Gdb();
// gdb.getHistorical('NASDAQ:AAPL', '2017-05-01', '2017-09-28');

const SYMBOLS = [
  'SHA:600519',
  'TYO:6664'
];
const FROM = '2017-05-01';
const TO = '2017-12-31';

googleFinance.prices({
  //symbols: SYMBOLS,
  symbol: SYMBOLS,
  interval: 300,
  period: '1d'
}).then(function(result: any) {
  const isMulti = false;
  const showData = function(quotes: any, symbol: string) {
    console.log(util.format(
      '=== %s (%d) ===',
      symbol,
      quotes.length
    ));
    if (quotes[0]) {
      console.log(
        '%s\n...\n%s',
        JSON.stringify(quotes[0], null, 2),
        JSON.stringify(quotes[quotes.length - 1], null, 2)
      );
    } else {
      console.log('N/A');
    }
  }
});
