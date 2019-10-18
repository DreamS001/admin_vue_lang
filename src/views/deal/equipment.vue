<template>
  <div class="wscn-http404-container">
    <div class="nav-a">
      <div class="block" style="width:1000px;min-width:500px;margin-left:30px;">
        <!-- <span class="demonstration">设备号：</span>
        <input type="text" v-model="device" /> -->
        <span class="demonstration">自定义查询：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          size="mini"
          range-separator="至"
          :start-placeholder="beginDatePlaceHolder"
          :end-placeholder="endDatePlaceHolder"
          @change="timeChange"
        ></el-date-picker>
        <div style="height:15px"></div>
        <span class="demonstration" style="margin-right:26px;">设备号：</span>
        <input type="text" v-model="name" style=" width:200px;border: 1px solid #2fe4ff;height:30px;" />
        <div style="display:inline-block">
          <span class="time" style="margin-left:100px" @click="queryData">查询</span>
          <span class="time" @click="download">导出</span>
        </div>
      </div>
      <div style="margin-left: 50px;margin-top:45px;">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://shipz.jie360.com.cn/api/device/import"
          :on-success="handleSuccess"
          :on-error="handleError"
          :before-upload="beforeUpload"
          :headers="headers"
          :show-file-list="false"
          :accept="accept"
        >
          <div class="time">批量导入</div>
        </el-upload>
      </div>
    </div>
    <div style="width:100%!important;margin-top:20px">
      <el-table
        :data="list"
        style="width: 100%!important"
         :row-class-name="setClassName"
        :header-row-class-name="handlemyclass"
      >
        <el-table-column
          :cell-class-name="colorblueclass"
          prop="create_time"
          label="添加时间"
          :formatter="dateFormat"
          align="center"
        ></el-table-column>
        <el-table-column prop="appid_token" label="设备号" align="center"></el-table-column>
        <el-table-column prop="loc_info" label="位置信息" align="center"></el-table-column>
        <el-table-column prop="shop_code" label="商家" align="center"></el-table-column>
        <el-table-column prop="enabled" label="是否激活" align="center">
          <template slot-scope="scope">
            <el-tag style="background:rgba(19, 206, 102, 1)" v-if="scope.row.enabled===1">激活</el-tag>
            <el-tag style="background:rgba(255, 73, 73, 1)" v-else="scope.row.enabled===0">停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" align="center">
          <template slot-scope="scope">
            <div class="jy-btn" @click="handleEdit(scope.$index, scope.row)">交易记录</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 浮层 -->
    </div>
    <!-- <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <span>详情</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div>
          <el-table
            :data="lielist"
            style="width: 100%!important"
            stripe
            height="400"
            :header-row-class-name="handlemyclass"
          >
            <el-table-column prop="complete_time" label="日期"></el-table-column>
            <el-table-column prop="qcf_device_num" label="设备号"></el-table-column>
            <el-table-column prop="loc_info" label="所属商家"></el-table-column>
          </el-table>
        </div>
      </div>
    </div> -->
    <!-- 浮层 -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <!-- <span>详情</span>
          <img @click="contribute" src="../../assets/logo/cuo.png"/> -->
          <div><span>查看明细</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div>
          <el-table :data="lielist" style="width: 100%!important" height="400" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
            <el-table-column prop="complete_time" label="日期" align="center"></el-table-column>
            <el-table-column prop="qcf_device_num" label="设备号" align="center"></el-table-column>
            <el-table-column prop="loc_info" label="位置信息" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { all, allpar, output ,allQuery,toquery} from "@/api/facility";
