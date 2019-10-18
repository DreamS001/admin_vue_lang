<template>
  <div :class="className" :style="{height:height,width:width,margin:margin}">
    <div style="background:#f0f2f5">
      <header>
        <div class="block" style=" white-space : nowrap;">
          <span>自定义查询：</span>
          <el-date-picker
            v-model="value6"
            type="daterange"
            size="mini"
            range-separator="至"
            :start-placeholder="time"
            :end-placeholder="times"
          ></el-date-picker>
          <span style="margin-left:20px">投资人编号：</span>
          <input type="text" v-model="team" />
        </div>
        <div style="margin-top:10px; white-space : nowrap;">
          <span>账号：</span>
          <input type="text" v-model="team" />
          <span style="margin-left:20px ;margin-right：14px;">联系方式：</span>
          <input type="text" v-model="team" />
          <a style="background:#4986FF" href="javaScrtpt:0">查询</a>
          <a style="background:#09BD22" href="javaScrtpt:0">导出</a>

          <a @click="adds" style="background:#00C3DA;float: right;" href="javaScrtpt:0">添加投资人</a>
        </div>
      </header>
      <footer style="margin-top:20px;font-size:12px; ">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100% white-space : nowrap;"
          :stripe="true"
          @selection-change="handleSelectionChange"
          :header-row-class-name="handlemyclass"
        >
          <el-table-column prop="createTime" label="日期"></el-table-column>
          <el-table-column prop="merchantId" label="投资人编号"></el-table-column>
          <el-table-column prop="job.name" label="投资人名称"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <el-table-column prop="username" label="账号"></el-table-column>
          <el-table-column prop="roles.length" label="下线 / 台"></el-table-column>
          <el-table-column prop="offlinePrice" label="投资金额（美金）"></el-table-column>
          <el-table-column prop="merchantRate" label="所剩余额（美金）"></el-table-column>
          <el-table-column prop="address" label="操作" width="10">
            <template slot-scope="scope">
              <el-button size="mini" @click="compile(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="deletes(scope.$index, scope.row)">删除</el-button>
              <el-button size="mini" @click="examines(scope.$index, scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>

        </div>-->
        <div class="block" style="margin-bottom:50px;padding-bottom:20px">
          <el-pagination
            @size-change="handlePageChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[5, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </footer>
    </div>
    <!-- 浮层 -->
    <article class="shadow" v-show="shadows">
      <div class="box">
        <h5>
          <span>{{nameing}}</span>
          <img @click="shadowing" src="../../assets/logo/cuo.png" alt />
        </h5>
        <!-- 查看 -->
        <article class="boxa" v-if="adding">
          <p>
            <span>投资人编号：</span>
            <span>{{examine.merchantId}}</span>
          </p>
          <p>
            <span>投资人名称：</span>
            <span>{{examine.jobname}}</span>
          </p>
          <p>
            <span>联系方式：</span>
            <span>{{examine.phone}}</span>
          </p>
          <p>
            <span>账号：</span>
            <span>{{examine.username}}</span>
          </p>
          <p>
            <span>下线：</span>
            <span>{{examine.length}}</span>
          </p>
          <p>
            <span>投资金额：</span>
            <span>{{examine.offlinePrice}}</span>
          </p>
          <p>
            <span>所剩余额：</span>
            <span>{{examine.merchantRate}}</span>
          </p>
          <div>
            <span>确定</span>
            <span @click="shadowing">取消</span>
          </div>
        </article>
        <!-- 添加 -->
        <article class="boxb" v-else>
          <p>
            <span>*</span>
            <span>投资人名称：</span>
            <input placeholder="请输入投资人名称" v-model="addmessage.job.name" type="text" />
          </p>
          <p>
            <span>*</span>
            <span>联系方式：</span>
            <input
              placeholder="请输入联系方式"
              v-model="addmessage.phone"
              oninput="value=value.replace(/[^\d]/g,'')"
              type="text"
            />
          </p>
          <p>
            <span>*</span>
            <span>账号：</span>
            <input placeholder="请输入账号" v-model="addmessage.username" type="text" />
          </p>
          <p>
            <span>*</span>
            <span>密码：</span>

            <input placeholder="请输入密码" v-model="addmessage.passWord" type="password" />
          </p>
          <p>
            <span>*</span>
            <span>再次输入密码：</span>
            <input placeholder="请再次输入密码" v-model="addmessage.passWords" type="password" />
          </p>
          <p>
            <span>*</span>
            <span>下线：</span>
            <input
              v-model="addmessage.number"
              oninput="value=value.replace(/[^\d]/g,'')"
              type="text"
            />/人
          </p>
          <div class="block">
            <span class="demonstration">单选选择任意一级选项</span>
            <el-cascader :options="options" :props="{ value:'id', checkStrictly: true }" clearable></el-cascader>
          </div>
          <div>
            <span @click="adds">确定</span>
            <span>重置</span>
          </div>
        </article>
      </div>
    </article>
  </div>
