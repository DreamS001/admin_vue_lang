<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="query.value" clearable placeholder="输入任务名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <!-- 新增 -->
      <div v-permission="['ADMIN','JOB_ALL','JOB_CREATE']" style="display: inline-block;margin: 0px 2px;">
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="dialog = true;isAdd = true">新增</el-button>
      </div>
      <!-- 任务日志 -->
      <div v-permission="['ADMIN','JOB_ALL','JOB_SELECT']" style="display: inline-block;">
        <el-button
          class="filter-item"
          size="mini"
          type="warning"
          icon="el-icon-tickets"
          @click="doLog">执行日志</el-button>
        <Log ref="log"/>
      </div>
    </div>
    <!--Form表单-->
    <el-dialog :visible.sync="dialog" :title="isAdd ? '新增任务' : '编辑任务'" append-to-body width="600px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="form.jobName" style="width: 460px;" placeholder="请输入任务名称"/>
        </el-form-item>
        <el-form-item label="Bean名称" prop="beanName">
          <el-input v-model="form.beanName" style="width: 460px;" placeholder="请输入Bean名称"/>
        </el-form-item>
        <el-form-item label="执行方法" prop="methodName">
          <el-input v-model="form.methodName" style="width: 460px;" placeholder="请输入执行方法"/>
        </el-form-item>
        <el-form-item label="参数内容">
          <el-input v-model="form.params" style="width: 460px;" placeholder="请输入参数内容"/>
        </el-form-item>
        <el-form-item label="Cron表达式" prop="cronExpression">
          <el-input v-model="form.cronExpression" style="width: 460px;" placeholder="请输入Cron表达式"/>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-radio v-model="form.isPause" label="false">启用</el-radio>
          <el-radio v-model="form.isPause" label="true" >暂停</el-radio>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input v-model="form.remark" style="width: 460px;" rows="2" type="textarea" placeholder="请输入任务描述"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="cancel">取消</el-button>
        <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table :data="data"  style="width: 100%;" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
      <el-table-column :show-overflow-tooltip="true" prop="jobName" width="100px" label="任务名称"/>
      <el-table-column :show-overflow-tooltip="true" prop="beanName" label="Bean名称"/>
      <el-table-column :show-overflow-tooltip="true" prop="methodName" width="90px" label="执行方法"/>
      <el-table-column :show-overflow-tooltip="true" prop="params" width="80px" label="参数"/>
      <el-table-column :show-overflow-tooltip="true" prop="cronExpression" width="100px" label="cron表达式"/>
      <el-table-column :show-overflow-tooltip="true" prop="isPause" width="90px" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isPause ? 'warning' : 'success'">{{ scope.row.isPause ? '已暂停' : '运行中' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="remark" label="描述"/>
      <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['ADMIN','JOB_ALL','JOB_EDIT','JOB_DELETE'])" label="操作" width="180px" align="center">
        <template slot-scope="scope">
          <el-button v-permission="['ADMIN','JOB_ALL','JOB_EDIT']" size="mini" style="margin-right: 3px;" type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button v-permission="['ADMIN','JOB_ALL','JOB_EDIT']" style="margin-left: -2px" type="text" size="mini" @click="execute(scope.row.id)">执行</el-button>
          <el-button v-permission="['ADMIN','JOB_ALL','JOB_EDIT']" style="margin-left: 3px" type="text" size="mini" @click="updateStatus(scope.row.id,scope.row.isPause ? '恢复' : '暂停')">
            {{ scope.row.isPause ? '恢复' : '暂停' }}
          </el-button>
          <el-popover
            v-permission="['ADMIN','JOB_ALL','JOB_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="200">
            <p>确定停止并删除该任务吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="text" size="mini">删除</el-button>
          </el-popover>
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
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del, updateIsPause, execution, add, edit } from '@/api/timing'
import { parseTime } from '@/utils/index'
import Log from './log'
export default {
  components: { Log },
  mixins: [initData],
  data() {
    return {
      delLoading: false, isAdd: false,
      loading: false, dialog: false,
      form: { jobName: '', beanName: '', methodName: '', params: '', cronExpression: '', isPause: 'false', remark: '' }, permissionIds: [],
      rules: {
        jobName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        beanName: [
          { required: true, message: '请输入Bean名称', trigger: 'blur' }
        ],
        methodName: [
          { required: true, message: '请输入方法名称', trigger: 'blur' }
        ],
        cronExpression: [
          { required: true, message: '请输入Cron表达式', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/jobs'
      const sort = 'id,desc'
      const query = this.query
      const value = query.value
      this.params = { page: this.page, size: this.size, sort: sort }
      if (value) { this.params['jobName'] = value }
      return true
    },
    execute(id) {
      execution(id).then(res => {
        this.$notify({
          title: '执行成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    updateStatus(id, status) {
      updateIsPause(id).then(res => {
        this.init()
        this.$notify({
          title: status + '成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        console.log(err.response.data.message)
      })
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
    toQuery() {
      this.page = 0
      this.init()
    },
    doLog() {
      this.$refs.log.dialog = true
      this.$refs.log.doInit()
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { jobName: '', beanName: '', methodName: '', params: '', cronExpression: '', isPause: 'false', remark: '' }
    },
    edit(data) {
      this.isAdd = false
      this.form = { id: data.id, jobName: data.jobName, beanName: data.beanName, methodName: data.methodName, params: data.params, cronExpression: data.cronExpression, isPause: data.isPause.toString(), remark: data.remark }
      this.dialog = true
    },
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
    .test{
      background: rgba(24, 136, 203, 0.2) !important;
    }
</style>


<style>
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
  .vue-treeselect__menu{
    background: rgba(24, 136, 203, 0.3) !important;
  }
.el-textarea__inner{
    background: rgba(24, 136, 203, 0.3) !important;
  }
 .el-select-dropdown{
background: rgba(24, 136, 203, 1) !important;
border: solid 1px #333;
}
.el-select-dropdown__item{
  color: #fff !important;
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background: rgba(24, 136, 203, 0.3) !important;
  color: #fff !important;
}
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
    background-color: rgba(24, 136, 203, 0.3) !important;
  }
  .vue-treeselect__menu{
    display: block !important;
    background: rgba(24, 136, 203, 1) !important;

  }
  .vue-treeselect__menu-container .vue-treeselect__menu .vue-treeselect--focused{
    background: rgba(24, 136, 203, 0.3) !important;
  }
  .vue-treeselect__option{
    background: rgba(24, 136, 203, 0.3) !important;
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
