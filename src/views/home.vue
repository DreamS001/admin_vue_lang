<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <!--      <panel-group/>

      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart/>
      </el-row>-->

      <el-row :gutter="32" style="margin:0;">
        <el-col :xs="24" :sm="24" :lg="24" style="padding:0;important">
          <div style="padding:0;important" class="chart-wrapper">
            <banner />
          </div>
        </el-col>

        <el-col class="item-box clearfix" :xs="24" :sm="24" :lg="24" style="padding:0;important">
          <banner2 />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="24" style="padding:0;important">
          <div class="world-box chart-wrapper">
            <div class="equipment">
              <span>
                <!-- 设备分布 -->
                {{$t('navbar.EDA')}}
                </span>
              <img src="../assets/images/img_jianbian.png" alt="" srcset="">
            </div>
            <div class="chart-wrapper mapp world-bottom">
              <div class="map-box">
                <!-- <echartsWorld /> -->
                <img style="width:100%" src="../assets/images/map.png" alt="">
              </div>
              <div class="data-boxs">
                <div class="item-middle">
                  <div class="middle-left">
                    <!-- 交易总额 -->
                    {{$t('navbar.gmv')}}
                  </div>
                  <div class="middle-m">
                    <div class="middle-m-d" :style="{ width: navdata.trade_num/100000 + 'px' }" style="background:rgba(255, 171, 79, 1);"></div>
                  </div>
                  <div class="middle-right">${{navdata.trade_num}}</div>
                </div>
                <div class="item-middle">
                  <div class="middle-left">
                    <!-- 交易笔数 -->
                    {{$t('navbar.totaltransactions')}}
                  </div>
                  <div class="middle-m">
                    <div class="middle-m-d" :style="{ width: navdata.trade_amount/100000 + 'px' }" style="background:rgba(236, 105, 65, 1);"></div>
                  </div>
                  <div class="middle-right">{{navdata.trade_amount}}</div>
                </div>
                <div class="item-middle">
                  <div class="middle-left">
                    <!-- 总设备数 -->
                    {{$t('navbar.totalnumberdevices')}}
                  </div>
                  <div class="middle-m">
                    <div class="middle-m-d" :style="{ width: navdata.device_num/100000 + 'px' }" style="background:rgba(0, 170, 255, 1);"></div>
                  </div>
                  <div class="middle-right">{{navdata.device_num}} {{$t('navbar.platform')}}</div>
                </div>
                <div class="item-middle">
                  <div class="middle-left">
                    <!-- 总投资 -->
                  {{$t('navbar.totalinvestment')}}
                  </div>
                  <div class="middle-m">
                    <div class="middle-m-d" :style="{ width: navdata.total_investment/100000 + 'px' }" style="background:rgba(43, 250, 255, 1);"></div>
                  </div>
                  <div class="middle-right">${{navdata.total_investment}}</div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
          <el-col :xs="24" :sm="24" :lg="24" style="padding:0;important">
          <div style="padding:0;important" class="chart-wrapper">
            <banner3 />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import LineChart1 from "./dashboard/LineChart1";
// import LineChart2 from "./dashboard/LineChart2";
// import LineChart3 from "./dashboard/LineChart3";
// import MapChart from "./dashboard/MapChart";
import banner from "./dashboard/banner";
import banner1 from "./dashboard/banner1";
import echartsWorld from "./dashboard/echarts-world";
import banner2 from "./dashboard/banner2";
import banner3 from "./dashboard/banner3";
import { count } from "@/api/visits";
import {mapp}  from "@/api/map";
import { getToken } from "@/utils/auth";
/**
 * 记录访问，只有页面刷新或者第一次加载才会记录
 */
count().then(res => {});

