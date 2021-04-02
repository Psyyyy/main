<template>
  <div class="app-header">
     <a-button @click="backToEntry">返回项目页</a-button>
    <div class="shortcuts">
      <!-- <a-tooltip
        v-for="({ icon, title }) in shortcuts"
        :key="icon"
        placement="bottom"
      >
        <template #title>{{ title }}</template>
        <feather
          class="mr-4 cursor-pointer"
          size="20"
          :type="icon"
          @click="onClickShortcut(routeName)"
        />
                <feather
          class="mr-4 cursor-pointer"
          size="20"
          :type="icon"

        />
      </a-tooltip> -->

      <a-dropdown class="mr-6">
        <div class="ml-2 flex items-center cursor-pointer">

          {{currProject}}
          <feather class="ml-1 text-gray-500" size="18" type="chevron-down" />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="{ pro_id,pro_title } in projectList" :key="pro_title" @click="changeProjectTo(pro_id,pro_title)">
              {{pro_title}}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <div class="setting">
      <div class="flex items-center">
        <header-search ref="headerSearch" />
        <feather type="search" @click="$refs.headerSearch.onOpenSearch()" />
        <feather
          class="mx-4"
          :type="isFullScreen ? 'minimize' : 'maximize'"
          @click="onScreenfull"
        />
        <header-notice />
      </div>

      <a-dropdown class="ml-4" :trigger="['click']">
        <div class="h-full flex items-center">
          <div class="flex items-center text-base">
            <div class="mx-4 text-right">
              <div class="text-lg">{{ info.name || "暂无昵称" }}</div>
              <div class="text-sm">{{ info.role }}</div>
            </div>
            <div>
              <a-avatar
                class="flex items-center justify-center"
                size="large"
                :icon="info.avatar ? '' : 'user'"
                :src="info.avatar"
              />
            </div>
          </div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="({ label, name, icon, click }, index) in menuItems"
              :key="index"
              @click="onClickMenuItem(name, click)"
            >
              <div
                tag="div"
                class="flex items-center justify-center text-gray-700"
              >
                <feather size="16" :type="icon" />
                <span class="ml-2">{{ label }}</span>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { isValidUrl } from '@/utils/util'
import {
  getProjectList,
} from '@/api/project'
import { getMemberList } from '@/api/member'
import HeaderSearch from './app-header/HeaderSearch.vue'
import HeaderNotice from './app-header/HeaderNotice.vue'

export default {
  name: 'AppHeader',
  components: { HeaderSearch, HeaderNotice },

  data: () => ({
    // shortcuts: [
    //   { icon: 'monitor', routeName: 'Ecommerce', title: '仪表盘' },
    //   { icon: 'check-circle', routeName: 'Todo', title: '任务列表' },
    //   { icon: 'server', routeName: 'Kanban', title: '看板' },
    // ],
    menuItems: [
      {
        label: '个人中心',
        name: 'Profile',
        icon: 'user',
      },
      {
        label: '待办事项',
        name: 'Todo',
        icon: 'check-square',
      },
      {
        label: '退出登录',
        name: 'Login',
        icon: 'log-out',
        click: 'logOut',
      },
    ],
    projectList: [],
    isFullScreen: false,
  }),
  created() {
    this.getProject()
  },
  computed: {
    info() {
      return this.$store.state.user.info
    },
    currProject() {
      return this.$store.state.project.currProject
    },
  },

  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        this.isFullScreen = screenfull.isFullscreen
      })
    }
  },

  methods: {
    async getProject() {
      const { data: res } = await getProjectList()
      // console.log('project', res)
      this.projectList = res.projectlist
      return true
    },
    async logOut() {
      const CAN_LOGOUT = await this.$store.dispatch('user/logout')
      if (CAN_LOGOUT) {
        this.$message.success('成功退出')
        this.$router.replace({ name: 'Login' })
      }
    },

    // onClickShortcut(name) {
    //   this.$router.push({ name })
    // },

    onClickMenuItem(name, click) {
      if (click) {
        this[click]()
      } else if (isValidUrl(name)) {
        window.open(name, '_blank', 'noopener')
      } else {
        this.$router.push({ name })
      }
    },

    onScreenfull() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    },
    async changeProjectTo(id, name) {
      const { data: res } = await getMemberList(id)
      console.log('appheader', res)
      this.$store.commit('project/SET_CURR_PROJECT_NAME', name)
      this.$store.commit('project/SET_CURR_PROJECT_ID', id)
      this.$store.commit('team/SET_CURR_PROJECT_MEMBER_LIST', res)
      window.localStorage.setItem('currProject', name)
      window.localStorage.setItem('currProjectID', id)

      // console.log(this.$store.state.project.currProject)
      // 这里需要向后台提交id拿项目数据，拿回来后重新渲染当前界面
      // 进入管理界面后每次请求都应该附带id，但是要设置默认id是第一个项目
    },
    backToEntry() {
      this.$router.push({ name: 'Project' })
      // this.$router.push('Project')
    },
  },
}
</script>

<style lang="scss" scoped>
.app-header {
  @apply relative w-full h-full flex items-center bg-transparent;
}

.setting {
  @apply h-full ml-auto flex items-center cursor-pointer;
}
</style>
