<template>
  <div class="navbar">

    <div class="left-menu">
      <img src="../../assets/images/ic_logo_top.png" class="logo">
    </div>
    <div class="right-menu">
      <!-- <template v-if="device!=='mobile'">
        <el-tooltip content="全屏" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>
      </template> -->
      <div>
        <!-- <nx-lang-select class="international right-menu-item"></nx-lang-select> -->

      </div>

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
      <div class="user-box">
        <div class="user-avatar">
          <img :src="user.avatar">
          <span class="level" v-if="user.level==0" style="border: 1px solid #00FFFF;color:#00FFFF;">V{{user.level}}</span>
          <span class="level" v-else-if="user.level==1" style="border: 1px solid #FEFA24;color:#FEFA24;">V{{user.level}}</span>
          <span class="level" v-else-if="user.level==2" style="border: 1px solid #D3D4D5;color:#D3D4D5;">V{{user.level}}</span>
          <span class="level" v-else style="border: 1px solid #D5A6F9;color:#D5A6F9;">V{{user.level}}</span>
        </div>
        <div class="accounts">
          <!-- <p style="">账号</p> -->
          <p style="">{{$t('navbar.title')}}</p>
          <p>{{user.username}}</p>
        </div>
      </div>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/center">
            <el-dropdown-item>
              <!-- 个人中心 -->
              {{$t('navbar.personal')}}
            </el-dropdown-item>
          </router-link>
          <span style="display:block;" @click="open">
            <el-dropdown-item divided>
              <!-- 退出登录 -->
              {{$t('navbar.logout')}}
            </el-dropdown-item>
          </span>
        </el-dropdown-menu>
        <!-- <div class="logout" @click="open">
          退出
        </div> -->
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'

//语言选择
import nxLangSelect from '@/components/nx-lang-select/index'
import Logo from './Sidebar/Logo'
import { fpthome } from '@/utils/i18n'

import {baseUrlLang} from '@/utils/envlang' //新增 2019.10.14

