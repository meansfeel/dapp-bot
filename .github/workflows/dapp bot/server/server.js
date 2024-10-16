require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorHandler');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

// 在其他中间件之前使用
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('新的WebSocket连接');

  socket.on('disconnect', () => {
    console.log('WebSocket连接断开');
  });
});

server.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});
