<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('financeCash.p_info')}}</span>
          </div>
          <div>
            <!-- action="http://shipz.jie360.com.cn/api/product/upload/" -->
            <div style="text-align: center">
              <el-upload
                :show-file-list="false"
                :on-success="handleSuccess"
                :on-error="handleError"
                :headers="headers"
                :action="updateAvatarApi"
                class="avatar-uploader">
                <img v-if="user.avatar" :src="user.avatar" title="点击上传头像" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </div>
            <ul class="user-info">
              <li><svg-icon icon-class="user1" /> {{$t('financeCash.user_name')}} <div class="user-right">{{ user.username }}</div></li>
              <li><svg-icon icon-class="phone" /> {{$t('financeCash.phone_number')}} <div class="user-right">{{ user.phone }}</div></li>
              <li><svg-icon icon-class="email" /> {{$t('financeCash.user_email')}} <div class="user-right">{{ user.email }}</div></li>
              <li><svg-icon icon-class="dept" /> {{$t('financeCash.subordinate_departments')}} <div class="user-right"> {{ user.dept }} / {{ user.job }}</div></li>
              <li><svg-icon icon-class="date" /> {{$t('financeCash.date_of_creation')}} <div class="user-right">{{ parseTime(user.createTime) }}</div></li>
              <li>
                <svg-icon icon-class="anq" /> {{$t('financeCash.security_setting')}}
                <div class="user-right">
                  <a @click="$refs.pass.dialog = true">{{$t('financeCash.change_password')}}</a>
                  <a @click="$refs.email.dialog = true">{{$t('financeCash.modify_mailbox')}}</a>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{$t('financeCash.operation_log')}}</span>
            <div style="display:inline-block;float: right;cursor: pointer" @click="refresh"><i :class="ico"/></div>
          </div>
          <div>
            <el-table  :data="data" size="small" style="width: 100%;" :row-class-name="setClassName">
              <el-table-column prop="description" :label="$t('financeCash.behavior')"/>
              <el-table-column prop="requestIp" label="IP"/>
              <el-table-column prop="time" :label="$t('financeCash.request_time_consuming')" align="center">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.time <= 300">{{ scope.row.time }}ms</el-tag>
                  <el-tag v-else-if="scope.row.time <= 1000" type="warning">{{ scope.row.time }}ms</el-tag>
                  <el-tag v-else type="danger">{{ scope.row.time }}ms</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" :label="$t('financeCash.date_of_creation')" width="180px">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
              </el-table-column>
            </el-table>
            <!--分页组件-->
            <el-pagination
              :total="total"
              :current-page="page + 1"
              style="margin-top: 8px;"
              layout="total, prev, pager, next, sizes"
              @size-change="sizeChange"
              @current-change="pageChange"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <updateEmail ref="email" :email="user.email"/>
    <updatePass ref="pass"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { regEmail } from '@/utils/index'
import updatePass from './center/updatePass'
import updateEmail from './center/updateEmail'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { parseTime } from '@/utils/index'
import initData from '@/mixins/initData'
import { financeEarnings,financeCash,login } from '@/utils/i18n'// 国际化主题名字

import Cookies from 'js-cookie'
var lang=Cookies.get('language') || 'en';
export default {
  name: 'Center',
  components: { updatePass, updateEmail },
  mixins: [initData],
  data() {
    return {
      ico: 'el-icon-refresh',
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      imageUrl:''
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'updateAvatarApi'
    ])
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
    store.dispatch('GetInfo').then(() => {})

       console.log(this.user.avatar);
    // this.imageUrl=this.user.avatar
  },
  methods: {

    parseTime,
    formatEmail(mail) {
      return regEmail(mail)
    },
    beforeInit() {
      this.url = 'api/logs/user'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      return true
    },
    // handleAvatarSuccess(res, file) {
    //     console.log(res)

    //     this.imageUrl = URL.createObjectURL(file.raw)

    //     if (res.msg == '图片上传重复限制') {
    //       return this.$message.error(res.msg)
    //     } else if (res.msg == '图片上传成功!') {
    //       this.$message.success(res.msg)
    //       this.imageUrlOk = true
    //       // this.form.picUrl = res.url
    //       console.log(res.url)
    //     } else {
    //       return this.$message.error('图片上传失败')
    //     }
    //   },
    handleSuccess(response, file, fileList) {
      this.$notify({
        title: '头像修改成功',
        type: 'success',
        duration: 2500
      })
      store.dispatch('GetInfo').then(() => {})
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
    },
    refresh() {
      this.ico = 'el-icon-loading'
      this.$refs.log.init()
      setTimeout(() => {
        this.ico = 'el-icon-refresh'
      }, 300)
    },
    setClassName({row, rowIndex}) {
      let index = rowIndex + 1;
      if(index %2 == 0){
          return 'warning-row'
      }else{
        return 'success-row'
      }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .avatar-uploader-icon {
    font-size: 28px;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
    border-radius: 50%
  }
  .user-info {
    padding-left: 0px;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      border-top: 1px solid #F0F3F4;
      padding: 11px 0px;
      font-size: 13px;
    }
    .user-right {
      float: right;

      a{
        color: #317EF3;
      }
    }
  }
  .el-table .warning-row{
      background:rgba(24, 136, 203, 0.4)!important;
      /* background:red !important; */
  }
  .el-table .success-row{
      background:rgba(24, 136, 203, 0.2)!important;
  }
  .el-card{
    background:transparent !important;
    color: #fff;
    border:1px solid rgba(0,190,255,1);
  }
  .el-card__header{
    border-bottom:1px solid rgba(0,190,255,1);
  }
  .user-info li{
    border-top: 0px;
    border-bottom: 1px solid rgba(0,190,255,1);
  }
</style>


<style>
.el-card__body{
  padding:10px;
}
</style>