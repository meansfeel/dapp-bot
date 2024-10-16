const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.post('/execute', async (req, res) => {
  try {
    const { amount, userId } = req.body;
    const fee = amount * 0.025; // 2.5% 交易费
    const netAmount = amount - fee;

    // 创建交易记录
    const transaction = new Transaction({
      userId,
      amount,
      fee,
      netAmount,
    });
    await transaction.save();

    // 将交易费转移到管理员钱包
    // 这里需要实现与区块链交互的逻辑
    // 管理员钱包地址: 0x9d4c41a4b68d6367f2cc75a9263ad9ecf5e658c2

    res.status(200).json({ message: '交易成功', transaction });
  } catch (error) {
    res.status(500).json({ message: '交易失败', error: error.message });
  }
});

module.exports = router;
