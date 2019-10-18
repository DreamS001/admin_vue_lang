<template>
  <div class="wscn-http404-container">
    <!-- <el-row :gutter="32" style="margin:0;">
      <el-col :xs="24" :sm="24" :lg="24" style="padding:0;important">
        <div class="item"></div>
      </el-col>
    </el-row> -->
    <ul class="ul">
      <li class="item">
        <div>
          <div class="item-top">
            <span>{{$t('financeEarnings.title_1')}}</span>
            <img src="../../assets/images/img_jianbian.png" alt="">
          </div>
          <div @click="hrefone" class="ck-mx">{{$t('financeEarnings.detailed')}}</div>
        </div>
        <div class="item-middle">
          <div class="item-m-p">
            <span>{{$t('financeEarnings.dq_balance')}}</span>
            <!-- <span class="rectangle" :style="{ width: date.totalCash/100 + 'px' }" style="background:rgba(255, 171, 79, 1)"></span> -->
            <div class="middle-m">
              <div class="middle-m-d" :style="{ width: date.totalCash/100 + 'px' }" style="background:rgba(255, 171, 79, 1);"></div>
            </div>
            <span style="color:#fff;"><span style="margin-right:10px">$</span>{{date.totalCash}}</span>
          </div>
        </div>
        <p>
          <span @click="withdraws" style="margin-right:20px;">{{$t('financeEarnings.withdrawal')}}</span>
          <span @click="topups">{{$t('financeEarnings.recharge')}}</span>
        </p>
      </li>
      <li class="item">
        <div>
          <div class="item-top">
            <span>{{$t('financeEarnings.title_2')}}</span>
            <img src="../../assets/images/img_jianbian.png" alt="">
          </div>
          <div @click="hrefthree" class="ck-mx">{{$t('financeEarnings.detailed')}}</div>
        </div>
        <div class="item-middle">
          <div class="item-m-p">
            <span>{{$t('financeEarnings.lj_income')}}</span>
            <!-- <span class="rectangle" :style="{ width: cashData.actCash/100 + 'px' }" style="background:rgba(255, 171, 79, 1)"></span> -->
            <div class="middle-m">
              <div class="middle-m-d" :style="{ width: date.actCash/100 + 'px' }" style="background:rgba(255, 171, 79, 1);"></div>
            </div>
            <span style="color:#fff;"><span style="margin-right:10px">$</span>{{date.actCash}}</span>
          </div>
          <div class="item-m-p">
            <span>{{$t('financeEarnings.jr_earnings')}}</span>
            <!-- <span class="rectangle" :style="{ width: cashData.actCashDay/100 + 'px' }" style="background:rgba(236, 105, 65, 1)"></span> -->
            <div class="middle-m">
              <div class="middle-m-d" :style="{ width: date.actCashDay/100 + 'px' }" style="background:rgba(236, 105, 65, 1);"></div>
            </div>
            <span style="color:#fff;"><span style="margin-right:10px">$</span>{{date.actCashDay}}</span>
          </div>
        </div>
        <p>
          <!-- <span @click="contributea">一键复投</span> -->
        </p>
      </li>
      <li class="item">
        <div>
          <div class="item-top">
            <span>{{$t('financeEarnings.title_3')}}</span>
            <img src="../../assets/images/img_jianbian.png" alt="">
          </div>
          <div @click="hreftwo" class="ck-mx">{{$t('financeEarnings.detailed')}}</div
          >
        </div>
        <div class="item-middle">
          <div class="item-m-p">
            <span>{{$t('financeEarnings.lj_income')}}</span>
            <!-- <span class="rectangle" :style="{ width: cashData.staCash/100 + 'px' }" style="background:rgba(255, 171, 79, 1)"></span> -->
            <div class="middle-m">
              <div class="middle-m-d" :style="{ width: date.staCash/100 + 'px' }" style="background:rgba(255, 171, 79, 1);"></div>
            </div>
            <span style="color:#fff;"><span style="margin-right:10px">$</span>{{date.staCash}}</span>
          </div>
          <div class="item-m-p">
            <span>{{$t('financeEarnings.jr_earnings')}}</span>
            <!-- <span class="rectangle" :style="{ width: cashData.staCashDay/100 + 'px' }" style="background:rgba(236, 105, 65, 1)"></span> -->
            <div class="middle-m">
              <div class="middle-m-d" :style="{ width: date.staCashDay/100 + 'px' }" style="background:rgba(236, 105, 65, 1);"></div>
            </div>
            <span style="color:#fff;"><span style="margin-right:10px">$</span>{{date.staCashDay}}</span>
          </div>
        </div>
        <p>
          <!-- <span @click="toFT">一键复投</span> -->
        </p>
      </li>
      <li class="item">
        <div>
          <div class="item-top">
            <span>{{$t('financeEarnings.title_4')}}</span>
            <img src="../../assets/images/img_jianbian.png" alt="">
          </div>
          <div @click="hreffour" class="ck-mx">{{$t('financeEarnings.detailed')}}</div>
        </div>
        <div class="item-middle">
          <div class="item-m-p" style="margin-left:-28px;">
            <span>{{$t('financeEarnings.lj_integral')}}</span>
            <!-- <span class="rectangle" :style="{ width: date.totalCash/100 + 'px' }" style="background:rgba(255, 171, 79, 1)"></span> -->
            <div class="middle-m">
              <div class="middle-m-d" :style="{ width: date.creditPoint/100 + 'px' }" style="background:rgba(255, 171, 79, 1);"></div>
            </div>
            <span style="color:#fff;"><span style="margin-right:10px">$</span>{{date.creditPoint}}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- 阴影层 -->
    <div v-if="FC" class="fuCeng">
      <div v-if="centers" class="fuCeng-m-a">
        <h4>
          <!-- <span>一键复投</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt /> -->
          <div><span>{{$t('financeEarnings.recharge')}}</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div style="height:200px;line-height:200px;text-align:center;">
          <p></p>
          <p class="desc-box">是否跳转购买产品页面？</p>
        </div>
        <div class="bottom-btn">
          <span @click="voting">{{$t('financeEarnings.sure')}}</span>
          <span @click="contribute">{{$t('financeEarnings.email')}}</span>
        </div>
      </div>
      <!-- 充值 -->
      <div v-if="cashmoney" class="fuCeng-m-b">
        <h4>
          <!-- <span>{{val}}账户</span> -->
          <div><span>{{$t('financeEarnings.recharge')}}</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div style="margin-top:20px!important;">
          <div style="margin-top:20px!important;width: 100%;">
            <div
              style="margin-top:0px!important;padding: 0 90px;box-sizing:border-box;"
              @click="button(i.id)"
              v-for="(i,index) in cashlists"
              v-bind:key="index"
            >
              <div
                v-bind:class="{ classred:index==current}"
                style="margin:5px 20px;padding: 11px 10px;box-sizing:border-box;display: flex;
    justify-content: space-between;color:#fff;"
              >
                <span>{{i.name}}</span>
                <span>{{i.token}}</span>
              </div>
            </div>
          </div>
        </div>
        <p style="display:flex;justify-content: center;">
          <span
            @click="notarizeTopup"
            class="sure-btn"
          >{{$t('financeEarnings.sure')}}</span>
        </p>
      </div>
      <!-- 提现 -->
      <div v-if="topupmoney">
        <h4 style="padding:20px 20px 5px;">
          <div><span>{{$t('financeEarnings.withdrawal')}}</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div class="tx-box">
          <div class="item">
            <div>{{$t('financeEarnings.email')}}：</div>
            <div>
              {{user.email}}
            </div>
          </div>
          <div class="item">
            <div>{{$t('financeEarnings.VerificationCode')}}:</div>
            <div>
              <input
                type="text"
                placeholder=""
                oninput="value=value.replace(/[^\d]/g,'')"
                v-model="orderWithdraw.code"
                style="width:255px;"
              />
              <button style="borderColor:transparent;color:#fff" class="yzm-btn" v-bind:disabled="!disabled" @click="getEmailCode">{{count}}<span v-if="disabled"></span><span v-else>s</span></button>
            </div>
          </div>
          <div class="item">
            <div>{{$t('financeEarnings.cash_amount')}}：</div>
            <div>
              <input
                style=""
                type="text"
                placeholder=""
                oninput="value=value.replace(/[^\d]/g,'')"
                v-model="orderWithdraw.amount"
              />$（{{$t('financeEarnings.cash_amount')}}）
            </div>
          </div>
          <div class="item">
            <div>{{$t('financeEarnings.cash_adress')}}:</div>
            <div>
              <input
                style=""
                type="text"
                placeholder=""
                v-model="orderWithdraw.tokenId"
              />
            </div>
          </div>
          <div class="item">
            <div>{{$t('financeEarnings.remarks')}}：</div>
            <div>
              <input
                style=""
                type="text"
                placeholder=""
                v-model="orderWithdraw.remark"
              />
            </div>
          </div>
        </div>

        <p class="tx-btn" style="display:flex;justify-content: center;margin-top:20px">
          <span
            style="color:#fff;"
            @click="notarize"
          >{{$t('financeEarnings.sure')}}</span>
        </p>
        <!-- <span @click="contribute">取消</span> -->
      </div>
    </div>
    <!-- 充值与支付支付弹窗-->
    <div v-show="FCA" class="fuCeng">
      <div>
        <h4>
          <div><span>{{$t('financeEarnings.recharge')}}</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>

            <!-- oninput="value=value.replace(/[^\d]/g,'')" -->
        <p style="padding:0 30px 10px 30px;margin-top:28px;">
          {{$t('financeEarnings.cash_amount')}}：
          <input
            style="margin-right:30px;width:200px; border-radius: 2px;border:1px solid #fff"
            type="text"
            placeholder=""
            oninput="value=value.replace(/[^\d]/g,'')"
            v-model="orderToup.amount"
            min="0.01"
          />$
        </p>
        <p style="padding:0px 30px 10px 30px">
          {{$t('financeEarnings.jy_number')}}：
          <input
            style="margin-right:30px;width:200px; border-radius: 2px;border:1px solid #fff"
            type="text"
            placeholder=""
            v-model="orderToup.tokenId"
          />
        </p>
        <p style="padding:0px 30px">
          {{$t('financeEarnings.cash_adress')}}：
          <span style="color:gray">{{topup_a.token}}</span>
        </p>
        <p class="tx-btn" style="display:flex;justify-content: center;margin-top:20px">
          <span
            style="color:#fff;"
            @click="notarize"
          >{{$t('financeEarnings.sure')}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { financeEarnings } from '@/utils/i18n'// 国际化主题名字
import {
  finan,
  finana,
  pages,
  cashlist,
  withdraw,
  topup,
  toup,
  getEmailCode
} from "@/api/finance";
// import { getEmailCode } from '@/api/code'
export default {
  data() {
    return {
      fuTou: 12,
      finan: "",
      radio7: "1",
      val: "",
      pay: 3,
      date: "",
      type: "",
      moneyy: "",
      state: "",
      topup_a: 1,

      current: 1000,
      orderToup: {
        amount: "", //充值金额
        tokenId: "", //订单号
        thirdId: ""
      },
      orderWithdraw: {
        amount: "",
        tokenId: "",
        remark: "",
        code:'',
      },
      FC: false, //一层浮层展现 提现与充值选择支付方式，一件复投展显
      centers: false, //一键复投展现
      cashmoney: false, //充值
      topupmoney: false, //提现
      FCA: false, //二层浮层 提现与充值提交支付
      cashlists: "",
      cashData:{
        totalCash:0,//当前余额
        actCash:0,//累计收益
        actCashDay:0,//当天收益
        staCash:0,//累计收益
        staCashDay:0,//当天收益
        totalCash:0,//累计积分收益
      },
      email:'',
      count: '获取验证码',
      timer: null,
      disabled:true
    };
  },
    computed: {
    ...mapGetters([
      'user',
    ]),
    show: {
      get() {
        return this.$store.state.settings.showRightPanel
      },
      set(val) {
        this.$store.dispatch('changeSetting', {
          key: 'showRightPanel',
          value: val
        })
      }
    }
  },
  methods: {
    financeEarnings,
    // 充值单选
    button(e) {
      // console.log(1);
      console.log(e);
      var e = e - 1;
      this.current = e;
      this.topup_a = this.cashlists[e];
      // for(let i=0;i<this.cashlists.length;i++){

      // }
    },
    //获取邮箱验证码
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
          this.count='获取验证码'
          }
        }, 1000)
        }
      this.email=this.user.email
      console.log(this.email)
      var dataEmail={
        value:this.email
      }
      getEmailCode().then(res => {
          console.log(res);
        });
    },
    // 充值确认
    notarizeTopup() {
      if (this.current == 1000) {
        alert("请选择支付方式");
      } else {
        this.FC = false;
        this.FCA = true;
      }
    },
    // 确认
    notarize() {
      //充值后跳转
      // console.log(this.amount);

      var that = this;
      if (this.type == 1) {
        this.orderToup.thirdId = this.topup_a.token;
        if (that.orderToup.amount == "") {
          // alert("请输入金额");
           that.$message({
            message: "请输入金额",
            type: "none"
          });
        } else if(that.orderToup.amount <=0){
          that.$message({
            message: "输入金额必须大于零",
            type: "none"
          });
        } else if (that.orderToup.tokenId == "") {
          // alert("请输入订单号");
          that.$message({
            message: "请输入订单号",
            type: "none"
          });
        } else {
          toup(this.orderToup).then(res => {

            // var data=JSON.parse(res.data)
            console.log(res);
            that.FC = false;
            that.FCA = false;
            console.log(that.amount);
            that.$message({
              message: "恭喜你，订单已生成",
              type: "success"
            });

            that.$router.push({
              path: "/finance/recharge",
              query: { topupMoney: that.amount }
            });
          });
        }
      }
      //提现后跳转
// else if (this.orderWithdraw.amount > this.date.totalCash) {
//           this.$message.error("请再次输入金额");
//         }
      if (this.type == 2) {
        console.log(this.orderWithdraw);
        if (this.orderWithdraw.code == "") {
          this.$message.error("请输入验证码");
        }else if (this.orderWithdraw.amount == "") {
          this.$message.error("请输入金额");
        }else if(this.orderWithdraw.amount <=0){
          that.$message.error("输入金额必须大于零");
        } else if (this.orderWithdraw.amount > this.date.totalCash) {
          this.$message.error("提现额度不能大于总额度");
        } else if (this.orderWithdraw.tokenId == "") {
          this.$message.error("请输入地址");
        }  else {
          console.log(this.orderWithdraw);
          withdraw(this.orderWithdraw).then(res => {
            // var data=JSON.parse(res.data)
            console.log(res);
            // this.dataa=eval(data.data.map_data)
            this.FC = false;
            this.FCA = false;
            this.$message({
              message: "恭喜你，提交成功",
              type: "success"
            });
            this.$router.push({
              path: "/finance/withdraw"
            });
          });
        }
      }
    },
    toWithdraw() {},
    // 提现
    withdraws() {
      this.type = 2;
      this.centers = false;
      this.cashmoney = false;
      this.topupmoney = true;
      this.val = "提现";
      this.FC = true;
      // withdraw().then(res => {
      //   // var data=JSON.parse(res.data)
      //   console.log(res);
      //   // this.dataa=eval(data.data.map_data)
      // });
    },
    // 充值
    topups() {
      this.type = 1;
      this.centers = false;
      this.cashmoney = true;
      (this.topupmoney = false), (this.val = "充值");
      this.FC = true;
      topup().then(res => {
        // var data=JSON.parse(res.data)
        if(res.code==200){
          console.log(res.data);
          this.cashlists = res.data;
          console.log(this.cashlists);
          // this.dataa=eval(data.data.map_data)
        }

      });
    },
    //复投
    toFT(){
      this.type = 1;
      this.centers = true;
      this.cashmoney = false;
      (this.topupmoney = false), (this.val = "一键复投");
      this.FC = true;
      // topup().then(res => {
      //   // var data=JSON.parse(res.data)
      //   console.log(res);
      //   this.cashlists = res;
      //   console.log(this.cashlists);
      //   // this.dataa=eval(data.data.map_data)
      // });
    },
    // 查看明细
    hrefone() {
      this.$router.push({ path: "/finance/cash" });
    },
    hreftwo() {
      this.$router.push({ path: "/finance/static" });
    },
    hrefthree() {
      this.$router.push({ path: "/finance/dynamic" });
    },
    hreffour() {
      this.$router.push({ path: "/finance/integral" });
    },
    //关闭弹框
    contribute() {
      this.FCA = false;
      this.FC = false;
      console.log(this.FC);
      this.orderWithdraw={
        amount: "",
        tokenId: "",
        remark: "",
        code:'',
      }
    },
    // 动态
    contributea() {
      (this.topupmoney = false), (this.cashmoney = false);
      this.centers = true;
      this.state = 1;
      console.log(this.state);

      this.FC = true;
    },
    // 静态
    contributeb() {
      this.state = 2;
      (this.topupmoney = false), (this.cashmoney = false);
      this.centers = true;
      this.FC = true;
    },
    // 复投确定
    voting() {
      this.FC = false;
      if (this.state == 1) {
        this.$router.push({ path: "/product/combination", query: { pay: 2 } });
      }
      if (this.state == 2) {
        this.$router.push({ path: "/product/combination", query: { pay: 3 } });
      }
    }
  },
  created() {
    pages().then(res => {
      if(res.code==200){
              // var data=JSON.parse(res.data)
        // console.log(res);
        this.date = res.data;
        this.cashData={
          totalCash:res.totalCash,//当前余额
          actCash:res.actCash,//累计收益
          actCashDay:res.actCashDay,//当天收益
          staCash:res.staCash,//累计收益
          staCashDay:res.staCashDay,//当天收益
          totalCash:res.totalCash,//累计积分收益
        }
        // console.log(this.date.userId);
      }

    });
    // toup().then(res => {
    //     // var data=JSON.parse(res.data)
    //     console.log(res);
    //     this.date = res;
    //     console.log(this.date.userId);
    //   });
  }
};


