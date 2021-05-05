<template>
  <div>
    <div class="px-6 py-6">
      <a-button
        class="w-full flex justify-center items-center"
        size="large"
        type="primary"
        @click="isAddMemberVisible = true"
      >
        <feather class="mr-1" size="20" type="plus" />
        添加成员
      </a-button>
    </div>

    <perfect-scrollbar
      style="height: calc(100% - 88px);"
      class="select-none overflow-hidden"
      :options="{
        suppressScrollX: true,
        maxScrollbarLength: 160,
        wheelSpeed: 0.6
      }"
    >
      <a-menu
        mode="inline"
        class="team-bar-menu"
        :selected-keys="selectedKeys"
        @click="onClickMenuItem"
      >
        <a-menu-item disabled class="m-0 bg-white cursor-default">
          查看成员
        </a-menu-item>
        <a-menu-item v-for="{ id, label, icon } in filters" :key="id">
          <div class="flex items-center">
            <feather
              size="20"
              class="side-menu-icon anticon"
              :type="icon"
            ></feather>
            <span style="margin-top: 1px;">{{ label }}</span>
          </div>
        </a-menu-item>
        <a-menu-item disabled class="mt-6 mb-0 bg-white cursor-default">
          成员角色
        </a-menu-item>
        <a-menu-item v-for="{ id, label, color } in tags" :key="id">
          <div class="flex justify-between items-center">
            <span style="margin-top: 1px;">{{ label }}</span>
            <div class="w-2 h-2 mr-2 rounded-full" :class="`bg-${color}`"></div>
          </div>
        </a-menu-item>
      </a-menu>
    </perfect-scrollbar>
    <a-modal
      :width="360"
      :visible="isAddMemberVisible"
      title="添加成员"
      @cancel="closeAddModal"
      @ok="confirmAddMember"
    >
      <div class="ml-4">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="通过账号邀请">
            <div>
              <a-select
                show-search
                placeholder="输入成员姓名关键字"
                option-filter-prop="value"
                style="width: 95%"
                :filter-option="filterOption"
                 @change="addMember"
              >
                <a-select-option
                  v-for="(item, index) in otherMemberList"
                  :key="index"
                  :value="item.uid"
                >
                  <a-avatar
                    class="ml-1 mb-2 primary bg-primary-light"
                    :size="20"
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />

                  {{ item.name }}
                </a-select-option>
              </a-select>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="通过邮箱邀请" force-render>
            通过邮箱邀请
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getOtherMemberList, getMemberList } from '@/api/member'
import { updateUser } from '@/api/user'

export default {
  name: 'TeamBar',

  data: () => ({
    filters: [
      { id: '1', label: '所有成员', icon: 'users' },
      // { id: '2', label: '已停用成员', icon: 'user-x' },
    ],
    tags: [
      { id: '3', label: '管理员', color: 'warning' },
      { id: '4', label: '普通成员', color: 'primary' },
    ],
    isAddMemberVisible: false,
    addMemnberId: '',
  }),

  computed: {
    selectedKeys() {
      return this.$store.state.team.barKey
    },
    isSideMenuOpened() {
      return this.$store.state.isSideMenuOpened
    },
    memberList() {
      return this.$store.state.team.currProjectMemberList
    },
    otherMemberList() {
      return this.$store.state.team.otherMemberList
    },
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
  },
  created() {
    this.getAllUser()
  },
  methods: {
    onOpenDrawer() {
      this.$store.commit('team/SET_TEAM_DRAWER_STATUS', true)
    },

    onClickMenuItem({ key }) {
      this.$store.commit('team/SET_TEAM_BAR_KEY', key)
    },
    closeAddModal() {
      this.isAddMemberVisible = false
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[1].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    async getAllUser() {
      const id = this.currProjectID
      const { data: res } = await getOtherMemberList(id)
      // console.log('memberlist', res)
      this.$store.commit('team/SET_OTHER_MEMBER_LIST', res)
    },
    addMember(value) {
      this.addMemnberId = value
    },
    async confirmAddMember() {
      // 然后直接更新
      const params = {
        uid: this.addMemnberId,
        pid: this.currProjectID,
        option: 'add',
      }
      const res = await updateUser(params)
      this.isAddMemberVisible = false
      // 创建项目失败
      if (res.meta.status !== 200) {
        return this.$message.error('添加成员失败')
      }
      this.$message.success('添加成员成功！')
      this.getMemberList()
      this.getAllUser(params.pid)
      return true
    },
    async getMemberList() {
      const id = this.currProjectID
      const { data: res } = await getMemberList(id)
      // console.log('memberlist', res)
      this.$store.commit('team/SET_CURR_PROJECT_MEMBER_LIST', res)
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
</style>
