<template>
  <div style="display: inline-block;">
    <el-dialog :visible.sync="dialog" :close-on-click-modal="false" :title="title" append-to-body width="475px" @close="cancel">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="88px">
        <el-form-item label="新邮箱" prop="email">
          <el-input v-model="form.email" auto-complete="on" style="width: 200px;"/>
          <el-button :loading="codeLoading" :disabled="isDisabled" size="small" @click="sendCode">{{ buttonName }}</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" style="width: 320px;"/>
        </el-form-item>
        <el-form-item label="当前密码" prop="pass">
          <el-input v-model="form.pass" type="password" style="width: 320px;"/>
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
import store from '@/store'
import { validatEmail } from '@/utils/validate'
import { updateEmail } from '@/api/user'
import { resetEmail } from '@/api/code'
export default {
  props: {
    email: {
      type: String,
      required: true
    }
  },
  data() {
    const validMail = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('新邮箱不能为空'))
      } else if (value === this.email) {
        callback(new Error('新邮箱不能与旧邮箱相同'))
      } else if (validatEmail(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式错误'))
      }
    }
    return {
      loading: false, dialog: false, title: '修改邮箱', form: { pass: '', email: '', code: '' },
      user: { email: '', password: '' }, codeLoading: false,
      codeData: { type: 'email', value: '' },
      buttonName: '获取验证码', isDisabled: false, time: 60,
      rules: {
        pass: [
          { required: true, message: '当前密码不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: validMail, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    sendCode() {
      if (this.form.email && this.form.email !== this.email) {
        this.codeLoading = true
        this.buttonName = '验证码发送中'
        this.codeData.value = this.form.email
        const _this = this
        resetEmail(this.codeData).then(res => {
          this.$message({
            showClose: true,
            message: '发送成功，验证码有效期5分钟',
            type: 'success'
          })
          this.codeLoading = false
          this.isDisabled = true
          this.buttonName = this.time-- + '秒后重新发送'
          this.timer = window.setInterval(function() {
            _this.buttonName = _this.time + '秒后重新发送'
            --_this.time
            if (_this.time < 0) {
              _this.buttonName = '重新发送'
              _this.time = 60
              _this.isDisabled = false
              window.clearInterval(_this.timer)
            }
          }, 1000)
        }).catch(err => {
          this.resetForm()
          this.codeLoading = false
          console.log(err.response.data.message)
        })
      }
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.user = { email: this.form.email, password: this.form.pass }
          updateEmail(this.form.code, this.user).then(res => {
            this.loading = false
            this.resetForm()
            this.$notify({
              title: '邮箱修改成功',
              type: 'success',
              duration: 1500
            })
            store.dispatch('GetInfo').then(() => {})
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      window.clearInterval(this.timer)
      this.time = 60
      this.buttonName = '获取验证码'
      this.isDisabled = false
      this.form = { pass: '', email: '', code: '' }
    }
  }
}
</script>
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
<style>
.v-modal{
  left: 188px !important;
}
.el-dialog__wrapper{
  background: rgba(13, 29, 76, 0.8) !important;
  left: 188px !important;
}
  .el-dialog{
    background: url('../../../../assets/images/bg_denglu_kuang.png') no-repeat;
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
    background: url('../../../../assets/images/ic_qb_cz.png') no-repeat;
    background-size: 100% 100%;
    color: #fff !important;
  }
</style>
