/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-14 21:02:07
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-14 23:04:35
 */
const ws = require('nodejs-websocket')


let count = 0
const server = ws.createServer(conn => {
  console.log('建立新连接')
  count++
  conn.username = `用户${count}`
  broadcast(`${conn.username}进入了聊天室`)

  conn.on('text', data => {
    console.log(data + '!!')
    conn.send(data + '!!')
  })
  conn.on('close', data => {
    console.log('关闭连接')
    count--
  })
  conn.on('error', data => {
    console.log('发生异常')
    count++
  })
})

// 广播消息
function broadcast(msg) {
  server.connections.forEach(item => {
    item.send(msg)
    console.log(msg)
  })
}

server.listen(3000, () => {
  console.log('监听端口3000')
})