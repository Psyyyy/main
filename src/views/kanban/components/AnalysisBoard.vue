<template>
  <div class="member">
    <div>
      <div class="relative flex flex-no-wrap task-list mt-3 pl-6">
        <h3 class="section-card__title">统计图</h3>
        <div class="flex ml-auto"></div>
      </div>
      <div>
        <a-card :bordered="false">
          <!-- 第一行 -->
          <div class="flex">
              <!-- 第一列 -->
            <div class="w-1/5 ml-6">
              <a-card class="card-box ">
                <div class="dashboard-card dashboard-card-icon">
                  <div class="icon success">
                    <feather type="layers"></feather>
                  </div>
                  <div>需求</div>
                  <div class="text-2xl font-semibold">0/4</div>
                </div>
              </a-card>
              <a-card class="card-box ">
                <div class="dashboard-card dashboard-card-icon">
                  <div class="icon danger">
                    <feather type="alert-octagon"></feather>
                  </div>
                  <div>缺陷</div>
                  <div class="text-2xl font-semibold">0/0</div>
                </div>
              </a-card>
            </div>
            <!-- 第二列 -->
            <div
              class="w-3/5 display:inline "
              id="myChart"
              style="width:800px;height:450px"
            ></div>
            <!-- 第三列 -->
            <div class="w-1/5 ml-4 px-4 mr-4 display:inline" style="height:200px">
              <div class="card-box ">
                <a-card class="card-box">
                  <span class="card-item">待处理任务</span>
                  <div class="card-num">
                    <div style="color:rgba(119, 126, 241)">8</div>
                  </div>
                </a-card>
              </div>
              <div class="card-box ">
                <a-card class="card-box">
                  <span class="card-item">已延误任务</span>
                  <div class="card-num">
                    <div style="color:rgba(253, 68, 88)">1</div>
                  </div>
                </a-card>
              </div>

              <div class="card-box ">
                <a-card class="card-box">
                  <span class="card-item">已完成任务</span>
                  <div class="card-num">
                    <div style="color:rgba(72, 214, 228)">72</div>
                  </div>
                </a-card>
              </div>
            </div>
          </div>
          <!-- 第二行 -->
          <div class="flex -mt-10 mr-6">
              <!-- 需求卡片 -->
            <div class="w-1/2  ml-6">
              <a-card title="需求" class="card-box ">
                <!-- 卡片第一行 -->
                <div>统计</div>
                <div class="flex ml-10">
                  <div class="inline-block w-1/3">
                    <a-progress type="dashboard" stroke-width="9" :percent="75">
                      <template #format="percent">
                        <span
                          style="fontSize:20px;fontWeight:bolder;color:#108ee9"
                          >{{ percent }}%</span
                        >
                        <div class="mt-2">完成度</div>
                      </template>
                    </a-progress>
                  </div>
                  <div class="mt-1 inline-block w-2/3">
                    <div style="text-align:center" class="sec-card-num">
                      <div class="num">22</div>
                      <span>总计</span>
                    </div>
                    <!-- 自制竖线 -->
                    <div
                      class="-mb-1 ml-6"
                      style="display:inline-block;width: 1px;height: 60px; background: #ddd;"
                    ></div>
                    <div class="sec-card-num">
                      <div class="num">12</div>
                      <span>进行中</span>
                    </div>
                    <div
                      class="-mb-1 ml-6"
                      style="display:inline-block;width: 1px;height: 60px; background: #ddd;"
                    ></div>
                    <div class="sec-card-num">
                      <div class="num">10</div>
                      <span>已完成</span>
                    </div>
                  </div>
                </div>
                <!-- 卡片第二行 -->
                <div class="mt-4">需求个数燃烧图</div>
                <div>
                  <div
                    class="display:inline -ml-12"
                    id="burnChart"
                    style="width:550px;height:250px"
                  ></div>
                </div>
              </a-card>
            </div>
            <!-- 缺陷卡片 -->
            <div class="w-1/2 ml-8 flex-col display:inline">
              <div class="card-box ">
                <a-card title="缺陷" class="card-box ">
                  <!-- 卡片第一行 -->
                  <div>统计</div>
                  <div class="flex ml-10">
                    <div class="inline-block w-1/3">
                      <a-progress
                        type="dashboard"
                        stroke-width="9"
                        :percent="75"
                      >
                        <template #format="percent">
                          <span
                            style="fontSize:20px;fontWeight:bolder;color:#108ee9"
                            >{{ percent }}%</span
                          >
                          <div class="mt-2">完成度</div>
                        </template>
                      </a-progress>
                    </div>
                    <div class="mt-1 inline-block w-2/3">
                      <div style="text-align:center" class="sec-card-num">
                        <div class="num">22</div>
                        <span>总计</span>
                      </div>
                      <!-- 自制竖线 -->
                      <div
                        class="-mb-1 ml-6"
                        style="display:inline-block;width: 1px;height: 60px; background: #ddd;"
                      ></div>
                      <div class="sec-card-num">
                        <div class="num">12</div>
                        <span>进行中</span>
                      </div>
                      <div
                        class="-mb-1 ml-6"
                        style="display:inline-block;width: 1px;height: 60px; background: #ddd;"
                      ></div>
                      <div class="sec-card-num">
                        <div class="num">10</div>
                        <span>已完成</span>
                      </div>
                    </div>
                  </div>
                  <!-- 卡片第二行 -->
                  <div class="mt-4">缺陷个数燃烧图</div>
                  <div>
                    <div
                      class="display:inline -ml-12"
                      id="bugBurnChart"
                      style="width:550px;height:250px"
                    ></div>
                  </div>
                </a-card>
              </div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script>
