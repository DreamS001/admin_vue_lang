<template>
  <div class="wscn-http404-container">
    <div class="nav-a">
      <div class="block" style="margin-left:30px;">
        <span class="demonstration" style="width:100px;display:inline-block;">{{$t('financeCash.custom_query')}}：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          size="mini"
          :range-separator="$t('financeCash.to')"
          :start-placeholder="beginDatePlaceHolder"
          :end-placeholder="endDatePlaceHolder"
           @change="timeChange"
        ></el-date-picker>
        <div style="height:15px"></div>
        <span class="demonstration" style="width:100px;display:inline-block;">{{$t('financeCash.serial_number')}}：</span>
        <input
          style="width:200px;height:28px;border:1px solid #2fe4ff"
          type="text"
          v-model="name"
        />
        <span class="time" style="margin-left:100px" @click=" queryData">{{$t('financeCash.query')}}</span>
        <span class="time" @click="download">{{$t('financeCash.export')}}</span>
        <!-- <button @click="btt">点击</button> -->
      </div>
    </div>
    <div style="width:100%!important;margin-top:20px">
      <el-table :header-row-class-name="handlemyclass" :data="list" style="width: 100%" :row-class-name="setClassName"  highlight-current-row >
        <el-table-column prop="merchant_order_id" :label="$t('financeCash.serial_number')" align="center"></el-table-column>
				<el-table-column prop="merchant_order_id" :label="$t('financeCash.name')" align="center"/>
        <el-table-column prop="qcf_device_num" :label="$t('financeCash.device_number')" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="complete_time" :label="$t('financeCash.date_trade')" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="order_amount" :label="$t('financeCash.transaction_amount')" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="order_status" :label="$t('financeCash.trading_status')" align="center" :show-overflow-tooltip="true">
					<template slot-scope="scope">
            <!-- <div class="status-box" v-if="scope.row.order_status==0">{{scope.row.order_status|formatrStatus}}</div> -->
            <div class="status-box" style="background:rgba(255, 73, 73, 1);" v-if="scope.row.order_status===0">{{$t('financeCash.not_submitted')}}</div>
            <div class="status-box" style="background:rgba(19, 206, 102, 1);" v-else-if="scope.row.order_status===3">{{$t('financeCash.successful_trade')}}</div>
            <div class="status-box" style="background:rgba(47, 228, 255, 1);" v-else-if="scope.row.order_status===5">{{$t('financeCash.refund_completed')}}</div>
            <div class="status-box" style="background:rgba(19, 206, 102, 1);" v-else-if="scope.row.order_status===7">{{$t('financeCash.order_cancelled')}}</div>
            <div class="status-box" style="background:rgba(255, 73, 73, 1);" v-else>{{$t('financeCash.unknown_state')}}</div>
          </template>
				</el-table-column>
        <el-table-column prop="loc_info" :label="$t('financeCash.remark')" align="center" :show-overflow-tooltip="true"></el-table-column>
      </el-table>



    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[10,20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

  </div>
</template>

<script>
import { trade, trades ,tradeQuery} from "@/api/facility";
import moment from "moment";
import request from '@/utils/request'
import {formatDate} from '../../utils/date.js'
import { financeEarnings,financeCash } from '@/utils/i18n'// 国际化主题名字

import Cookies from 'js-cookie'
var lang=Cookies.get('language') || 'en';
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 1,
      name: "",
      value6: "",
      currentPage4: 4,
      device: "",
      list: [],
      beginDatePlaceHolder: "",
      endDatePlaceHolder: "",
      beginDate: '',
      endDate: '',
      allList:[],
      pageSize1:2147483647,
      name:""
    };
  },
  created() {

    var date = new Date()
    this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
    this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
    this.beginDate = ''
    this.endDate = ''
    this.refresh();
    // this.request()
  },
  filters: {
    formatrStatus(status){
      return status==0?'未提交':status==3?'交易成功':status==5?'退款完成':status==7?'订单已撤销':'未知状态'
    }
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
    setClassName({row, rowIndex}) {
        let index = rowIndex + 1;
        if(index %2 == 0){
            return 'warning-row'
        }else{
          return 'success-row'
        }
      },
    // btt() {
    //   console.log(value6);
    // },

    // 请求全部数据
    refresh() {
      // console.log(1111);
      trade(this.pageNo, this.pageSize).then(res => {
        // console.log(res);
        if(res.code==200){
          this.list = eval(res.data.list);
          this.total = res.data.total;
        }
      });
      // trades(this.ids).then(res => {
      //   // console.log(res);
      //   this.list = eval(res.list);
      //   this.total = res.total;
      //     // console.log(this.list);
      // });


    },
    getAllData(){
      tradeQuery(this.pageNo, this.pageSize1, this.beginDate,  this.endDate,this.name).then(res => {
        if(res.code==200){
          this.allList = eval(res.data.list);
          let date = JSON.parse(JSON.stringify(this.allList));
          // 转换时间戳
          date.forEach((v, i) => {
            date[i].complete_time = moment(date[i].complete_time).format("YYYY-MM-DD hh:mm:ss");
            if(lang=='en'){
              date[i].order_status = date[i].order_status==0?'Not submitted': date[i].order_status==3?'Successful trade': date[i].order_status==5?'Refund completed': date[i].order_status==7?'Order cancelled':'Unknown state'
            }else{
              date[i].order_status = date[i].order_status==0?'未提交': date[i].order_status==3?'交易成功': date[i].order_status==5?'退款完成': date[i].order_status==7?'订单已撤销':'未知状态'
            }
          });
          if(lang=='en'){
            require.ensure([], () => {
              const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
                const tHeader = [
                  "Serial number",
                  "Device number",
                  "Transaction time",
                  "Transaction amount ($)",
                  "Trading status",
                  "Remarks"
                ]; //将对应的属性名转换成中文
                // const tHeader = [];
              const filterVal = [
                "merchant_order_id",
                "qcf_device_num",
                "complete_time",
                "order_amount",
                "order_status",
                "loc_info"
              ]; //table表格中对应的属性名
              const list = date; //想要导出的数据
              console.log(list)
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, "Mining water excel");
            });
          }else{
            require.ensure([], () => {
              const { export_json_to_excel } = require("@/utils/Export2Excel.js"); //引入文件
              const tHeader = [
                "流水号",
                "设备号",
                "交易时间",
                "交易金额($)",
                "交易状态",
                "备注"
              ]; //将对应的属性名转换成中文
              // const tHeader = [];
              const filterVal = [
                "merchant_order_id",
                "qcf_device_num",
                "complete_time",
                "order_amount",
                "order_status",
                "loc_info"
              ]; //table表格中对应的属性名
              const list = date; //想要导出的数据
              console.log(list)
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, "挖矿流水excel");
            });
          }
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
        tradeQuery(this.pageNo, this.pageSize, this.beginDate, this.endDate,this.name).then(res => {
          if(res.code==200){
            console.log(res)
            this.allList = eval(res.data.list);
            let date = JSON.parse(JSON.stringify(this.allList));
            this.list = date;
            this.total = res.data.total;
          }

        });
      } else {
        console.log('222')
        tradeQuery(this.pageNo, this.pageSize, '', '',this.name).then(res => {
          if(res.code==200){
            this.list = eval(res.data.list);
            this.total = res.data.total;
            }
        });
      }
    },
    // 导出
    download() {
      if (this.value6){
        console.log('ppp')
        this.getAllData()
      }else{
        console.log('sss')
        this.beginDate='',
        this.endDate=''
        this.getAllData()
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handlemyclass: function(row, column, rowIndex, columnIndex) {
      // console.log(row, column, rowIndex, columnIndex);
      return "test";
    },
    colorblueclass: function(row, column, rowIndex, columnIndex) {
      // console.log(columnIndex);
      if (columnIndex == 2) {
        return "blue";
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // console.log(`每页 ${val} 条`);
      this.refresh();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.refresh();
    }
  },
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
.status-box{
  width: 120px;
  height: 30px;line-height: 30px;
  text-align: center;
  margin: 0 auto;
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
  /* .el-table th > .cell{
    width: 100px !important;
  } */
</style>
