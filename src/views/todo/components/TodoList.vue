<template>
  <div class="relative">

    <perfect-scrollbar
      class="todo-list"
      :options="{
        maxScrollbarLength: 160,
        wheelSpeed: 0.6,
      }"
    >
      <flip-list v-if="filterItems.length > 0" style="min-width: 800px">
        <li
          class="todo-list__item"
          v-for="(todo,index) in filterItems"
          :key="index"
          :class="{ 'todo-list__item-active': todo.id === currEditItem.id }"

        >
          <a-checkbox class="mr-4" v-model="todo.is_done" @click="finishCheck(todo)" />
                    <div class="mr-auto flex items-center flex-wrap">
            <div class="flex-1 flex items-center select-none">
               <a-tag
                  :color="
                    todo.t_rank === 3 ? '#ff5b5c' :todo.t_rank === 2 ? '#fdac41' : '#28c175'
                  "
                >
                 <span class="text-sm"> {{ todo.t_rank === 3 ? "非常紧急" : todo.t_rank === 2 ? "紧急" : "普通" }}</span>
                </a-tag>
            </div>
          </div>
          <div class="flex-1 truncate todoItem" :class="{ done: todo.is_done }" @click="showDetail(todo.id)">{{ todo.t_title }}
            <span class="ml-4 text-base" style="color:#b7b8bb">{{todo.t_content}}</span>
            </div>
            <div class="ml-auto flex items-center flex-wrap" style="color:#b7b8bb">
              <div><a-tag  :color="stateColor(todo.t_state)" >{{todo.t_state}}</a-tag></div>
              截止日期：{{todo.end_time|dateFormat}}
            </div>
        </li>
      </flip-list>
      <a-empty
        v-else
        class="h-full flex flex-col justify-center items-center"
      />
    </perfect-scrollbar>
    <task
      :pop-visible="showTask"
      detail="detailTaskId"
      @close="showTask = false"
    />
     <add-modal />
  </div>

</template>

<script>
import FlipList from '@/components/animation/FlipList.vue'
import { getUserTaskList, getTaskDetail, getUndoneChild } from '@/api/task'
import { getComment } from '@/api/comment'
import { getDialog } from '@/api/dialog'
// import STable from '../../components/Table'
import { getMemberList } from '@/api/member'
import AddModal from '@/components/AddModal.vue'
import Task from '@/views/task/Task.vue'

export default {
  name: 'TodoList',

  components: { FlipList, Task, AddModal },

  data: () => ({
    showTask: false,
    searchInputText: '搜索任务...',
    tags: {
      1: { text: '非常紧急', color: 'danger' },
      2: { text: '紧急', color: 'warning' },
      3: { text: '普通', color: 'success' },
    },
  }),

  computed: {
    filterItems() {
      return this.$store.getters['todo/filterItems']
    },
    currUserID() {
      return window.sessionStorage.getItem('currUserID')
    },
    currEditItem() {
      return this.$store.state.todo.currEditTodo
    },

    isDrawerOpened() {
      return this.$store.state.todo.isTodoDrawerOpened
    },
    currStage() {
      return this.$store.state.stage.currStage
    },
    currStageId() {
      return this.$store.state.stage.currStageId
    },
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
  },
  watch: {
    showTask() {
      this.getTask()
    },
  },
  created() {
    this.getTask()
  },
  methods: {
    async finishCheck(task) { // todo.id,todo.t_type,todo.is_done
      console.log('tasktask', task)
      if (task.is_done === 0 || task.is_done === false) {
        if (task.t_level === 2) {
          this.finishTask(task.id, task.t_type, 1)
        } else {
          const pid = this.currProjectID
          const tid = task.id
          const haveUndone = await getUndoneChild(pid, tid)
          if (haveUndone.data.length) {
            this.$info({
              title: (
                  <p>
                    <span class="warning">「{task.t_title}」</span>
                    仍存在尚未完成的子任务
                  </p>
              ),
              content: '请先将子任务完成再完成父任务',
              onOk: () => { this.getTask() },
            })
          } else {
            this.finishTask(task.id, task.t_type, 1)
          }
        }
      } else if (task.is_done === 1 || task.is_done === true) {
        this.$antdConfirm({
          title: (
              <p>
                将<span class="warning">「{task.t_title}」</span>
                任务设为未完成状态
              </p>
          ),
          content: '您确定要取消完成该任务吗？',
          onOk: () => {
            this.finishTask(task.id, task.t_type, 0)
          },
        })
      }
    },
    finishTask(id, type, done) {
      const msg = {
        id,
        type,
        done,
      }
      this.$store.dispatch('task/finishTask', msg).then((result) => {
        if (result) {
          this.getTask()
          this.$antdMessage.success('修改完成状态成功')
        } else {
          this.$antdMessage.error('修改完成状态失败')
        }
      }).catch(() => {})
    },
    async getTask() {
      const uid = this.currUserID
      const { data: res } = await getUserTaskList(uid)
      this.$store.commit('todo/SET_TODO_LIST', res)
      console.log('todo Task', res)
      return true
    },
    async showDetail(id) {
      console.log('id', id)
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
    async getTaskDetail(id) {
      const pid = this.currProjectID

      const { data: res } = await getTaskDetail(pid, id)
      this.$store.commit('task/SET_TASK_DETAIL', res)
      if (res.detail.t_level !== 0) {
        console.log('当前任务的father', res)
        this.$store.commit('task/SET_CURR_FATHER_TASK', res.parent[0])
      }
      return true
    },
    async getDialog(id) {
      const obj = {
        pid: this.currProjectID,
        source: 'task',
        sid: id,
      }
      const { data: res } = await getDialog(obj)
      this.$store.commit('task/SET_TASK_DIALOG', res)
      return true
    },
    onOpenAdd() {
      this.$store.commit(
        'task/SET_CURR_EDIT_TASK_LEVEL',
        this.task.detail.t_level + 1,
      )
      if (this.task.detail.is_del || this.task.detail.is_done) return false
      this.$store.commit('add/SET_ADD_FROM_DETAIL', true)
      this.$store.commit('add/SET_SUBMIT', false)
      // this.$store.commit('add/SET_ADD_MODAL_TYPE', 'task')
      this.$store.commit('add/SET_ADD_MODAL_STATUS', true)
      return true
    },
    stateColor(state) {
      switch (state) {
        case '规划中':
          return 'pink'
        case '实现中':
          return 'blue'
        case '已实现':
          return 'cyan'
        case '已拒绝':
          return 'purple'
        case '已验收':
          return 'green'
        case '已关闭':
          return '#626262'
          // 缺陷
        case '新':
          return 'orange'
        case '处理中':
          return 'blue'
        case '已解决':
          return 'green'
        default:
          return '#626262'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.search-input::v-deep {
  @apply py-1;
  .ant-input {
    @apply h-12 pl-10 shadow-none border-none;
    &::placeholder {
      @apply text-sm;
    }
    &:focus {
      box-shadow: 0 10px 15px -5px rgba($secondary, 0.1);
    }
  }
}

.todo-list {
  @apply h-full overflow-hidden;
  height: calc(100% - 58px);

  &__item {
    @apply px-6 py-5 flex items-center cursor-pointer;
    transition: $transition;
     box-shadow: 0 2px 2px -1px rgba($secondary, 0.1);
    &:hover {
      box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
      transform: translateY(-3px);
    }
  }
  &__item-active {
    background: rgba($primary, 0.05);
  }
}

.todoItem {
  &.done {
    color: #b7b8bb;
    text-decoration: line-through;
  }
   display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>
