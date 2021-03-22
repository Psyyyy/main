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
        上传文件
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
        class="file-bar-menu"
        :selected-keys="selectedKeys"
        @click="onClickMenuItem"
      >
        <a-menu-item
          disabled
          class="m-0 bg-white cursor-default"
        >
          文件类型
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
          文件来源
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
  name: 'FileBar',

  data: () => ({
    filters: [
      { id: '1', label: '所有文件', icon: 'menu' },
      { id: '2', label: '文档', icon: 'file-text' },
      { id: '3', label: '图片', icon: 'image' },
      { id: '4', label: '其他', icon: 'archive' },
    ],
    tags: [
      { id: '5', label: '项目', color: 'primary' },
      { id: '6', label: '需求', color: 'success' },
      { id: '7', label: '迭代', color: 'warning' },
      { id: '8', label: '缺陷', color: 'danger' },
    ],
  }),

  computed: {
    selectedKeys() {
      return this.$store.state.file.barKey
    },
    isSideMenuOpened() {
      return this.$store.state.isSideMenuOpened
    },
  },

  methods: {
    onOpenDrawer() {
      this.$store.commit('file/SET_FILE_DRAWER_STATUS', true)
    },

    onClickMenuItem({ key }) {
      this.$store.commit('file/SET_FILE_BAR_KEY', key)
    },
  },
}
</script>

<style lang="scss" scoped>
.file-bar-menu {
  border: none;
}
// .open-btn{
//  &.file-close {
//     margin-left: 190px !important;
//   }
// &.file-open {
//     margin-left: 162px !important;
//   }
//  z-index:999;
// }
</style>
