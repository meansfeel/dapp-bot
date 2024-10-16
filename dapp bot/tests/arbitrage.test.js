const ArbitrageService = require('../server/services/arbitrageService');

describe('ArbitrageService', () => {
  test('findArbitrageOpportunities should return sorted opportunities', async () => {
    const opportunities = await ArbitrageService.findArbitrageOpportunities('BTC/USDT');
    expect(opportunities.length).toBeGreaterThan(0);
    expect(opportunities[0].profitPercentage).toBeGreaterThan(opportunities[opportunities.length - 1].profitPercentage);
  });

  test('executeArbitrage should execute trades and return profit', async () => {
    const opportunity = {
      buyExchange: 'binance',
      sellExchange: 'huobi',
      buyPrice: 50000,
      sellPrice: 50100,
    };
    const result = await ArbitrageService.executeArbitrage(opportunity, 0.1);
    expect(result.profit).toBeGreaterThan(0);
  });
});
