const mongoose = require('mongoose');

const botStatusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isRunning: { type: Boolean, default: false },
  profit: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BotStatus', botStatusSchema);
