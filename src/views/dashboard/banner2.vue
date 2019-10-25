<template>
  <div class="item-box clearfix">
    <div style="" class="item-box-div" >
      <div class="item-lg">
        <div class="item">
          <div class="item-top clearfix">
            <div class="top-left">
              <span>
                <!-- 我的交易 -->
                {{$t('navbar.mydeal')}}
                </span>
              <img src="../../assets/images/img_jianbian.png" alt="" srcset="" >
            </div>
            <div class="top-right" @click="deal">
              <!-- 查看详情 -->
              {{$t('navbar.viewdetails')}}
            </div>
          </div>
          <div class="data-box">
            <div class="item-middle">
              <div class="middle-left">
                <!-- 设备数 -->
                {{$t('navbar.devicenum')}}
                </div>
              <div class="middle-m">
                <div class="middle-m-d" :style="{ width: dataTable.deviceNum + 'px' }" style="background:rgba(255, 171, 79, 1);"></div>
              </div>
              <div class="middle-right">{{earn.deviceNum}} {{$t('navbar.platform')}}</div>
            </div>
            <div class="item-middle">
              <div class="middle-left">
                <!-- 我的交易额 -->
                {{$t('navbar.myturnover')}}
                </div>
              <div class="middle-m">
                <div class="middle-m-d" :style="{ width: dataTable.totalTradeAmount + 'px' }" style="background:rgba(236, 105, 65, 1);"></div>
              </div>
              <div class="middle-right">${{earn.totalTradeAmount}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-lg">
        <div class="item">
          <div class="item-top clearfix">
            <div class="top-left">
              <span>
                <!-- 我的收益 -->
                {{$t('navbar.myearnings')}}
                </span>
              <img src="../../assets/images/img_jianbian.png" alt="" srcset="">
            </div>
            <div class="top-right" @click="earns">
              <!-- 查看详情 -->
              {{$t('navbar.viewdetails')}}
            </div>
          </div>
          <div class="data-box">
            <div class="item-middle">
              <div class="middle-left" style="width:23%">
                <!-- 累计收益 -->
                {{$t('navbar.accumulatedearnings')}}
                </div>
              <div class="middle-m">
                <div class="middle-m-d" :style="{ width: dataTable.totalProfit + 'px' }" style="background:rgba(255, 171, 79, 1);"></div>
              </div>
              <div class="middle-right">${{earn.totalProfit}}</div>
            </div>
            <div class="item-middle">
              <div class="middle-left" style="width:23%">
                <!-- 今日收益 -->
                {{$t('navbar.todayearnings')}}
                </div>
              <div class="middle-m">
                <div class="middle-m-d" :style="{ width: dataTable.dayProfit + 'px' }" style="background:rgba(236, 105, 65, 1);"></div>
              </div>
              <div class="middle-right">${{earn.dayProfit}}</div>
            </div>
            <div class="item-middle">
              <div class="middle-left" style="width:23%">
                <!-- 今日投资 -->
                {{$t('navbar.todayinvestment')}}
                </div>
              <div class="middle-m">
                <div class="middle-m-d" :style="{ width: dataTable.dayInvest + 'px' }" style="background:rgba(0, 170, 255, 1);"></div>
              </div>
              <div class="middle-right">${{earn.dayInvest}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="" class="item-box-div tow">
      <div class="item-lg">
        <div class="item">
          <div class="item-top clearfix">
            <div class="top-left">
              <span>
                <!-- 我的团队 -->
                {{$t('navbar.myteam')}}
                </span>
              <img src="../../assets/images/img_jianbian.png" alt="" srcset="">
            </div>
            <div class="top-right" @click="team">
              <!-- 查看详情 -->
              {{$t('navbar.viewdetails')}}
            </div>
          </div>
          <div class="data-box">
            <div class="item-middle">
              <div class="middle-left">
                <!-- 我的团队 -->
                {{$t('navbar.myteam')}}
              </div>
              <div class="middle-m">
                <div class="middle-m-d" :style="{ width: dataTable.teamNum + 'px' }" style="background:rgba(0, 170, 255, 1);"></div>
              </div>
              <div class="middle-right">{{earn.teamNum}} {{$t('navbar.person')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-lg">
        <div class="item">
          <div class="item-top clearfix">
            <div class="top-left">
              <span>
                <!-- 动态公告 -->
                {{$t('navbar.news')}}
                </span>
              <img src="../../assets/images/img_jianbian.png" alt="" srcset="">
            </div>
          </div>
          <div class="data-box">

            <ul style="" class="announcement">
              <li v-for="(i,item) in dta" :data-id="i.id" @click="detailInfo(i)" v-bind:key="item">{{i.content}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- 浮层 -->
    <div v-if="FC" class="fuCeng">
      <div>
        <h4>
          <!-- <span>详情</span>
          <img @click="contribute" src="../../assets/logo/cuo.png"/> -->
          <div><span>{{$t('navbar.news_details')}}</span><img src="../../assets/images/img_jianbian.png" alt="" srcset=""></div>
          <img @click="contribute" src="../../assets/logo/cuo.png" alt />
        </h4>
        <div class="info-box">
          <!-- <h5>11111111</h5> -->
          <div class="content-desc">
            {{infoContent.content}}
          </div>
        </div>
      </div>
    </div>
    <!-- <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="item">
            <div class="item-top clearfix">
              <div class="top-left">
                <span>我的交易</span>
                <img src="../../assets/images/img_jianbian.png" alt="" srcset="" >
              </div>
              <div class="top-right" @click="deal">
                查看详情
              </div>
            </div>
            <div class="data-box">
              <div class="item-middle">
                <div class="middle-left">设备数</div>
                <div class="middle-m">
                  <div :style="{ width: dataTable.deviceNum + 'px' }" style="background:rgba(255, 171, 79, 1);"></div>
                </div>
                <div class="middle-right">{{earn.deviceNum}}台</div>
              </div>
              <div class="item-middle">
                <div class="middle-left">我的交易额</div>
                <div class="middle-m">
                  <div :style="{ width: dataTable.totalTradeAmount + 'px' }" style="background:rgba(236, 105, 65, 1);"></div>
                </div>
                <div class="middle-right">${{earn.totalTradeAmount}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="item">
            <div class="item-top clearfix">
              <div class="top-left">
                <span>我的收益</span>
                <img src="../../assets/images/img_jianbian.png" alt="" srcset="">
              </div>
              <div class="top-right" @click="earns">
                查看详情
              </div>
            </div>
            <div class="data-box">
              <div class="item-middle">
                <div class="middle-left">累计收益</div>
                <div class="middle-m">
                  <div :style="{ width: dataTable.totalProfit + 'px' }" style="background:rgba(255, 171, 79, 1);"></div>
                </div>
                <div class="middle-right">${{earn.totalProfit}}</div>
              </div>
              <div class="item-middle">
                <div class="middle-left">今日收益</div>
                <div class="middle-m">
                  <div :style="{ width: dataTable.dayProfit + 'px' }" style="background:rgba(236, 105, 65, 1);"></div>
                </div>
                <div class="middle-right">${{earn.dayProfit}}</div>
              </div>
              <div class="item-middle">
                <div class="middle-left">今日投资</div>
                <div class="middle-m">
                  <div :style="{ width: dataTable.dayInvest + 'px' }" style="background:rgba(0, 170, 255, 1);"></div>
                </div>
                <div class="middle-right">${{earn.dayInvest}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="item">
            <div class="item-top clearfix">
              <div class="top-left">
                <span>我的团队</span>
                <img src="../../assets/images/img_jianbian.png" alt="" srcset="">
              </div>
              <div class="top-right" @click="team">
                查看详情
              </div>
            </div>
            <div class="data-box">
              <div class="item-middle">
                <div class="middle-left">我的团队</div>
                <div class="middle-m">
                  <div :style="{ width: dataTable.teamNum + 'px' }" style="background:rgba(0, 170, 255, 1);"></div>
                </div>
                <div class="middle-right">{{earn.teamNum}}人</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="item">
            <div class="item-top clearfix">
              <div class="top-left">
                <span>动态公告</span>
                <img src="../../assets/images/img_jianbian.png" alt="" srcset="">
              </div>
            </div>
            <div class="data-box">

              <ul style="" class="announcement">
                <li v-for="(i,item) in dta" v-bind:key="item">{{i.content}}</li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row> -->


          <!-- <div :class="className" :style="{height:height,width:width}">
          <article class="art-nav">
              <p class="art-nav-p">
                  <span>我的交易</span>
                  <span style="color:#7CA7FF;cursor:pointer; " @click="deal" >查看全部</span>
              </p>
              <div>
                  <div>
                      <p>设备数（台）</p>
                      <span style="color:#7CA7FF">{{earn.deviceNum}}</span>
                  </div>
                  <div>
                      <p>我的交易额（美金）</p>
                      <span style="color:#00C3DA">{{earn.totalTradeAmount}}</span>
                  </div>
              </div>
          </article>
          <section>
              <div style="margin-right:2%">
                  <h6>
                      <span>我的收益</span>
                      <span style="color:#7CA7FF; cursor:pointer; " @click="earns" >查看全部</span>
                  </h6>
                  <p>
                      累计收益：
                      <span style="color:#00C3DA">{{earn.totalProfit}}</span>美金
                  </p>
                  <p>
                      今日收益：
                      <span style="color:#00C3DA">{{earn.dayProfit}}</span>美金
                  </p>
                  <p>
                      今日投资：
                      <span style="color:#FF7F66">{{earn.dayInvest}}</span>美金
                  </p>
              </div>
              <div>
                  <h6>
                      <span>我的团队</span>
                      <span @click="team" style="color:#7CA7FF; cursor:pointer; ">查看全部</span>
                  </h6>
                  <p style="margin-top:60px">
                      团队总数：
                      <span style="color:#7CA7FF;font-weight:600" >{{earn.teamNum}}</span>人
                  </p>
              </div>
          </section>
          <header>
              <h6>动态公告</h6>
              <p v-for="(i,item) in dta" v-bind:key="item">
                  <span>{{i.content}}</span>
                  <span>{{i.creatTime}}</span>
              </p>
          </header>
      </div> -->

  </div>
</template>





<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { getChartData } from "@/api/visits";
import { notice, earn } from "@/api/map";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "500px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      sheBei: 2000,
      jiaoYi: 12000,
      dta: "",
      earn: "",
      arr: 2,
      dataTable:{
        deviceNum:0,//设备数
        totalTradeAmount:0,//交易额
        totalProfit:0,//累计收益
        dayProfit:0,//今日收益
        dayInvest:0,//今日投资
        teamNum:0,//我的团队
      },
      FC:false,
      infoContent:{}

      // [
      //   {name:"刷脸支付,合作新模式刷脸支付,合作新模式",data:"2019.9.9"},
      //   {name:"刷脸支付刷脸支付,合作新模式刷脸支付,合作新模式",data:"2019.9.9"}
      //   ]
    };
  },
  mounted() {
    var that=this
    notice().then(res => {
      if(res.code==200){
      // var data=JSON.parse(res)
        console.log(res.data.data)
        this.dta=res.data.data
        console.log(this.dta)
      // console.log(typeof(this.data))
      // console.log( this.dataa)
      }
    });
    earn().then(res => {
      // var data=JSON.parse(res)
      if(res.code==200){
        console.log(res);
        this.earn = res.data.data;
        this.dataTable={
          deviceNum:res.data.data.deviceNum,//设备数
          totalTradeAmount:res.data.data.totalTradeAmount,//交易额
          totalProfit:res.data.data.totalProfit,//累计收益
          dayProfit:res.data.data.dayProfit,//今日收益
          dayInvest:res.data.data.dayInvest,//今日投资
          teamNum:res.data.data.teamNum,//我的团队
        }
      }
      // console.log(typeof(this.data))
      // console.log( this.dataa)
    });
  },
  methods: {
    deal() {
      this.$router.push({ path: "/deal/deallist" });
    },
    earns() {
      this.$router.push({ path: "/finance/earnings" });
    },
    team() { this.$router.push({ path: "/team/teaming" });},
    detailInfo(e){
      this.FC=true
      console.log(e)
      this.infoContent=e
    },
    contribute(){
      this.FC=false
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @media screen and (max-width: 1056px) { /*当屏幕尺寸小于1919px时，应用下面的CSS样式*/
     .item-box{
       .item-lg{
        display: flex;
        justify-content: center;
      }
       .item-box-div{
         width:838px;
         margin:0 auto;
         .item{
           float:left;
         }
       }
    }
  }

    @media screen and (min-width:1057px) and (max-width: 1919px) { /*当屏幕尺寸小于1919px时，应用下面的CSS样式*/
     .item-box{

        display: flex;
        flex-direction: column;
        flex-basis:  auto;
        width:100%;
      .item-lg{
        float: left;
        width: 50%;
      }
      .tow{
        margin-top: 20px;
      }
       .item-box-div{
          // padding-left: 3%;
          // box-sizing: border-box;
          width:100%;

          min-width: 900px;
          // display: flex;
          // justify-content: space-evenly;
          // align-items: center;
          .item{
            // margin: 0 11%;
            margin: 0 auto;
          }
       }
    }
  }
  @media screen and (min-width: 1920px) { /*当屏幕尺寸大于1920px时，应用下面的CSS样式*/
    .item-box{
      display: flex;
      .item-box-div{
          width:50%;
         .item-lg{
          width: 50%;
          float:left;
          .item{
            float:left;
         }
      }
      }


    }
  }
  .item-box{
    // display: flex;
    // justify-content: space-around;
    // justify-content: flex-start;
    // flex-wrap: wrap;
    width: 100%;


   .item{

     width: 408px;
     height: 226px;
     margin: 0 5px;
     background: url('../../assets/images/item-bg.png') no-repeat;
     padding: 13px 20px;
     box-sizing: border-box;
     font-size: 14px;
     color: #FFFFFF;
     margin-bottom: 10px;
     .item-top{
       .top-left{
         line-height: 30px;
         float: left;
         display: flex;
         justify-content: center;
         align-items: center;
         img{
           margin-left: 10px;
         }
       }
       .top-right{
         width: 110px;
         height: 30px;
         float: right;
         background: url('../../assets/images/ic_home_Viewdetails.png') no-repeat;
         background-size: 100% 100%;
         font-size:14px;
         font-family:Microsoft YaHei;
         font-weight:400;
         color:rgba(43,250,255,1);
         line-height:30px;
         text-align: center;
         cursor: pointer;
       }
     }
     .data-box{
       height: 160px;
       margin-top: 6px;
       display: flex;
       flex-direction: column;
       justify-content: space-around;
       overflow: hidden;
       .item-middle{
         width: 100%;
        display: flex;
        font-size: 14px;
        color: #FFFFFF;
        // margin-top: 44px;
        .middle-left{
          // width: 80px;
          width: 20%;
        }
        .middle-right{
          max-width: 75px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
      ul{
        li{
          list-style: none;
          height: 38px;
          line-height: 38px;
          font-size: 14px;
          color: #FFFFFF;
          display: inline-block;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow:ellipsis;
        }
      }
     }
   }
   .item:last-of-type{
    //  margin-right: 0;
   }
   .announcement{
     list-style-type: none;
     margin-top:0px;
     margin-bottom: 6px;
     height:190px;
     overflow:hidden;
     overflow-y:scroll;
     padding-left:0;
     width: 400px;
   }

   .announcement::-webkit-scrollbar{
     display: none;
   }
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
      overflow: hidden;
      h4 {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        margin: 0;
        // background: #4986ff;
        color: white;
        font-weight: 100;
        position: relative;
        >div{
          display: flex;
          align-items: center;
          >img{
            width: 42px;
            height: 11px;
            margin-left: 10px;
          }
        }
        >img {
          width: 80px;
          height: 30px;
          position: absolute;
          top: 14px;
          right: 10px;
          cursor: pointer;
        }
      }
      .info-box{
        color: #fff;
        height: 383px;
        overflow-y: auto;
        padding: 20px;
        box-sizing: border-box;
        >h5{
          text-align: center;
          line-height: 40px;
          font-size: 30px;
        }
        .content-desc{
          line-height: 25px;
        }
      }
      div {
        // margin-top: 10px;

        p {
          font-size: 15px;
          text-align: center;
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

</style>
