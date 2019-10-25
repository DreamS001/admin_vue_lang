<template>
  <div class="wscn-http404-container">
    <div class="nav nav2" style="min-height:130px;min-width:970px;">
      <div class="block" style="width:100% ;margin-left: 30px;">
        <span class="demonstration">
          <!-- 自定义查询： -->
          {{$t('financeCash.custom_query')}}：
        </span>
        <el-date-picker v-model="value6" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" :range-separator="$t('financeCash.to')" @change="timeChange"/>
        <!-- <span class="demonstration" style="margin-left:25px;margin-right:17px;">交易状态：</span>
        <el-select  clearable placeholder="全部" class="filter-item" style="width: 200px；" v-model="name4" @change="selectGet">
          <el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select> -->
        <span class="demonstration" style="margin-left:25px;vertical-align: middle; ">
          <!-- 联系方式： -->
          {{$t('financeCash.contact_information')}}：
          </span>
        <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1);background: #1888cb ;" v-model="name1"/>
        <div style="height:15px"></div>
        <span class="demonstration" style="">
          <!-- 流水号： -->
          {{$t('financeCash.serial_number')}}：
        </span>
        <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1);background: #1888cb;margin-bottom:5px;" v-model="name"/>
        <span class="demonstration" style="margin-left:25px;">
          <!-- 会员名称： -->
          {{$t('financeCash.member_name')}}：
          </span>
        <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1);background: #1888cb ;" v-model="name2"/>
        <span class="demonstration" style="margin-left:25px;vertical-align: middle;">
          <!-- 交易金额： -->
          {{$t('financeCash.transaction_amount2')}}：
        </span>
        <div  style="display:inline-block;">
          <div class="transaction_amount">
            <input type="text" style="display:inline-block;width:70px" placeholder="$1000" v-model="name3start">
            <span style="display:inline-block">{{$t('financeCash.to')}}</span>
            <input type="text" style="display:inline-block;width:70px" placeholder="$5000" v-model="name3end">
          </div>
        </div>
        <div style="margin-left:6%; display:inline-block; ">
          <span class="time" style="" @click="queryData">
            <!-- 查询 -->
            {{$t('financeCash.query')}}
          </span>
          <span class="time" style="" @click="exportTable">
            <!-- 导出 -->
            {{$t('financeCash.export')}}
          </span>
          <span class="time" style="" @click="transferBtn">
            <!-- 导出 -->
            <!-- 转账 -->
            {{$t('financeCash.transfer')}}
          </span>
        </div>

      </div>
    </div>
    <div style="width:100%!important;margin-top:20px">
      <el-table :data="list" style="width: 100%!important" :row-class-name="setClassName" :header-row-class-name="handlemyclass">
        <el-table-column prop="create_time" :label="$t('financeCash.transfer_time')" align="center"></el-table-column>
        <el-table-column prop="merchant_order_id" :label="$t('financeCash.serial_number')" align="center"></el-table-column>
        <el-table-column prop="username" :label="$t('financeCash.member_name')" align="center"></el-table-column>
        <el-table-column prop="dest_email" :label="$t('financeCash.account_other_party')" align="center"></el-table-column>
        <el-table-column prop="phone" :label="$t('financeCash.contact_information')" align="center"></el-table-column>
        <el-table-column prop="transfer_amount" :label="$t('financeCash.transfer_amount')" align="center"></el-table-column>
        <!-- <el-table-column prop="withdraw_token_id" label="地址" align="center"></el-table-column>
        <el-table-column prop="order_status" label="交易状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.order_status==300">审核成功</el-tag>
            <el-tag type="danger" v-if="scope.row.order_status==200">审核失败</el-tag>
            <el-tag type v-if="scope.row.order_status==100">审核中</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="remark" :label="$t('financeCash.remark')" min-width="50"></el-table-column>
        <!-- <el-table-column prop="modify_time" label="审核时间" align="center"></el-table-column> -->
      </el-table>
    </div>
    <div class="block" style="margin-bottom:50px;padding-bottom:20px">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10,20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

    <div v-if="FC" class="fuCeng">

      <!-- 转账 -->
      <div>
        <h4 style="padding:20px 20px 5px;">
          <!-- <span>{{val}}</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt /> -->
          <div><span>{{$t('financeCash.transfer')}}</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div class="tx-box">

          <div class="item">
            <div>{{$t('financeCash.account_other_party')}}：</div>
            <div>
              <input
                style="width:300px"
                type="text"
                :placeholder="$t('financeCash.dfzh')"
                v-model="orderWithdraw.to"
              />
            </div>
          </div>
          <div class="item">
            <div style="width:100px;">{{$t('financeCash.zzje')}}：</div>
            <div>
              <input
                style="width:300px"
                type="text"
                :placeholder="$t('financeEarnings.enter_the_amount')"
                oninput="value=value.replace(/[^\d]/g,'')"
                v-model="orderWithdraw.amount"
              />
              <span style="display:inline-block; width:150px;">$（{{$t('financeEarnings.no_more')}}）</span>
            </div>
          </div>
          <div class="item">
            <div>
              <!-- 备注 -->
              {{$t('financeEarnings.remarks')}}：</div>
            <div>
              <input
                style="width:300px"
                type="text"
                :placeholder="$t('financeEarnings.input_pl_3')"
                v-model="orderWithdraw.remark"
              />
            </div>
          </div>
          <div class="item">
            <div>
              <!-- 邮箱 -->
              {{$t('financeEarnings.email')}}：</div>
            <div>
              {{user.email}}
            </div>
          </div>
          <div class="item">
            <div>
              <!-- 验证码 -->
              {{$t('financeEarnings.VerificationCode')}}：</div>
            <div>
              <input
                type="text"
                :placeholder="$t('financeEarnings.enter_verification_code')"
                oninput="value=value.replace(/[^\d]/g,'')"
                v-model="orderWithdraw.code"
                style="width:255px;"
              />
              <button style="borderColor:transparent;color:#fff;margin-left:10px;" class="yzm-btn" v-bind:disabled="!disabled" @click="getEmailCode">{{count}}<span v-if="disabled"></span><span v-else>s</span></button>
            </div>
          </div>
        </div>

        <p class="tx-btn" style="display:flex;justify-content: center;margin-top:20px">
          <span
            style="color:#fff;"
            @click="nextBtn"
          >
          <!-- 下一步 -->
          {{$t('financeEarnings.next')}}
          </span>
           <span
            style="color:#fff;margin-left:30px;"
            @click="contribute"
          >
          <!-- 取消 -->
          {{$t('financeEarnings.cancel')}}
          </span>
        </p>
        <!-- <span @click="contribute">取消</span> -->
      </div>
    </div>

    <div v-if="sureBox" class="fuCeng">

      <!-- 转账 -->
      <div>
        <h4 style="padding:20px 20px 5px;">
          <!-- <span>{{val}}</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt /> -->
          <div><span>{{$t('financeCash.transfer')}}</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div class="tx-box">

          <div class="item">
            <div>{{$t('financeCash.account_other_party')}}：</div>
            <div>
              {{orderWithdraw.to}}
            </div>
          </div>
          <div class="item">
            <div style="width:100px;">{{$t('financeCash.zzje')}}：</div>
            <div>
              {{orderWithdraw.amount}}
            </div>
          </div>
          <div class="item">
            <div>
              <!-- 备注 -->
              {{$t('financeEarnings.remarks')}}：</div>
            <div>
              {{orderWithdraw.remark}}
            </div>
          </div>
        </div>

        <p class="tx-btn" style="display:flex;justify-content: center;margin-top:20px">
          <span
            style="color:#fff;"
            @click="prverBtn"
          >
          <!-- 上一步 -->
          {{$t('financeEarnings.prver')}}
          </span>
           <span
            style="color:#fff;margin-left:30px;"
            @click="sureBtn"
          >
          <!-- 确定 -->
          {{$t('financeEarnings.sure')}}
          </span>
        </p>
        <!-- <span @click="contribute">取消</span> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { transferlog,transfersumbit,getEmailCode } from '@/api/finance'
  import moment from 'moment'
  import { formatDate } from '../../utils/date.js'
