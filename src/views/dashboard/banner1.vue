<template>

    <div :class="className" :style="{height:height,width:width}">


    </div>

</template>

<script>
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { getChartData } from "@/api/visits";
import {mapp}  from "@/api/map";
// let dataa=mapp()
// console.log(dataa.data)
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
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    // colorSize:{
    // }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      dataa:"",
      chartData: {
        visitsData: [],
        ipData: []
      },
      weekDays: []
    };
  },
  mounted() {

    mapp().then(res => {
      var data=JSON.parse(res.data)
      // console.log(typeof(data.data.map_data))
      this.dataa=eval(data.data.map_data)
      // console.log(typeof(this.data))
      // console.log( this.dataa)
    })

    this.initChart();
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHandler);
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName("sidebar-container")[0];
    this.sidebarElm &&
      this.sidebarElm.addEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );
  },
  beforeDestroy() {

    if (!this.chart) {
      return;
    }
    if (this.autoResize) {
      window.removeEventListener("resize", this.__resizeHandler);
    }

    this.sidebarElm &&
      this.sidebarElm.removeEventListener(
        "transitionend",
        this.sidebarResizeHandler
      );

    this.chart.dispose();
    this.chart = null;
  },
  methods: {

    sidebarResizeHandler(e) {
      if (e.propertyName === "width") {
        this.__resizeHandler();
      }
    },
    setOptions({ visitsData, ipData } = {}) { setTimeout(() =>{

      // console.log("::::::::::::::::::::::"+this.dataa)
      this.chart.setOption({
        // title : {
        // 	text: '设备分布范围，数量',
        // 	subtext: '数据来自后台大数据'
        // },
        tooltip: {
          trigger: "item"
        },
        dataRange: {
          orient: "horizontal",
          max: 55000,
          min: 0,

          text: ["高", "低"],
          splitNumber: 0
        },
        series: [
          {
            name: "设备数量",
            type: "map",
            mapType: "china",
            mapLocation: {
              x: "left"
            },
            selectedMode: "multiple",
            // itemStyle: {
            //   normal: { label: { show: true } },
            //   emphasis: { label: { show: true } }
            // },
            data:this.dataa,
          }
        ]
      })
    },500);
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    }
  },
created() {
  // mapp().then(res => {
  //     var data=JSON.parse(res.data)
  //     console.log(typeof(data.data.map_data))
  //     this.data=eval(data.data.map_data)
  //     console.log(this.data)
  //   })
},
};
</script>
