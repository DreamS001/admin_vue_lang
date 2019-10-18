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
        visitsData: [],
        ipData: []
      },
      weekDays: []
    }
  },
  mounted() {
    // getChartData().then(res => {
    //   this.chartData.visitsData = res.visitsData
    //   this.chartData.ipData = res.ipData
    //   this.weekDays = res.weekDays
    // })
      this.initChart()
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
    setOptions({ visitsData, ipData } = {}) {
      this.chart.setOption({
				title : {
					text: '当天新增设备',
					// subtext: '数据来自后台大数据'
				},
        xAxis: {
          data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 25,
          right: 25,
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
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['新增设备'],
					bottom:'bottom'
        },
        series: [{
          name: '新增设备', itemStyle: {
            normal: {
              color: '#00BFFF',
              lineStyle: {
                color: '#00BFFF',
                width: 2
              }
            }
          },
          smooth: false,
          type: 'line',
          data: [Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100,Math.random()*100],
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
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
