<template>
  <div class="wscn-http404-container">
    <div class="nav">
      <div class="block" style="min-width:600px;margin-left:30px;">
        <span class="demonstration">{{$t('financeCash.customQuery')}}：</span>
        <el-date-picker v-model="value6" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" range-separator="至" @change="timeChange"/>
        <span class="time" style="margin-left:100px" @click="queryData">{{$t('financeCash.query')}}</span>
        <span :loading="downloadLoading" class="time" @click="exportTable">{{$t('financeCash.export')}}</span>
      </div>
    </div>
    <div style="width:100%!important;margin-top:20px">
      <!-- :header-row-class-name="handlemyclass" :cell-style="finalCellStyle" :row-class-name="setClassName" -->
      <el-table :data="list" :header-row-class-name="handlemyclass"  style="width: 100%!important" :row-class-name="setClassName" :cell-style="finalCellStyle">
        <el-table-column prop="date" :label="$t('financeCash.date')" min-width="100" align="center"/>
        <el-table-column style="color:red" prop="act_profit" :label="$t('financeCash.title_2')" align="center"/>
        <el-table-column style="color:red" prop="sta_profit" :label="$t('financeCash.title_3')" align="center"/>
        <el-table-column style="color:red" prop="charge_price" :label="$t('financeCash.recharge_amount')" align="center"/>
        <el-table-column style="color:red" prop="device_expend" :label="$t('financeCash.robot_ex')" align="center"/>
        <el-table-column style="color:red" prop="cash_withdraw" :label="$t('financeCash.cash_with')" align="center"/>
        <el-table-column :label="$t('financeCash.operation')" min-width="150" align="center">
          <template slot-scope="scope">
            <div class="ck-btn" @click="reveal(scope.$index, scope.row)">{{$t('financeEarnings.detailed')}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="padding-bottom:20px">
      <el-pagination :current-page="pageNo" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :total="total" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
    <!-- 浮层 -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <span>{{$t('financeCash.details')}}</span>
          <img src="../../assets/logo/cuo.png" alt @click="contribute">
        </h4>
        <div>
          <el-table
            :data="lielist"
            :header-row-class-name="handlemyclass"
            :cell-style="finalCellStyle"
            style="width: 100%!important"
            height="400"
             :row-class-name="setClassName"
          >
            <el-table-column prop="date" :label="$t('financeCash.date')" min-width="100" align="center"/>
            <el-table-column prop="act_profit" :label="$t('financeCash.title_2')" min-width="160" align="center"/>
            <el-table-column prop="sta_profit" :label="$t('financeCash.title_3')" min-width="160" align="center"/>
            <el-table-column prop="charge_price" :label="$t('financeCash.recharge_amount')" min-width="150" align="center"/>
            <el-table-column prop="device_expend" :label="$t('financeCash.robot_ex')" min-width="170" align="center"/>
            <el-table-column prop="cash_withdraw" :label="$t('financeCash.cash_with')" min-width="170" align="center"/>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { cash, cashlist, cashquery } from '@/api/finance'
  import moment from 'moment'
  import { formatDate } from '../../utils/date.js'

import { financeEarnings,financeCash } from '@/utils/i18n'// 国际化主题名字
  export default {
    data() {
      return {
        value6: [],
        pageNo: 1,
        pageSize: 10,
        total: 1,
        list: [],
        beginDatePlaceHolder: '',
        endDatePlaceHolder: '',
        beginDate: '',
        endDate: '',
        ttex: '查看详情',
        lielist: [],
        FC: false,
        allList: [],
        pageSize1: 2147483647,
        downloadLoading: false,

      }
    },
    created() {
      var date = new Date()
      this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
      this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
      this.beginDate = ''
      this.endDate = ''
      this.request()

    },
    computed:{

    },
    methods: {
      financeCash,
      financeEarnings,
      // setClassName({ row, index }) {
      //   return row.expand ? 'expand' : ''
      // },
      setClassName({row, rowIndex}) {
        let index = rowIndex + 1;
        if(index %2 == 0){
            return 'warning-row'
        }else{
          return 'success-row'
        }
      },
      contribute() {
        this.FC = false
      },
      finalCellStyle: function({ row, column, rowIndex, columnIndex }) {
        if (columnIndex == 1) {
          return {
            color: '#64CB6D'
          }
        }
        if (columnIndex == 2) {
          return {
            color: '#64CB6D'
          }
        }
        if (columnIndex == 3) {
          return {
            color: '#64CB6D'
          }
        }
        if (columnIndex == 4) {
          return {
            color: '#FF7B61'
          }
        }
        if (columnIndex == 5) {
          return {
            color: '#FF7B61'
          }
        }
      },
      handlemyclass: function(row, column, rowIndex, columnIndex) {
        return 'test'
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.request()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.request()
      },
      reveal($index, row) {
        this.FC = true
        cashlist(row.date,1,1,2147483647).then(res => {
          if(res.code==200){
            this.lielist = eval(res.data.list)
            console.log(this.lielist)
          }

        })
      },
      timeChange() {
        if (this.value6 == undefined) {
          this.beginDate = ''
          this.endDate = ''
        } else {
          this.beginDate = moment(this.value6[0]).format('YYYY-MM-DD')
          this.endDate = moment(this.value6[1]).format('YYYY-MM-DD')
        }
      },
      request: function() {
        cashquery(this.pageNo, this.pageSize, this.beginDate, this.endDate).then(
          res => {
            if(res.code==200){
            this.list = eval(res.data.list)
            this.total = res.data.total
            }
          }
        )
      },
      queryData: function() {
        this.pageNo = 1
        this.request()
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      exportTable() {
        cashquery(this.pageNo, this.pageSize1, this.beginDate, this.endDate).then(res => {
          if(res.code==200){
            this.allList = eval(res.data.list)
            this.total = res.data.total
            const date = JSON.parse(JSON.stringify(this.allList))
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/utils/Export2Excel.js') //引入文件
              const tHeader = ['日期', '动态钱包收益($)','静态钱包收益（$）','充值金额（$）', '购买机器人支出($)', '提现支出($)'] //将对应的属性名转换成中文
              // const tHeader = [];
              const filterVal = ['date', 'act_profit','sta_profit','charge_price', 'device_expend', 'cash_withdraw'] //table表格中对应的属性名
              const list = date //想要导出的数据
              const data = this.formatJson(filterVal, list)
              export_json_to_excel(tHeader, data, '动态收益excel')
            })
            }
          }
        )
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .test {
    color: #fff !important;
    // background: #4986ff !important;
    font-weight: 100;
    width: 100% !important;
  }

  .expand .el-table__expand-column .cell {
    display: none;
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
      background: rgba(24, 136, 203, 0.3) !important;
      color: #fff !important;
      font-weight: 400 !important;
  }
  .el-table th.is-leaf, .el-table td{
    border-bottom: 1px solid transparent;
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
<style rel="stylesheet/scss" lang="scss" scoped>
  .wscn-http404-container {
    // background: #f0f2f5;
    background: transparent;
    min-height: calc(100vh - 84px);
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .nav {
    width: 100%;
    height: 76px;
    // background: #fff;
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
    .el-pagination{

      span:not([class*=suffix]){
        color: #fff !important;
      }
    }
  }

  .time {
    display: inline-block;
    width: 110px;
    height: 30px;
    // background: #4986ff;
    background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
    background-size: 100% 100%;
    font-size: 12px;
    // padding: 8px 20px;
    line-height: 30px;
    text-align: center;
   color: rgba(43, 250, 255, 1) !important;
    margin: 0 20px;
    cursor: pointer;
  }

  .test {
    color: #fff !important;
    // background: #4986ff !important;
    font-weight: 100;
    width: 100% !important;
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
        }
      }
    }
  }
  .ck-btn{
    width: 100px;
    height: 30px;
    background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
    margin: 0 auto;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>


<style>
.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: rgba(24, 136, 203, 0.2) !important;
}
.el-table--enable-row-transition .el-table__body td{
  transition: none !important;
}
</style>
