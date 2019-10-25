<template>
  <div class="wscn-http404-container">
    <div class="nav">
      <div class="block" style="width:100%!important">
        <span class="demonstration" style="margin-left:30px;">
          <!-- 自定义查询 -->
          {{$t('products.custom_query')}}
          ：</span>
        <el-date-picker v-model="value6" :start-placeholder="beginDatePlaceHolder" style="border-width:0;" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" :range-separator="$t('products.to')" @change="timeChange"/>
        <span class="time" style="margin-left:100px" @click="queryData">
          <!-- 查询 -->
          {{$t('products.query')}}
          </span>
        <span :loading="downloadLoading" class="time" @click="exportTable">
          <!-- 导出 -->
          {{$t('products.export')}}
          </span>
      </div>
    </div>
    <div style="width:100%!important;margin-top:20px">
      <el-table
        :data="list"
        style="width: 100%!important"
        :header-row-class-name="handlemyclass"
         :row-class-name="setClassName"
      >
        <el-table-column :cell-class-name="colorblueclass" prop="create_time" :label="$t('products.creationdate')" align="center"></el-table-column>
        <el-table-column prop="product_name" :label="$t('products.productname')" align="center"></el-table-column>
        <el-table-column prop="order_status"  :label="$t('products.order_status')" align="center">
          <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.order_status==300">
                <!-- 购买成功 -->
               {{$t('products.purchase_succeeded')}}
              </el-tag>
              <el-tag type="success" v-if="scope.row.order_status==500">
                <!-- 已完成订单 -->
               {{$t('products.completed_order')}}
              </el-tag>
              <el-tag type="danger"  v-if="scope.row.order_status==100" style="color:rgba(255, 65, 7, 1)">
                <!-- 购买失败 -->
               {{$t('products.purchase_failed')}}

              </el-tag>
              <el-tag  type="danger" v-if="scope.row.order_status==200" style="color:rgba(255, 65, 7, 1)">
                <!-- 购买失败 -->
               {{$t('products.purchase_failed')}}

              </el-tag>
              <el-tag type v-if="scope.row.order_status==400">
                <!-- 设备待分配 -->
               {{$t('products.Equipment_to_be_allocated')}}

                </el-tag>
            </template>
        </el-table-column>

        <el-table-column prop="product_amount" :label="$t('products.product_amount')" align="center"></el-table-column>
        <el-table-column prop="merchant_order_id" :label="$t('products.serial_number')" align="center"></el-table-column>
        <el-table-column prop="investor_name" :label="$t('products.member')" align="center"></el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <span>购买</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt/>
        </h4>
        <div>
          <p>确定购买吗？</p>
          <p>
            <span @click="ensure">确定</span>
            <span @click="contribute">取消</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { record, recordQuery } from '@/api/produc'
  import moment from 'moment'
  import { formatDate } from '../../utils/date.js'
  import {fptproduct} from '@/utils/i18n'

  import Cookies from 'js-cookie'
  var lang=Cookies.get('language') || 'en';
  export default {
    data() {
      return {
        value6: '',
        pageNo: 1,
        pageSize: 10,
        input1: '',
        popup: '',
        total: 1,
        pageSize: 10,
        currentPage: 1,
        search: '',
        list: [],
        FC: '',
        beginDatePlaceHolder: '',
        endDatePlaceHolder: '',
        beginDate: '',
        endDate: '',
        allList: [],
        maxPageSize: 2147483640,
        downloadLoading: false
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
    methods: {
      fptproduct,
      handlemyclass: function(row, column, rowIndex, columnIndex) {
        return 'test'
      },
      colorblueclass: function(row, column, rowIndex, columnIndex) {
        return 'blue'
      },
      setClassName({row, rowIndex}) {
        let index = rowIndex + 1;
        if(index %2 == 0){
            return 'warning-row'
        }else{
          return 'success-row'
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.request()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.request()
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
      request() {
        record(this.pageNo, this.pageSize, this.beginDate, this.endDate).then(res => {
          if(res.code==200){
            // res.list.forEach((v, i) => {

            //   res.list[i].product_amount = res.list[i].product_amount/res.list[i].num;
            // });
            this.list = eval(res.data.list)
            this.total = res.data.total
          }
        })
      },
      //   // 查询
      queryData() {
        this.pageNo = 1
        this.request()
      },
      exportTable() {
        record(this.pageNo, this.maxPageSize, this.beginDate, this.endDate).then(res => {
          if(res.code==200){
            this.allList = eval(res.data.list)
            let data = JSON.parse(JSON.stringify(this.allList))
            // 转换购买状态
            data.forEach((v, i) => {
              data[i].product_amount = data[i].product_amount/data[i].num;
              if(lang=='en'){
                if (data[i].order_status === 300) {
                  data[i].order_status = 'Purchase succeeded'
                } else if (data[i].order_status === 500) {
                  data[i].order_status = 'Completed order'
                } else if (data[i].order_status === 100) {
                  data[i].order_status = 'Purchase failed'
                }else if (data[i].order_status === 200) {
                  data[i].order_status = 'Purchase failed'
                }else if (data[i].order_status === 400) {
                  data[i].order_status = 'Equipment to be allocated'
                }
                // else if (data[i].order_status === 600) {
                //   data[i].order_status = '退款中'
                // }else if (data[i].order_status === 700) {
                //   data[i].order_status = '退款失败'
                // }else if (data[i].order_status === 800) {
                //   data[i].order_status = '退款成功'
                // }
              }else{
                if (data[i].order_status === 300) {
                  data[i].order_status = '购买成功'
                } else if (data[i].order_status === 500) {
                  data[i].order_status = '已完成订单'
                } else if (data[i].order_status === 100) {
                  data[i].order_status = '购买失败'
                }else if (data[i].order_status === 200) {
                  data[i].order_status = '购买失败'
                }else if (data[i].order_status === 400) {
                  data[i].order_status = '设备待分配'
                }
                // else if (data[i].order_status === 600) {
                //   data[i].order_status = '退款中'
                // }else if (data[i].order_status === 700) {
                //   data[i].order_status = '退款失败'
                // }else if (data[i].order_status === 800) {
                //   data[i].order_status = '退款成功'
                // }
              }
            })
            if(lang=='en'){
              require.ensure([], () => {
                const { export_json_to_excel } = require('@/utils/Export2Excel.js') //引入文件
                const tHeader = ['Creation date', 'Product name', 'Order Status', 'Product amount（$）', 'Perial number', 'Member'] //将对应的属性名转换成中文
                const filterVal = ['create_time', 'product_name', 'order_status', 'product_amount', 'merchant_order_id', 'investor_name'] //table表格中对应的属性名
                data = this.formatJson(filterVal, data)
                export_json_to_excel(tHeader, data, 'Purchase record excel')
              })
            }else{
              require.ensure([], () => {
                const { export_json_to_excel } = require('@/utils/Export2Excel.js') //引入文件
                const tHeader = ['创建时间', '产品名称', '订单状态', '产品金额（$）', '流水号', '会员'] //将对应的属性名转换成中文
                const filterVal = ['create_time', 'product_name', 'order_status', 'product_amount', 'merchant_order_id', 'investor_name'] //table表格中对应的属性名
                data = this.formatJson(filterVal, data)
                export_json_to_excel(tHeader, data, '购买记录excel')
              })
            }
          }
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .test {
    color: #fff !important;
    background: #4986ff !important;
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

  .nav {
    width: 100%;
    height: 70px;
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
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      width: 600px;
      height: 610px;
      background: white;

      h4 {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        margin: 0;
        background: #4986ff;
        color: white;
        font-weight: 100;

        img {
          width: 15px;
          height: 15px;
        }
      }

      div {
        p {
          font-size: 15px;
          // text-align: center;
          span:nth-of-type(1) {
            margin-left: 50px;
          }

          span:nth-of-type(2) {
            width: 100px;
            display: inline-block;
          }
        }

        .status {
          margin-top: 60px;
          display: flex;
          justify-content: center;

          span {
            margin: 20px;

            padding: 7px 20px;
            font-size: 12px;
            border: 1px solid gainsboro;
            margin: 0 40px;
          }

          // span:nth-of-type(1) {
          //   background: #4986ff;
          //   color: white;
          // }

          // span:nth-of-type(2) {
          //   background: #fff;
          //   color: #c2c2c2;
          //   width: 66px;
          // }
        }
      }
    }
  }

  .inputa {
    display: inline-block;
    width: 300px;
    margin-right: 10px;

    > input {
      width: 300px;
      height: 26px !important;
    }
  }

  .inputb {
    display: inline-block;
    width: 150px;
    margin-right: 10px;

    > input {
      width: 150px;
      height: 26px !important;
    }
  }

  .el-table::before {
    width: 0;
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
</style>
