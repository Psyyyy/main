<template>
 <div class="echarts" :id="id"></div>
</template>
<script>
import echarts from 'echarts'
import ResizeListener from 'element-resize-detector'

export default {
  name: 'BurnChart',
  props: {
    id: {
      type: String,
      required: true,
      default: () => 'mychart',
    },
    daySum: {
      type: Number,
      required: true,
      default: () => 0,
    },
    taskSum: {
      type: Number,
      required: true,
      default: () => 0,
    },
    finish: {
      type: Array,
      required: true,
      default: () => [],
    },

  },
  data() {
    return {
      chart: null,
      xAxis: [],
      baseline: [],
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
    getOptionData() {
      // x轴
      for (let i = 0; i < this.daySum; i += 1) {
        this.xAxis.push(i)
      }
      // 基线
      for (let i = 0; i < this.daySum; i += 1) {
        const y = -(this.taskSum / this.daySum) * i + this.taskSum
        this.baseline.push(y)
      }
      console.log('基线数据', this.baseline)
    },
    loadChart() {
      this.chart = this.$echarts.init(document.getElementById(this.id))
      if (!this.chart) return
      // const fullOption = this.assembleDataToOption()
      this.chart.setOption({
        title: {},
        grid: {
          left: '20%',
          top: '20',
        },
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
          data: this.xAxis,
          boundaryGap: false,
          splitLine: {
            show: false,
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {
              IconStyle: {
                marginLeft: '-100px',
              },
            },
          },
        },
        yAxis: {
          show: true,
          splitLine: {
            show: false,
          },
          axisline: {
            lineStyle: {
              width: 2,
              color: '#475f7b',
            },
          },
        },
        legend: {
          data: ['基线', '未关闭'],
        },
        series: [
          {
            name: '未关闭',
            data: this.finish,
            type: 'line',
            lineStyle: {
              color: '#e84343',
            },
            itemStyle: {
              color: '#e84343',
            },
          },
          {
            name: '基线',
            data: this.baseline,
            type: 'line',
            lineStyle: {
              color: '#108ee9',
              type: 'dashed',
            },
            itemStyle: {
              color: '#108ee9',
            },
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
  },
}
</script>

<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
