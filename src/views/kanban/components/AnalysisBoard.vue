<template>
  <div class="member">
    <div>
      <div class="relative flex flex-no-wrap task-list mt-3 pl-6">
        <h3 class="section-card__title">统计图</h3>
        <div class="flex ml-auto"></div>
                <span v-if="!showBurnChart" class="float-right mr-8 cursor-pointer" @click="showBurnChart=true">点击查看<span style="color:blue">任务燃烧图</span></span>
                 <span v-if="showBurnChart" class="float-right mr-8 cursor-pointer" @click="showBurnChart=false">点击查看<span style="color:blue">任务进展图</span></span>
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
                  <div class="text-2xl font-semibold">
                    {{ taskData.finish }}/{{
                      bugData.finish + taskData.unfinish
                    }}
                  </div>
                </div>
              </a-card>
              <a-card class="card-box ">
                <div class="dashboard-card dashboard-card-icon">
                  <div class="icon danger">
                    <feather type="alert-octagon"></feather>
                  </div>
                  <div>缺陷</div>
                  <div class="text-2xl font-semibold">
                    {{ bugData.finish }}/{{
                      bugData.finish + bugData.unfinish
                    }}
                  </div>
                </div>
              </a-card>
            </div>
            <!-- 第二列 -->
            <div class="w-3/5 inlinev-if=-block" style="height:450px">
              <!-- <div  style="height:100%;width:100%;" id="myChart"></div> -->

              <task-log-chart v-if="!showBurnChart" :id="'stage'" :show-title="true" :series-data="data"/>
                 <burn-chart v-if="showBurnChart"  :task-sum=" taskData.finish+ taskData.unfinish" :day-sum="days" :unfinish="data.unfinishForBurn" :id="'task'"></burn-chart>
            </div>

            <!-- 第三列 -->
            <div
              class="w-1/5 ml-4 px-4 mr-4 display:inline"
              style="height:200px"
            >
              <div class="card-box ">
                <a-card class="card-box">
                  <span class="card-item">待处理任务</span>
                  <div class="card-num">
                    <div style="color:rgba(119, 126, 241)">
                      {{ unfinishData }}
                    </div>
                  </div>
                </a-card>
              </div>
              <div class="card-box ">
                <a-card class="card-box">
                  <span class="card-item">已延误任务</span>
                  <div class="card-num">
                    <div style="color:rgba(253, 68, 88)">
                      {{ delayData }}
                    </div>
                  </div>
                </a-card>
              </div>

              <div class="card-box ">
                <a-card class="card-box">
                  <span class="card-item">已完成任务</span>
                  <div class="card-num">
                    <div style="color:rgba(72, 214, 228)">
                      {{ finishData }}
                    </div>
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
                <div class="flex ml-10">
                  <div class="inline-block w-1/3">
                    <a-progress
                      type="dashboard"
                      :stroke-width="9"
                      :percent="taskPercent"
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
                      <div class="num">
                        {{
                          taskData.finish + taskData.unfinish
                        }}
                      </div>
                      <span>总计</span>
                    </div>
                    <!-- 自制竖线 -->
                    <div
                      class="-mb-1 ml-6"
                      style="display:inline-block;width: 1px;height: 60px; background: #ddd;"
                    ></div>
                    <div class="sec-card-num">
                      <div class="num">{{ taskData.unfinish }}</div>
                      <span>进行中</span>
                    </div>
                    <div
                      class="-mb-1 ml-6"
                      style="display:inline-block;width: 1px;height: 60px; background: #ddd;"
                    ></div>
                    <div class="sec-card-num">
                      <div class="num">{{ taskData.finish }}</div>
                      <span>已完成</span>
                    </div>
                  </div>
                </div>
                <!-- 卡片第二行 -->
                <!-- <div class="mt-4">需求个数燃烧图</div>
  <div v-if="showBurnChart" class="display:inline -ml-12" style="width:550px;height:250px">
    <burn-chart :task-sum=" taskData.finish+ taskData.unfinish" :day-sum="days" :unfinish="data.unfinishForBurn" :id="'task'"></burn-chart>
    </div> -->
              </a-card>
            </div>
            <!-- 缺陷卡片 -->
            <div class="w-1/2 ml-8 flex-col display:inline">
              <div class="card-box ">
                <a-card title="缺陷" class="card-box ">
                  <!-- 卡片第一行 -->
                  <div class="flex ml-10">
                    <div class="inline-block w-1/3">
                      <a-progress
                        type="dashboard"
                        :stroke-width="9"
                        :percent="bugPercent"
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
                        <div class="num">
                          {{
                            bugData.finish + bugData.unfinish
                          }}
                        </div>
                        <span>总计</span>
                      </div>
                      <!-- 自制竖线 -->
                      <div
                        class="-mb-1 ml-6"
                        style="display:inline-block;width: 1px;height: 60px; background: #ddd;"
                      ></div>
                      <div class="sec-card-num">
                        <div class="num">{{ bugData.unfinish }}</div>
                        <span>进行中</span>
                      </div>
                      <div
                        class="-mb-1 ml-6"
                        style="display:inline-block;width: 1px;height: 60px; background: #ddd;"
                      ></div>
                      <div class="sec-card-num">
                        <div class="num">{{ bugData.finish }}</div>
                        <span>已完成</span>
                      </div>
                    </div>
                  </div>
                  <!-- 卡片第二行 -->
                  <!-- <div class="mt-4">缺陷个数燃烧图</div>
                 <div class="display:inline -ml-12" style="width:550px;height:250px">
                   <burn-chart :task-sum="bugData.finish +bugData.unfinish" :day-sum="days" :finish="data.finish" :id="'task'"></burn-chart>
                   </div> -->
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
import _ from 'lodash'
import { getStageRecord, getStageAnalysisData } from '@/api/analysis'
import TaskLogChart from '@/components/charts/TaskLogAreaChart.vue'
import BurnChart from '@/components/charts/BurnChart.vue'

