/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-14 21:02:07
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-15 22:51:28
 */

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('hello', (data) => {
    console.log(`收到客户端的消息：${data}`);
  })
});

server.listen(3000, () => {
  console.log("server is up and running on port 3000");
});
