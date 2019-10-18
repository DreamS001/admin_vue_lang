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
        <nx-lang-select class="international right-menu-item"></nx-lang-select>
      </div>
      <div class="user-box">
        <div class="user-avatar">
          <img :src="user.avatar">
        </div>
        <div>
          <!-- <p style="">欢迎光临</p>
          <p>{{user.username}}</p> -->
          <p>{{$t('navbar.title')}}</p>
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
              个人中心
            </el-dropdown-item>
          </router-link>
          <span style="display:block;" @click="open">
            <el-dropdown-item divided>
              退出登录
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

import { headerWelcome } from '@/utils/i18n'// 国际化主题名字
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
      userInfo:{}
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
    }
  },
  methods: {
    headerWelcome,
    open() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.dialogVisible = false
      this.$store.dispatch('LogOut').then(() => {
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

              // width:48px;
              height:12px;
              font-size:12px;
              font-family:Microsoft YaHei;
              font-weight:400;
              // color:#666;
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
</style>