export default {
  components: { TaskLogChart, BurnChart },

  data() {
    return {
      name: 'AnalysisBoard',
      data: {
        finish: [],
        unfinish: [],
        unfinishForBurn: [],
        delay: [],
      },
      taskData: 0,
      bugData: 0,
      finishData: 0,
      unfinishData: 0,
      delayData: 0,
      week: [],
      days: 0,
      showBurnChart: false,
      visible: false,
    }
  },
  watch: {},
  created() {
    // this.getStageRecord()
    this.getWeekDate()
  },
  mounted() {
    this.getStageRecord()
    this.getStageAnalysisData()
    // this.drawLine()
    // window.onresize = () => {
    //   // 自适应
    //   // 基于准备好的dom，初始化echarts实例
    //   const myChart = this.$echarts.init(document.getElementById('myChart'))
    //   myChart.resize()
    // }
  },
  methods: {
    getWeekDate() {
      this.week = []
      for (let i = 7; i > 1; i -= 1) {
        this.week.push(getDay(-i))
      }
      this.$store.commit('analysis/SET_WEEK_DATE', this.week)
    },
    async getStageRecord() {
      const res = await getStageRecord(this.currStageId)
      // 创建项目失败
      if (res.meta.status !== 200) {
        return this.$message.error('获取数据失败')
      }
      console.log('任务数据', res.data)
      this.data.finish = res.data.finish
      this.data.delay = res.data.delay
      this.data.date = res.data.date
      this.data.unfinishForBurn = res.data.unfinish
      for (let i = 0; i < res.data.unfinish.length; i += 1) {
        // 考虑到时间顺序，这里可能要倒置
        this.data.unfinish.push(res.data.unfinish[i] - res.data.delay[i])
      }
      return true
    },
    async getStageAnalysisData() {
      const res = await getStageAnalysisData(this.currStageId)
      // 创建项目失败
      if (res.meta.status !== 200) {
        return this.$message.error('获取数据失败')
      }
      this.analysisData = res.data
      this.taskData = res.data.task
      this.bugData = res.data.bug
      this.finishData = res.data.finish
      this.unfinishData = res.data.unfinish
      this.delayData = res.data.delay
      this.days = res.data.days
      return true
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
    taskPercent() {
      return Math.trunc(
        (this.taskData.finish
          / (this.taskData.finish + this.taskData.unfinish))
          * 100,
      )
    },
    bugPercent() {
      return Math.trunc(
        (this.bugData.finish
          / (this.bugData.finish + this.bugData.unfinish))
          * 100,
      )
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
