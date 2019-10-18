<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增部门' : '编辑部门'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item v-if="form.pid !== 0" label="状态" prop="enabled">
        <el-radio v-for="item in dicts" :key="item.id" v-model="form.enabled" :label="item.value">{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item v-if="form.pid !== 0" style="margin-bottom: 0px;" label="上级部门">
        <treeselect v-model="form.pid" :options="depts" style="width: 370px;" placeholder="选择上级类目" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, getDepts } from '@/api/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false, depts: [],
      form: {
        id: '',
        name: '',
        pid: '',
        enabled: 'true'
      },
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
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.pid !== undefined) {
            this.loading = true
            if (this.isAdd) {
              this.doAdd()
            } else this.doEdit()
          } else {
            this.$message({
              message: '上级部门不能为空',
              type: 'warning'
            })
          }
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
      this.form = {
        id: '',
        name: '',
        pid: 1,
        enabled: 'true'
      }
    },
    getDepts() {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.content
				this.form.pid = this.depts[0].id
      })
    }
  }
}
</script>

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
    border:1px solid rgba(47, 228, 255, 1) !important;
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