</template>
<script>
import { alllist, add } from "@/api/team";
import { getDepts } from "@/api/dept";
import { getAllJob } from "@/api/job";
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    margin: {
      type: String,
      default: "0 0 200px 0"
    },
    height: {
      type: String,
      default: "500px"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      time: "",
      times: "",
      adding: false,
      value6: "",
      team: "",
      nameing: "",
      shadows: false,
      pageNo: 1,
      pageSize: 10,
      total: 1,
      deptId: "",
      options: [],
      addmessage: {
        job: { name: "" },
        phone: "",
        username: "",
        passWord: "",
        passWords: "",
        number: ""
      },
      tableData: [],
      examine: {
        merchantId: "",
        jobname: "",
        phone: "",
        username: "",
        length: "",
        offlinePrice: "",
        merchantRate: ""
      }
    };
  },

  methods: {
    beforeInit() {
      this.url = "api/users";
      const sort = "id,desc";
      const query = this.query;
      const type = query.type;
      const value = query.value;
      const enabled = query.enabled;
      this.params = {
        page: this.page,
        size: this.size,
        sort: sort,
        deptId: this.deptId
      };
      if (type && value) {
        this.params[type] = value;
      }
      if (enabled !== "" && enabled !== null) {
        this.params["enabled"] = enabled;
      }
      return true;
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
    selectFun(node, instanceId) {
      this.getJobs(1);
    },

    getDepts() {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.content;
        console.log(res.content);
        console.log(123);
      });
    },
    // 浮层
    shadowing() {
      this.shadows = false;
    },
    // 添加投资人
    adds() {
      this.adding = false;
      this.nameing = "新增投资人";
      if (this.shadows == false) {
        this.shadows = true;
      } else {
        this.shadows = false;
      }
      console.log(this.addmessage.job.name);
    },
    //编辑
    compile() {
      console.log("编辑");
    },
    //删除
    deletes() {
      console.log("删除");
    },
    //查看详情
    examines($index, row) {
      var i = $index;
      this.examine.merchantId = this.tableData[i].merchantId;
      this.examine.jobname = this.tableData[i].job.name;
      this.examine.phone = this.tableData[i].phone;
      this.examine.username = this.tableData[i].username;
      this.examine.length = this.tableData[i].roles.length;
      this.examine.offlinePrice = this.tableData[i].offlinePrice;
      this.examine.merchantRate = this.tableData[i].merchantRate;

      console.log(this.examine.merchantId);
      this.adding = true;
      this.shadows = true;
      this.nameing = "投资人详情";
      console.log("查看详情");
    },
    //更改密码
    change() {
      console.log("更改密码");
    },

    // 列表头部样式
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      // console.log(row, column, rowIndex, columnIndex);
      return "test";
    },
    handlePageChange(val) {
      this.pageSize = val;
      // alert(this.pageSize)
      this.refresh();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      // alert(this.pageNo)
      this.refresh();
    },

    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    refresh() {
      console.log(this.pageNo, this.pageSize);
      alllist(this.pageNo, this.pageSize).then(res => {
        console.log(res);
        this.tableData = res.content;
        console.log(res.content.length);
        this.total = res.content.length;
      });
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
  },
  created() {

    getDepts().then(res => {
      console.log(res);
      this.options = res.content;
    });
    this.refresh();

    var date = function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      console.log(123123);

      return currentdate;
    };
    var dates = function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      console.log(123123);

      return currentdate;
    };
    this.time = date();
    this.times = dates();
      this.getDeptDatas()

  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.test {
  color: #fff !important;
  background: #4986ff !important;
  font-weight: 100;
  font-size: 12px;
  width: 100% !important;
  text-align: center;
}
.cell {
  white-space: nowrap;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
header {
  height: 80px;
  width: 100%;
  background: white;
  padding: 10px;
  font-size: 12px;
  span {
    display: inline-block;
    width: 100px;
  }
  input {
    width: 200px;
    height: 27px;
    border: 1px solid gainsboro;
    border-radius: 2px;
  }
  a {
    padding: 5px 15px;
    color: #fff;
    margin-left: 30px;
  }
}
// .el-table {
//   font-size: 12px;
// }
//阴影
.shadow {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 280px;
    height: 248px;
    background: white;
    font-size: 10px;

    h5 {
      width: 100%;
      height: 26px;
      background: #4986ff;
      color: #fff;
      padding: 0 15px;
      line-height: 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      font-weight: 100;
      img {
        width: 10px;
        height: 10px;
      }
    }
    .boxa {
      p {
        padding: 0 20px;
        margin: 10px 0;
        display: flex;

        span {
          flex-grow: 1;
        }
      }
      div {
        display: flex;
        justify-content: center;
        span {
          padding: 5px 15px;
          background: #4986ff;
          color: #fff;
          margin: 20px 20px;
        }
        span:nth-of-type(2) {
          background: #ffffff;
          color: #c3c3c3;
          border: 1px solid #c3c3c3;
        }
      }
    }
  }
}
.boxb {
  p {
    padding: 0 15px;
    margin: 15px 0;
    span:nth-of-type(1) {
      color: red;
    }
    span:nth-of-type(2) {
      width: 80px;
      display: inline-block;
    }
    input {
      width: 130px;
      height: 15px;
      border: 1px solid gainsboro;
      padding: 5px 15px;
      margin-right: 10px;
    }
  }
  div {
    display: flex;
    justify-content: center;
    span {
      padding: 5px 15px;
      background: #4986ff;
      color: #fff;
      margin: 0px 20px;
    }
    span:nth-of-type(2) {
      background: #ffffff;
      color: #c3c3c3;
      border: 1px solid #c3c3c3;
    }
  }
}
.el-table::before {
  width: 0;
}
</style>
