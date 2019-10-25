<template>
  <div class="login">

      <!-- 登录 -->
    <div class="login-box" v-if="login">
      <div class="logo">
      </div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
        <div class="title">{{$t('login.title')}}</div>
        <div class="lang-content">
          <div class="select-lang">
            <div @click="selectLang">
              <img class="flag-img" :src="defaultImg" alt="" >
              <span v-if="langPopup" class="xl-img"></span>
              <span v-else class="xl2-img"></span>
            </div>
              <div class="lang-box" v-if="langPopup">
                  <ul>
                      <li v-for="(i,index) in langList" :key="index">
                        <img class="flag-img" :src="i.src" alt="" @click="getLang(i)" />
                      </li>
                  </ul>
              </div>
          </div>
        </div>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" type="text" auto-complete="off" :placeholder="$t('login.placeholder_username')">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" auto-complete="off" :placeholder="$t('login.placeholder_password')" @keyup.enter.native="handleLogin">
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" auto-complete="off" :placeholder="$t('login.VerificationCode')" style="width: 63%" @keyup.enter.native="handleLogin">
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode">
          </div>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin:0;">{{$t('login.jz')}}</el-checkbox>
          <!-- <div style="float:right;cursor: pointer;">忘记密码?</div> -->
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            <span v-if="!loading">{{$t('login.login')}}</span>
            <span v-else>{{$t('login.loginz')}}</span>
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
import { getCodeImg,switchLang } from '@/api/login'
import Cookies from 'js-cookie'
import {
  getEmailCode
} from "@/api/finance";
import { loginAdmin } from '@/utils/i18n'// 国际化主题名字
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
      disabled:true,
      defaultImg:require('../assets/images/img_en.png'),
      langList:[{id:1,src:require('../assets/images/img_en.png'),lang:'en'},{id:1,src:require('../assets/images/img_cn.png'),lang:'zh'}],
      newLang:'en_US',
      langPopup:false,
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
    if(Cookies.get('language')){
      Cookies.remove('language')
    }else{}
    this.getCode()
    this.getCookie()
  },
  methods: {
    loginAdmin,
    selectLang(){
        this.langPopup=!this.langPopup;
    },
    getLang(e){
      console.log(e)
      this.$i18n.locale = e.lang
      if(e.lang=='zh'){
          this.newLang='zh_CN'
          this.$message({
              message: '语言切换成功',
              type: 'success'
          })
      }else{
          this.newLang='en_US'
          this.$message({
              message: 'switch language success',
              type: 'success'
          })
      }
      this.$store.dispatch('setLanguage', e.lang)
      Cookies.set('language')
      
      // switchLang(this.newLang).then(res=>{
      //     console.log(res)
      //     if(res.code==200){
      //         this.$store.dispatch('setLanguage', e.lang)
      //         Cookies.set('language')
      //         this.$message({
      //             message: 'switch language success',
      //             type: 'success'
      //         })
      //         // this.$router.go(0);
      //     }else{
      //         this.$message({
      //             message: res.msg,
      //             type: 'success'
      //         })
      //     }
      // })
      this.defaultImg=e.src;
      this.langPopup=false;
    },
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
      // var reg=/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,}$/
      // if(!reg.test(this.loginForm.password)){
      //   this.$message.error('密码至少6位，且需为字母数字混合')
      //   return false
      // }
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
    position: relative;

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

  .lang-content{
  position: absolute;
  right: 64px;
  top: 40px;
}
  .select-lang {
        margin-left: 50px;
        position: relative;
    }
    .select-lang>div {
        display: flex;
        align-items: center;

    }

    .select-lang .flag-img{
        width: 60px;
        height: 40px;
    }
    .select-lang .xl-img{
        display: block;
        width: 22px;
        height: 12px;
        background: url('../assets/images/ic_home_top_xl.png') no-repeat;
        background-size: 100% 100%;
        margin-left: 20px;
    }
    .select-lang .xl2-img{
      display: block;
      width: 22px;
      height: 12px;
      background: url('../assets/images/ic_home_top_xl2.png') no-repeat;
      background-size: 100% 100%;
      margin-left: 20px;
    }
    .select-lang .lang-box{
        position: absolute;
        bottom: -100px;
        left: 50%;
        transform: translateX(-50%);
        width:160px;
        height:80px;
        background:rgba(14,30,75,0.4);
        border:1px solid rgba(33,191,252,1);
        box-shadow:0px 0px 25px 0px rgba(0,138,255,0.4);
        z-index: 999;
    }
    .select-lang .lang-box ul{
        height: 100%;
        width:100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        padding-left: 0;
    }
    .select-lang .lang-box ul li{
      list-style: none;
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
    /* margin-bottom: 0 !important; */
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
