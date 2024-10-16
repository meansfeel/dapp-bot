const ExchangeService = require('./exchangeService');

class ArbitrageService {
  constructor() {
    this.exchangeService = ExchangeService;
  }

  async findArbitrageOpportunities(symbol) {
    const prices = await this.exchangeService.fetchPrices(symbol);
    const opportunities = [];

    const exchanges = Object.keys(prices);
    for (let i = 0; i < exchanges.length; i++) {
      for (let j = i + 1; j < exchanges.length; j++) {
        const exchange1 = exchanges[i];
        const exchange2 = exchanges[j];
        const price1 = prices[exchange1];
        const price2 = prices[exchange2];

        if (price1 < price2) {
          opportunities.push({
            buyExchange: exchange1,
            sellExchange: exchange2,
            buyPrice: price1,
            sellPrice: price2,
            profitPercentage: (price2 - price1) / price1 * 100
          });
        } else if (price2 < price1) {
          opportunities.push({
            buyExchange: exchange2,
            sellExchange: exchange1,
            buyPrice: price2,
            sellPrice: price1,
            profitPercentage: (price1 - price2) / price2 * 100
          });
        }
      }
    }

    return opportunities.sort((a, b) => b.profitPercentage - a.profitPercentage);
  }

  async executeArbitrage(opportunity, amount) {
    const { buyExchange, sellExchange, buyPrice, sellPrice } = opportunity;

    try {
      const buyOrder = await this.exchangeService.executeTrade(buyExchange, symbol, 'buy', amount);
      const sellOrder = await this.exchangeService.executeTrade(sellExchange, symbol, 'sell', amount);

      return {
        buyOrder,
        sellOrder,
        profit: (sellPrice - buyPrice) * amount
      };
    } catch (error) {
      console.error('执行套利失败:', error);
      throw error;
    }
  }
}

module.exports = new ArbitrageService();
