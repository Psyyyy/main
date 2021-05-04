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
    rank: {
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
        this.loadChart()
      },
    },
  },
  created() {
    console.log('rankData', this.rank)
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

        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: '任务优先级',
            type: 'pie',
            radius: ['35%', '60%'],
            center: ['50%', '50%'],
            data: [
              {
                value: this.rank.danger,
                itemStyle: {
                  color: 'rgb(249, 179, 179)',
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 5,
                },
                label: {
                  formatter: [
                    '{title|{b}}',
                  ].join('\n'),
                  borderColor: '#ff5b5c',
                  borderWidth: 1,
                  borderRadius: 4,
                  backgroundColor: '#ff5b5c',
                  padding: [6, 6],
                  rich: {
                    title: {
                      color: '#fff',
                      align: 'center',
                      fontSize: 14,
                    },
                  },
                },
                selected: true,
                name: '非常紧急',
              },
              {
                value: this.rank.warning,
                itemStyle: {
                  color: 'rgb(247, 213, 140)',
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 5,
                },
                label: {
                  formatter: [
                    '{title|{b}}',
                  ].join('\n'),
                  borderColor: '#fdac41',
                  borderWidth: 1,
                  borderRadius: 4,
                  backgroundColor: '#fdac41',
                  padding: [6, 6],
                  rich: {
                    title: {
                      color: '#fff',
                      align: 'center',
                      fontSize: 14,
                    },
                  },
                },
                name: '紧急',
              },
              {
                value: this.rank.normal,
                itemStyle: {
                  color: '#7cd39b',
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 5,
                },
                label: {
                  formatter: [
                    '{title|{b}}',
                  ].join('\n'),
                  borderColor: '#28c175',
                  borderWidth: 1,
                  borderRadius: 4,
                  backgroundColor: '#28c175',
                  padding: [6, 6],
                  rich: {
                    title: {
                      color: '#fff',
                      align: 'center',
                      fontSize: 14,
                    },
                  },
                },
                name: '普通',
              },
            ].sort((a, b) => a.value - b.value),
            label: {
              color: '#a2a9bc',
            },
            labelLine: {
              smooth: 0.2,
              length: 10,
              length2: 30,
            },
            itemStyle: {
              color: '#c23531',
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay() {
              return Math.random() * 200
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
