<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
        <!-- <div>{{textt}}</div> -->
        <div class="top-show">
          <div class="show-title">
            <span>{{$t('financeCash.team_jg')}}</span>
            <img src="../../assets/images/img_jianbian.png" alt="">
          </div>
          <div class="show-content">
            <div class="show-tree">
              <Line-chart3 @vale="getValue" />
            </div>
            <div class="tree-list">

                <div class="left-btn" @click="prevBtn"></div>
              <div class="list-top">
                <img style="width:70px;height:70px" src="https://i.loli.net/2019/04/04/5ca5b971e1548.jpeg" alt="">
                <!-- <div>XX科技</div>
                <div>投资金额：$12000.00</div>
                <div>团队人数：6人</div> -->
                <div>{{datass.name}}</div>
                <!-- <div>投资金额：${{datas[0].pid}}</div>
                <div>团队人数：{{datas[0].isCut}}人</div> -->
                <span class="top-line" v-if="isShowLine"></span>
              </div>
              <div class="list-bottom" v-if="!isShowLine2 || !isShowLine3">
                <ul  ref="carouser">
                  <li class="li" v-for="(i,item) in datass.children" v-bind:key="item">
                    <img style="width:70px;height:70px" src="https://i.loli.net/2019/04/04/5ca5b971e1548.jpeg" alt="">
                    <div>{{i.name}}</div>
                    <!-- <div>投资金额：${{i.pid}}</div>
                    <div>团队人数：{{i.isCut}}人</div> -->
                  </li>
                </ul>
                <span class="bottom-line" v-if="isShowLine"></span>
              </div>
              <!-- 显示一个时 -->
              <!-- <div class="list-bottom" v-if="isShowLine1">
                <ul  ref="carouser">
                  <li class="li" v-for="(i,item) in datas[0].children" v-bind:key="item">
                    <img style="width:70px;height:70px" src="https://i.loli.net/2019/04/04/5ca5b971e1548.jpeg" alt="">
                    <div>{{i.name}}</div>
                    <div>投资金额：${{i.pid}}</div>
                    <div>团队人数：{{i.isCut}}人</div>
                  </li>
                </ul>
                <span class="bottom-line" v-if="isShowLine"></span>
              </div> -->
              <!-- 显示两个时 -->
              <!-- <div class="list-bottom list-tow" v-if="isShowLine2">
                <ul  ref="carouser">
                  <li class="li" v-for="(i,item) in datas[0].children" v-bind:key="item">
                    <img style="width:70px;height:70px" src="https://i.loli.net/2019/04/04/5ca5b971e1548.jpeg" alt="">
                    <div>{{i.name}}</div>
                    <div>投资金额：${{i.pid}}</div>
                    <div>团队人数：{{i.isCut}}人</div>
                  </li>
                </ul>
                <span class="bottom-line" v-if="isShowLine"></span>
              </div> -->
              <!-- 显示三个时 -->
              <!-- <div class="list-bottom" v-if="isShowLine3">
                <ul  ref="carouser">
                  <li class="li" v-for="(i,item) in datas[0].children" v-bind:key="item">
                    <img style="width:70px;height:70px" src="https://i.loli.net/2019/04/04/5ca5b971e1548.jpeg" alt="">
                    <div>{{i.name}}</div>
                    <div>投资金额：${{i.pid}}</div>
                    <div>团队人数：{{i.isCut}}人</div>
                  </li>
                </ul>
                <span class="bottom-line" v-if="isShowLine"></span>
              </div> -->

                <div class="right-btn" @click="nextBtn"></div>
            </div>
          </div>
        </div>
      <el-row :gutter="20" style="margin-left:0;margin-right:0;margin-top:20px">
        <!-- <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <Line-chart3 @vale="getValue" />
          </div>
        </el-col> -->
        <!-- <div class="nav">
          <div class="block" style="min-width:850px;font-size:14px;margin-left: 30px;">
              <span class="demonstration">自定义查询：</span>
              <el-date-picker v-model="value6" :start-placeholder="beginDatePlaceHolder" :end-placeholder="endDatePlaceHolder" type="daterange" size="mini" range-separator="至" @change="timeChange"/>
              <span class="demonstration" style="margin-left:60px;">会员编号：</span>
              <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1)" />
              <div style="height:15px"></div>
              <span class="demonstration" style="margin-right:42px;">账号：</span>
              <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1)" v-model="input1"/>
              <span class="demonstration" style="margin-left:60px;">联系方式：</span>
              <input style="width:200px;height:28px;border:1px solid rgba(47, 228, 255, 1)" />
              <span class="time" style="margin-left:100px;" @click="queryData">查询</span>
              <span class="time" @click="exportTable">导出</span>
            </div>
        </div> -->
        <el-col :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <!-- <line-chart2 /> -->
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="24" style="margin-left:0;margin-right:0;margin-top:20px">
          <div class="chart-wrapper">
            <Line-chart4 :valtext="textt"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LineChart2 from "../team/line";
