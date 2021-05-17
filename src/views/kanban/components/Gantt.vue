<template>
  <div class="member">
    <div>
      <div>
        <a-card :bordered="false">
          <div class="wl-gantt-demo">
            <wlGantt
              :edit="false"
              :data="ganttTask"
              start-date="2021-4-1"
              end-date="2021-7-24"
              @row-click="handleRowClick"
            >
              <el-table-column fixed width="65" label="成员">
                <template slot-scope="scope">
                  {{ scope.row.header }}
                </template>
              </el-table-column>
            </wlGantt>
          </div>
        </a-card>
        <task
          :pop-visible="showTask"
          detail="detailTaskId"
          @close="showTask = false"
        />
      </div>
    </div>
  </div>
</template>
<script>
import _clonedeep from 'lodash.clonedeep'
import { getGanttTaskList, getTaskDetail } from '@/api/task'
import { getComment } from '@/api/comment'
import { getDialog } from '@/api/dialog'
// import STable from '../../components/Table'
import { getMemberList } from '@/api/member'
import Task from '@/views/task/Task.vue'

export default {
  components: { Task },

  data() {
    return {
      ganttTask: [],
      showTask: false,
    }
  },
  watch: {
    showTask() {
      if (this.showTask === false) {
        this.getGanttTask()
      }
    },
    currStageId() {
      this.getGanttTask()
    },
    currProjectID() {
      this.getGanttTask()
    },
  },
  created() {
    this.getGanttTask()
  },
  mounted() {
    this.getGanttTask()
  },
  methods: {
    handleRowClick(row) {
      this.showDetail(row.id)
    },
    async getGanttTask() {
      const pid = this.currProjectID
      const sid = this.currStageId
      const res = await getGanttTaskList(pid, sid)
      if (res.meta.status !== 200) {
        return this.$antdMessage.error('获取甘特图数据失败')
      }
      console.log('甘特图任务', res.data)
      this.ganttTask = res.data
      return true
    },
    async getTaskDetail(id) {
      const pid = this.currProjectID

      const { data: res } = await getTaskDetail(pid, id)
      this.$store.commit('task/SET_TASK_DETAIL', res)
      if (res.detail.t_level !== 0) {
        console.log('当前任务的father', res.parent[0])
        this.$store.commit('task/SET_CURR_FATHER_TASK', res.parent[0])
      }
      return true
    },
    async getDialog(id) {
      const obj = {
        pid: this.currProjectID,
        // source: 'task',
        sid: id,
      }
      const { data: res } = await getDialog(obj)
      this.$store.commit('task/SET_TASK_DIALOG', res)
      return true
    },
    async showDetail(id) {
      this.$store.commit('task/SET_CURR_EDIT_TASK', id)
      await this.getTaskDetail(id)
      await this.getDialog(id)
      await this.getComment(id)
      this.showTask = true
      // this.detailTaskId = id
    },
    async getComment(id) {
      const params = {
        source: 'task',
        sid: id,
      }
      const { data: res } = await getComment(params)
      // this.dialogList = res
      this.$store.commit('task/SET_TASK_COMMENT', res)
      return true
    },

    async getMemberList() {
      const id = this.currProjectID
      const { data: res } = await getMemberList(id)
      console.log('memberlist', res)
      this.$store.commit('team/SET_CURR_PROJECT_MEMBER_LIST', res)
    },
  },
  computed: {
    taskList() {
      return this.$store.state.task.taskList
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