import { mapGetters } from 'vuex'

import Cookies from 'js-cookie'
var lang=Cookies.get('language') || 'en';
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
        lielist: [],
        FC: false,
        sureBox:false,
        allList: [],
        pageSize1: 2147483647,
        downloadLoading: false,
        enabledTypeOptions: [
          { key: 100, display_name: '审核中' },
          { key: 200, display_name: '驳回' },
          { key: 300, display_name: '审核完成' }
        ],

        orderWithdraw: {
          to: "",
          amount: "",
          remark: "",
          code:'',
        },
        email:'',
        count: 'get verification code',//获取验证码
        timer: null,
        disabled:true,
        messages:'',
        messagee:'',
        enter_the_amount:'',
        imported_gold_must_be_large:'',
        please_enter_the_order_number:'',
        congratulations_order:'',
        enter_verification_code:'',
        withdrawal_amount_large:'',
        congratulations_successfully:'',
        eHeader:[],
        eName:'',
        success:'',
        fail:'',
        middle:'',
      }
    },
    computed: {
    ...mapGetters([
      'user',
    ])
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
      transferBtn(){
        this.FC = true
        if(lang=='en'){
          this.count='Get verification code'
        }else{
          this.count='获取验证码'
        }
      },
      contribute() {
        this.FC = false
        this.sureBox=false
        this.orderWithdraw= {
          to: "",
          amount: "",
          remark: "",
          code:''
        }
      },
      //提现时获取邮箱验证码
      getEmailCode(){
        console.log('111')
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          // this.disabled = ture;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              this.disabled = false
              } else {
                this.disabled = true;
                clearInterval(this.timer);
                this.timer = null;
                if (lang=="en") {
                    this.count = 'get verification code'
                }else{
                    this.count='获取验证码'
                }
              }
            }, 1000)
          }
        this.email=this.user.email
        console.log(this.email)
        var dataEmail={
          value:this.email
        }
        getEmailCode(2).then(res => {
            console.log(res);
          });
      },

      notarize(){

      },
      //下一步
      nextBtn(){
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(lang=='en'){
          if (this.orderWithdraw.to == "") {
              this.$message.error("Please enter the opposite account");
          }else if (!myreg.test(this.orderWithdraw.to)) {
              this.$message.error("Incorrect mailbox format");
          }else if (this.orderWithdraw.amount == "") {
            this.$message.error("Please enter the transfer amount");
          }else if(this.orderWithdraw.amount <=0){
            this.$message.error("Input amount must be greater than zero");
          }
          // else if (this.transfer_amount1 > this.cashData.totalCash) {
          //   // this.$message.error("提现额度不能大于总额度");
          //   Toast({
          //     message: '提现额度不能大于总额度',
          //     duration: 3000,
          //     iconClass: 'iconfont icon-jinggao'
          //   });
          // }
          else if (this.orderWithdraw.code == "") {
            this.$message.error("Please enter the verification code");
          }  else {
            this.FC=false;
            this.sureBox=true;
          }
        }else{
          if (this.orderWithdraw.to == "") {
              this.$message.error("请输入对方账户");
          }else if (!myreg.test(this.orderWithdraw.to)) {
              this.$message.error("邮箱格式不正确");
          }else if (this.orderWithdraw.amount == "") {
            this.$message.error("请输入转账金额");
          }else if(this.orderWithdraw.amount <=0){
            this.$message.error("输入金额必须大于零");
          }
          // else if (this.transfer_amount1 > this.cashData.totalCash) {
          //   // this.$message.error("提现额度不能大于总额度");
          //   Toast({
          //     message: '提现额度不能大于总额度',
          //     duration: 3000,
          //     iconClass: 'iconfont icon-jinggao'
          //   });
          // }
          else if (this.orderWithdraw.code == "") {
            this.$message.error("请输入验证码");
          }  else {
            this.FC=false;
            this.sureBox=true;
          }
        }
        // this.FC=false;
        // this.sureBox=true;

      },
      //上一步
      prverBtn(){
        this.sureBox=false;
        this.FC=true;
      },
      //确定
      sureBtn(){
        transfersumbit(this.orderWithdraw).then(res=>{
          if(res.code==200){
            this.sureBox=false;
            this.orderWithdraw= {
              to: "",
              amount: "",
              remark: "",
              code:''
            }
            this.request()
          }
        })
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
        transferlog(this.pageNo, this.pageSize, this.beginDate, this.endDate, this.name,this.name1,this.name2,this.name3).then(
          res => {
            if(res.code==200){
              this.allList = eval(res.data.list);
              console.log(res.data.list)
              let date = JSON.parse(JSON.stringify(this.allList));
              date.forEach((v, i) => {
                date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD hh:mm:ss");
                // if(date[i].modify_time==null){

                // }else{
                //   date[i].modify_time = moment(date[i].modify_time).format("YYYY-MM-DD hh:mm:ss");
                // }
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
        let _this = this;
        if(lang=='en'){
          _this.eHeader=['Transfer time','Serial number', 'Member name','Account of the other party','Contact information','Transfer amount($)','Remarks']
          _this.eName='transfer record Excel'
          _this.success='Audit success'
          _this.fail='Audit failure'
          _this.middle='In Audit'
        }else{
          _this.eHeader=['转账时间','流水号',  '会员名称','对方账号','联系方式', '转账金额($)',"备注"]
          _this.eName='转账记录Excel'
          _this.success='审核成功'
          _this.fail='审核失败'
          _this.middle='审核中'
        }
        transferlog(this.pageNo, this.pageSize1, this.beginDate, this.endDate, this.name,this.name1,this.name2,this.name3).then(res => {
          if(res.code==200){
            this.allList = eval(res.data.list)
            this.total = res.data.total
            const date = JSON.parse(JSON.stringify(this.allList))
            date.forEach((v,i) => {
              // date[i].order_status= date[i].order_status==300?'审核成功': date[i].order_status==200?'审核失败':'审核中'
              date[i].create_time = moment(date[i].create_time).format("YYYY-MM-DD hh:mm:ss");
              // if(date[i].modify_time==null){
              //   date[i].modify_time = ''
              // }else{
              //   date[i].modify_time = moment(date[i].modify_time).format("YYYY-MM-DD hh:mm:ss");
              // }
            });
            require.ensure([], () => {
              const { export_json_to_excel } = require('@/utils/Export2Excel.js') //引入文件
              const tHeader = _this.eHeader //将对应的属性名转换成中文
              const filterVal = ['create_time','merchant_order_id','username', 'dest_email','phone', 'transfer_amount', 'remark' ]//table表格中对应的属性名
              const list = date //想要导出的数据
              const data = this.formatJson(filterVal, list)
              export_json_to_excel(tHeader, data, _this.eName)
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
  .demonstration{
    display: inline-block;
    width:80px;
    vertical-align: middle;

  }
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
  left: 188px;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(13, 29, 76, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 835px;
    height: 400px;
    // background: white;
    background: url('../../assets/images/bg_qianbao.png') no-repeat;
    background-color: rgba(13, 29, 76, 0.5);
    background-size: 100% 100%;
    overflow-x: none !important;
    overflow-y: none !important;
    color: #fff;
    font-size: 14px;
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
    >div {
      // margin-top: 50px;
      display: flex;
      // flex-direction: column;
      align-items: center;
      >.item{
        display: flex;
        align-items: center;
        width: 90%;
        height: 40px;
        margin-top: 10px;
        >div:first-of-type{
          width: 100px;
          display: inline-block;
          text-align: right;
          // display: flex;
          // justify-content: flex-end;
          margin-right: 30px;
        }
        >div:last-of-type{
          height: 40px;
          display: flex;
          align-items: center;
          >input{
            height: 100%;
            border:1px solid rgba(47,228,255,1);
            background:rgba(24,136,203,0.3);
            color: #fff;
          }
          >input::placeholder{
            color: #fff;
          }
          .yzm-btn{
            width: 160px;
            height: 40px;
            background: url('../../assets/images/bg_xuankuang.png') no-repeat;
            background-size: 100% 100%;
            font-size: 14px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
          }
        }
      }
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
      p:nth-of-type(3) {
        margin-top: 60px;
      }
    }
    .desc-box{
      width: 100%;
      text-align: center;
    }
    >p{
      // margin-top: 50px;
      .sure-btn{
        display: block;
        width: 140px;
        height: 40px;
        background: url('../../assets/images/ic_qb_cz.png') no-repeat;
        background-size: 100% 100%;
        color:#fff;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }
    }
    .bottom-btn{
      display: flex;
      justify-content: center;
      align-items: center;
        cursor: pointer;
      >span{
        display: block;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: url('../../assets/images/ic_qb_cz.png') no-repeat;
        background-size: 100% 100%;
        margin: 0 92px;
      }
    }
    .tx-box{
      flex-direction: column;
    }
    .tx-btn{
      >span{
        display: block;
        width: 140px;
        height: 40px;
        background: url('../../assets/images/ic_qb_cz.png') no-repeat;
        background-size: 100% 100%;
        color:#fff;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
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
  input{
    color: #fff !important;
  }
  input::placeholder{
    color: #fff !important;
  }
</style>
