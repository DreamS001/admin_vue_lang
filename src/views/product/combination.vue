<template>
  <div class="wscn-http404-container">
    <el-col :xs="24" :sm="24" :lg="24">
      <ul class="ul">
				<li>
				  <!--  -->
				  <div>
				    <div class="bg" style="display:flex; justify-content: center; align-items: center;">
				      <img style="width:100%;height:160px" src="../../assets/images/img_chanpin1.png" alt />
				    </div>
				    <div class="val">
              <h5>自定义产品</h5>
				      <p>
				        <span>金额：</span>
				        <span>{{customPrice}}$</span>
				      </p>
				      <p>
				        <span>周期：</span>
				        <span>{{config.period}}天</span>
				      </p>
				      <p>
				        <span>回报率：</span>
				        <!-- <span>{{config.profit}}</span> -->
                <span>120+%</span>
				      </p>
              <p>
                <span>收益分配：</span>
                <span>200天</span>
              </p>
				      <p>
				        <span>数量：</span>
				        <span>
				            <el-input-number size="mini" v-model="num" :min="1" :max="100" @change="countPrice" style="margin-right:5px;"></el-input-number>台
				        </span>
				      </p>
				      <p style="display: flex;justify-content:flex-end;">
				        <span
                class="buyBtn"
				          style="color:#fff;cursor: pointer;justify-content: center;"
				          @click="contribut(1,i)"
				        >购买</span>
				      </p>
				    </div>
				  </div>
				</li>
        <li v-for="(i,item) in list" v-bind:key="item">
          <div>
            <div class="bg" style="display:flex; justify-content: center; align-items: center;">
              <img  style="width:100%;height:160px" :src=i.pic_url alt />
            </div>
            <div class="val">
              <h5>{{i.name}}</h5>
              <p>
                <span>金额：</span>
                <span>{{i.price}}($)</span>
              </p>
              <p>
                <span>周期：</span>
                <span>{{i.period}}天</span>
              </p>
              <p>
                <span>回报率：</span>
                <span>120+%</span>
                <!-- <span>{{i.profit_rate*100 | formatrRate}}(%)</span> -->
              </p>
              <p>
                <span>收益分配：</span>
                <span>{{i.profit_distribute}}</span>
              </p>
              <p>
                <span>数量：</span>
                <span>
                  <span :key="i.id" style="margin-right:5px;width:0;">{{i.num}}</span>台
                </span>
              </p>
              <p style="display: flex;justify-content:flex-end;">
                <span
                class="buyBtn"
                  style="color:#fff;cursor: pointer;justify-content: center;"
                  @click="contribut(2,i)"
                >购买</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </el-col>
    <!-- 阴影层 -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <!-- <span>一键复投</span>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt /> -->
          <div><span>购买</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div style="height:200px;line-height:200px;text-align:center;">
          <p></p>
          <p class="desc-box">确认购买该产品吗？</p>
        </div>
        <div class="bottom-btn">
          <span @click="ensure">确定</span>
          <span @click="contribute">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { all, purchase, reivest,getConfig } from "@/api/produc";
