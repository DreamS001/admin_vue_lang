<template>
  <div>
    <header>
      <div class="block" style="margin-left:0!important">
        <span class="demonstration">自定义查询：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          size="mini"
          range-separator="至"
          :start-placeholder="time"
          :end-placeholder="time"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions0"
        ></el-date-picker>
        <span style="margin-left:10px">团队名称：</span>
        <input type="text" v-model="datass.name" />
        <span
          style="margin-left:3%;background:#4986FF;padding:8px 20px;color:#fff;font-size:12px;border-radius: 3px;cursor: pointer"
          @click="inquire"
        >查询asdasd</span>
      </div>
      <p style="margin:10px 0 0 0">
        <span
          style="margin:0 10px"
          v-on:click="addClassFun(index)"
          v-bind:class="{class1:index==quantum}"
          v-for="(index,item) in date"
          :key="item"
        >{{index}}</span>
      </p>
    </header>
    <div style="background:white;padding:2% ; position: relative;width:100%;height:400px">
      <div class="haednav">
        <h6>
          <p>
            团队总人数 :
            <span style="color:#2F4554">{{datae.number}}</span> 人
          </p>
        </h6>
        <h6>
          <p>
            投资总金额 :
            <span style="color:#C23531">{{datae.money}}</span> 美金
          </p>
        </h6>
      </div>

      <div :class="className" :style="{height:height,width:width}" ref="chart"></div>
      <div class="footer">
        <p>
          <span></span>
          <span>团队人数</span>
        </p>
        <p>
          <span style="border:3px solid #C23531"></span>
          <span>团队金额</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
const echarts = require("echarts");
import { chart } from "@/api/team";
import { setTimeout } from "timers";
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
      default: "320px"
    },

    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      datass: {
        startDate: "",
        endDate: "",
        name: ""
      },
      datae: {
        money: "",
        number: ""
      },
      time: "",
      times: "",
      value6: "",
      team: "",
      quantum: "最近7天",
      sum: [],
      num: [],
      dates: [],
      date: []
    };
  },
  methods: {
    // 查询
    inquire() {
      this.datass.startDate = this.value6[0];
      this.datass.endDate = this.value6[1];
      chart(this.datass).then(res => {
        console.log(res);
        this.sum = res.price;
        this.num = res.num;
        this.dates = res.date;
        this.datae.money = res.totalPrice;
        this.datae.number = res.totalNum;
      });
      this.initCharts(this.dates, this.num, this.sum);
    },

    addClassFun: function(index) {
      this.quantum = index;
    },
    initCharts(date, num, price) {
      console.log(price);
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表

      myChart.setOption({
        title: {
          text: "团队人数，投资金额"
          // subtext :"最近7日详情",
          //  subtext :"投资总金额"
        },
        tooltip: {
          trigger: "axis"
        },
        dataZoom: {
          type: "inside"
        },
        xAxis: {
          data: date,
          type: "category",
          // data:["2019-01-01","2019-01-02","2019-01-03"],
          boundaryGap: false
        },
        yAxis:
          // type: "value",
          // show: false,

          [
            {
              name: "投资金额",
              type: "value"
            },
            {
              name: "团队人数",
              type: "value"
            }
          ],
        // legend: {
        //   type: "scroll",
        //   orient: "vertical",
        //   right: 10,
        //   text: 200
        // },
        series: [
          {
            name: "投资金额",
            type: "line",
            yAxisIndex: 0,
            data: price
          },
          {
            name: "团队人数",
            type: "line",
            yAxisIndex: 1,
            data: num
          }
        ]
      });
    }
  },
  mounted() {
    // this.inquire();
  },
  created() {
    // chart().then(res => {
    //   console.log(res);
    //   // this.options = res.content;
    // });
    var date = function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      // console.log(123123);

      return currentdate;
    };
    var dates = function() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate() + 1;
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    };

    this.time = date();
    this.times = dates();
    console.log(this.time, this.times);
    var that = this;
    // setTimeout(function() {
    //   console.log(111);
    //   that.inquire();
    // }, 300);
    this.inquire();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
.haednav {
  font-size: 14px;
  width: 100%;
  position: absolute;
  margin-right: 2px;
  // float: right;
  h6 {
    margin: 0;
    line-height: 20px;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    margin-right: 40px;
    p {
      margin: 0;
      width: 180px;
    }
  }
}
.footer {
  display: flex;
  justify-content: center;
  p {
    margin: 0 20px;
    display: flex;
    align-items: center;
    span:nth-of-type(1) {
      width: 0;
      height: 0;
      display: inline-block;
      border: 3px solid #2f4554;
      border-radius: 50%;
    }
    span:nth-of-type(2) {
      margin-left: 10px;
    }
  }
}
header {
  width: 100%;
  height: 80px;
  // visibility: hidden;
  background: white;
  padding: 15px;
  margin-bottom: 20px;
}
.time {
  // width: 60px;
  height: 30px;
  background: #4986ff;
  font-size: 12px;
  padding: 6px 17px;
  color: #f0f2f5;
  margin: 0 20px;
}
.class1 {
  background: #4986ff;
  color: white;
  padding: 5px 15px;
}
.block {
  font-size: 14px;
  white-space: nowrap;
  input {
    width: 22%;
  }
}
</style>