export default {
  data() {
    return {
     navdata:"",
     dataList:{
        trade_num:0,//交易总额
        trade_amount:0,//交易笔数
        device_num:0,//总设备数
        total_investment:0,//总投资
      },
    }
  },
  name: "Dashboard",
  components: {
    // LineChart1,
    // LineChart2,
    // LineChart3,
    echartsWorld,
    banner,
    banner1,
    banner2,
    banner3
  },
  computed: {
    ...mapGetters(["roles"])
  },
  methods:{
  },
  created() {
    mapp().then(res => {
      if(res.code==200){
        var data=JSON.parse(res.data.data)
        // console.log(typeof(data.data.map_data))
        console.log(data)
        this.navdata=eval(data.data)
        console.log(this.navdata)
        this.dataList={
          trade_num:data.data.trade_num,//交易总额
          trade_amount:data.data.trade_amount,//交易笔数
          device_num:data.data.device_num,//总设备数
          total_investment:data.data.total_investment,//总投资
        }
      }

      // console.log(typeof(this.data))
      console.log(this.navdata.trade_num)
      console.log(this.dataList.trade_num)
    })
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 0 15px 30px 15px;
  // background-color: rgb(240, 242, 245);
  .chart-wrapper {
    // background: #fff;
    // padding: 10px 10px 0;
    margin-bottom: 20px;
  }
  .item-box{
    // display: flex;
    // justify-content: space-around;
    // justify-content: flex-start;
    // flex-wrap: wrap;
   .item{
    //  float: left;
     width: 408px;
     height: 226px;
     margin-right: 16px;
     background: url('../assets/images/item-bg.png') no-repeat;
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
         background: url('../assets/images/ic_home_Viewdetails.png') no-repeat;
         background-size: 100% 100%;
         font-size:14px;
         font-family:Microsoft YaHei;
         font-weight:400;
         color:rgba(43,250,255,1);
         line-height:30px;
         text-align: center;
       }
     }
     .data-box{
       height: 160px;
       margin-top: 6px;
       display: flex;
       flex-direction: column;
       justify-content: end;
       margin-left:15%;
       .item-middle{
        display: flex;
        font-size: 14px;
        color: #FFFFFF;
        // margin-top: 44px;
        .middle-left{
          width: 80px;
        }
        // .middle-m{
        //   width: 100px;
        //   height: 16px;
        //   background: #FFAB4F;
        //   margin: 0 20px;
        // }
        .middle-m{
          overflow: hidden;
          margin: 0 20px;
          .middle-m-d{
            max-width: 200px;
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
     margin-right: 0;
   }
  }
  .world-box{
    width: 100%;
    // height: 498px;
    height: auto;
    background: url('../assets/images/bg_home_world.png') no-repeat;
    background-size: 100% 100%;
    margin: 15px 0 30px 0;
    padding: 30px 23px;
    box-sizing: border-box;
    .equipment{
      width:100%;
      line-height: 30px;
      float: left;
      display: flex;
      // justify-content: center;
      align-items: center;
      >span{
        font-size: 14px;
        color: #FFFFFF
      }
      img{
        margin-left: 10px;
      }
    }
    .world-bottom{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .map-box{
        // width: 40%;
        width: 845px;
        margin-left: 2%;
      }
      .data-boxs{
        width: 510px;
        // min-width: 1056px;

        .item-middle{
          display: flex;
          font-size: 14px;
          color: #FFFFFF;
          margin-top: 30px;
          .middle-left{
            width: 80px;
          }
          // .middle-m{
          //   width: 100px;
          //   height: 16px;
          //   background: #FFAB4F;
          //   margin: 0 20px;
          // }
          .middle-m{
            overflow: hidden;
            margin: 0 20px;
            .middle-m-d{
              max-width: 200px;
            }
            >div{
              height: 16px;
              background: #FFAB4F;
            }
          }
        }
      }
    }

  }
}
.ul{
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding: 20px 0;
  margin: 0;
  li{
    text-align: left;
    font-weight: 600;
    line-height: 25px;
    p{
      font-size: 12px;

    }
    span{
      font-size:16px;
    }
  }

}
.mapp{
   padding: 10px 10px 0;
}
.clearfix {zoom:1;}    /*==for IE6/7 Maxthon2==*/
.clearfix :after {
   clear:both;
   content:'.';
   display:block;
   width: 0;
   height: 0;
   visibility:hidden;
}

</style>