import { getDay } from '@/utils/util'

export default {
  components: {},

  data() {
    return {
      name: 'AnalysisBoard',
      data: [],
      week: [],
    }
  },
  watch: {},
  created() {
    this.getWeekDate()
  },
  mounted() {
    this.drawLine()
    this.drawBurnLine()
    window.onresize = () => { // 自适应
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      myChart.resize()
    }
  },
  methods: {
    getWeekDate() {
      this.week = []
      for (let i = 6; i > -1; i -= 1) {
        this.week.push(getDay(-i))
      }
      this.$store.commit('analysis/SET_WEEK_DATE', this.week)
    },
    // 项目进度，面积堆叠图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '项目进展',
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
          data: this.weekDate,
          boundaryGap: false,
        },
        grid: {
          right: '2%',
          top: '0',
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
          data: ['已完成', '已延误', '待处理'],
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
        yAxis: [
          {
            show: false,
          },
        ],
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
              normal: {
                color: '#39da8a',
              },
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
            data: [0, 0, 1, 15, 20, 30, 40],
          },
          {
            name: '已延误',
            lineStyle: {
              width: 0,
            },
            stack: '任务数',
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#ff5b5c',
              },
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
            data: [0, 0, 0, 2, 1, 4, 2],
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
            data: [3, 6, 8, 6, 8, 11, 9],
          },
        ],
      })
    },
    drawBurnLine() {
      // 基于准备好的dom，初始化echarts实例
      const burnChart = this.$echarts.init(
        document.getElementById('burnChart'),
      )
      const bugBurnChart = this.$echarts.init(
        document.getElementById('bugBurnChart'),
      )
      // 绘制图表
      burnChart.setOption({
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
          data: this.weekDate,
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
            data: [230, 218, 224, 150, 135, 147, 135],
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
            data: [150, 230, 224, 218, 135, 147, 260],
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
      })
      bugBurnChart.setOption({
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
          data: this.weekDate,
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
          splitLine: {
            show: false,
          },
          axisline: {},
        },
        legend: {
          data: ['基线', '未关闭'],
        },
        series: [
          {
            name: '未关闭',
            data: [230, 218, 224, 150, 135, 147, 135],
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
            data: [150, 230, 224, 218, 135, 147, 260],
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
      })
    },
  },
  computed: {
    weekDate() {
      return this.$store.state.analysis.weekDate
    },
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    currStage() {
      return this.$store.state.stage.currStage
    },
    currStageId() {
      return this.$store.state.stage.currStageId
    },
    isAddModalOpened() {
      return this.$store.state.add.isAddModalOpened
    },
  },
}
</script>
<style lang="scss" scoped>
.member {
  @apply relative w-full bg-white rounded-lg overflow-hidden;
  margin-top: -30px;
  height: 580px;
  min-height: 580px;
  overflow-y: scroll;
}
.kb {
  &-col {
    &__board {
      flex-shrink: 0;
      width: 250px;
    }
    &__item {
      @apply relative mb-4 p-3 pl-4 rounded bg-white cursor-pointer;
      box-shadow: 0 10px 15px -5px rgba($secondary, 0.2);
      width: 250px;

      @each $color in primary, secondary, success, warning, danger, info {
        &[data-border="#{$color}"] {
          &::before {
            @apply absolute top-0 left-0 h-full w-1 overflow-hidden;
            content: "";
            background: map-get($color-map, $color);
          }
        }
      }
    }
    &__avatar {
      @apply relative -ml-2 cursor-pointer;
      transition: $transition;
      border: 2px solid #fff;
      &:hover {
        transform: translateY(-3px);
        z-index: 10;
      }
    }
  }
}
.boardItem {
  &.done {
    color: #b7b8bb;
    text-decoration: line-through;
  }
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-item {
  font-weight: bold;
}
.card-num {
  text-align: center;
  font-size: 32px;
  font-weight: bolder;
}
.card-box {
  box-shadow: 0 5px 10px -5px #cacbd1;
  border-radius: 5px;
  margin-top: 10px;
}
.dashboard-card {
  @apply h-full px-4 items-center justify-center bg-white rounded-lg;
  &-icon {
    @apply flex-1  flex flex-col items-center justify-center;
    .icon {
      @apply w-16 h-16 flex justify-center items-center rounded-full;
      border-radius: 50%;
      &.success {
        color: $success;
        background: rgba($success, 0.15);
      }
      &.danger {
        color: $danger;
        background: rgba($danger, 0.15);
      }
    }
  }

  &-title {
    @apply flex items-center justify-between text-xl text-gray-600 font-semibold whitespace-no-wrap;
  }
}
.sec-card-num {
  margin-left: 25px;
  display: inline-block;
  text-align: center;
  font-size: 13px;
  color: #8091a5;
  .num {
    margin-bottom: 5px;
    font-size: 26px;
    margin-top: 10px;
  }
}
</style>