import { signFigures } from '../../utils/floatToInt.js'
export default {
  data() {
    return {
			customPrice:300,
      num: 1,
      list: [],
      FC: false,
			config:{
				profit:0,
				period:0,
				amount:0

			},
      value: {
        pay: 1,
        id: 0,
        num:0
      }
    };
  },
  // 时间搓
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      },
      formatrRate(rate) {
        return signFigures(rate)
      }
    },
  methods: {
		countPrice(){
			this.customPrice = this.num*this.config.amount
		},
    contribute(row) {
      console.log(row);
      if (this.FC == false) {
        console.log(123);
        this.FC = true;
      } else {
        this.FC = false;
        console.log(1243);
      }

      console.log(this.FC);
    },
    ensure() {
      this.FC = false;

      // console.log(this.value.id)
      // if (this.value.id == 139) {
      //   var pay = 1;
      //   var data = {
      //     pay,
      //     id: 0,
      //     num: this.num
      //   };
      // } else {
      //   var pay = 1;
      //   var data = {
      //     pay,
      //     id: this.value.id,
      //     num: 0
      //   };
      // }

      purchase(this.value).then(res => {

        // this.$message.success("购买产品成功");
        // this.$router.push({ path: "/product/record" });
       if(res=='余额不足,购买失败'){
        this.$message.error("余额不足,购买失败");
       }else{
          this.$message.success("购买产品成功");
           this.$router.push({ path: "/product/record" });
       }
      });
    },
    // this.list = eval(res.list);

    contribut(type,item) {
      this.FC = true;
			if(type==1){
				this.value.id = 0
				this.value.num = this.num
			}
			if(type==2){
				this.value.id = item.id
				this.value.num = 0
			}
				this.value.pay = 1
        console.log(this.value)
      // for (let i = 0; i < this.list.length; i++) {
      //   if (i == item) {
      //     this.bay = this.list[item].id;
      //
      //   }
      // }
    }
  },
  mounted() {
    this.value.pay = this.$route.query.pay;
    all(1,999).then(res => {
      if(res.code==200){
        console.log(res);
        this.list = res.data.list;
      }

    });
		getConfig().then(res=>{
      if(res.code=200){
        console.log(res)
				this.config.period = res.data.period
				this.config.profit = res.data.profit
				this.config.amount = res.data.amount
      }

		})
  }
};
//   created(e) {
//     console.log(this.$route.query.pay);
//     this.value.pay = this.$route.query.pay;
//     alll().then(res => {
//       console.log(res);
//
//       this.list = eval(res.list);
//       console.log(this.list);
//     });
//   }
// };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
  min-height: calc(100vh - 84px);
  width: 100%;
}
.ul {
  display: flex;
  min-width: 700px;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0;
  padding: 20px 0 20px 20px;
  li {
    list-style: none;
    // background: #fff;
    background: url('../../assets/images/bg_cpzh.png') no-repeat;
    background-size: 100% 100%;
    width: 36%;
    // width: 800px;
    // height: 351px;
    height: 430px;
    padding: 13px;
    margin-right: 1%;
    font-size: 14px;
    margin-bottom: 1%;
    h5 {
      // margin: 0 0 40px 0;
    }
    > div {
      display: flex;
      justify-content: space-between;
      height: 100%;
      .bg {
        width: 45%;
        // width: 267px;
        height: 100%;
        background: url('../../assets/images/bg_cpzh_cp.png') no-repeat;
        background-size: 100% 100%;
        padding: 5px;
        box-sizing: border-box;
        img{
          width: 100%;
          height: 100%;
        }
      }
      div:nth-of-type(2) {
        width: 30%;
        // width: 300px;
        // margin: 0 18%;
        margin-right: 5%;
        height: 100%;
        color: #fff;
        p {
          margin: 0;
          line-height: 22px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 18px;
        }
      }
    }
  }
}
.hint {
  position: absolute;
  text-align: center;
  margin: 40px 0 0 120px;
  font-size: 10px;
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
        //   width: 66px;
        // }
      }

    }
    .desc-box{
      width: 100%;
      text-align: center;
    }
    >p{
      margin-top: 50px;
      .sure-btn{
        display: block;
        width: 140px;
        height: 40px;
        background: url('../../assets/images/ic_qb_cz.png') no-repeat;
        background-size: 100% 100%;
        color:#fff;
        line-height: 40px;
        text-align: center;
      }
    }
    .bottom-btn{
      display: flex;
      justify-content: center;
      align-items: center;
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
    .tx-box{
      flex-direction: column;
    }
  }
}
.val {
  span {
    white-space: nowrap;
    width: 120px;
  }
  span:last-of-type{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
.el-input .el-input-number .el-input__inner {
  height: 20px;
}
.el-input-number {
  // margin-bottom: 5px;
}
.buyBtn{
  width: 120px;
  height: 40px;
  background: url('../../assets/images/ic_qb_cz.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;
  line-height: 40px;
}
</style>

<style>
  input{
    background: transparent;
    padding-left: 10px;
    color: #fff;
  }
  .el-input-number__increase, .el-input-number__decrease{
     background: transparent;
    border: 1px solid transparent;
    color: #fff;
  }
  .el-input__inner{
    background: transparent;
    border: 1px solid rgba(0, 190, 255, 1) !important;
    color: #fff;
  }
</style>
