<template>
  <div>
    <div class="-mt-3 section-card">
      <div class="flex">
        <div
          v-for="({ name, text, icon }) in [
          { text: '账号设置', name: 'Account', icon: 'settings' },
          { text: '修改密码', name: 'Security', icon: 'lock' },
        ]"
          :key="name"
          class="tab-nav mr-4"
          :class="{ 'active': routeName === name }"
          @click="routeTo(name)"
        >
          <feather
            class="mr-2"
            size="20"
            :type="icon"
          />
          {{ text }}
        </div>
      </div>
      <a-divider />

      <transition
        name="slide-fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProflieLayout',

  data: () => ({
    routeName: null,
  }),

  watch: {
    '$route.name': {
      handler(name) {
        this.routeName = name
      },
      immediate: true,
    },
  },

  methods: {
    routeTo(name) {
      this.$router.push({ name })
    },
  },
}
</script>

<style lang="scss" scoped>
.tab-nav {
  @apply w-40 h-10 flex justify-center items-center rounded cursor-pointer;
  color: $secondary;
  background: $secondary-light;
  &.active {
    color: #fff;
    background: $primary;
  }
}
</style>
