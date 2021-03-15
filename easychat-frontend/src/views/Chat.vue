<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-14 21:22:31
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-15 20:04:08
-->
<template>
  <div class="main">
    <el-row>
      <el-col :span="16">
        <el-input id='input'
                  v-model="input"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary"
                   @click="sendMsg">Send</el-button>
      </el-col>
    </el-row>
    <div id="content"></div>
  </div>
</template>

<script>
const ENTER = 0
const LEAVE = 1

export default {
  name: 'Chat',
  data() {
    return {
      input: '',
      content: '',
      ws: undefined
    }
  },
  mounted: function () {
    var _this = this
    this.ws = new WebSocket('ws://localhost:3000')
    this.ws.addEventListener('open', function () {
      _this.$message({
        message: '连接成功',
        type: 'success'
      });
    })
    this.ws.addEventListener('message', function (e) {
      let data = JSON.parse(e.data)
      console.log(data)
      var content = document.querySelector('#content')
      var div = document.createElement('div')
      div.innerText = data.msg + '------------' + data.time
      if (data.type === ENTER) {
        div.style.color = 'green'
      } else if (data.type === LEAVE) {
        div.style.color = 'red'
      } else {
        div.style.color = 'blue'
      }
      content.appendChild(div)
    })
    this.ws.addEventListener('close', function () {
      _this.$message({
        message: '连接已断开',
        type: 'success'
      });
    })
  },
  props: {
    msg: String
  },
  methods: {
    sendMsg() {
      this.ws.send(this.input)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  width: 500px;
}
#input {
  width: 10px;
}
</style>
