<template>
  <div>
    <div class="px-6 py-6">
      <a-button
        class="w-full flex justify-center items-center"
        size="large"
        type="primary"
        @click="onOpenDrawer"
      >
        <feather
          class="mr-1"
          size="20"
          type="plus"
        />
        添加成员
      </a-button>
    </div>

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
        class="team-bar-menu"
        :selected-keys="selectedKeys"
        @click="onClickMenuItem"
      >
        <a-menu-item
          disabled
          class="m-0 bg-white cursor-default"
        >
          查看成员
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
          任务标签
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
  name: 'TeamBar',

  data: () => ({
    filters: [
      { id: '1', label: '所有成员', icon: 'users' },
      { id: '2', label: '新加入成员', icon: 'user-plus' },
      { id: '3', label: '已停用成员', icon: 'user-x' },
    ],
    tags: [
      { id: '4', label: '管理员', color: 'primary' },
      { id: '5', label: '普通成员', color: 'warning' },
    ],
  }),

  computed: {
    selectedKeys() {
      return this.$store.state.team.barKey
    },
    isSideMenuOpened() {
      return this.$store.state.isSideMenuOpened
    },
  },

  methods: {
    onOpenDrawer() {
      this.$store.commit('team/SET_TEAM_DRAWER_STATUS', true)
    },

    onClickMenuItem({ key }) {
      this.$store.commit('team/SET_TEAM_BAR_KEY', key)
    },
  },
}
</script>

<style lang="scss" scoped>
.team-bar-menu {
  border: none;
}
// .open-btn{
//  &.team-close {
//     margin-left: 190px !important;
//   }
// &.team-open {
//     margin-left: 162px !important;
//   }
//  z-index:999;
// }
</style>
