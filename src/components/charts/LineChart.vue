<template>
 <div class="echarts" :id="id"></div>
</template>
<script>
import echarts from 'echarts'
import ResizeListener from 'element-resize-detector'

export default {
  name: 'LineChart',
  props: {
    id: {
      type: String,
      required: true,
      default: () => 'mychart',
    },
    seriesData: {
      type: Array,
      required: true,
      default: () => {},
    },
    seriesName: {
      type: String,
      required: true,
      default: () => '',
    },
    date: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    seriesData: {
      deep: true,
      handler() {
        this.loadChart()
      },
    },
  },
  created() {
    this.$nextTick(() => {
      this.loadChart()
    })
  },
  mounted() {
    // this.loadChart()
    window.addEventListener('resize', this.handleWindowResize)
    this.addChartResizeListener()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {

    /**
     * 对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
    addChartResizeListener() {
      const instance = ResizeListener({
        strategy: 'scroll',
        callOnAdd: true,
      })

      instance.listenTo(document.getElementById(this.id), () => {
        if (!this.chart) return
        this.chart.resize()
      })
    },

    loadChart() {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      if (!this.chart) return
      console.log('图数据', this.seriesData)
      // const fullOption = this.assembleDataToOption()
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        xAxis: {
          data: this.date,
          boundaryGap: false,
        },
        grid: {
          right: '4%',
          top: '30',
          bottom: '22%',
          left: '6%',
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {
        //       IconStyle: {
        //         marginLeft: '-100px',
        //       },
        //     },
        //   },
        // },
        yAxis: {
          show: false,
          max: 50,
        },
        // legend: {
        //   data: ['已完成', '已延误', '待处理'],
        // },
        series: [
          {
            name: this.seriesName,
            showSymbol: false,
            smooth: true,
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: this.areaColor(this.seriesName),
            },
            areaStyle: {
              opacity: 0.8,
              color: this.areaColor(this.seriesName),
            },
            type: 'line',
            data: this.seriesData,
          },
        ],

      }, true)
    },
    /**
     * 当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize() {
      if (!this.chart) return
      this.chart.resize()
    },
    areaColor(type) {
      switch (type) {
        case '待处理任务':
          return 'rgb(203, 231, 242)'
        case '任务总数':
          return 'rgb(210, 223, 255)'
        case '延误任务':
          return 'rgb(249, 179, 179)'
        case '已完成任务':
          return 'rgb(212, 234, 192)'
        default:
          return 'rgba(128, 255, 165)'
      }
    },
  },
}
</script>

<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
