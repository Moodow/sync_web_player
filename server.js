const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('新用户连接');

  socket.on('play', () => {
    console.log('播放视频');
    socket.broadcast.emit('play');
  });

  socket.on('pause', () => {
    console.log('暂停视频');
    socket.broadcast.emit('pause');
  });

  socket.on('disconnect', () => {
    console.log('用户断开连接');
  });
});

server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000');
});
