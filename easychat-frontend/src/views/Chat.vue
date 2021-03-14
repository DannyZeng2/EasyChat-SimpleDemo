<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-14 21:22:31
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-15 01:11:45
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
    <el-input type="textarea"
              :autosize="{ minRows: 2, maxRows: 10}"
              v-model="content">
    </el-input>
  </div>
</template>

<script>
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
    this.ws.addEventListener('message', function (msg) {
      console.log(msg)
      _this.content += msg.data + '\n'
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
