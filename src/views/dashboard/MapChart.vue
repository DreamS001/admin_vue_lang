<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
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
				text: '设备分布范围，数量',
        subtext: '数据来自后台大数据'
			},
			tooltip : {
				trigger: 'item'
			},
			dataRange: {
				orient: 'horizontal',
				min: 0,
				max: 55000,
				text:['高','低'],
				splitNumber:0
			},
			series : [
				{
					name: '设备数量',
					type: 'map',
					mapType: 'china',
					mapLocation: {
						x: 'left'
					},
					selectedMode : 'multiple',
					itemStyle:{
						normal:{label:{show:true}},
						emphasis:{label:{show:true}}
					},
					data:[
						{name:'西藏', value:605.83},
						{name:'青海', value:1670.44},
						{name:'宁夏', value:2102.21},
						{name:'海南', value:2522.66},
						{name:'甘肃', value:5020.37},
						{name:'贵州', value:5701.84},
						{name:'新疆', value:6610.05},
						{name:'云南', value:8893.12},
						{name:'重庆', value:10011.37},
						{name:'吉林', value:10568.83},
						{name:'山西', value:11237.55},
						{name:'天津', value:11307.28},
						{name:'江西', value:11702.82},
						{name:'广西', value:11720.87},
						{name:'陕西', value:12512.3},
						{name:'黑龙江', value:12582},
						{name:'内蒙古', value:14359.88},
						{name:'安徽', value:15300.65},
						{name:'北京', value:16251.93,},
						{name:'福建', value:17560.18},
						{name:'上海', value:19195.69,},
						{name:'湖北', value:19632.26},
						{name:'湖南', value:19669.56},
						{name:'四川', value:21026.68},
						{name:'辽宁', value:22226.7},
						{name:'河北', value:24515.76},
						{name:'河南', value:26931.03},
						{name:'浙江', value:32318.85, selected:true},
						{name:'山东', value:45361.85},
						{name:'江苏', value:49110.27},
						{name:'广东', value:53210.28}
					]
				}
			],
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
