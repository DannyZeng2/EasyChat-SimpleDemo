/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-14 21:02:07
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-15 20:06:19
 */
const ws = require('nodejs-websocket')
const ENTER = 0
const LEAVE = 1
const MESSAGE = 2


let count = 0
const server = ws.createServer(conn => {
  console.log('建立新连接')
  count++
  conn.username = `用户${count}`
  broadcast({
    type: ENTER,
    msg: `${conn.username}进入了聊天室`,
    time: new Date().toLocaleDateString()
  })

  conn.on('text', data => {
    console.log(data)
    broadcast({
      type: MESSAGE,
      msg: `${conn.username}:${data}`,
      time: new Date().toLocaleDateString()
    })
  })
  conn.on('close', data => {
    console.log('关闭连接')
    broadcast({
      type: LEAVE,
      msg: `${conn.username}离开了聊天室`,
      time: new Date().toLocaleDateString()
    })
    count--
  })
  conn.on('error', data => {
    console.log('发生异常')
    count--
  })
})

// 广播消息
function broadcast(msg) {
  server.connections.forEach(item => {
    item.send(JSON.stringify(msg))
    console.log(msg)
  })
}

server.listen(3000, () => {
  console.log('监听端口3000')
})