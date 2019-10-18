<template>
  <div class="wscn-http404-container">
    <div class="nav">
      <div class="block" style="width:100%" >
        <span class="demonstration" >购买日期：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          size="mini"
          range-separator="至"
          :start-placeholder="time"
          :end-placeholder="times"
        ></el-date-picker>

        <!-- <span class="demonstration">产品组合：</span>
        <select class="select-a" name id>
          <option value="全部产品">全部产品</option>
          <option value="产品1">产品1</option>
          <option value="产品2">产品2</option>
          <option value="产品3">产品3</option>
          <option value="产品4">产品4</option>
        </select> -->
        <span class="demonstration" >购买人：</span>
        <input style="width:200px;height:28px;border:1px solid #DCDFE6" v-model="uname" />
        <span class="time" style="margin-left:100px" @click="queryDate">查询</span>
        <span class="time" style="background:#09BD22" >导出</span>
      </div>
    </div>
    <div style="width:100%!important;margin:20px">
      <el-table
        :data="list"
        style="width: 100%!important"
        stripe
        :header-row-class-name="handlemyclass"
      >
        <el-table-column :cell-class-name="colorblueclass" prop="appid_token" label="设备号"></el-table-column>
        <el-table-column prop="app_name" label="购买钱包"></el-table-column>
        <el-table-column prop="create_time" label="购买日期" >
         <template slot-scope="scope">{{scope.row.create_time|formatDate}}</template>
        </el-table-column>
        <el-table-column prop="app_name" label="产品名称"></el-table-column>
        <el-table-column prop="loc_info" label="购买人"></el-table-column>
        <el-table-column prop="appid_token" label="查看设备编号">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">立即查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[5, 10, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { all,toquery} from "@/api/facility";
import moment from "moment";
import { formatDate } from "@/api/filters.js";

export default {
  data() {
    return {
      value6: "",
      input1: "",
      pageNo: 1,
      pageSize: 10,
      total: 1,
      list: [],
      time: "",
      times: "",
      allList: [],
      pageSize1: 2147483647,
      uname:""
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  },
  methods: {
    // 查看
    handleEdit($index, row) {
      console.log(row.id);
      const h = this.$createElement;

      this.$notify({
        title: "设备编号:",
        message: row.appid_token,
        duration: 0
      });
    },
    // 请求数据
    refresh() {
      console.log(1111);
      all(this.pageNo, this.pageSize).then(res => {
        console.log(res);
        this.list = eval(res.list);
        this.total = res.total;
        // alert(this.total)
      });
    },
    getDate() {
      all(this.pageNo, this.pageSize1).then(res => {
        this.allList = eval(res.list);
          let date = JSON.parse(JSON.stringify(this.allList));
      // 转换时间戳
      date.forEach((v, i) => {
        date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD");
      });

      require.ensure([], () => {
        const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
        const tHeader = [
          "设备号",
          "购买钱包",
          "购买日期",
          "产品名称",
          "购买人",
          "设备编号"
        ]; //将对应的属性名转换成中文
        // const tHeader = [];
        const filterVal = [
          "appid_token",
          "app_name",
          "create_time",
          "app_name",
          "loc_info",
          "appid_token"
        ]; //table表格中对应的属性名
        const list = date; //想要导出的数据
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "购买设备excel");
      });
        // alert(this.total)
      });
    },
    // 查询
    queryDate() {
      this.pageNo=1
      this.time= moment(this.value6[0]).format("YYYY-MM-DD")
      this.times=moment(this.value6[1]).format("YYYY-MM-DD")

      toquery(this.pageNo,this.pageSize,this.time,this.times,this.uname).then(res => {

        this.list= eval(res.list);
        this.total = res.total;
        // alert(this.total)
        // console.log("1");
      })
    },

    // 导出

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      // console.log(row, column, rowIndex, columnIndex);
      return "test";
    },
    colorblueclass: function(row, column, rowIndex, columnIndex) {
      console.log(columnIndex);
      if (columnIndex == 2) {
        return "blue";
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // alert(this.pageSize)
      this.refresh();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNo = val;
      // alert(this.pageNo)
      this.refresh();

    }
  },

  created() {
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
      var strDate = date.getDate() ;
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
  }
};
</script>

<style  rel="stylesheet/scss" lang="scss" >
.test {
  color: #fff !important;
  // background: #4986ff !important;
  font-weight: 100;
  width: 100% !important;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
  background: #f0f2f5;
  min-height: calc(100vh - 84px);
  width: 100%;
}
.nav {
  width: 100%;
  height: 112px;
  background: #fff;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.block {
  font-size: 13px;
  margin-left: 30px;
}
.time {
  width: 60px;
  height: 30px;
  background: #4986ff;
  font-size: 12px;
  padding: 8px 20px;
  color: #f0f2f5;
  margin: 0 20px;
  cursor: pointer;
}

.blue {
  color: #2cc23c !important;
}
.select-a {
  width: 200px;
  height: 28px;
  border: 1px solid #dcdfe6;
  text-align: center;
  text-align-last: center;
  margin-right: 50px;
}
</style>


<style>
input{
    background: transparent;
    padding-left: 10px;
    color: #fff !important;
  }
  input::-webkit-input-placeholder{
    color: #fff !important;
  }
</style>