</script>
<style>

  input::-webkit-input-placeholder{
    color: #fff !important;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
input{
  background: rgba(24, 136, 203, 0.3);
  margin-right:30px;
  width:400px;
  height: 40px;
  border:1px solid rgba(47, 228, 255, 1);
  color: #fff !important;
  padding-left: 20px;
  box-sizing: border-box;
}
.wscn-http404-container {
  background: transparent;
  min-height: calc(100vh - 84px);
  width: 100%;
}
.ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
  span {
    cursor: pointer;
  }
  li {
    list-style: none;
    width: 49%;
    height: 340px;
    // background: #fff;
    background: url('../../assets/images/bg_qianbao.png') no-repeat;
    background-size: 100% 100%;
    // width: 31%;
    // height: 15vw;
    padding: 20px;
    box-sizing: border-box;
    // margin-right: 20px;
    margin-bottom: 15px;
    color: #fff;
    font-size: 14px;
    .item-top{
      color: #fff;
      font-size: 14px;
      display: flex;
      align-items: center;
      >img{
        margin-left: 20px;
        width: 42px;
        height: 11px;
      }
    }
    .ck-mx{
      width: 110px;
      height: 30px;
      background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      line-height: 30px;
      // text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .item-middle{
      height:180px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      margin-left: 25%;
      color: #FFFFFF;
      font-size: 16px;
      .item-m-p{
        display: flex;
        align-items: center;
        .rectangle{
          display: inline-block;
          // max-width: 300px;
          // min-width: 150px;
          height: 20px;
          background: #FFAB4F;
          margin: 0 20px 0 40px;
        }
        .middle-m{
          // width: 100px;
          // max-width: 300px !important;
          // width: 55%;
          overflow: hidden;
          margin: 0 20px;
          .middle-m-d{
            max-width: 180px;
          }

          >div{
            height: 16px;
            background: #FFAB4F;
          }
        }
      }
    }
    div {
      display: flex;
      justify-content: space-between;
      // margin: 0 0 12% 0;
      span:nth-of-type(2) {
        color: #548dff;
      }
    }
    p:nth-of-type(1) {
      font-size: 14px;
      display: flex;
      line-height: 20px;
      justify-content: space-around;
      padding: 0 100px;
      height: 20px;
      white-space: nowrap;
      span {
        // white-space: nowrap;
        display: inline-block;
        width: 120px;
        height: 40px;
        background: url('../../assets/images/ic_qb_cz.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 40px;
        // margin-right: 30px
        cursor: pointer;
      }
    }
    p:nth-of-type(2) {
      font-size: 14px;
      display: flex;
      line-height: 20px;
      justify-content: center;
      padding: 0 50px;
      span {
        width: 120px;
        padding-left:5px;
        // margin-right: 30px
      }
    }
    p:nth-of-type(3) {
      display: flex;
      justify-content: center;
      margin-top: 10%;
      span {
        font-size: 10px;
        padding: 8px 20px;
        background: #4986ff;
        color: #fff;
        margin: 0 60px;
        border-radius: 2px;
        white-space: nowrap;
      }
      span:nth-of-type(2) {
        background: #09bd22 !important;
      }
    }
  }
  li:nth-of-type(2n){
    margin-right: 0;
  }
}
.hint {
  width: 30%;
  position: absolute;
  text-align: center;
  margin: 4% 0 0 0;
  font-size: 10px;
  min-width: 300px;
}
.fuCeng-m-b>div{
  width:825px !important;
}
.fuCeng-m-b>div>div{
  width:100%;
  height:200px !important;
  overflow-y: scroll !important;

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
        margin-top: 14px;
        >div:first-of-type{
          width: 100px;
          display: flex;
          justify-content: flex-end;
          margin-right: 30px;
        }
        >div:last-of-type{
          display: flex;
          align-items: center;
          .yzm-btn{
            width: 120px;
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
.inpa {
  text-align: left !important;
  padding: 20px 30px;
  margin-top: 0 !important;
}
.classred {
  // background: #4986ff;
  background: rgba(0, 128, 202, 0.4);
  border: 1px solid rgba(0, 190, 255, 0.6);
  color: #fff;
}
input {
  outline: none;
}

</style>
