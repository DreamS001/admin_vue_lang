<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getChartData } from '@/api/visits'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      chartData: {
        date:[],
				num:[],
				price:[]
      },
      weekDays: []
    }
  },
  mounted() {
    getChartData(1).then(res => {
      this.chartData.date = res.date
      this.chartData.num = res.num
			this.chartData.price = res.price
			if(res.date.length==0||res.num.length==0||res.price.length==0){
				this.chartData.date = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
				this.chartData.num = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				this.chartData.price = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
			}
      this.initChart()
    })
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ date, num,price } = {}) {
      this.chart.setOption({
				title : {
					text: '交易笔数，金额',
					// subtext: '数据来自后台大数据'
				},
        xAxis: {
          // data: this.weekDays,
					data:date,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 25,
          right: 35,
          bottom: 40,
          top: 60,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: [{
                type: 'value',
                // name:"笔\n数\n︵\n笔\n︶",
                nameLocation:"center",
                nameGap:35,
                nameRotate:0,
                nameTextStyle:{
                    fontSize: 16,
                },
                //默认以千分位显示，不想用的可以在这加一段
                // axisLabel : {   //调整左侧Y轴刻度， 直接按对应数据显示
                //     show:true,
                //     showMinLabel:true,
                //     showMaxLabel:true,
                //     formatter: function (value) {
                //         return value;
                //     }
                // }
            },
				{
                type: 'value',
                // name:"金\n额\n︵\n元\n︶",
                nameLocation:"center",
                nameGap:35,
                nameRotate:0,
                nameTextStyle:{
                    fontSize: 16,
                },
                //默认以千分位显示，不想用的可以在这加一段
                // axisLabel : {   //调整左侧Y轴刻度， 直接按对应数据显示
                //     show:true,
                //     showMinLabel:true,
                //     showMaxLabel:true,
                //     formatter: function (value) {
                //         return value;
                //     }
                // }
            }],
        legend: {
          data: ['金额', '笔数'],
					bottom:'bottom'
        },
        series: [{
          name: '金额', itemStyle: {
            normal: {
              color: '#EE4000',
              lineStyle: {
                color: '#EE4000',
                width: 2
              }
            }
          },
          smooth: false,
					yAxisIndex: 0,
          type: 'line',
          // data: visitsData,
					data:price,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '笔数',
          smooth: false,
					yAxisIndex: 1,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              // areaStyle: {
              //   color: '#f3f8ff'
              // }
            }
          },
          // data: ipData,
					data:num,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
