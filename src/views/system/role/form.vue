<template>
<div class="mask-box">
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增角色' : '编辑角色'" append-to-body width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;" placeholder="请输入角色名称"/>
      </el-form-item>
      <el-form-item label="角色级别" prop="sort">
        <el-input-number v-model.number="form.level" :min="1" controls-position="right" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="数据范围">
        <el-select v-model="form.dataScope" style="width: 370px" placeholder="请选择数据范围" @change="changeScope">
          <el-option
            v-for="item in dateScopes"
            :key="item"
            :label="item"
            :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.dataScope === '自定义'" label="数据权限">
        <treeselect v-model="deptIds" :options="depts" multiple style="width: 370px" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="描述信息">
        <el-input v-model="form.remark" placeholder="请输入描述信息" style="width: 370px;" rows="5" type="textarea"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { getDepts } from '@/api/dept'
import { add, edit } from '@/api/role'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dateScopes: ['全部', '本级','下级', '自定义'],
      loading: false, dialog: false, depts: [], deptIds: [],
      form: { name: '', depts: [], remark: '', dataScope: '本级', level: 3 },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      if (this.form.dataScope === '自定义' && this.deptIds.length === 0) {
        this.$message({
          message: '自定义数据权限不能为空',
          type: 'warning'
        })
      } else {
        this.form.depts = []
        if (this.form.dataScope === '自定义') {
          for (let i = 0; i < this.deptIds.length; i++) {
            this.form.depts.push({
              id: this.deptIds[i]
            })
          }
        }
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
      }
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
        this.$parent.init()
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
        this.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { name: '', depts: [], remark: '', dataScope: '本级', level: 3 }
    },
    getDepts() {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.content
      })
    },
    changeScope() {
      if (this.form.dataScope === '自定义') {
        this.getDepts()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
  .el-textarea__inner{
    background: rgba(24, 136, 203, 0.3) !important;
  }
  .el-input-number>span{
    background-color: #1888CB;
  }
</style>

<style>

.mask-box .v-modal{
  left: 188px !important;
}
.mask-box .el-dialog__wrapper{
  background: rgba(13, 29, 76, 0.8) !important;
  left: 188px !important;
}
  .mask-box .el-dialog{
    background: url('../../../assets/images/bg_denglu_kuang.png') no-repeat;
    background-size: 100% 100%;
  }
  .mask-box .el-dialog__body{
    color: #fff !important;
  }
  .mask-box .el-dialog__title{
    color: #fff !important;
  }
  .mask-box .el-form-item__label{
    color: #fff !important;
  }

  .mask-box input{
    background: rgba(24, 136, 203, 0.3) !important;
    border:1px solid rgba(47, 228, 255, 1) !important;
    color: #fff !important;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .mask-box .el-input__inner::-webkit-input-placeholder,input::-webkit-input-placeholder{
    color: #fff !important;
  }
  .mask-box .vue-treeselect__control{
    background: rgba(24, 136, 203, 0.3) !important;
    border:1px solid rgba(47, 228, 255, 1) !important;
    color: #fff !important;
  }
  .mask-box .vue-treeselect__control .vue-treeselect__input{
    border:1px solid transparent !important;
    background: transparent !important;
    color: #fff !important;
  }
  .mask-box .vue-treeselect__control .vue-treeselect__input::-webkit-input-placeholder{
    color: #fff !important;
  }
  .mask-box .vue-treeselect__single-value{
    color: #fff !important;
  }
  .mask-box .el-dialog__footer .el-button.el-button--text,.el-dialog__footer .el-button.el-button--primary{
    width: 120px;
    height: 40px;
    background: url('../../../assets/images/ic_qb_cz.png') no-repeat;
    background-size: 100% 100%;
    color: #fff !important;
  }
  .mask-box .vue-treeselect__menu{
    background: rgba(24, 136, 203, 0.3) !important;
  }
.mask-box .el-textarea__inner{
    background: rgba(24, 136, 203, 0.3) !important;
  }
.mask-box .el-select-dropdown{
background: rgba(24, 136, 203, 1) !important;
border: solid 1px #333;
}
.mask-box .el-select-dropdown__item{
  color: #fff !important;
}
.mask-box .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background: rgba(24, 136, 203, 0.3) !important;
  color: #fff !important;
}
.mask-box .el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
    background-color: rgba(24, 136, 203, 0.3) !important;
  }

   .mask-box .el-select-dropdown{
background: rgba(24, 136, 203, 1) !important;
border: solid 1px #333;
}
.mask-box .el-select-dropdown__item{
  color: #fff !important;
}
.mask-box .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background: rgba(24, 136, 203, 0.3) !important;
  color: #fff !important;
}
  .mask-box .el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
    background-color: rgba(24, 136, 203, 0.3) !important;
  }
  .mask-box .vue-treeselect__menu{
    display: block !important;
    background: rgba(24, 136, 203, 1) !important;

  }
  .mask-box .vue-treeselect__menu-container .vue-treeselect__menu .vue-treeselect--focused{
    background: rgba(24, 136, 203, 0.3) !important;
  }
  .mask-box .vue-treeselect__option{
    background: rgba(24, 136, 203, 0.3) !important;
  }
</style>
