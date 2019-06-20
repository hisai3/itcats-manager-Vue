<template>
  <div class="login">
    <div class="container">
      <div class="avatar">
        <img src="../assets/avatar.jpg">
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="myicon myicon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="myicon myicon-key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入users.js发送请求
import { userLogin } from "@/api/users.js";
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //验证通过
          console.log(this.loginForm);
          userLogin(this.loginForm)
            .then(res => {
              if (res.data.meta.status === 200) {
                //请求成功
                this.$message({
                  message: res.data.meta.msg,
                  type: "success"
                });
                //登录成功 跳转
                this.$router.push({name:'index'})
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: "warning"
                });
              }
            })
            .catch(err => {
               this.$message({
                  message: "服务器异常，请重试",
                  type: "warning"
                });
            });
        } else {
          //验证不通过
          this.$message({
                  message: "请按合法格式输入",
                  type: "warning"
                });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
