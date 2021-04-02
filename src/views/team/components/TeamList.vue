<template>
  <div class="relative">
    <div>
      <a-input
        class="search-input"
        size="large"
        :placeholder="searchInputText"
        @focus="searchInputText = '请输入成员关键字...'"
        @blur="searchInputText = '搜索成员...'"
      >
        <template #prefix>
          <feather size="20" type="search" />
        </template>
      </a-input>
    </div>

    <perfect-scrollbar
      class="team-list"
      :options="{
        maxScrollbarLength: 160,
        wheelSpeed: 0.6
      }"
    >
      <a-list
        class="demo-loadmore-list"
        item-layout="horizontal"
        :data-source="filterItems"
      >
        <a-list-item class="member-item" slot="renderItem" slot-scope="item">
          <a class="ml-1 mr-2" slot="actions">
            <a-tooltip placement="top">
              <template slot="title">
                编辑权限
              </template>
              <feather size="20" type="edit" />
            </a-tooltip>
          </a>
          <a class="ml-1 mr-2" slot="actions">
            <a-tooltip placement="top">
              <template slot="title">
                移出项目
              </template>
              <a-popconfirm placement="topRight" title="确定将该成员移出项目？">
                <feather size="20" type="user-minus" />
                <!-- <a-button type="danger" icon="delete" size="small" /> -->
              </a-popconfirm>
            </a-tooltip>
          </a>
          <a class="ml-1 mr-2" slot="actions">
            <a-tooltip placement="top">
              <template slot="title">
                停用账号
              </template>
              <a-popconfirm placement="topRight" title="确定停用该成员帐号？">
                <feather size="20" type="slash" />
                <!-- <a-button type="danger" icon="delete" size="small" /> -->
              </a-popconfirm>
            </a-tooltip>
          </a>

          <!-- 角色头像资料 -->
          <a-list-item-meta :description="item.email">
            <a slot="title" @click="onOpenDrawer(item)">{{ item.name }}</a>
            <a-avatar
              class="ml-6"
              slot="avatar"
              :size="42"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
          <div>
            <!-- 角色标签 -->
            <div
              class="ml-2 px-2 py-1 rounded-lg text-sm"
              :class="[
                item.role === 'admin' ? 'warning' : 'primary',
                `bg-${item.role === 'admin' ? 'warning' : 'primary'}-light`
              ]"
            >
              {{ item.role === 'admin' ? "管理员" : "普通成员" }}
            </div>
          </div>
        </a-list-item>
      </a-list>
      <!-- <a-empty
        v-else
        class="h-full flex flex-col justify-center items-center"
      /> -->
    </perfect-scrollbar>
  </div>
</template>

<script>
// import FlipList from '@/components/animation/FlipList.vue'
import { getMemberList, deleteMember } from '@/api/member'
import { getUserInfo } from '@/api/user'
import { getProjectList } from '@/api/project'
import { getUserTaskList } from '@/api/task'

export default {
  name: 'TeamList',

  // components: { FlipList },

  data: () => ({
    searchInputText: '搜索成员...',
  }),

  computed: {
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    filterItems() {
      return this.$store.getters['team/filterItems']
    },

    currEditMember() {
      return this.$store.state.team.currEditMember
    },

    isDrawerOpened() {
      return this.$store.state.team.isTeamDrawerOpened
    },
    memberList() {
      return this.$store.state.team.currProjectMemberList
    },
  },
  created() {
    this.init()
  },

  methods: {
    init() {
      this.getMemberList()
    },
    initMember(uid) {
      this.getMemberInfo(uid)
      this.getProject(uid)
      this.getTask(uid)
    },
    onOpenDrawer(member) {
      if (!this.currEditMember.id) {
        this.initMember(member.uid)
        this.$store.commit('team/SET_TEAM_DRAWER_STATUS', true)
      } else if (member.uid !== this.currEditMember.id) {
        this.initMember(member.uid)
        this.$store.commit('team/SET_TEAM_DRAWER_STATUS', true)
      } else {
        this.initMember(member.uid)
        this.$store.commit('team/SET_TEAM_DRAWER_STATUS', !this.isDrawerOpened)
      }
      console.log('open', this.isDrawerOpened)
    },

    async getMemberList() {
      const id = this.currProjectID
      const { data: res } = await getMemberList(id)
      // console.log('memberlist', res)
      this.$store.commit('team/SET_CURR_PROJECT_MEMBER_LIST', res)
    },
    async getMemberInfo(uid) {
      const { data: res } = await getUserInfo(uid)
      this.$store.commit('team/SET_CURR_EDIT_MEMBER', res.info)
      console.log('member', res.info)
    },
    async getProject(uid) {
      const { data: res } = await getProjectList(uid)
      // console.log('project', res)
      this.$store.commit('team/SET_MEMBER_PROJECT', res)
      console.log('member Project', res)
      return true
    },
    async getTask(uid) {
      const { data: res } = await getUserTaskList(uid)
      // console.log('project', res)
      this.$store.commit('team/SET_MEMBER_TASK', res)
      console.log('member Task', res)
      return true
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

.team-list {
  @apply h-full overflow-hidden;
  height: calc(100% - 58px);
  &__item {
    @apply px-6 py-5 flex items-center cursor-pointer;
    transition: $transition;
    &:hover {
      box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
      transform: translateY(-3px);
    }
  }
  &__item-active {
    background: rgba($primary, 0.05);
  }
}
.member-detail {
  font-size: 15px;
  color: rgb(181, 186, 192);
}
.member-item{
   transition: $transition;
 &:hover {

          box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
      transform: translateY(-3px);
        }
}
</style>
