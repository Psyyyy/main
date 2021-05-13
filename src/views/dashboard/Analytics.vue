<template>
  <div>
    <section class="row">
      <div class="w-1/2 pr-3">
        <div class="dashboard-card">
          <h3 class="dashboard-card-title mb-6">项目进展</h3>
          <div class="mb-4 flex items-center justify-around">
            <div
              class="flex flex-col justify-center items-center -mt-4"
              v-for="({ label, percent, value, icon, color }) in [
                { label: '需求', percent: taskRate, value: taskRate+'%', icon: 'layers', color: 'success' },
                { label: '缺陷', percent: bugRate, value: bugRate+'%', icon: 'alert-octagon', color: 'danger' },
              ]"
              :key="label"
            >
              <div class="mb-2 flex items-center text-gray-600">
                <feather
                  size="18"
                  :type="icon"
                />
                <span class="ml-2">{{ label }}</span>
              </div>
              <div class="flex items-center">
                <a-progress
                  type="circle"
                  :width="35"
                  :show-info="false"
                  :stroke-width="12"
                  :stroke-color="{
                    '0%': `rgba(var(--${color}), .6)`,
                    '50%': `rgba(var(--${color}), .8)`,
                    '100%': `rgba(var(--${color}), .9)`,
                  }"
                  :percent="percent"
                />
                <div class="mb-1 ml-3 text-2xl">{{ value }}</div>
              </div>
            </div>
          </div>
         <a-divider />
                   <div class="-mt-12 -mb-8 w-full inline-block" style="height:350px">
              <!-- <div  style="height:100%;width:100%;" id="myChart"></div> -->
              <task-log-chart :id="'project'" :show-title="false" :series-data="data"/>
            </div>
        </div>
      </div>
      <div class="w-1/2 pl-3">
        <div class="mb-6 h-64 flex">
          <!-- 右上1 -->
          <div class="pr-3 flex-1">
            <div class="dashboard-card flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-bold text-xl">任务总数</div>
                </div>
                <div class="text-3xl font-semibold">{{finishData+unfinishData}}<span class="text-xl">个</span></div>
              </div>
              <line-chart :id="'all'" :series-data="data.all" :date="data.date" :series-name="'任务总数'"></line-chart>
              <!-- <bar-negative-chart></bar-negative-chart> -->
            </div>
          </div>
          <!-- 右上2 -->
          <div class="pl-3 flex-1">
            <div class="dashboard-card flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-bold text-xl">延误任务</div>
                </div>
                 <div class="text-3xl font-semibold">{{delayData}}<span class="text-xl">个</span></div>
              </div>
              <line-chart :id="'delay'" :series-data="data.delay" :date="data.date" :series-name="'延误任务'"></line-chart>
            </div>
          </div>
        </div>
        <!-- 右下 -->
        <div class="flex h-64">
          <!-- 右下1 -->
          <div class="w-1/2 pr-3">
            <div class="dashboard-card flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-bold text-xl">待处理任务</div>

                </div>
<div class="text-3xl font-semibold">{{data.unfinish[data.unfinish.length-1]}}<span class="text-xl">个</span></div>
              </div>
               <line-chart :id="'unfinish'" :series-data="data.unfinish" :date="data.date" :series-name="'待处理任务'"></line-chart>
            </div>
          </div>
          <!-- 右下2 -->
          <div class="w-1/2 pl-3 flex flex-col">
            <!-- <div class="dashboard-card mb-6 flex-1 flex items-center">
              <div
                style="min-width: 2.5rem; background: rgba(var(--primary), .18);"
                class="h-10 flex items-center justify-center primary rounded-full"
              >
                <feather
                  size="18"
                  type="user"
                />
              </div>
              <div class="mx-4 whitespace-no-wrap">
                <div class="font-semibold">38,566</div>
                <div class="text-sm text-gray-500">转换次数</div>
              </div>
              <div style="min-width: 6rem;">
                <primary-line-chart></primary-line-chart>
              </div>
            </div>
            <div class="dashboard-card flex-1 flex items-center">
              <div
                style="min-width: 2.5rem; background: rgba(var(--warning), .18);"
                class="h-10 flex items-center justify-center warning rounded-full"
              >
                <feather
                  size="18"
                  type="dollar-sign"
                />
              </div>
              <div class="mx-4 whitespace-no-wrap">
                <div class="font-semibold">53,659</div>
                <div class="text-sm text-gray-500">收益</div>
              </div>
              <div style="min-width: 6rem;">
                <warning-line-chart></warning-line-chart>
              </div>
            </div> -->
            <div class="dashboard-card flex flex-col justify-between">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-bold text-xl">已完成任务</div>
                </div>
                <div class="text-3xl font-semibold">{{finishData}}<span class="text-xl">个</span></div>
              </div>
             <line-chart :id="'finish'" :series-data="data.finish" :date="data.date" :series-name="'已完成任务'"></line-chart>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="row">
      <div class="w-1/2 pr-3">
        <div class="dashboard-card">
          <h3 class="dashboard-card-title mb-6">任务优先级分布</h3>
          <div class="mb-4 flex items-center justify-around">
                               <div class="-mt-12 -mb-8 w-full inline-block" style="height:350px">
              <!-- <div  style="height:100%;width:100%;" id="myChart"></div> -->
              <pie-chart v-if="showPie" :id="'rank'" :rank="rankData"></pie-chart>
            </div>

          </div>
        </div>
      </div>
            <div class="w-1/2 pr-3 pl-3">
        <div class="dashboard-card">
          <h3 class="dashboard-card-title">项目动态</h3>
          <div class="flex mb-4">
            <!-- 动态标题 -->
            <div
              style="width:100%;height:250px"
              class="overflow-auto"
            >
              <a-list
                class="comment-list"
                item-layout="horizontal"
                :data-source="dialogList"
              >
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-comment :author="item.name">
                    <a-avatar
                      slot="avatar"
                      class="flex-wrap text-xs primary bg-primary-light"
                      :size="40"
                    >
                        {{ item.name }}
                    </a-avatar>
                    <template slot="actions">
                      <span
                        >来自{{ item.t_type === 1 ? "需求" : "缺陷" }}【{{
                          item.t_title
                        }}】</span
                      >
                    </template>
                    <p slot="content">
                      <span>
                        {{ item.d_action
                        }}<span class="warning" v-if="item.d_target !== ''"
                          >「{{ item.d_target }}」</span
                        ></span
                      >
                    </p>
                    <span slot="datetime">{{
                      item.d_create_time | dateFormat
                    }}</span>
                  </a-comment>
                </a-list-item>
              </a-list>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { getProjectRecord, getProjectAnalysisData } from '@/api/analysis'
