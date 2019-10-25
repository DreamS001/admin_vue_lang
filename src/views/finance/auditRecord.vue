<template>
  <div class="wscn-http404-container">
    <div class="nav nav2" style="min-height:130px;min-width:970px;">
      <div class="block" style="width:100% ;margin-left: 30px;">
        <span class="demonstration">自定义查询：</span>
        <el-date-picker v-model="value6" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" range-separator="至" @change="timeChange"/>
        <span class="demonstration" style="margin-left:25px;margin-right:17px;">交易状态：</span>
        <el-select  clearable placeholder="全部" class="filter-item" style="width: 200px；" v-model="name4" @change="selectGet">
          <el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <span class="demonstration" style="margin-left:25px;margin-right:17px;">联系方式：</span>
        <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1);background: #1888cb ;" v-model="name"/>
        <div style="height:15px"></div>
        <span class="demonstration" style="margin-right:27px;">流水号：</span>
        <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1);background: #1888cb;margin-bottom:5px;" v-model="name1"/>
        <span class="demonstration" style="margin-left:25px;margin-right:17px;">会员名称：</span>
        <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1);background: #1888cb ;" v-model="name2"/>
        <span class="demonstration" style="margin-left:25px;margin-right:17px;">交易金额：</span>
        <div  style="display:inline-block;">
          <div class="transaction_amount">
            <input type="text" style="display:inline-block;width:70px" placeholder="$1000" v-model="name3start">
            <span style="display:inline-block">至</span>
            <input type="text" style="display:inline-block;width:70px" placeholder="$5000" v-model="name3end">
          </div>
        </div>
        <div style="margin-left:6%; display:inline-block; ">
          <span class="time" style="" @click="queryData">查询</span>
          <span class="time" style="" @click="exportTable">导出</span>
        </div>

      </div>
    </div>
    <div style="width:100%!important;margin-top:20px">
      <el-table :data="list" style="width: 100%!important" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
        <el-table-column prop="create_time" label="充值时间" align="center"></el-table-column>
        <el-table-column prop="merchant_order_id" label="流水号" align="center"></el-table-column>
        <el-table-column prop="username" label="会员名称" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="charge_amount" label="充值金额（$）" align="center"></el-table-column>
        <el-table-column prop="charge_token_id" label="地址" align="center"></el-table-column>
        <el-table-column prop="order_status" label="交易状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_status==300">审核成功</el-tag>
            <el-tag type="danger" v-if="scope.row.order_status==200">审核失败</el-tag>
            <el-tag type v-if="scope.row.order_status==100">审核中</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="50"></el-table-column>
        <el-table-column prop="modify_time" label="审核时间" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10,20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  import { rechargelog } from '@/api/finance'
  import moment from 'moment'
  import { formatDate } from '../../utils/date.js'

  export default {
    data() {
      return {
        value6: [],
        name: '',
        name1:'',
        name2:'',
        name3start:'',
        name3end:'',
        name3:'',
        name4:'',
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
        enabledTypeOptions: [
          { key: 100, display_name: '审核中' },
          { key: 200, display_name: '驳回' },
          { key: 300, display_name: '审核完成' }
        ],
        maxPageSize: 2147483647,
      }
    },
    created() {
      var date = new Date()
      this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
      this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
      this.beginDate = ''
      this.endDate = ''
      // this.name3=this.name3start+','+this.name3end
      this.request()
    },
    methods: {
       selectGet(vId){
      let obj = {};
      obj = this.enabledTypeOptions.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.key === vId;//筛选出匹配数据
      });
      // console.log(obj.display_name);//我这边的name就是对应label的
      this.name4=obj.key
      // console.log(obj.id);
      },
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
        cashlist(row.date).then(res => {
          if(res.code==200){
          this.lielist = eval(res.data.list)

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
        if (this.name3start=='' || this.name3end=='') {
          this.name3=''
        }else{
          this.name3=this.name3start+','+this.name3end
        }
        rechargelog(this.pageNo, this.pageSize, this.beginDate, this.endDate, this.name,this.name1,this.name2,this.name3,this.name4).then(
          res => {
            if(res.code==200){
              this.allList = eval(res.data.list);
              console.log(res.data.list)
              let date = JSON.parse(JSON.stringify(this.allList));
              date.forEach((v, i) => {
                date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD hh:mm:ss");
                if(date[i].modify_time==null){

                }else{
                  date[i].modify_time = moment(date[i].modify_time).format("YYYY-MM-DD hh:mm:ss");
                }
              });
              this.list =date
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
        rechargelog(this.pageNo, this.maxPageSize, this.beginDate, this.endDate, this.name,this.name1,this.name2,this.name3,this.name4).then(res => {
          if(res.code==200){
            this.allList = eval(res.data.list)
            this.total = res.data.total
            const date = JSON.parse(JSON.stringify(this.allList))
            date.forEach((v,i) => {
              date[i].order_status= date[i].order_status==300?'审核成功': date[i].order_status==200?'审核失败':'审核中'
              date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD hh:mm:ss");
              if(date[i].modify_time==null){
                date[i].modify_time = '';
              }else{
                date[i].modify_time = moment(date[i].modify_time).format("YYYY-MM-DD hh:mm:ss");
              }
            });
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/utils/Export2Excel.js') //引入文件
              const tHeader = ['充值时间','流水号',  '会员名称','联系方式', '充值金额($)', '地址','交易状态',"备注",'审核时间'] //将对应的属性名转换成中文
              // const tHeader = [];
              const filterVal = ['create_time','merchant_order_id','username', 'phone', 'charge_amount', 'charge_token_id', 'order_status', 'remark','modify_time'] //table表格中对应的属性名
              const list = date //想要导出的数据
              const data = this.formatJson(filterVal, list)
              export_json_to_excel(tHeader, data, '充值记录列表excel')
            })
          }
        })
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

  .expand .el-table__expand-column .cell {
    display: none;
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
<style rel="stylesheet/scss" lang="scss" scoped>
  .transaction_amount{
    margin:0;
    width:200px;
    height:28px;
    border:1px solid rgba(47, 228, 255, 1);
    background: #1888cb ;
    display:inline-block;
    box-sizing:border-box;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }
  .transaction_amount input{
    border:none;
    outline: none;
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

  .fuCeng {
    position: fixed;
    z-index: 1002;
    left: 5%;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 70%;
      height: 480px;
      background: white;
      // overflow-x: hidden;
      // overflow-y: scroll;
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
        margin-top: 10px;
        p {
          font-size: 15px;
          text-align: center;
          span {
            margin: 20px;
            padding: 7px 20px;
            font-size: 12px;
            border: 1px solid gainsboro;
            margin: 0 40px;
          }
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
   .nav2 .el-select,.nav2 .el-select .el-input__inner{
    height:28px !important;
    background: rgb(24, 136, 203);
  }
  .nav2 .el-select .el-input__icon{
    line-height: 28px;
  }

</style>
