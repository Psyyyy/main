<template>
 <div class="echarts" :id="id"></div>
</template>
<script>
import echart from 'echarts'
import ResizeListener from 'element-resize-detector'

export default {
  name: 'TaskLogAreaChart',
  props: {
    seriesData: {
      type: Object,
      required: true,
      default: () => {},
    },
    showTitle: {
      type: Boolean,
      required: true,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
      default: () => '',
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

      // const fullOption = this.assembleDataToOption()
      this.chart.setOption({
        title: {
          text: '任务进展',
          left: '43%',
          top: 5,
          show: this.showTitle,
          textStyle: {
            fontSize: 24,
            color: '#475f7b',
          },
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
          data: this.seriesData.date,
          boundaryGap: false,
        },
        grid: {
          right: '4%',
          top: '30',
          bottom: this.showTitle === true ? '22%' : '15%',
          left: '6%',
        },
        legend: {
          type: 'scroll',
          top: this.showTitle === true ? 45 : 45,
          icon: 'rect',
          borderColor: '#ddd',
          borderRadius: 5,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10,
          orient: 'horizontal',
          textStyle: {
            fontSize: '16',
          },
          // sdata: ['已完成', '已延误', '待处理'],
        },
        toolbox: {
          show: this.showTitle,
          feature: {
            saveAsImage: {
              IconStyle: {
                marginLeft: '-100px',
              },
            },
          },
        },
        yAxis: {
          show: false,
          max: '40',
        },
        // legend: {
        //   data: ['已完成', '已延误', '待处理'],
        // },
        series: [
          {
            name: '已完成',
            stack: '任务数', // 保证是堆叠的而不是覆盖的
            showSymbol: false,
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: 'rgb(212, 234, 192)',
            },
            areaStyle: {
              opacity: 0.8,
              color: 'rgb(212, 234, 192)',
            },
            type: 'line',
            data: this.seriesData.finish,
          },
          {
            name: '已延误',
            lineStyle: {
              width: 0,
            },
            stack: '任务数',
            showSymbol: false,
            itemStyle: {
              color: 'rgb(249, 179, 179)',
            },
            areaStyle: {
              opacity: 0.8,
              color: 'rgb(249, 179, 179)',
            },
            type: 'line',
            data: this.seriesData.delay,
          },
          {
            name: '待处理',
            showSymbol: false,
            lineStyle: {
              width: 0,
            },
            stack: '任务数',
            areaStyle: {
              opacity: 0.8,
              color: 'rgb(203, 231, 242)',
            },
            itemStyle: {
              normal: {
                color: 'rgb(203, 231, 242)',
              },
            },
            type: 'line',
            data: this.seriesData.unfinish,
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