import { getTaskRank } from '@/api/task'
import { getDialog } from '@/api/dialog'
import LineChart from '@/components/charts/LineChart.vue'
import TaskLogChart from '@/components/charts/TaskLogAreaChart.vue'
import PieChart from '@/components/charts/PieChart.vue'

export default {
  name: 'Analytics',

  components: {
    PieChart, LineChart, TaskLogChart,
  },

  data: () => ({
    data: {
      finish: [],
      unfinish: [],
      delay: [],
      all: [],
    },
    rankData: {},
    dialogList: [],
    taskData: 0,
    bugData: 0,
    finishData: 0,
    unfinishData: 0,
    delayData: 0,
    showPie: false,
  }),
  computed: {
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    taskRate() {
      if (this.taskData.finish + this.taskData.unfinish) {
        return Math.floor(((this.taskData.finish / (this.taskData.finish + this.taskData.unfinish)) * 100) * 10) / 10
      }
      return 0
    },
    bugRate() {
      if (this.bugData.finish + this.bugData.unfinish) {
        return Math.floor(((this.bugData.finish / (this.bugData.finish + this.bugData.unfinish)) * 100) * 10) / 10
      }
      return 0
    },
  },
  watch: {

    currProjectID: {
      immediate: true,
      handler() {
        this.getProjectRecord()
        this.getDialog()
        this.getProjectAnalysisData()
        this.getTaskRank()
      },

    },
  },
  created() {
    this.getProjectRecord()
    this.getDialog()
    this.getProjectAnalysisData()
    this.getTaskRank()
  },
  methods: {
    async getDialog() {
      const obj = {
        uid: window.sessionStorage.getItem('currUserID'),
        pid: this.currProjectID,
      }
      const { data: res } = await getDialog(obj)
      this.dialogList = res
      console.log('项目dialog信息', res)
      return true
    },
    async getTaskRank() {
      const pid = this.currProjectID
      const { data: res } = await getTaskRank(pid)
      this.rankData = res
      this.showPie = true
      return true
    },
    async getProjectRecord() {
      const res = await getProjectRecord(this.currProjectID)
      // 创建项目失败
      if (res.meta.status !== 200) {
        return this.$antdMessage.error('获取数据失败')
      }
      this.data = {
        finish: [],
        unfinish: [],
        delay: [],
        all: [],
      }
      this.dayNum = res.data.finish.length
      this.data.finish = res.data.finish
      this.data.delay = res.data.delay
      this.data.date = res.data.date
      this.data.all = res.data.all
      for (let i = 0; i < res.data.unfinish.length; i += 1) {
        // 考虑到时间顺序，这里可能要倒置
        this.data.unfinish.push(res.data.unfinish[i] - res.data.delay[i])
      }
      return true
    },
    async getProjectAnalysisData() {
      const res = await getProjectAnalysisData(this.currProjectID)
      // 创建项目失败
      if (res.meta.status !== 200) {
        return this.$antdMessage.error('获取数据失败')
      }
      console.log('分析数据', res.data)
      // this.analysisData = res.data
      this.taskData = res.data.task
      this.bugData = res.data.bug
      this.finishData = res.data.finish
      this.unfinishData = res.data.unfinish
      this.delayData = res.data.delay
      return true
    },
  },
}
</script>
<style lang="scss">
.row {
  @apply mb-6 flex flex-wrap;
  .dashboard-card {
    @apply h-full px-6 py-4 bg-white rounded-lg;
    &-icon {
      @apply flex-1 py-3 flex flex-col items-center justify-center;
      .icon {
        @apply w-12 h-12 mb-2 flex justify-center items-center rounded-full;
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
}
</style>
<style lang="scss" scoped>
.timeline::v-deep {
  .ant-timeline-item-content {
    margin-left: 40px;
  }
}
</style>
