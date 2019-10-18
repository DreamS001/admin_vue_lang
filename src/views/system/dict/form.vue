<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增字典' : '编辑字典'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="字典名称" prop="name">
        <el-input v-model="form.name" style="width: 370px;" placeholder="请输入字典名称"/>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.remark" style="width: 370px;" placeholder="请输入字典名称"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/dict'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        name: '',
        remark: ''
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
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
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
        remark: ''
      }
    }
  }
}
</script>

<style>
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
