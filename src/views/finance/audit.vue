<template>
  <div class="wscn-http404-container">
    <div class="nav">
      <div class="block" style="min-width:850px;font-size:14px;margin-left: 30px;">
        <span class="demonstration">{{$t('financeCash.customQuery')}}：</span>
        <el-date-picker v-model="value6" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" range-separator="至" @change="timeChange"/>
        <div style="height:15px"></div>

        <span class="demonstration" v-if="this.button == '切换提现'" style="margin-right:29px;">{{$t('financeCash.serial_number')}}：</span>
        <span class="demonstration" v-else style="margin-right:29px;">{{$t('financeCash.serial_number')}}：</span>
        <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1);background: #1888cb"  v-model="input1"/>
        <span class="time" style="margin-left:100px;" @click="queryData">{{$t('financeCash.query')}}</span>
        <span class="time" @click="exportTable">{{$t('financeCash.export')}}</span>
        <span class="time" @click="butt">{{button}}</span>
      </div>
    </div>
    <div v-if="topup" style="width:100%!important;margin-top:20px">
      <el-table :data="withdrawlist" style="width: 100%!important" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
        <el-table-column prop="merchant_order_id" :label="$t('financeCash.serial_number')" align="center"></el-table-column>
        <!-- <el-table-column prop="dynamic" label="订单类型"></el-table-column> -->
        <el-table-column prop="create_time" :label="$t('financeCash.date_of_presentation')" align="center"></el-table-column>
        <el-table-column prop="withdraw_amount" :label="$t('financeCash.withdrawal_amount')" align="center"></el-table-column>
        <!-- <el-table-column prop="name" label="资方名称"></el-table-column> -->
        <el-table-column prop="withdraw_token_id" :label="$t('financeCash.address')" align="center"></el-table-column>
        <el-table-column prop="order_status" :label="$t('financeCash.approval_status')" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_status==300">{{$t('financeCash.sh_success')}}</el-tag>
            <el-tag type="danger" v-if="scope.row.order_status==200">{{$t('financeCash.sh_fail')}}</el-tag>
            <el-tag type v-if="scope.row.order_status==100" style="width:90px;height:30px;border:1px solid rgba(24, 144, 255, 1);color:rgba(24, 144, 255, 1);">{{$t('financeCash.in_audit')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('financeCash.remark')" align="center"></el-table-column>
        <el-table-column :label="$t('financeCash.operation')" width="300" align="center">
          <template slot-scope="scope">
            <span class="s-btn" @click="reveal(scope.$index,scope.row)">{{$t('financeCash.adopt')}}</span>
            <span class="s-btn" @click="refuse(scope.$index,scope.row);getType(1)">{{$t('financeCash.reject')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="topup" class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10,20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <div v-if="withdraw" style="width:100%!important;margin-top:20px">
      <el-table :data="topuplist" style="width: 100%!important" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
        <el-table-column prop="merchant_order_id" :label="$t('financeCash.serial_number')" align="center"></el-table-column>
        <el-table-column prop="create_time" :label="$t('financeCash.recharge_date')" align="center"></el-table-column>
        <el-table-column prop="charge_amount" :label="$t('financeCash.recharge_amount')" align="center"></el-table-column>
        <el-table-column prop="third_trade_id" :label="$t('financeCash.address')" align="center"></el-table-column>
        <el-table-column prop="order_status" :label="$t('financeCash.approval_status')" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_status==300">{{$t('financeCash.sh_success')}}</el-tag>
            <el-tag type="danger" v-if="scope.row.order_status==200">{{$t('financeCash.sh_fail')}}</el-tag>
            <el-tag type v-if="scope.row.order_status==100" style="width:90px;height:30px;border:1px solid rgba(24, 144, 255, 1);color:rgba(24, 144, 255, 1);">{{$t('financeCash.in_audit')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('financeCash.remark')" align="center"></el-table-column>

        <el-table-column :label="$t('financeCash.operation')" width="300" align="center">
          <template slot-scope="scope">
            <!-- <span class="s-btn" @click="handleClick(scope.row)">通过</span>
            <span class="s-btn" @click="refuse(scope.row)">驳回</span> -->
            <span class="s-btn" @click="reveal(scope.$index,scope.row)">{{$t('financeCash.adopt')}}</span>
            <span class="s-btn" data-type="1" @click="refuse(scope.$index,scope.row);getType(1)">{{$t('financeCash.reject')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="withdraw" class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10,20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <!-- 浮层 -->
    <!-- 浮层 -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <!-- <span>详情</span>
          <img @click="contribute" src="../../assets/logo/cuo.png"/> -->
          <div><span>{{$t('financeCash.reasons_for_remarks')}}</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div class="ask-box">
          <textarea placeholder="" v-model="rowDesc"></textarea>
        </div>
        <div class="bottom-btn">
          <span @click="voting">{{$t('financeEarnings.sure')}}</span>
          <span @click="contribute">{{$t('financeEarnings.cancel')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {withdrawCashlist, topupCashlist, audit, toquery} from '@/api/finance'
    import moment from 'moment'
    import request from '@/utils/request'
    import {formatDate} from '../../utils/date.js'

    export default {
        data() {
            return {
                value6: '',
                input1: '',
                pageNo: 1,
                pageSize: 10,
                total: 1,
                currentPage4: 4,
                withdrawlist: [],
                topuplist: [],
                withdrawAlllist: [],
                topupAlllist: [],


                withdraw: true,
                topup: false,
                pass: {
                    type: 1,
                    status: '',
                    id: '',
                    remark: ''
                },
                beginDatePlaceHolder: '',
                endDatePlaceHolder: '',
                beginDate: '',
                endDate: '',
                downloadLoading: false,
                maxPageSize: 2147483647,
                allList: [],
                clickQueryDate: false,
                selectTime: false,
                FC: false,
                rowId:'',//列表id
                rowDesc:'',//理由
                rowType:0,
            }
        },
        created() {
            var date = new Date()
            this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
            this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
            this.beginDate = ''
            this.endDate = ''
            this.button = '切换提现'
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
            // 切换状态
            butt() {
                this.pageNo = 1
                this.pageSize = 10
                this.value6=''
                this.input1=''
                this.beginDate=''
                this.endDate=''
                if (this.button == '切换提现') {
                    this.button = '切换充值'
                    this.withdraw = false
                    this.topup = true
                    this.pass.type = 2
                } else if (this.button == '切换充值') {
                    this.button = '切换提现'
                    this.withdraw = true
                    this.topup = false
                    this.pass.type = 1
                }
                this.request()
            },
            contribute() {
                this.FC = false
                this.rowDesc=''
            },
            //确定
            voting(id) {
                this.FC = false;
                this.pass.id = this.rowId
                if(this.rowType==0){
                  this.pass.status = 300
                }else{
                  this.pass.status = 200
                }
                this.pass.remark = this.rowDesc
                console.log(this.pass)
                audit(this.pass).then(res => {
                  if(res.code==200){
                    console.log(res)
                    this.rowDesc=''
                    this.request()
                  }

                })

                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
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
                if (this.button == '切换提现') {
                    topupCashlist(this.pageNo, this.pageSize, this.beginDate, this.endDate, this.input1).then(res => {
                      if(res.code==200){
                        this.topuplist = eval(res.data.list)
                        this.total = res.data.total
                      }
                    })
                } else {
                    withdrawCashlist(this.pageNo, this.pageSize, this.beginDate, this.endDate, this.input1).then(res => {
                      if(res.code==200){
                        this.withdrawlist = eval(res.data.list)
                        this.total = res.data.total
                      }
                    })
                }
            },
            queryData() {
                this.pageNo = 1
                this.request()
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            exportTable() {
                if (this.button == '切换提现') {
                    topupCashlist(this.pageNo, this.maxPageSize, this.beginDate, this.endDate, this.input1).then(res => {
                      if(res.code==200){
                        this.topupAlllist = res.data.list
                        console.log('aaaaaa' + this.topupAlllist.length)
                        this.exportToTable()
                      }
                    })
                } else {
                    withdrawCashlist(this.pageNo, this.maxPageSize, this.beginDate, this.endDate, this.input1).then(res => {
                      if(res.code==200){
                        this.withdrawAlllist = res.data.list
                        console.log('bbbbb')
                        this.exportToTable()
                      }
                    })
                }
            },
            exportToTable() {
                const {export_json_to_excel} = require('@/utils/Export2Excel.js') //引入文件
                if (this.button == '切换提现') {
                    let data = this.topupAlllist
                    data.forEach((v, i) => {
                        if (data[i].order_status == 300) {
                            data[i].order_status = '审核成功'
                        } else if (data[i].order_status == 200) {
                            data[i].order_status = '审核失败'
                        } else {
                            data[i].order_status = '审核中'
                        }
                    })
                    // 充值数据
                    require.ensure([], () => {
                        const tHeader = ['流水号', '充值日期', '充值金额($)', '地址', '审核状态', '备注'] //将对应的属性名转换成中文
                        const filterVal = ['merchant_order_id', 'create_time', 'charge_amount', 'third_trade_id', 'order_status', 'remark'] //table表格中对应的属性名
                        data = this.formatJson(filterVal, data)
                        console.log(data.length)
                        console.log('aaaaaa' + this.topupAlllist.length)
                        export_json_to_excel(tHeader, data, '审核充值列表excel')
                    })
                } else if (this.button == '切换充值') {
                    let data = this.withdrawAlllist
                    data.forEach((v, i) => {
                        if (data[i].order_status == 300) {
                            data[i].order_status = '审核成功'
                        } else if (data[i].order_status == 200) {
                            data[i].order_status = '审核失败'
                        } else {
                            data[i].order_status = '审核中'
                        }
                    })
                    // 提现数据
                    require.ensure([], () => {
                        const tHeader = ['流水号', '提现日期', '提现金额($)', '地址', '审核状态', '备注'] //将对应的属性名转换成中文
                        const filterVal = ['merchant_order_id', 'create_time', 'withdraw_amount', 'withdraw_token_id', 'order_status', 'remark'] //table表格中对应的属性名
                        data = this.formatJson(filterVal, data)
                        console.log(data.length)
                        export_json_to_excel(tHeader, data, '审核提现列表excel')
                    })
                }
            },
            reveal($index, row) {
                this.FC = true
                this.rowId=row.id
            },
            refuse($index, row) {
              // this.FC = true
              // console.log(row)
                this.FC = true
                this.rowId=row.id
            },
            getType(e){
              // console.log(e)
              this.rowType=e
            },
            // table头部样式
            handlemyclass: function (row, column, rowIndex, columnIndex) {
                return 'test'
            },
            handleSizeChange(val) {
                console.log(val)
                this.pageSize = val
                this.request()
            },
            handleCurrentChange(val) {
                this.pageNo = val
                this.request()
            },
            handleClick(row) {
                this.$prompt('请说明理由', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[^\s]/,
                    inputErrorMessage: '请输入内容'
                })
                    .then(({value}) => {
                        this.pass.id = row.id
                        this.pass.status = 300
                        this.pass.remark = value
                        console.log(this.pass)
                        audit(this.pass).then(res => {
                            console.log(res)
                            // this.total = res.total;
                            // this.Withdrawlist = res.list;
                            this.request()
                        })

                        this.$message({
                            type: 'success',
                            message: '操作成功'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        })
                    })
            },
            // refuse(row) {
            //     console.log(row.id)
            //     this.$prompt('请说明理由', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         inputPattern: /[^\s]/,
            //         inputErrorMessage: '请输入内容'
            //     })
            //         .then(({value}) => {
            //             this.pass.id = row.id
            //             this.pass.status = 200
            //             this.pass.remark = value
            //             console.log(this.pass)
            //             audit(this.pass).then(res => {
            //                 console.log(res)
            //                 this.request()
            //             })

            //             this.$message({
            //                 type: 'success',
            //                 message: '操作成功'
            //             })
            //         })
            //         .catch(() => {
            //             this.$message({
            //                 type: 'info',
            //                 message: '取消输入'
            //             })
            //         })
            // }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
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
      width: 835px;
      height: 400px;
      // background: white;
      background: url('../../assets/images/bg_qianbao.png') no-repeat;
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
          cursor: pointer;
        }
      }
      .bottom-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-top: 40px;
        >span{
            display: block;
            width: 120px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: url('../../assets/images/ic_qb_cz.png') no-repeat;
            background-size: 100% 100%;
            margin: 0 92px;
            cursor: pointer;
        }
        }
      .ask-box{
          width: 695px;
          height: 200px;
          margin: 0 70px;
          padding: 20px;
          box-sizing: border-box;
          background:rgba(13,29,76,0.05);
          border:1px solid rgba(0,190,255,1);
          box-shadow:0px 0px 60px 0px rgba(0,128,202,0.4);
          >textarea{
              width: 100%;
              height: 100%;
              background: transparent;
              border: none;
              padding: 20px;
              box-sizing: border-box;
              color: #fff;
              font-size: 14px;
              resize: none;
              outline: none;

          }
          >textarea::-webkit-input-placeholder{
              color: #fff;
          }
      }
      div {
        // margin-top: 10px;

        p {
          font-size: 15px;
          text-align: center;

          // span {
          //   margin: 20px;
          //   padding: 7px 20px;
          //   font-size: 12px;
          //   border: 1px solid gainsboro;
          //   margin: 0 40px;
          // }

          // span:nth-of-type(1) {
          //   background: #4986ff;
          //   color: white;
          // }

          // span:nth-of-type(2) {
          //   background: #fff;
          //   color: #c2c2c2;
          // }
        }

      }
    }
  }
  .s-btn{
      display: inline-block;
      width: 110px;
      height: 30px;
      background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 30px;
      color: rgba(47, 228, 255, 1) !important;
      cursor: pointer;
  }
</style>

<style>
.el-range-input{
  border:0 none !important;
}
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
