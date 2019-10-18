<template>
  <div class="login">

      <!-- 注册 -->
    <div class="login-box">
      <div class="logo register">
      </div>
      <div label-position="left" label-width="0px" class="login-form register-form">
        <div class="title">免费注册</div>
        <div class="register-item">
            <label for="userName">
                <img src="../assets/images/ic_zhece_yhm.png" alt="">
            </label>
            <input id="userName" v-model="registerForm.registerName" auto-complete="off" type="text" placeholder="请输入用户名">
        </div>
        <div class="register-item">
            <div class="left-email" style="width:65%;height:100%;display:flex;">
                <label for="userName">
                    <img src="../assets/images/ic_zhuce_yx.png" alt="">
                </label>
                <input id="userName" v-model="registerForm.registerEmail" auto-complete="off" type="email" placeholder="请输入邮箱">
            </div>
            <button style="borderColor:transparent;color:#fff" class="login-code" v-bind:disabled="!disabled" @click="getEmailCode">{{count}}<span v-if="disabled"></span><span v-else>s</span></button>
        </div>
        <div class="register-item">
            <label for="registerCode">
                <img src="../assets/images/ic_zhuce_yzm.png" alt="">
            </label>
            <input id="registerCode" v-model="registerForm.registerCode" auto-complete="off" type="text" placeholder="请输入验证码">
        </div>
        <div class="register-item">
            <label for="registerPhone">
                <img src="../assets/images/ic_zhuce_sjh.png" alt="">
            </label>
            <input id="registerPhone" v-model="registerForm.registerPhone" auto-complete="off" type="tel" placeholder="请输入手机号">
        </div>
        <div class="register-item">
            <label for="registerPassword">
                <img src="../assets/images/ic_zhuce_mm.png" alt="">
            </label>
            <input id="registerPassword" v-model="registerForm.registerPassword" auto-complete="off" type="password" placeholder="请输入密码">
        </div>
        <div class="register-item">
            <label for="registerAgainPassword">
                <img src="../assets/images/ic_zhuce_mm.png" alt="">
            </label>
            <input id="registerAgainPassword" v-model="registerForm.registerAgainPassword" auto-complete="off" type="password" placeholder="请再次输入密码">
        </div>
        <div class="register-item" @click="goRegister">
            注册
        </div>
        <div class="register-item">
            <div style="cursor: pointer;text-align:center;">已有账户，去 <router-link :to="{path:'/login'}" style="color:#2BFAFF;"> 登录</router-link> </div>
        </div>
      </div>

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
import { registerEmailCode ,register} from '@/api/login'
export default {
  name: 'Register',
  data() {
    return {

      registerForm:{
        registerName:'',
        registerEmail:'',
        registerCode:'',
        registerPhone:'',
        registerPassword:'',
        registerAgainPassword:'',
      },

      registerRules:{
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      email:'',
      count: '获取验证码',
      timer: null,
      disabled:true,
      keyCode:''
    }
  },

  created() {
    //   
      this.keyCode=this.randomString()
      console.log(this.randomString())
  },
  methods: {
    goLogin(){
      this.login=true
    },
    //获取邮箱验证码
    getEmailCode(){
        if(this.registerForm.registerEmail==''){
            this.$message.error("请输入邮箱")
        }else{
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
        var dataEmail=JSON.stringify({
            value:this.registerForm.registerEmail
        })

        console.log(dataEmail)
        registerEmailCode(dataEmail).then(res => {
            console.log(res);
            });
        }

    },

    goRegister(){
        if(this.registerForm.registerName==''){
            this.$message.error("请输入用户名")
        }else if(this.registerForm.registerCode==''){
            this.$message.error("请输入验证码")
        }else if(this.registerForm.registerPhone==''){
            this.$message.error("请输入手机号")
        }else if(this.registerForm.registerPassword==''){
            this.$message.error("请输入密码")
        }else if(this.registerForm.registerAgainPassword==''){
            this.$message.error("请再次输入密码")
        }else if(this.registerForm.registerAgainPassword !=this.registerForm.registerPassword){
            this.$message.error("输入密码不一致")
        }else {
            var registerData=JSON.stringify({
                username:this.registerForm.registerName,
                email:this.registerForm.registerEmail,
                phone:this.registerForm.registerPhone,
                password:this.registerForm.registerPassword,
                code:this.registerForm.registerCode,
                key:this.keyCode
            })
            register(registerData).then(res => {
                console.log(res);
                this.$message({
                    message: "恭喜你，注册成功!2s后自动跳转登录页",
                    type: "success"
                });
                setTimeout(function(){
                    this.$router.push({ path: '/login' })
                },2000)

            });
        }
    },
    randomString(len) {
    　 len = len || 32;
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    　　let maxPos = $chars.length;
    　　let randomStr = '';
    　　for (let i = 0; i < len; i++) {
        randomStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return randomStr;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;

    min-height: 1000px;
    // background-image:url(	https://docs-1255840532.cos.ap-shanghai.myqcloud.com/3968.jpg );
    background-image:url('../assets/images/bg_denglu.png') !important;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: rgba(0, 191, 244, 1);
    font-size: 30px;

  }
  .login-box{
      display: flex;
      flex-direction: column;
      align-items: center;
    .register{
      width: 280px;
    height: 90px;
      background: url('../assets/images/img_denglu_logo.png') no-repeat;
      background-size:  100% 100%;
      margin-bottom: 40px;
    }
    .register-form{
      width: 631px;
      height: 704px;
      background:url('../assets/images/bg_zhuce_kuang.png') no-repeat;
      background-size:  100% 100%;
      border-radius: 0 !important;
      padding: 40px 60px;
      box-sizing: border-box;
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
  .register-item{
      width: 100%;
      height: 46px;
      border: 1px solid rgba(32, 163, 245, 0.4);
      background: rgba(24, 136, 203, 0.3);
      padding: 13px 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      margin-bottom: 30px;
  }
  .register-item:nth-of-type(8){
      margin-bottom: 0;
      background: rgba(32, 163, 245, 1);
      text-align: center;
      line-height: 46px;
      padding: 0;
      color: #fff;
      font-size: 20px;
      justify-content: center;
  }
  .register-item:nth-of-type(9){
      margin-bottom: 0;
      background: transparent;
      text-align: center;
      line-height: 46px;
      padding: 0;
      color: #fff;
      font-size: 18px;
      justify-content: center;
      border: 1px solid transparent;
  }
  .register-item:nth-of-type(3){
      padding: 0;
      border: 1px solid transparent;
      background: transparent;
      justify-content: space-between;
      .left-email{
          width: 65%;
          height: 100%;
          display: flex;
          align-items: center;
          border: 1px solid rgba(32, 163, 245, 0.4);
          background: rgba(24, 136, 203, 0.3);
          padding-left: 30px;
          input{
              width: 100%;
              height: 100%;
          }
      }
      .login-code{
          width: 130px;
          height: 44px;
          border: 1px solid rgba(32, 163, 245, 0.4);
          background: rgba(24, 136, 203, 0.3);
          text-align: center;
          line-height: 40px;
          cursor: pointer;
      }
  }
label{
    display: inline-block;
    width: 19px;
    height: 20px;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>

<style>
input{
  background: transparent !important;
  border: none;
  width: 100%;
  outline: none;
  color: #fff;
  padding-left: 30px;
  box-sizing: border-box;
}
input::-webkit-input-placeholder{
    color: #fff;
    font-size: 14px;
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