import { getToken } from "@/utils/auth";
import { formatDate } from "../../utils/date.js";
import $ from "jquery";
import moment from "moment";
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 1,
      name: "",
      device: "",
      list: [],
      FC: false,
      lielist: [],
      headers: {
        Authorization: "Bearer " + getToken(),
        "Access-Control-Allow-Origin": "localhost:8000"
      },
      accept:".xls,.xlsx",
      allList: [],
      pageSize1: 2147483647,
      clickQueryDate:false,
      id:"",
      beginDatePlaceHolder: "",
      endDatePlaceHolder: "",
      beginDate: '',
      endDate: '',
      value6: "",
    };
  },
  created() {
    this.refresh();
    var date = new Date()
    this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
    this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
    this.beginDate = ''
    this.endDate = ''

    // this.request()
  },
  // watch: {
  //   value6(val, oldVal) {
  //     if (val !== oldVal) {
  //       this.refresh()
  //     }
  //   }
  // },
  methods: {
    timeChange() {
    console.log('1111')
    if (this.value6 == undefined) {
      this.beginDate = ''
      this.endDate = ''
      console.log('222')
    } else {
      console.log('333')
      this.beginDate = moment(this.value6[0]).format('YYYY-MM-DD')
      this.endDate = moment(this.value6[1]).format('YYYY-MM-DD')
    }
  },
    refresh() {
      all(this.pageNo, this.pageSize ,this.beginDate, this.endDate).then(res => {
        if(res.code==200){
          console.log(res);
          this.list = eval(res.data.list);

          this.total = res.data.total;
          // alert(this.total)
        }
      });
    },
    setClassName({row, rowIndex}) {
        let index = rowIndex + 1;
        if(index %2 == 0){
            return 'warning-row'
        }else{
          return 'success-row'
        }
      },

  getData() {
    toquery(this.pageNo, this.pageSize1,this.beginDate,  this.endDate,this.name).then(res => {
      if(res.code==200){
        console.log(res);
        this.allList = eval(res.data.list);

        this.total = res.data.total;
          let date = JSON.parse(JSON.stringify(this.allList));
        date.forEach((v, i) => {
          date[i].enabled = date[i].enabled === 1 ? "激活" : "未激活";
          date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD");
        });

        require.ensure([], () => {
          const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
          const tHeader = ["添加时间", "设备号", "位置信息","商家", "是否激活"]; //将对应的属性名转换成中文
          // const tHeader = [];
          const filterVal = ["create_time", "appid_token", "loc_info","shop_code", "enabled"]; //table表格中对应的属性名
          const list = date; //想要导出的数据
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "设备管理excel");
        });
      }
    });
  },
  getAllData(){
    toquery(this.pageNo, this.pageSize1, this.beginDate,  this.endDate,this.name).then(res => {
      if(res.code==200){
        this.allList = eval(res.data.list);
        let date = JSON.parse(JSON.stringify(this.allList));
        // 转换时间戳
        date.forEach((v, i) => {
          date[i].enabled = date[i].enabled === 1 ? "激活" : "未激活";
          date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD");
        });
        require.ensure([], () => {
          const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
          const tHeader = ["添加时间", "设备号", "位置信息","商家", "是否激活"]; //将对应的属性名转换成中文
          // const tHeader = [];
          const filterVal = ["create_time", "appid_token", "loc_info","shop_code", "enabled"]; //table表格中对应的属性名
          const list = date; //想要导出的数据
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "设备管理excel");
        });
      }
    });

  },
    queryData() {
    console.dir(this.name)
    this.pageNo = 1

    // this.clickQueryDate = true;
    if (this.value6) {
      console.log('1111')
      this.beginDate = moment(this.value6[0]).format("YYYY-MM-DD");
      this.endDate = moment(this.value6[1]).format("YYYY-MM-DD");
      toquery(this.pageNo, this.pageSize, this.beginDate, this.endDate,this.name).then(res => {
        if(res.code==200){
          this.allList = eval(res.data.list);
          let date = JSON.parse(JSON.stringify(this.allList));
        // 转换时间戳
          date.forEach((v, i) => {
            // date[i].enabled = date[i].enabled === 1 ? "激活" : "未激活";
            date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD");
          });
          this.list = date;
          this.total = res.data.total;
        }
      });
    } else {
      console.log('222')
      toquery(this.pageNo, this.pageSize, this.beginDate ,this.endDate,this.name).then(res => {
        if(res.code==200){
          this.list = eval(res.data.list);
          this.total = res.data.total;
        }
      });
    }
    //
    // tradeQuery(this.pageNo, this.pageSize1, this.time, this.times,this.name).then(
    //   res => {
    //     this.allList = eval(res.list);
    //     this.total = res.total;
    //   }
    // );
  },
  //   queryData() {
  //     this.pageNo=1
  //     this.clickQueryDate = true;
  //      console.log(this.device);
  //     if(this.merchant){
  // allQuery(this.pageNo, this.pageSize,this.device,this.merchant).then(res => {
  //       this.list = eval(res.list);


  //       this.total = res.total;

  //     });
  //     allQuery(this.pageNo, this.pageSize1,this.device,this.merchant).then(
  //       res => {
  //         this.allList = eval(res.list);
  //         this.total = res.total;
  //         // this.merchant=""
  //       }
  //     );
  //     }else{
  //        allQuery(this.pageNo, this.pageSize,this.device,this.merchant).then(res => {
  //       this.list = eval(res.list);


  //       this.total = res.total;
  //     });
  //     allQuery(this.pageNo, this.pageSize1,this.device,this.merchant).then(
  //       res => {
  //         this.allList = eval(res.list);
  //         this.total = res.total;
  //       }
  //     );
  //     }



    // },
    // queryDate() {
    //   console.dir(this.merchant)
    //   this.pageNo = 1
    //   this.clickQueryDate = true;
    //   if (this.value6) {
    //     this.time = moment(this.value6[0]).format("YYYY-MM-DD");
    //     this.times = moment(this.value6[1]).format("YYYY-MM-DD");
    //     tradeQuery(this.pageNo, this.pageSize, this.time, this.times,this.merchant).then(res => {
    //       this.list = eval(res.list);

    //       this.total = res.total;
    //     });
    //   } else {
    //     tradeQuery(this.pageNo, this.pageSize, '', '',this.merchant).then(res => {
    //       this.list = eval(res.list);

    //       this.total = res.total;
    //     });
    //   }
    // },


    dateFormat(row, column) {
      var date = new Date(row.create_time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
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
    // 导出
  download() {
    if (!this.value6 && !this.name) {
      this.getAllData()
    } else {
      console.log('1111')
      this.getData()
    }
  },

    // download () {
    //           let that = this;
    //           $.ajax({
    //               url:'http://localhost:8000/api/device/output', //后台下载信息的请求链接
    //               type: "GET",
    //               responseType: 'arraybuffer',
    // 						headers:that.headers,
    //               success: function(response){ //response为后台返回的流数据信息
    //                   var blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
    // 								var downloadElement = document.createElement('a');
    // 								var href = window.URL.createObjectURL(blob); // 创建下载的链接
    // 								downloadElement.href = href;
    // 								downloadElement.download = '111.xlsx'; // 下载后文件名
    // 								document.body.appendChild(downloadElement);
    // 								downloadElement.click(); // 点击下载
    // 								window.URL.revokeObjectURL(href); // 释放掉blob对象
    //               },
    //               error: function(data) {
    //                   alert("下载失敗"+data);
    //               }
    //           });
    // },
    // 数据转换函数
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    //批量导入成功回调
    handleSuccess(res) {
      this.$message({
        message: "导入成功!" + res.result + "," + res.add + "," + res.update,
        type: "success"
      });
      this.refresh();
    },
    //批量导入失败回调
    handleError() {
      this.$message("导入失败!");
    },
    //上传前校验文件类型，防止后台抛异常
    beforeUpload(file) {
      var filename = file.name;
      var fix = filename.substring(filename.indexOf("."));
      if (".xls" == fix || ".xlsx" == fix) {
        return true;
      } else {
        this.$message({
          message: "文件类型错误,请重新选择文件再次上传!",
          type: "error"
        });
      }
      return false;
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
    if(this.clickQueryDate == false){
        this.refresh();
    }else{
      allQuery(this.pageNo, this.pageSize,this.device,this.name).then(res => {
        if(res.code==200){
          this.list = eval(res.data.list);
          this.total = res.data.total;
        }
    })
      // alert(this.pageNo)
    }
    },
    // 关闭浮层
    contribute() {
      this.FC = false;
    },
    // 查看
    handleEdit($index, row) {
      // alert(row);
      this.FC = true;
      console.log(row.appid_token);
      allpar(row.appid_token).then(res => {
        if(res.code==200){
          console.log(res);
          console.log(21);
          this.lielist = eval(res.data.list);
        }

      });
    }
  },

  // created() {
  //   this.refresh();
  //   var date = function() {
  //     var date = new Date();
  //     var seperator1 = "-";
  //     var year = date.getFullYear();
  //     var month = date.getMonth() + 1;
  //     var strDate = date.getDate();
  //     if (month >= 1 && month <= 9) {
  //       month = "0" + month;
  //     }
  //     if (strDate >= 0 && strDate <= 9) {
  //       strDate = "0" + strDate;
  //     }
  //     var currentdate = year + seperator1 + month + seperator1 + strDate;
  //     // console.log(123123);

  //     return currentdate;
  //   };
  //   var dates = function() {
  //     var date = new Date();
  //     var seperator1 = "-";
  //     var year = date.getFullYear();
  //     var month = date.getMonth() + 1;
  //     var strDate = date.getDate();
  //     if (month >= 1 && month <= 9) {
  //       month = "0" + month;
  //     }
  //     if (strDate >= 0 && strDate <= 9) {
  //       strDate = "0" + strDate;
  //     }
  //     var currentdate = year + seperator1 + month + seperator1 + strDate;

  //     return currentdate;
  //   };
  //   this.time = date();
  //   this.times = dates();
  // }
};
</script>
<style  rel="stylesheet/scss" lang="scss" >
.test {
  color: #fff !important;
  // background: #4986ff !important;
  font-weight: 100;
  width: 100% !important;
}
.el-tag{
    // background-color: transparent;
    display: inline-block;
    // padding: 0 10px;
    width: 90px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    // border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid transparent;
    white-space: nowrap;
    color: #fff !important;
    border-radius: 0;
  }
  .jy-btn{
    width: 110px;
    height: 30px;
    background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    outline: none;
    border-radius: 0;
    border: none;
    line-height: 30px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
    background: transparent;
    min-height: calc(100vh - 84px);
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .nav-a {
    width: 100%;
    height: 120px;
    background: url('../../assets/images/bg_caozuo.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    color: #fff;
    .el-range-editor--mini.el-input__inner{
      border: 1px solid rgba(47, 228, 255, 1) !important;
      background: rgba(24, 136, 203, 1) !important;
    }
  }

  .block {
    font-size: 13px;
    // margin-left: 30px;
  }

  .time {
      display: inline-block;
    width: 110px;
    height: 30px;
    // background: #4986ff;
    background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
    background-size: 100% 100%;
    font-size: 14px;
    // padding: 8px 20px;
    color: rgba(43, 250, 255, 1);
    margin: 0 20px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }

.blue {
  color: #2cc23c !important;
}
.fuCeng {
    position: fixed;
    z-index: 1002;
    left: 188px;
    right: 0;
    bottom: 0;
    top: 0;
    // width: 100%;
    // height: 100vh;
    background: rgba(13, 29, 76, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 70%;
      height: 506px;
      // background: white;
      background: url('../../assets/images/bg_qb_ckmx.png') no-repeat;
      background-size:100% 100%;
      // overflow-x: hidden;
      // overflow-y: scroll;
      padding: 22px;
      box-sizing: border-box;
      h4 {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        margin: 0;
        // background: #4986ff;
        color: white;
        font-weight: 100;

        >div{
          >img{
            width: 42px;
            height: 11px;
            margin-left: 10px;
          }
        }
        >img {
          width: 80px;
          height: 30px;
        }
      }

      div {
        // margin-top: 10px;

        p {
          font-size: 15px;
          text-align: center;

          span {
            margin: 20px;
            padding: 7px 20px;
            font-size: 12px;
            // border: 1px solid gainsboro;
            margin: 0 40px;
          }

          // span:nth-of-type(1) {
          //   background: #4986ff;
          //   color: white;
          // }

          // span:nth-of-type(2) {
          //   background: #fff;
          //   color: #c2c2c2;
          // }
        }

        p:nth-of-type(3) {
          margin-top: 60px;
        }
      }
    }
  }

</style>


<style>
.el-table .warning-row{
      background:rgba(24, 136, 203, 0.4)!important;
      /* background:red !important; */
  }
  .el-table .success-row{
      background:rgba(24, 136, 203, 0.2)!important;
  }
  input{
    background: transparent;
    padding-left: 10px;
    color: #fff !important;
  }
  input::-webkit-input-placeholder{
    color: #fff !important;
  }
  .el-table{
    background-color: transparent !important;
  }
  .el-table th, .el-table tr {
      background-color: rgba(24, 136, 203, 0.2);
      color: #fff !important;
  }
  .el-table th.is-leaf, .el-table td{
    border-bottom: 1px solid transparent;
  }
  .el-table--enable-row-hover{
    background: rgba(24, 136, 203, 0.2) !important;
  }
  .el-table__body tr:hover>td{
    background-color: rgba(24, 136, 203, 0.4)!important;
  }

  .el-table__body tr.current-row>td{
    background-color: rgba(24, 136, 203, 0.4)!important;
  }
  .el-table, .el-table__expanded-cell:hover,.el-table th, .el-table tr:hover{
    background: rgba(24, 136, 203, 0.5) !important;
  }

  .el-pagination span:not([class*=suffix]), .el-pagination button{
    color: #fff;
  }
  .el-pagination .el-select .el-input .el-input__inner,.el-pagination button:disabled,.el-pager li,.el-pagination .btn-prev, .el-pagination .btn-next,.el-pagination__editor.el-input .el-input__inner{
    background: transparent !important;
    color: #fff !important;
  }
  .el-pagination .el-select .el-input .el-input__inner,.el-pagination__editor.el-input .el-input__inner{
    border-color: rgba(47, 228, 255, 0.2) !important;
  }
  .el-pager li.active{
    color: rgba(47, 228, 255, 1) !important;
  }
  .el-button--primary{
    /* width: 110px;
    height: 30px;
    background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
    background-size: 100% 100%;
    border: 1px solid transparent;
    border-radius: 0px;
    color: rgba(43, 250, 255, 1); */
  }
</style>
