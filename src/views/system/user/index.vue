<template>
  <div class="app-container">
    <!--form 组件-->
    <eForm ref="form" :is-add="isAdd" :dicts="dicts"/>
    <el-row :gutter="20">
      <!--部门数据-->
      <!-- <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="4">
        <div class="head-container">
          <el-input v-model="deptName" clearable placeholder="输入部门名称搜索" prefix-icon="el-icon-search" style="width: 100%;" class="filter-item" @input="getDeptDatas"/>
        </div>
        <el-tree :data="depts" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="handleNodeClick"/>
      </el-col> -->
      <!--用户数据-->
      <el-col >
        <!--工具栏-->
        <div class="head-container">
          <!-- 搜索 -->
          <el-input v-model="query.value" clearable placeholder="输入关键字搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
          <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
            <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
          <el-select v-model="query.enabled" clearable placeholder="状态" class="filter-item" style="width: 90px" @change="toQuery">
            <el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
          <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
          <!-- 新增 -->
          <!-- <div v-permission="['ADMIN','USER_ALL','USER_CREATE']" style="display: inline-block;margin: 0px 2px;">
            <el-button
              class="filter-item"
              size="mini"
              type="primary"
              icon="el-icon-plus"
              @click="add">新增</el-button>
          </div> -->
          <!-- 导出 -->
          <div style="display: inline-block;">
            <el-button
              v-permission="['ADMIN']"
              :loading="downloadLoading"
              size="mini"
              class="filter-item"
              type="warning"
              icon="el-icon-download"
              @click="download">导出</el-button>
          </div>
        </div>
        <!--表格渲染-->
        <el-table  :data="data"  style="width: 100%;" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
          <el-table-column prop="username" label="用户名"/>
          <el-table-column prop="phone" label="电话"/>
          <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱"/>
          <el-table-column label="上级代理">
            <template slot-scope="scope">
              <div>{{ scope.row.dept.name }}</div>
            </template>
          </el-table-column>
					<el-table-column label="用户类型">
					  <template slot-scope="scope">
					    <div>{{ scope.row.job.name }}</div>
					  </template>
					</el-table-column>
					<el-table-column label="商户标识">
					  <template slot-scope="scope">
					    <div>{{ scope.row.merchantId }}</div>
					  </template>
					</el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <div v-for="item in dicts" :key="item.id">
                <el-tag v-if="scope.row.enabled.toString() === item.value" :type="scope.row.enabled ? '' : 'info'">{{ item.label }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column v-if="checkPermission(['ADMIN','USER_ALL','USER_EDIT','USER_DELETE'])" label="操作" width="125" align="center">
            <template slot-scope="scope">
              <el-button v-permission="['ADMIN','USER_ALL','USER_EDIT']" size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)"/>
              <el-popover
                v-permission="['ADMIN','USER_ALL','USER_DELETE']"
                :ref="scope.row.id"
                placement="top"
                width="180">
                <p>确定删除本条数据吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                  <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                </div>
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
              </el-popover>
            </template>
          </el-table-column> -->
        </el-table>
        <!--分页组件-->
        <el-pagination
          :total="total"
          :current-page="page + 1"
          style="margin-top: 8px;"
          layout="total, prev, pager, next, sizes"
          @size-change="sizeChange"
          @current-change="pageChange"/>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top:20px;">
      <!-- <zfIndex></zfIndex> -->
    </el-row>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import initDict from '@/mixins/initDict'
import { del } from '@/api/user'
import { getDepts } from '@/api/dept'
import { getAll } from '@/api/role'

import { parseTime } from '@/utils/index'
import eForm from './form'
import { getToken } from "@/utils/auth";

