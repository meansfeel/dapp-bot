const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';

  res.status(statusCode).json({
    error: {
      message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    },
  });
};

module.exports = errorHandler;