import Cookies from 'js-cookie'
// var lang=Cookies.get('language') || 'en';
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    nxLangSelect
  },
  data() {
    return {
      dialogVisible: false,
      userInfo:{},
      defaultImg:require('../../assets/images/img_en.png'),
      langList:[{id:1,src:require('../../assets/images/img_en.png'),lang:'en'},{id:1,src:require('../../assets/images/img_cn.png'),lang:'zh'}],
      newLang:'en_US',
      langPopup:false,
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user',
      'device'
    ]),
    show: {
      get() {
        return this.$store.state.settings.showRightPanel
      },
      set(val) {
        this.$store.dispatch('changeSetting', {
          key: 'showRightPanel',
          value: val
        })
      }
    },
    language() {
        return this.$store.getters.language
    }
  },
  created() {
    if(this.$store.getters.language=='en'){
        this.defaultImg=require('../../assets/images/img_en.png')
    }else if(this.$store.getters.language=='zh'){
        this.defaultImg=require('../../assets/images/img_cn.png')
    }else{
        this.defaultImg=require('../../assets/images/img_en.png')
    }
  },
  methods: {
    fpthome,
    selectLang(){
        this.langPopup=!this.langPopup;
    },
    getLang(e){
      console.log(e)
      this.$i18n.locale = e.lang
      this.$store.dispatch('setLanguage', e.lang)
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

      this.$router.go(0);
      // this.axios.get(baseUrlLang+'/api/i18n?i18n_language='+this.newLang).then(res=>{
      //   console.log(res)
      //   if(res.data.code==200){
      //       this.$store.dispatch('setLanguage', e.lang)
      //       this.$message({
      //           message: 'switch language success',
      //           type: 'success'
      //       })
      //       this.$router.go(0);
      //   }else{
      //       this.$message({
      //           message: res.data.msg,
      //           type: 'success'
      //       })
      //   }
      // })
      // switchLang(this.newLang).then(res=>{
      //     console.log(res)
      //     if(res.code==200){
      //         this.$store.dispatch('setLanguage', e.lang)
      //         Cookies.get('language',e.lang)
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
    open() {
      // this.$confirm('确定注销并退出系统吗？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.logout()
      // })

      if(this.$store.getters.language=='en'){
          this.$confirm('Are you sure you want to log off and exit the system?', 'Tips', {
            confirmButtonText: 'Sure',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            this.logout()
          }).catch(err=>{
            console.log(err)
          })
      }else{
        this.$confirm('确定注销并退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.logout()
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.dialogVisible = false
      this.$store.dispatch('LogOut').then(() => {
        this.$store.dispatch('setLanguage', 'en')
        Cookies.remove('language')
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
  },
}
</script>


<style>
  .el-dropdown-menu{
    border: 1px solid #0D1D4C !important;
      background: #0D1D4C !important;
  }
  .el-dropdown-menu__item--divided{
     border: 1px solid #0D1D4C !important;
  }
  .el-dropdown-menu__item{
    color: #FFFEFE !important;
  }
  .el-popper[x-placement^="bottom"] .popper__arrow{
    border-bottom-color: #0D1D4C !important;
  }
  .el-popper[x-placement^="bottom"] .popper__arrow::after{
    border-bottom-color: #0D1D4C !important;
  }
  .el-dropdown-menu__item--divided:before{
    background: #0D1D4C !important;
  }
  .el-dropdown-menu__item:hover{
    background: #000 !important;
    color: #FFFEFE;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .accounts{
    overflow: hidden; /*溢出隐藏*/
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
    white-space: nowrap;/*强制不换行*/
  }
  .navbar {
    height: 60px;
    min-width: 1056px;

    border-radius: 0px !important;

    .left-menu{
      float:left;
      >img{
        margin-top: 10px;
        margin-left: 50px;
      }
    }
    .logo{
      // width:170px;
      // height:60px;
      width: 80px;
      height: 40px;
    }
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container{
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 60px;
      display: flex;
      align-items: center;
      position: relative;
      .user-box{
        width: 200px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .user-avatar{
          cursor: pointer;
          width: 40px;
          height: 40px;
          // border-radius: 20px;
          display: inline-block;
          float: left;
          background: url('../../assets/images/img_admin.png') no-repeat;
          background-size: 100% 100%;
          padding: 2px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          img{
            width: 35px;
            height: 35px;
          }
          .level{
            display: inline-block;
            position: absolute;
            right: -5px;
            bottom: -5px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            line-height: 20px;
            text-align: center;
            color: #00FFFF;
            font-size: 12px;
            border: 1px solid #00FFFF;
            background: #0D1D4C;
          }
        }
        >div{
            display: inline-block;
            float: left;
            text-align: center;
            width:60px;
            // margin:0 10px;
            box-sizing: border-box;
            color: #FFFFFF;

            p{
              // margin-top:10px;
              // margin-bottom:0;
              width:60px;
              height:12px;
              font-size:12px;
              font-family:Microsoft YaHei;
              font-weight:400;
               text-align: center

            }
             p:nth-of-type(1){
               margin-bottom:10px;
             }
            p:nth-of-type(2){
                // margin-bottom:17px;
                font-size:11px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

          }
      }
      &:focus{
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international{
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 60px;
        margin-right: 60px;
        line-height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar-wrapper {
          // margin-top: 4px;
          position: relative;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            // border-radius: 20px;
            display: inline-block;
            float: left;
            background: url('../../assets/images/img_admin.png') no-repeat;
            background-size: 100% 100%;
            padding: 2px;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            // position: relative;
            img{
              width: 35px;
              height: 35px;
            }
          }
          >div{
            display: inline-block;
            float: left;
            padding:0 10px;
            box-sizing: border-box;
            color: #FFFFFF;
            p{
              // margin-top:10px;
              // margin-bottom:0;

              width:48px;
              height:12px;
              font-size:12px;
              font-family:Microsoft YaHei;
              font-weight:400;
              // color:#666;

            }
             p:nth-of-type(1){
               margin-bottom:10px;
             }
            p:nth-of-type(2){
                // margin-bottom:17px;
                font-size:11px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

              }

          }
          .el-icon-caret-bottom {
            cursor: pointer;
            // position: absolute;
            // right: -20px;
            // top: 25px;
            font-size: 14px;
            color: #2FE4FF;
          }
        }
        .logout{
          position: absolute;
          bottom: -36px;
          right: -39px;
          width: 100px;
          height: 36px;
          border: 1px solid #00BEFF;
          background: #0D1D4C;
          text-align: center;
          line-height: 36px;
          font-size: 14px;
          color: #FFFEFE;
          cursor: pointer;
        }
      }
    }
  }


  .lang-content{
    position: absolute;
    left: 0px;
    top: 20px;
  }
  .select-lang {
    // margin-left: 50px;
    position: relative;
    }
    .select-lang>div {
      display: flex;
      align-items: center;

    }

    .select-lang .flag-img{
      width: 40px;
      height: 27px;
    }
    .select-lang .xl-img{
      display: block;
      width: 14px;
      height: 8px;
      background: url('../../assets/images/ic_home_top_xl.png') no-repeat;
      background-size: 100% 100%;
      margin-left: 10px;
    }
    .select-lang .xl2-img{
      display: block;
      width: 14px;
      height: 8px;
      background: url('../../assets/images/ic_home_top_xl2.png') no-repeat;
      background-size: 100% 100%;
      margin-left: 10px;
    }
    .select-lang .lang-box{
        position: absolute;
        bottom: -85px;
        left: 50%;
        transform: translateX(-50%);
        width:102px;
        height:60px;
        background:rgba(14,30,75,0.4);
        border:1px solid rgba(33,191,252,1);
        box-shadow:0px 0px 25px 0px rgba(0,138,255,0.4);
        z-index: 9999;
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