import LineChart3 from "../team/relation";
import LineChart4 from "../team/list/index";
import {formatDate} from '../../utils/date.js'
import { persAll } from "@/api/team";
  import moment from 'moment'

  import { initData,getUserList } from '@/api/data'
// import { count } from "@/api/visits";
/**
 * 记录访问，只有页面刷新或者第一次加载才会记录
 */
// count().then(res => {
//   console.log(res)
// });

import { financeCash } from '@/utils/i18n'// 国际化主题名字
import Cookies from 'js-cookie'
var lang=Cookies.get('language') || 'en';
export default {
  data() {
    return {
      value6: '',
      input1:'',
      navdata: "",
      textt:"",
      beginDatePlaceHolder: '',
      endDatePlaceHolder: '',
      beginDate: '',
      endDate: '',
      offsetCount:0,
      datas:[],
      datass:{},
      investorId:'',//资方标识
      isShowLine:false,//判断是否显示横线
      isShowLine1:false,//判断显示一个
      isShowLine2:false,//判断显示两个
      isShowLine3:false,//判断显示三个
    };
  },
  name: "Dashboard",
  components: {
    LineChart2,
    LineChart3,
    LineChart4
  },
  computed: {
    ...mapGetters(["roles"])
  },
  // computed(){
  // console.log(this.$refs.splist.valid)

  // },

  methods: {
    financeCash,
    getValue(data) {
      this.$refs.carouser.style.left = 0
      console.log(data)
      // const investorId=data
      // getUserList(investorId,'','','','','',1,100000).then(res=>{
      //   console.log(res)
      // }).catch(err=>{
      //   console.log(err)
      // })
      this.url = 'api/dept'
      const sort = 'id,desc'
      this.params = { page: 1, size: 1000, sort: sort }
      this.params['name'] = data
      initData(this.url, this.params).then(res => {
        console.log("是"+res)
        // this.datas=res.content
        this.datass=res.content[0]
        if(res.totalElements>1){
          this.isShowLine=true
        }else{
          this.isShowLine=false
        }
        console.log(res.totalElements)
        console.log(this.isHowLine)
        if(res.code==200){
        }
      }).catch(err => {
      })

      this.textt=data
    },
    exportTable(){

    },
    queryData(){
      // this.pageNo = 1
      // this.request()
    },
    prevBtn(){
      if(lang=='en'){
        var msg='No More'
      }else{
        var msg='没有更多了'
      }
        console.log(this.offsetCount)
        if(this.datass.children.length>1){
          if (this.offsetCount > 0) {
            this.offsetCount --;
            this.$refs.carouser.style.left = '-' + (204 * this.offsetCount) + 'px';
          } else {
            this.$message({
                type: 'none',
                message: msg
            })
            return false
          }
        }else{
          this.$message({
                type: 'none',
                message: msg
            })
          return false
        }

    },
    nextBtn(){
        console.log(this.offsetCount)
        if(this.datass.children.length>1){
          if (this.offsetCount<this.datass.children.length-1) {
            this.offsetCount ++;
            this.$refs.carouser.style.left = '-' + (204 * this.offsetCount) + 'px';
          } else {
            this.$message({
                type: 'none',
                message: msg
            })
            return false

          }
        }else{
          this.$message({
                type: 'none',
                message: msg
            })
          return false
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
  },
  created() {
    // this.getValue()
    var date = new Date()
    this.beginDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
    this.endDatePlaceHolder = formatDate(date, 'yyyy-MM-dd')
    this.beginDate = ''
    this.endDate = ''
    persAll().then(res => {

      console.log('111')
      console.log(res)
      console.log('222')
      this.datass = res.content[0];
      this.isShowLine=res.totalElements
      this.investorId=res.content[0].merchantCode
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  background: transparent;
  padding-bottom: 70px;

}
.dashboard-editor-container {
  padding: 15px 15px 30px 15px;
  background-color: transparent;
//  min-width: 1200px;
  .chart-wrapper {
    // background: #fff;
    // padding: 10px 10px 0;
    margin-bottom: 10px;

  }
  .top-show{
    width: 100%;
    height: 546px;
    background: url('../../assets/images/bg_team_big.png') no-repeat;
    background-size: 100% 100%;
    padding: 24px 12px;
    box-sizing: border-box;
    .show-title{
      font-size: 14px;
      color: #fff;
      padding-left: 10px;
      box-sizing: border-box;
      img{
        width: 42px;
        height: 11px;
      }
    }
    .show-content{
      display: flex;
      justify-content: space-between;
      .show-tree{
        width: 250px;
        height: 463px;
        background: url('../../assets/images/bg_team_jiegou.png') no-repeat;
        background-size: 100% 100%;
        margin-top: 20px;
        padding: 10px 0.5%;
        box-sizing: border-box;
      }
      .tree-list{
        width: 84%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        overflow: hidden;
        font-size: 12px;
        color: #fff;
        position: relative;
        padding: 0 50px;
        box-sizing: border-box;
        .left-btn{
          width: 22px;
          height: 30px;
          position: absolute;
          left: 0;
          top:68%;
          // transform: translateY(-50%);
          background: url('../../assets/images/ic_team_left.png') no-repeat;
          background-size: 100% 100%;
          z-index: 999;
          cursor: pointer;
        }
        .right-btn{
          width: 22px;
          height: 30px;
          position: absolute;
          right: 0;
          top: 68%;
          // transform: translateY(-50%);
          background: url('../../assets/images/ic_team_right.png') no-repeat;
          background-size: 100% 100%;
          z-index: 999;
          cursor: pointer;
        }
        .list-top{
          width: 187px;
          height: 161px;
          background: url('../../assets/images/bg_team_touxiang.png') no-repeat;
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          padding: 10px;
          box-sizing: border-box;
          position: relative;
          img{
            border-radius: 50%;
          }
          .top-line{
            display: block;
            position: absolute;
            bottom: -62px;
            left: 50%;
            transform: translateX(-50%);
            width: 1px;
            height: 63px;
            background: #fff;
          }

        }
        .list-bottom{
          // overflow: hidden;
          width: 98%;
          height: 300px;
            position: relative;  //最外层的宽度，父级定位
			      overflow: hidden;
            display: flex;
            justify-content: space-around;
            // &::after{
            //   content: '';
            //   position: absolute;
            //   width: 87%;
            //   height: 1px;
            //   top: 51px;
            //   left:132px;
            //   background: #fff;
            //   z-index: 999999;
            // }
          .bottom-line{
            display: block;
            position: absolute;
            width: 82%;
            height: 1px;
            top: 51px;
            left:123px;
            background: #fff;
          }
          >ul{
            height: 100%;
            position: absolute; //子级定位，dom操作偏移
            left: 0;
            top: 0;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: middle;
            -ms-flex-align: middle;
            align-items: middle;
            overflow: auto;
            >li{
              list-style: none;
              // float: left;
               width: 180px;
              height: 161px;
              background: url('../../assets/images/bg_team_touxiang.png') no-repeat;
              background-size: 100% 100%;
              margin-right: 24px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              padding: 10px;
              box-sizing: border-box;
              margin-top: 80px;
              img{
                border-radius: 50%;
              }
            }
            >li:last-of-type{
              margin-right: 0;
            }
            .li{
              position: relative;
              &::after{
                content: '';
                position: absolute;
                width: 1px;
                height: 40px;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
                background: #fff;
                z-index: 999999;
              }
            }
          }
        }
        .list-tow{
          justify-content: center !important;
        }
      }
    }
  }
}
.ul {
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding: 20px 0;
  margin: 0;
  li {
    text-align: left;
    font-weight: 600;
    line-height: 25px;
    p {
      font-size: 12px;
    }
    span {
      font-size: 16px;
    }
  }
}
.mapp {
  padding: 10px 10px 0;
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
  input{
    border:2px solid rgb(47, 228, 255) !important;
  }
</style>


<style>

  input{
    background: rgba(24, 136, 203, 0.5);
    padding-left: 10px;
    color: #fff;
  }
  input{
    border:2px solid rgb(47, 228, 255);
    /* background: transparent; */
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


  .el-carousel__item.el-carousel__item--card.is-in-stage {
    text-align: center;
  }

/*修改高度*/
  .el-carousel__container {
    height: 100px;
  }

  .van-collapse-item__content {
    padding: 14px 0;
  }

/*左右箭头的样式*/
  button.el-carousel__arrow.el-carousel__arrow--left, button.el-carousel__arrow.el-carousel__arrow--right {
    font-size: 12px;
    height: 20px;
    width: 20px;
    background: #A099F0;
  }
</style>
