<template>
  <div class="login">

      <!-- 登录 -->
    <div class="login-box" v-if="login">
      <div class="logo">
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
        <div class="title">用户登录</div>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode">
          </div>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin:0;">记住我</el-checkbox>
          <!-- <div style="float:right;cursor: pointer;">忘记密码?</div> -->
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
        <el-form-item style="width:100%;">
          <!-- <div style="cursor: pointer;" @click="goRegister">立即注册</div> -->
          <!-- <router-link :to="{path:'/register'}" style="cursor: pointer;position: absolute;top: 10pc;left: 100px;color:#fff">立即注册</router-link> -->
        </el-form-item>
      </el-form>

    </div>
    <!--  底部  -->
    <div v-if="$store.state.settings.showFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt"/>
      <span> ⋅ </span>
      <a href="http://www.beian.miit.gov.cn" target="_blank">{{ $store.state.settings.caseNumber }}</a>
    </div>
  </div>
</template>

<script>
import { encrypt } from '@/utils/rsaEncrypt'
import Config from '@/config'
import { getCodeImg } from '@/api/login'
import Cookies from 'js-cookie'
import {
  getEmailCode
} from "@/api/finance";
export default {
  name: 'Login',
  data() {
    return {
      codeUrl: '',
      cookiePass: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      registerForm:{
        registerName:'',
        registerEmail:'',
        registerCode:'',
        registerPhone:'',
        registerPassword:'',
        registerAgainPassword:'',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      registerRules:{
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      redirect: undefined,
      login:true,
      email:'',
      count: '获取验证码',
      timer: null,
      disabled:true
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCode()
    this.getCookie()
  },
  methods: {
    goRegister(){
      this.$router.push({ path: "/register" });
    },
    goLogin(){
      this.login=true
    },
    //获取邮箱验证码
    getEmailCode(){
      alert('1111')
      console.log('111')
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        // this.disabled = ture;
        this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
          this.disabled = false
          } else {
          this.disabled = true;
          clearInterval(this.timer);
          this.timer = null;
          this.count='获取验证码'
          }
        }, 1000)
        }

      console.log(this.registerForm.registerEmail)
      var dataEmail={
        email:this.registerForm.registerEmail
      }
      // registerEmailCode(dataEmail).then(res => {
      //     console.log(res);
      //   });
    },
    getCode() {
      getCodeImg().then(res => {
        this.codeUrl = 'data:image/gif;base64,' + res.img
        this.loginForm.uuid = res.uuid
      })
    },
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // 保存cookie里面的加密后的密码
      this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          rememberMe: this.loginForm.rememberMe,
          code: this.loginForm.code,
          uuid: this.loginForm.uuid
        }
        if (user.password !== this.cookiePass) {
          user.password = encrypt(user.password)
        }
        if (valid) {
          this.loading = true
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: Config.passCookieExpires })
            Cookies.set('password', user.password, { expires: Config.passCookieExpires })
            Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          this.$store.dispatch('Login', user).then((res) => {
            console.log(res)
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
            this.getCode()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 800px;
    height: 100%;
    // background-image:url(	https://docs-1255840532.cos.ap-shanghai.myqcloud.com/3968.jpg );
    background-image:url('../assets/images/bg_denglu.png');
    background-size: 100% 100%;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: rgba(0, 191, 244, 1);
    font-size: 30px;

  }

  .login-form {
    border-radius: 6px;
    // background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;width: 14px;margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;
    float: right;
    img{
      cursor: pointer;
      vertical-align:middle
    }
  }
  .login{
    justify-content: flex-end;
    padding-right: 10%;
    box-sizing: border-box;
  }
  .login-box{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .logo{
    width: 280px;
    height: 90px;
    background: url('../assets/images/img_denglu_logo.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 40px;
  }
  .login-form{
    width: 631px;
    height: 436px;
    background:url('../assets/images/bg_denglu_kuang.png') no-repeat;
    background-size: 100% 100%;
    border-radius: 0 !important;
    // background: transparent !important;
    padding: 40px 60px;
    box-sizing: border-box;
    color: #fff !important;

  }
  .login-box{
    .register{
      width: 280px;
      height: 90px;
      background: url('../assets/images/img_denglu_logo.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 40px;
    }
    .register-form{
      width: 631px;
      height: 704px;
      background:url('../assets/images/bg_zhuce_kuang.png') no-repeat;
      background-size: 100% 100%;
      border-radius: 0 !important;
      // background: transparent !important;
      .el-form-item{
        margin-bottom: 30px;
        .login-code{
          width: 130px;
          height: 40px;
          border: 1px solid rgba(32, 163, 245, 0.4);
          background: rgba(24, 136, 203, 0.3);
          text-align: center;
          line-height: 40px;
        }
      }
       .el-form-item:nth-of-type(4){
          margin-bottom: 30px !important;
        }
        .el-form-item:nth-of-type(5){
          margin-bottom: 30px !important;
        }
    }
  }
</style>

<style>
input{
  background: #1888CB !important;
}
.el-input.el-input--prefix{
  background: #1888CB !important;
}
  .el-input__inner{
    background: #1888CB !important;
  }
  .el-input::-webkit-scrollbar-track{
    background: #1888CB !important;
  }
  .el-input__inner{
    border-color: rgba(47, 228, 255, 1) !important;
  }
  .login-form .el-input input{
    color: #fff;
  }
  .login-form .el-input input::-webkit-input-placeholder{
    color: #fff;
  }
  .el-checkbox__label{
    color: #fff;
  }
  .el-button--primary{
    background: rgba(32, 163, 245, 1) !important;

  }
  .el-form-item:nth-of-type(4){
    margin-bottom: 0 !important;
  }
  .el-form-item:nth-of-type(5){
    margin-bottom: 10px !important;
  }
  .el-form-item:nth-of-type(6) .el-form-item__content{
    line-height: 30px !important;
  }
  input:-webkit-autofill {
      /* //input 背景色     #0C2034根据自己需要替换 */
      -webkit-box-shadow : 0 0 0px 1000px #1888CB inset !important;
      /* //input字体颜色 颜色根据自己要求替换 */
      -webkit-text-fill-color: #FFFFFF !important;
}
</style>
