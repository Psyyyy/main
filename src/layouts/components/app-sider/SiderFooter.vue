<template>
  <div class="flex items-center justify-center">
    <div class="relative w-2/3 h-10">
      <div
        class="task"
        :class="[isTaskOpen ? 'is-opened' : 'is-closed']"
        @click="isTaskOpen = true"
      >
        <div
          class="w-full flex items-center justify-center"
          :class="isTaskOpen ? 'h-12' : 'h-10'"
        >
          <feather
            class="mx-3"
            size="21"
            type="layers"
          />
          <div v-show="isSideMenuOpened || isTaskOpen">我的任务</div>
          <div
            v-show="isTaskOpen"
            class="ml-auto mr-4 w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer"
            @click.stop="isTaskOpen = false"
          >
            <feather
              type="chevron-down"
              size="20"
            />
          </div>
        </div>

        <div
          v-show="isTaskOpen"
          class="p-5"
        >
          <div class="flex items-center">
            <h2 class="text-lg font-bold text-gray-600">今日任务</h2>
            <div class="ml-2 p-1 flex justify-center items-center primary bg-primary-light rounded cursor-pointer">
              <feather
                type="plus"
                size="16"
              />
            </div>
          </div>
          <perfect-scrollbar
            tag="ul"
            style="height: 313px;"
            class="overflow-hidden"
            :options="{
                suppressScrollX: true,
                maxScrollbarLength: 160,
                wheelSpeed: 0.60,
              }"
          >
            <li
              class="todo-item py-3 flex items-center cursor-pointer"
              v-for="({ t_id,t_title, t_content,t_rank }) in todoList"
              :key="t_id"
            >
              <div class="w-8 h-10 mr-2 flex justify-center items-center rounded-full">
                <a-checkbox />
              </div>

              <div class="flex flex-1 overflow-hidden">
                <div>{{ t_title }}</div>
                <div class="truncate text-gray-400 ml-3">{{ t_content }}</div>
              </div>
              <div class="ml-auto text-lg text-gray-600 font-bold">
                 <a-tag
                  :color="
                    t_rank === 3 ? '#ff5b5c' :t_rank === 2 ? '#fdac41' : '#28c175'
                  "
                >
                 <span class="text-sm"> {{ t_rank === 3 ? "非常紧急" : t_rank === 2 ? "紧急" : "普通" }}</span>
                </a-tag>
              </div>
            </li>
          </perfect-scrollbar>
        </div>

        <!-- 进度条 -->
        <!-- <div v-show="isTaskOpen">
          <div class="progress-grid">
            <div
              class="progress-item text-sm"
              v-for="({ label, color, percent }, i) in progress"
              :key="i"
              :title="`占比：${percent}%`"
            >
              <div>{{ label }}</div>
              <a-progress
                class="mt-0"
                :stroke-color="color"
                :percent="percent"
              />
            </div>
          </div>
        </div> -->

        <div
          v-show="isTaskOpen"
          class="view-all-btn"
          style="bottom: 10px; right: 10px;"
        >
          <div
            class="flex items-center text-gray"
            @click.stop="viewAll()"
          >
            <span class="mr-1 text-sm">查看全部</span>
            <feather
              size="16"
              type="chevron-right"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserTaskList } from '@/api/task'

export default {
  name: 'SiderFooter',

  props: {
    isSideMenuOpened: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    isTaskOpen: false,
  }),

  created: {

  },
  computed: {
    todoList() {
      return this.$store.state.todo.todoList
    },
  },

  methods: {
    viewAll() {
      this.$router.push({ name: 'Todo' })
      this.isTaskOpen = false
    },
    async getTask() {
      const uid = this.currUserID
      const { data: res } = await getUserTaskList(uid)
      console.log('todo', res)
      this.$store.commit('todo/SET_TODO_LIST', res)
      console.log('todo Task', res)
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.task {
  @apply absolute bottom-0 left-0 w-full h-full rounded-lg whitespace-no-wrap overflow-hidden;
  transition: $transition;
  &.is-closed {
    @apply flex items-center justify-center cursor-pointer;
    color: $primary;
    background: $primary-light;
  }
  &.is-opened {
    z-index: 999;
    width: 450px;
    height: 600px;
    max-height: 600px;
    background: white;
    box-shadow: $base-shadow;
    cursor: default;
  }
.todo-item{
   @apply  py-4 flex items-center cursor-pointer;
    transition: $transition;
     box-shadow: 0 2px 2px -1px rgba($secondary, 0.1);
    &:hover {
      box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
      transform: translateY(-3px);
    }
}
  .progress-grid {
    @apply p-5 flex justify-between flex-wrap;
    .progress-item {
      width: 46%;
    }
  }

  .view-all-btn {
    @apply absolute pl-4 pr-3 py-1 flex items-center rounded-full cursor-pointer;
    color: rgba($secondary, 0.8);
    background: rgba($secondary, 0.06);
  }
}
</style>
