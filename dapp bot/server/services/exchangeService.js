const ccxt = require('ccxt');

class ExchangeService {
  constructor() {
    this.exchanges = {
      binance: new ccxt.binance(),
      huobi: new ccxt.huobi(),
      okex: new ccxt.okex(),
      kucoin: new ccxt.kucoin(),
      bitfinex: new ccxt.bitfinex(),
      // 添加更多交易所
    };
  }

  async fetchPrices(symbol) {
    const prices = {};
    for (const [name, exchange] of Object.entries(this.exchanges)) {
      try {
        const ticker = await exchange.fetchTicker(symbol);
        prices[name] = ticker.last;
      } catch (error) {
        console.error(`Error fetching price from ${name}:`, error);
      }
    }
    return prices;
  }

  async executeTrade(exchange, symbol, side, amount) {
    try {
      const order = await this.exchanges[exchange].createMarketOrder(symbol, side, amount);
      return order;
    } catch (error) {
      console.error(`Error executing trade on ${exchange}:`, error);
      throw error;
    }
  }
}

module.exports = new ExchangeService();