import zfIndex from '../dept/index'
export default {
  components: { eForm,zfIndex },
  mixins: [initData, initDict],
  data() {

    return {

      downloadLoading :false,
      height: document.documentElement.clientHeight - 180 + 'px;', isAdd: false,
      delLoading: false, deptName: '', depts: [], deptId: null,
      defaultProps: {
        children: 'children',
        label: 'name'
      },

      queryTypeOptions: [
        { key: 'username', display_name: '用户名' },
        { key: 'email', display_name: '邮箱' }
      ],
      enabledTypeOptions: [
        { key: 'true', display_name: '激活' },
        { key: 'false', display_name: '锁定' }
      ],

    }
  },
  created() {
    this.getDeptDatas()
    this.$nextTick(() => {
      this.init()
      // 加载数据字典
      this.getDict('user_status')
    })
  },
  mounted: function() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 180 + 'px;'
    }
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/users'
      const sort = 'id,desc'
      const query = this.query
      const type = query.type
      const value = query.value
      const enabled = query.enabled
      this.params = { page: this.page, size: this.size, sort: sort, deptId: this.deptId }
      if (type && value) { this.params[type] = value }
      if (enabled !== '' && enabled !== null) { this.params['enabled'] = enabled }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.dleChangePage()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    },
    getDeptDatas() {
      const sort = 'id,desc'
      const params = { sort: sort }
      if (this.deptName) { params['name'] = this.deptName }
      getDepts(params).then(res => {
        console.log(122)
        console.log(res)
        this.depts = res.content
      })
    },
    handleNodeClick(data) {
      if (data.pid === 0) {
        this.deptId = null
      } else {
        this.deptId = data.id
      }
      this.init()
    },
    add() {
      this.isAdd = true
			console.log(this.$refs.form)
      this.$refs.form.getDepts()
      this.$refs.form.getRoles()
      this.$refs.form.getRoleLevel()
      this.$refs.form.dialog = true
    },
    // 导出
    download() {
      this.downloadLoading = true
      import('@/utils/Export2Excel').then(excel => {
        const tHeader = ['ID', '用户名', '邮箱', '头像地址', '状态', '注册日期', '最后修改密码日期']
        const filterVal = ['id', 'username', 'email', 'avatar', 'enabled', 'createTime', 'lastPasswordResetTime']
        const data = this.formatJson(filterVal, this.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    // 数据转换
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime' || j === 'lastPasswordResetTime') {
          return parseTime(v[j])
        } else if (j === 'enabled') {
          return parseTime(v[j]) ? '启用' : '禁用'
        } else {
          return v[j]
        }
      }))
    },
    edit(data) {
      this.isAdd = false
      const _this = this.$refs.form
      _this.getRoles()
      _this.getDepts()
      _this.getRoleLevel()
      _this.roleIds = []
      _this.form = { id: data.id, username: data.username, phone: data.phone, email: data.email, enabled: data.enabled.toString(), roles: [], dept: { id: data.dept.id }, job: { id: data.job.id },authCode:data.authCode,merchantRate:data.merchantRate}
      data.roles.forEach(function(data, index) {
        _this.roleIds.push(data.id)
      })
      _this.deptId = data.dept.id
      _this.jobId = data.job.id
      _this.getJobs(_this.deptId)
      _this.dialog = true
    },
    // 用户信息列表
    //  getUserDate() {
    //
    //   this.axios
    //     .get("http://shipz.jie360.com.cn/auth/info", {
    //       headers: {
    //         Authorization: "Bearer " + getToken(),
    //         "Access-Control-Allow-Origin": "localhost:8000"
    //       }
    //     })
    //     .then(function(response) {
    //       console.log(response.data);

    //     });
    // },
    setClassName({row, rowIndex}) {
      let index = rowIndex + 1;
      if(index %2 == 0){
          return 'warning-row'
      }else{
        return 'success-row'
      }
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      return 'test'
    },

  }
}
</script>

<style>

.el-input--suffix .el-input__inner::-webkit-input-placeholder{
  color: #fff !important;
}
.el-pagination .el-select .el-input .el-input__inner::-webkit-input-placeholder{
  color: #fff !important;
}
.el-input--small .el-input__inner::-webkit-input-placeholder{
  color:#fff !important;
}
.el-table--group::after, .el-table--border::after, .el-table::before{
  background: rgba(24, 136, 203, 0.5) !important
}
.el-input__inner{
  color: #fff !important;
}

.v-modal{
  left: 188px !important;
}
.el-dialog__wrapper{
  background: rgba(13, 29, 76, 0.8) !important;
  left: 188px !important;
}
  .el-dialog{
    background: url('../../../assets/images/bg_denglu_kuang.png') no-repeat;
    background-size: 100% 100%;
  }
  .el-dialog__body{
    color: #fff !important;
  }
  .el-dialog__title{
    color: #fff !important;
  }
  .el-form-item__label{
    color: #fff !important;
  }

  input{
    background: rgba(24, 136, 203, 0.3) !important;
    /* margin-right:30px;
    width:400px;
    height: 40px; */
    /* border:1px solid rgba(47, 228, 255, 1) !important; */
    color: #fff !important;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .el-input__inner::-webkit-input-placeholder,input::-webkit-input-placeholder{
    color: #fff !important;
  }
  .vue-treeselect__control{
    background: rgba(24, 136, 203, 0.3) !important;
    /* margin-right:30px;
    width:400px;
    height: 40px; */
    border:1px solid rgba(47, 228, 255, 1) !important;
    color: #fff !important;
  }
  .vue-treeselect__control .vue-treeselect__input{
    border:1px solid transparent !important;
    background: transparent !important;
    color: #fff !important;
  }
  .vue-treeselect__control .vue-treeselect__input::-webkit-input-placeholder{
    color: #fff !important;
  }
  .vue-treeselect__single-value{
    color: #fff !important;
  }
  .el-dialog__footer .el-button.el-button--text,.el-dialog__footer .el-button.el-button--primary{
    width: 120px;
    height: 40px;
    background: url('../../../assets/images/ic_qb_cz.png') no-repeat;
    background-size: 100% 100%;
    color: #fff !important;
  }
  .el-tag{
    height: 22px;
    line-height: 22px;
    color: #fff !important;
  }
  .el-button--primary{
     /* width: 110px;
    height: 30px; */
    /* background: url('../../../assets/images/ic_home_Viewdetails.png') no-repeat;
    background-size: 100% 100%;
    border: 1px solid transparent;
    border-radius: 0px;
    color: rgba(43, 250, 255, 1); */
  }
  .el-button--danger{
        /* width: 110px;
    height: 30px;
    background: url('../../../assets/images/ic_home_Viewdetails.png') no-repeat;
    background-size: 100% 100%;
    border: 1px solid transparent;
    border-radius: 0px;
    color: rgba(43, 250, 255, 1); */
  }
</style>
<style rel= "stylesheet/scss"lang="scss" scoped>
    input{
    background: rgba(24, 136, 203, 0.3) !important;
    /* margin-right:30px;
    width:400px;
    height: 40px; */
    border:1px solid rgba(47, 228, 255, 1) !important;
    color: #fff !important;
    padding-left: 20px;
    box-sizing: border-box;
  }
</style>
