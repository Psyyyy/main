<template>
  <div class="echarts">
    <div id="myChart"></div>
  </div>
</template>
<script>
import echart from 'echarts'
import ResizeListener from 'element-resize-detector'

export default {
  name: 'TaskLogChart',
  props: {
    seriesData: {
      type: Object,
      required: true,
      default: () => {},
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
        this.updateChartView()
      },
    },
  },
  mounted() {
    this.chart = this.$echarts.init(this.$el)
    this.updateChartView()
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

      instance.listenTo(this.$el, () => {
        if (!this.chart) return
        this.chart.resize()
      })
    },

    /**
     * 更新echart视图
     */
    updateChartView() {
      if (!this.chart) return

      // const fullOption = this.assembleDataToOption()
      this.chart.setOption({
        title: {
          text: '迭代进展',
          left: '43%',
          top: 5,
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
          bottom: '22%',
          left: '6%',
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 70,
          top: 25,
          bottom: 20,
          icon: 'rect',
          borderColor: '#ddd',
          borderRadius: 5,
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10,
          textStyle: {
            fontSize: '16',
          },
          // sdata: ['已完成', '已延误', '待处理'],
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
          show: false,
          max: '100',
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
              color: '#39da8a',
            },
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(128, 255, 165)',
                },
                {
                  offset: 1,
                  color: 'rgba(1, 191, 236)',
                },
              ]),
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
              color: '#ff5b5c',
            },
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255, 0, 34)',
                },
                {
                  offset: 1,
                  color: 'rgba(247, 81, 81)',
                },
              ]),
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
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(55, 162, 255)',
                },
                {
                  offset: 1,
                  color: 'rgba(116, 21, 219)',
                },
              ]),
            },
            itemStyle: {
              normal: {
                color: '#6485ff',
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
