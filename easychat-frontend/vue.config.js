/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-15 22:17:35
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-15 22:52:39
 */
module.exports = {
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000', // target host
        changeOrigin: true, // needed for virtual hosted sites
        logLevel: 'debug'
      },
      '/sockjs-node': {
        target: 'http://localhost:3000',
        ws: false,
        changeOrigin: true
      }

    }

  }
}