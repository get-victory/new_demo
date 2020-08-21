<template>
  <div class="login">
    <el-form :model="form" ref="form" label-width="80px" :rules='rules' status-icon>
      <img src="../assets/avatar.jpg" alt="">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" @keyup.enter.native='login'></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" @keyup.enter.native='login'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button class='bt2' @click="reset">重置</el-button>
      </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
          { min: 3, max: 12, message: '用户名长度必须是3-12位', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
          { min: 3, max: 12, message: '密码长度必须是3-12位', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    // 重置按钮
    reset () {
      this.$refs.form.resetFields()
    },
    // 登录按钮
    async login () {
    // 先校验一次
      try {
        await this.$refs.form.validate()
        // 发送请求
        const { meta, data } = await this.$axios.post('login', this.form)
        console.log(meta)
        if (meta.status === 200) {
        // 登录成功，存储token
          localStorage.setItem('token', data.token)
          // 登录成功，跳出提示消息
          this.$message({
            type: 'success',
            message: meta.msg,
            duration: 1000
          })
          // 跳转到首页index
          this.$router.push({ name: 'index' })
        } else {
          this.$message.error(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  background-color: #2d434c;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-form{
    background-color: #fff;
    width: 400px;
    margin: 0 auto;
    margin-top: 200px;
    padding: 20px;
    padding-top: 70px;
    border-radius: 20px;
    position: relative;
    img{
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -75px;
    }
    .bt2{
      margin-left: 70px;
    }
  }
}
</style>>
