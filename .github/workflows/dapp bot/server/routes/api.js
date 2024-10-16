const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');
const botController = require('../controllers/botController');
const transactionController = require('../controllers/transactionController');
const performanceController = require('../controllers/performanceController');

// 用户相关路由
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.get('/user', authMiddleware, userController.getUserInfo);

// 机器人相关路由
router.post('/bot/toggle', authMiddleware, botController.toggleBot);
router.get('/bot/status', authMiddleware, botController.getBotStatus);

// 交易相关路由
router.post('/transaction/execute', authMiddleware, transactionController.executeTransaction);
router.get('/transactions', authMiddleware, transactionController.getUserTransactions);

// 管理员路由
router.get('/admin/users', authMiddleware, userController.getAllUsers);
router.get('/admin/transactions', authMiddleware, transactionController.getAllTransactions);

// 性能报告相关路由
router.get('/performance', authMiddleware, performanceController.getPerformanceData);

module.exports = router;
