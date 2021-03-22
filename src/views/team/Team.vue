<template>
  <div class="team-app">
    <div class="left">
      <team-bar class="h-full"></team-bar>
    </div>
    <div class="right">
      <team-list class="h-full"></team-list>
    </div>
    <team-drawer></team-drawer>
  </div>
</template>

<script>
import TeamBar from './components/TeamBar.vue'
import TeamList from './components/TeamList.vue'
import TeamDrawer from './components/TeamDrawer.vue'

export default {
  name: 'Team',

  components: { TeamBar, TeamList, TeamDrawer },
}
</script>

<style lang="scss" scoped>
.team-app {
  @apply relative w-full flex -mt-5 bg-white rounded-lg overflow-hidden;
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
