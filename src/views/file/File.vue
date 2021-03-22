<template>
  <div class="file-app">
    <div class="left">
      <file-bar class="h-full"></file-bar>
    </div>
    <div class="right">
      <file-list class="h-full"></file-list>
    </div>
    <file-drawer></file-drawer>
  </div>
</template>

<script>
import FileBar from './components/FileBar.vue'
// import FileList from './components/FileList.vue'
import FileDrawer from './components/FileDrawer.vue'
import FileList from './components/FileList.vue'

export default {
  name: 'File',

  components: { FileBar, FileList, FileDrawer },
}
</script>

<style lang="scss" scoped>
.file-app {
  @apply relative w-full flex bg-white rounded-lg overflow-hidden;
  height: $full-height;
  min-height: 630px;

  .left {
    width: 22%;
    min-width: 200px;
    height: 100%;
    border-right: 1px solid #eee;
  }

  .right {
    @apply h-full;
    width: 78%;
  }
}
</style>
