const Transaction = require('../models/Transaction');

exports.getPerformanceData = async (req, res) => {
  try {
    const userId = req.user._id;
    const transactions = await Transaction.find({ userId }).sort({ createdAt: 1 });

    const performanceData = {
      dates: [],
      profits: [],
      totalProfit: 0,
      successfulTrades: 0,
      failedTrades: 0
    };

    transactions.forEach(transaction => {
      performanceData.dates.push(transaction.createdAt);
      performanceData.profits.push(transaction.netAmount);
      performanceData.totalProfit += transaction.netAmount;
      
      if (transaction.status === 'completed') {
        performanceData.successfulTrades++;
      } else if (transaction.status === 'failed') {
        performanceData.failedTrades++;
      }
    });

    res.json(performanceData);
  } catch (error) {
    res.status(500).json({ message: '获取性能数据失败', error: error.message });
  }
};
