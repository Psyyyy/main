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
    >
      <div class="ml-4">
        <a-tabs

          default-active-key="1"
        >
          <a-tab-pane key="1" tab="通过账号邀请">
            <div>
              <a-select
                show-search
                placeholder="输入成员姓名关键字"
                option-filter-prop="value"
                style="width: 95%"
                :filter-option="filterOption"

              >
                <a-select-option
                  v-for="(item, index) in teamList"
                  :key="index"
                  :value="item.title"

                >

                    <a-avatar
                      class="ml-1 mb-2 "
                      :size="20"
                      slot="avatar"
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />

                        {{ item.title }}

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
export default {
  name: 'TeamBar',

  data: () => ({
    teamList: [
      {
        id: '10',
        title: 'Amy',
        email: '251610413@qq.com',
        activity: '提交了缺陷',
        manager: true,
        job: '前端开发',
        project: [
          {
            name: '项目一',
            id: '0',
            description: '这就是项目一',
          },
          {
            name: '项目二',
            id: '1',
            description: '这就是项目二',
          },
        ],
        done: false,
        star: false,
        date: ['2020-06-09', '2020-06-10'],
      },
      {
        id: '11',
        title: 'Jack',
        email: '251610413@qq.com',
        activity: '提交了需求',
        manager: false,
        job: '后端开发',
        project: [
          {
            name: '项目一',
            id: '0',
            description: '这就是项目一',
          },
          {
            name: '项目二',
            id: '1',
            description: '这就是项目二',
          },
        ],
        done: false,
        star: false,
        date: ['2020-06-09', '2020-06-10'],
      },
      {
        id: '12',
        title: 'Lucy',
        email: '251610413@qq.com',
        activity: '验收了需求',
        manager: false,
        job: '前端开发',
        project: [
          {
            name: '项目一',
            id: '0',
            description: '这就是项目一',
          },
          {
            name: '项目二',
            id: '1',
            description: '这就是项目二',
          },
        ],
        done: false,
        star: false,
        date: ['2020-02-09', '2020-06-10'],
      },
      {
        id: '13',
        title: 'Monica',
        email: '251610413@qq.com',
        activity: '发表了评论',
        manager: false,
        job: '产品经理',
        project: [
          {
            name: '项目一',
            id: '0',
            description: '这就是项目一',
          },
          {
            name: '项目二',
            id: '1',
            description: '这就是项目二',
          },
        ],
        done: false,
        star: false,
        date: ['2020-01-23', '2020-02-23'],
      },
      {
        id: '14',
        title: 'Chandler',
        email: '251610413@qq.com',
        activity: '完车了需求1',
        done: true,
        job: '测试开发',
        project: [
          {
            name: '项目一',
            id: '0',
            description: '这就是项目一',
          },
          {
            name: '项目二',
            id: '1',
            description: '这就是项目二',
          },
        ],
        star: true,
        manager: true,
        date: ['2020-06-09', '2020-06-10'],
      },
      {
        id: '15',
        title: 'Ross',
        email: '251610413@qq.com',
        activity: '完车了需求1',
        manager: false,
        job: '项目经理',
        project: [
          {
            name: '项目一',
            id: '0',
            description: '这就是项目一',
          },
          {
            name: '项目二',
            id: '1',
            description: '这就是项目二',
          },
        ],
        done: false,
        star: false,
        date: ['2020-06-09', '2020-06-10'],
      },
      {
        id: '16',
        title: 'Rachel',
        email: '251610413@qq.com',
        activity: '完车了需求1',
        manager: false,
        job: '后端开发',
        project: [
          {
            name: '项目一',
            id: '0',
            description: '这就是项目一',
          },
          {
            name: '项目二',
            id: '1',
            description: '这就是项目二',
          },
        ],
        done: false,
        star: true,
        date: ['2020-06-09', '2020-06-10'],
      },
      {
        id: '17',
        title: 'Phebe',
        email: '251610413@qq.com',
        activity: '完车了需求1',
        job: '前端开发',
        project: [
          {
            name: '项目一',
            id: '0',
            description: '这就是项目一',
          },
          {
            name: '项目二',
            id: '1',
            description: '这就是项目二',
          },
        ],
        manager: false,
        done: false,
        star: false,
        date: ['2020-06-09', '2020-06-10'],
      },
      {
        id: '18',
        title: 'Joey',
        email: '251610413@qq.com',
        activity: '完车了需求1',
        job: '前端开发',
        project: [
          {
            name: '项目一',
            id: '0',
            description: '这就是项目一',
          },
          {
            name: '项目二',
            id: '1',
            description: '这就是项目二',
          },
        ],
        manager: false,
        done: true,
        star: false,
        date: ['2020-06-09', '2020-06-10'],
      },
    ],
    filters: [
      { id: '1', label: '所有成员', icon: 'users' },
      { id: '3', label: '已停用成员', icon: 'user-x' },
    ],
    tags: [
      { id: '4', label: '管理员', color: 'primary' },
      { id: '5', label: '普通成员', color: 'warning' },
    ],
    isAddMemberVisible: false,
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
    closeAddModal() {
      this.isAddMemberVisible = false
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[1].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
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
