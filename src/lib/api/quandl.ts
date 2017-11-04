const BaseQuandl = require('quandl');

export class Quandl {
  quandl: any;
  constructor(config: { [Attr: string]: any }) {
    this.quandl = new BaseQuandl(config);
  }

  dataset(param: { symbol: string, from: string, to: string }) {
    return new Promise((resolve, reject) => {
      return this.quandl.dataset({
        source: 'TSE',
        table: param.symbol
      }, {
          start_date: param.from,
          end_date: param.to
        }, (err: Error, response: string) => {
          return err ? reject(err) : resolve(JSON.parse(response));
        });
    });
  }

  metadata(symbol: string) {
    return new Promise((resolve, reject) => {
      return this.quandl.dataset({
        source: 'TSE',
        table: symbol
      }, (err: Error, response: string) => {
        return err ? reject(err) : resolve(JSON.parse(response));
      });
    });
  }
}
