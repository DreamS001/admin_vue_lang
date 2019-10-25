<template>
  <div class="wscn-http404-container">
    <div class="nav">
      <div class="block" style="margin-left:30px;min-width:600px">
        <span class="demonstration">
          <!-- 自定义查询： -->
          {{$t('financeCash.custom_query')}}：
        </span>
        <el-date-picker v-model="value6" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" :range-separator="$t('financeCash.to')" @change="timeChange"/>
        <div style="height:20px"></div>
        <span class="demonstration" style= "">
          <!-- 流水号： -->
          {{$t('financeCash.serial_number')}}：
        </span>
        <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1);background: #1888cb ;" v-model="name"/>
        <span class="time" style="margin-left:100px" @click="queryData">
          <!-- 查询 -->
          {{$t('financeCash.query')}}
        </span>
        <span class="time" @click="exportTable">
          <!-- 导出 -->
          {{$t('financeCash.export')}}
        </span>
      </div>
    </div>
    <div style="width:100%!important;margin-top:20px">
      <el-table :data="list" style="width: 100%!important" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
        <el-table-column prop="create_time" :label="$t('financeCash.date')" align="center"></el-table-column>
        <el-table-column prop="merchant_order_id" :label="$t('financeCash.serial_number')" min-width="150" align="center"></el-table-column>
        <el-table-column prop="withdraw_amount" :label="$t('financeCash.withdrawal_amount')" min-width="150" align="center"></el-table-column>
        <el-table-column prop="withdraw_token_id" :label="$t('financeCash.wallet_adress')" align="center"></el-table-column>
        <el-table-column prop="order_status" :label="$t('financeCash.approval_status')" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_status==300">
              <!-- 审核成功 -->
              {{$t('financeCash.sh_success')}}
            </el-tag>
            <el-tag type="danger" v-if="scope.row.order_status==200">
              <!-- 审核失败 -->
              {{$t('financeCash.sh_fail')}}
            </el-tag>
            <el-tag type v-if="scope.row.order_status==100">
              <!-- 审核中 -->
              {{$t('financeCash.in_audit')}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('financeCash.remark')" min-width="50"></el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10,20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import {withdrawList, withdrawQueryList} from "@/api/finance";
  import moment from "moment";
  import {formatDate} from '../../utils/date.js'

import Cookies from 'js-cookie'
var lang=Cookies.get('language') || 'en';
    export default {
        data() {
          return {
            value6: "",
            pageNo: 1,
            pageSize: 10,
            beginDatePlaceHolder: '',
            endDatePlaceHolder: '',
            beginDate: '',
            endDate: '',
            total: 1,
            name: '',
            currentPage4: 4,
            list: [],
            allList: [],
            clickQueryDate: false,
            maxPageSize: 2147483647,
            eHeader:[],
            eName:'',
            success:'',
            fail:'',
            middle:'',
          };
        },
        created() {
          var date = new Date()
          this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
          this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
          this.beginDate = ''
          this.endDate = ''
          // this.button = '切换提现'
          this.request()
        },
        methods: {
          setClassName({row, rowIndex}) {
            let index = rowIndex + 1;
            if(index %2 == 0){
                return 'warning-row'
            }else{
              return 'success-row'
            }
          },
          // 检测用户是否有选中时间
          timeChange() {
            if (this.value6 == undefined) {
                this.beginDate = ''
                this.endDate = ''
            } else {
                this.beginDate = moment(this.value6[0]).format('YYYY-MM-DD')
                this.endDate = moment(this.value6[1]).format('YYYY-MM-DD')
            }
          },
          request() {
            withdrawList(this.pageNo, this.pageSize, this.beginDate, this.endDate, this.name).then(res => {
              if(res.code==200){
                res.data.list.forEach((v,i)=>{
                  res.data.list[i].create_time = moment(res.data.list[i].create_time).format("YYYY-MM-DD hh:mm:ss");
                })
                this.total = res.data.total;
                this.list = res.data.list;
              }
            });
          },
          handlemyclass: function (row, column, rowIndex, columnIndex) {
            return "test"
          },
          handleSizeChange(val) {
            this.pageSize = val
            this.request()
          },
          handleCurrentChange(val) {
            this.pageNo = val
            this.request()
          },
          queryData() {
            this.pageNo = 1
            this.clickQueryDate = true
            this.request()
          },
          formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
          },
          exportTable() {
            let _this = this;
            if(lang=='en'){
              _this.eHeader=['Date', 'Serial number','Cash withdrawal amount（$）','Wallet address','Approval status','Remarks']
              _this.eName='Cash withdrawal details Excel'
              _this.success='Audit success'
              _this.fail='Audit failure'
              _this.middle='In Audit'
            }else{
              _this.eHeader=["日期", "流水号", "提现金额($)", "钱包地址", "审核状态", "备注"]
              _this.eName='提现明细Excel'
              _this.success='审核成功'
              _this.fail='审核失败'
              _this.middle='审核中'
            }
            withdrawList(this.pageNo, this.maxPageSize, this.beginDate, this.endDate, this.name).then(res => {
              if(res.code==200){
                this.total = res.data.total
                this.allList = res.data.list
                let data = this.allList
                // 转换时间戳
                data.forEach((v, i) => {
                  if (data[i].order_status == 300) {
                      data[i].order_status = _this.success
                  } else if (data[i].order_status == 200) {
                      data[i].order_status = _this.fail
                  } else {
                      data[i].order_status = _this.middle
                  }
                  data[i].create_time = moment(data[i].create_time).format("YYYY-MM-DD hh:mm:ss");
                })

                require.ensure([], () => {
                  const {export_json_to_excel} = require("@/utils/Export2Excel.js") //引入文件
                  const tHeader = _this.eHeader //将对应的属性名转换成中文
                  // const tHeader = [];
                  const filterVal = ["create_time", "merchant_order_id", "withdraw_amount", "withdraw_token_id", "order_status", "remark"]; //table表格中对应的属性名
                  data = this.formatJson(filterVal, data)
                  export_json_to_excel(tHeader, data, _this.eName)
                })
              }

            })
          }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .demonstration{
    display: inline-block;
    width:100px;
  }
  .wscn-http404-container {
    background: transparent;
    min-height: calc(100vh - 84px);
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .nav {
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

  .test {
    color: #fff !important;
    background: #4986ff !important;
    font-weight: 100;
    width: 100% !important;
  }

  .blue {
    color: #2cc23c !important;
  }

  .el-tag{
    background-color: transparent;
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    // color: #fff !important;
    // border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid transparent;
    white-space: nowrap;
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
      font-weight: 400 !important;
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
</style>
