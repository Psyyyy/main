<template>
  <div>
<div class="px-6 pt-3 pb-2 justify-center items-center"><h3 class="section-card__title flex items-center text-xl">
       待办事项</h3></div>
    <perfect-scrollbar
      style="height: calc(100% - 88px);"
      class="select-none overflow-hidden"
      :options="{
        suppressScrollX: true,
        maxScrollbarLength: 160,
        wheelSpeed: 0.60,
      }"
    >
      <a-menu
        mode="inline"
        class="todo-bar-menu"
        :selected-keys="selectedKeys"
        @click="onClickMenuItem"
      >
        <a-menu-item
          disabled
          class="m-0 bg-white cursor-default"
        >
          任务状态
        </a-menu-item>
        <a-menu-item
          v-for="({ id, label, icon }) in filters"
          :key="id"
        >
          <div class="flex items-center">
            <feather
              size="20"
              class="side-menu-icon anticon"
              :type="icon"
            ></feather>
            <span style="margin-top: 1px;">{{ label }}</span>
          </div>
        </a-menu-item>
        <a-menu-item
          disabled
          class="mt-6 mb-0 bg-white cursor-default"
        >
          任务优先级
        </a-menu-item>
        <a-menu-item
          v-for="({ id, label, color }) in tags"
          :key="id"
        >
          <div class="flex justify-between items-center">
            <span style="margin-top: 1px;">{{ label }}</span>
            <div
              class="w-2 h-2 mr-2 rounded-full"
              :class="`bg-${color}`"
            ></div>
          </div>
        </a-menu-item>
      </a-menu>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'TodoBar',

  data: () => ({
    filters: [
      { id: '1', label: '所有任务', icon: 'menu' },
      { id: '2', label: '规划中', icon: 'clipboard' },
      { id: '3', label: '实现中', icon: 'loader' },
      { id: '4', label: '已实现', icon: 'code' },
      { id: '5', label: '已完成', icon: 'check-square' },
    ],
    tags: [
      { id: '6', label: '非常紧急', color: 'danger' },
      { id: '7', label: '紧急', color: 'warning' },
      { id: '8', label: '普通', color: 'success' },
    ],
  }),

  computed: {
    selectedKeys() {
      return this.$store.state.todo.barKey
    },
    isSideMenuOpened() {
      return this.$store.state.isSideMenuOpened
    },
  },

  methods: {
    onOpenDrawer() {
      this.$store.commit('todo/SET_TODO_DRAWER_STATUS', true)
    },

    onClickMenuItem({ key }) {
      this.$store.commit('todo/SET_TODO_BAR_KEY', key)
    },
  },
}
</script>

<style lang="scss" scoped>
.todo-bar-menu {
  border: none;
}
</style>
