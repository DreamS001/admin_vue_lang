<template>
  <el-dialog :visible.sync="dialog" :title="isAdd ? '新增用户' : '编辑用户'" append-to-body width="570px">
    <el-form ref="form" :inline="true" :model="form" :rules="rules" size="small" label-width="70px" >
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="form.username" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="状态" prop="enabled">
        <el-radio
          v-for="item in dicts"
          :key="item.id"
          v-model="form.enabled"
          :label="item.value"
        >{{ item.label }}</el-radio>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model.number="form.phone"  placeholder="请输入电话"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"  placeholder="请输入邮箱"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"  placeholder="请输入密码" type="password"/>
      </el-form-item>
      <!-- <el-form-item label="授权码" prop="authCode">
        <el-input v-model="form.authCode" placeholder="用户类型为商户须填写" />
      </el-form-item>
      <el-form-item label="商户费率" prop="merchantRate">
        <el-input v-model="form.merchantRate" />
      </el-form-item>-->
      <!-- <el-form-item label="代理等级">
        <treeselect
          v-model="deptId"
          :options="depts"
          :style="style"
          placeholder="选择代理"
          @select="selectFun"
        />
      </el-form-item> -->
      <!-- <el-form-item label="用户类型">
        <el-select v-model="jobId" :style="style" placeholder="请先选择部门">
          <el-option
            v-for="(item, index) in jobs"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-bottom: 0px;" label="用户角色">
        <el-select v-model="roleIds" style="width: 450px;" multiple placeholder="请选择">
          <el-option
            v-for="(item, index) in roles"
            :disabled="level !== 1 && item.level <= level"
            :key="item.name + index"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="text" @click="doSubmit">确认</el-button>
    </div>
    <!-- {{form}} -->
  </el-dialog>
</template>

<script>
import { add, edit } from "@/api/user";
import { getDepts } from "@/api/dept";
import { getAll, getLevel } from "@/api/role";
import { getAllJob } from "@/api/job";
import { getInfo } from '@/api/login'
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { getToken } from "@/utils/auth";
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
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!this.isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };
    return {
      dialog: false,
      loading: false,
      form: {
        username: "",
        email: "",
        enabled: "true",
        roles: [],
        job: { id: "" },
        dept: { id: "" },
        phone: null,
        authCode: "",
        merchantRate: ""
      },
      roleIds: [],
      roles: [],
      depts: [],
      deptId: null,
      jobId: null,
      jobs: [],
      style: "width: 184px",
      level: 3,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        phone: [{ required: true, trigger: "blur", validator: validPhone }],
        enabled: [{ required: true, message: "状态不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    const explorer = navigator.userAgent;
    if (explorer.indexOf("Chrome") >= 0) {
      this.style = "width: 184px";
    } else {
      this.style = "width: 172px";
    }
    this.getUserDate()
  },
  methods: {
    cancel() {
      this.resetForm();

    },
    doSubmit() {
      // this.form.dept.id = this.deptId;
      // this.form.job.id = this.jobId;
      // this.$refs["form"].validate(valid => {
      //   if (valid) {
      //     if (this.deptId === null || this.deptId === undefined) {
      //       this.$message({
      //         message: "部门不能为空",
      //         type: "warning"
      //       });

      //     } else if (this.roleIds.length === 0) {
      //       this.$message({
      //         message: "角色不能为空",
      //         type: "warning"
      //       });
      //     } else {
      //       this.loading = true;
      //       this.form.roles = [];
      //       const _this = this;
      //       this.roleIds.forEach(function(data, index) {
      //         const role = { id: data };
      //         _this.form.roles.push(role);
      //       });
      //       if (this.isAdd) {
      //         this.doAdd();
      //       } else this.doEdit();
      //     }
      //   } else {
      //     return false;
      //   }
      // });
        if (this.isAdd) {
              this.doAdd();
            } else this.doEdit();
    },
    doAdd() {
      add(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "添加成功",
            message: "默认密码：123456",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.$parent.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    doEdit() {
      edit(this.form)
        .then(res => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500
          });
          this.loading = false;
          this.$parent.init();
        })
        .catch(err => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    resetForm() {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.deptId = null;
      this.jobId = null;
      this.roleIds = [];
      this.form = {
        username: "",
        email: "",
        enabled: "false",
        roles: [],
        job: { id: "" },
        dept: { id: "" },
        phone: null
      };
    },
    getRoles() {
      getAll()
        .then(res => {
          this.roles = res;
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    getJobs(id) {
      getAllJob(id)
        .then(res => {
          this.jobs = res.content;
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
    getDepts() {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.content;
        console.log(res.content);
        console.log(123);
      });
    },
    isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      return reg.test(str);
    },
    selectFun(node, instanceId) {
      this.getJobs(1);
    },
    getRoleLevel() {
      getLevel()
        .then(res => {
          this.level = res.level;
        })
        .catch(err => {
          console.log(err.response.data.message);
        });
    },
       getUserDate() {
         getInfo().then(res=>{
           console.log(res)
         })

    //   this.axios

    //     .get("http://shipz.jie360.com.cn/auth/info", {
    //       headers: {
    //         Authorization: "Bearer " + getToken(),
    //         "Access-Control-Allow-Origin": "localhost:8000"
    //       }
    //     })
    //     .then(function(response) {
    //       console.log(response.data);
    //       // return this.resdata=response.data
    //     });
    }
  }
};
</script>
<style rel= "stylesheet/scss"lang="scss" scoped>
    input{

    border:1px solid rgba(47, 228, 255, 1) !important;

  }
</style>
<style>
 input{
    background: rgba(24, 136, 203, 0.3) !important;
    /*
    width:400px;
    height: 40px; */
    color: #fff !important;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .el-input__inner::-webkit-input-placeholder,input::-webkit-input-placeholder{
    color: #fff !important;
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
  input:-webkit-autofill {
      /* //input 背景色     #0C2034根据自己需要替换 */
      -webkit-box-shadow : 0 0 0px 1000px rgba(24, 136, 203, 0.5) inset !important;
      /* //input字体颜色 颜色根据自己要求替换 */
      -webkit-text-fill-color: rgba(24, 136, 203, 0.5) !important;

}
</style>
