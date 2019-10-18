<template>
  <div :class="className" :style="{width:width}">
    <div class="footer">
      <div class="list-f">
        <h5>
          <span>{{$t('navbar.contactus')}}</span>
          <img src="../../assets/images/img_jianbian.png" alt="" srcset="">
        </h5>
        <p>
          <!-- <span>电话客服:{{phone}}</span>
          <span>客服QQ:{{qq}}</span>
          <span>公司邮箱:{{email}}</span> -->
          <span>{{$t('navbar.companyname')}}：{{name}}</span>
          <span>{{$t('navbar.emailaccounts')}}：{{email}}</span>
          <!-- <span>Facebook账号：{{facebook}}</span> -->
        </p>
      </div>
      <div class="list-f">
        <h5>
          <span>{{$t('navbar.referrallinks')}}</span>
          <img src="../../assets/images/img_jianbian.png" alt="" srcset="">
        </h5>
        <p style="display: flex;justify-content: space-between;align-items: center">
          <span class="tg-url">{{Url}}</span>
          <span class="copy" :data-clipboard-text="Url" @click="copyUrl">{{$t('navbar.copy')}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { getChartData , getUrl } from "@/api/visits";
import {foot}  from "@/api/map";
import { fpthome } from '@/utils/i18n'
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
      default: "100px"
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      name:'',
      facebook:"",
      email:"",
      Url:''
    };
  },
  mounted() {
     foot().then(res => {
       if(res.code==200){
        var data=JSON.parse(res.data.data)
        // console.log(typeof(data.data.map_data))
        // console.log(data)
        this.name=data.name
        this.facebook=data.facebook
        this.email=data.email
        // console.log(typeof(this.data))
        // console.log( this.email)
       }

    })
  },
  created(){
    getUrl(9).then(res=>{
      if(res.code==200){
        console.log(res)
        this.Url=res.data.url
      }

    })
  },
  methods: {
    fpthome,
    copyUrl(){
			let _this = this;
     let clipboard = new this.clipboard(".copy");
     clipboard.on('success', function () {
       _this.$message({
				 message:'复制成功!',
				 type:'success'
			 })
     });
     clipboard.on('error', function () {
				_this.$message.error("复制失败!")
     });
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.footer{
  height: 100%;
  // padding:10px 0 20px;
  // background: url('../../assets/images/bg_home_bottom.png') no-repeat;
  // background-size: 100% 100%;
  padding: 15px 0 20px;
  box-sizing: border-box;
  border-radius: 2px;
  color: #FFFFFF;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  .list-f{
    width: 830px;
    height: 106px;
    background: url('../../assets/images/bg_home_lxwm.png') no-repeat;
    background-size: 100% 100%;
    padding: 28px 15px 20px;
  box-sizing: border-box;
  margin-bottom: 10px;
    h5{
      padding: 0;
      margin: 0;
    }
    p{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      >span{
        margin-right: 80px;
        margin-top: 20px;
      }
      .tg-url{
        display: inline-block;
        width: 600px;
        overflow: hidden;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      }
    }
    span{
      margin-right: 10px;
      font-size: 13px;
      // width:55px;
      height:20px;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .copy{
      display: block;
      width: 120px;
      height: 40px;
      background: url('../../assets/images/ic_qb_cz.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      margin-right: 0;
    margin-top: 0;
    cursor: pointer;
    }
  }

}
</style>
