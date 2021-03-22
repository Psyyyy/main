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
        :data-source="teamList"
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
            <a slot="title" @click="onOpenDrawer(item)">{{ item.title }}</a>
            <a-avatar
              class="ml-6"
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
          <div>
            <!-- 角色标签 -->
            <div
              class="ml-2 px-2 py-1 rounded-lg text-sm"
              :class="[
                item.manager === false ? 'primary' : 'warning',
                `bg-${item.manager === false ? 'primary' : 'warning'}-light`
              ]"
            >
              {{ item.manager === true ? "管理员" : "普通成员" }}
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

export default {
  name: 'TeamList',

  // components: { FlipList },

  data: () => ({
    searchInputText: '搜索成员...',
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

          }],
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

          }],
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

          }],
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

          }],
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

          }],
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

          }],
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

          }],
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
  }),

  computed: {
    filterItems() {
      return this.$store.getters['team/filterItems']
    },

    currEditItem() {
      return this.$store.state.team.currEditTeam
    },

    isDrawerOpened() {
      return this.$store.state.team.isTeamDrawerOpened
    },
  },

  methods: {
    onOpenDrawer(teamItem) {
      if (teamItem.id !== this.currEditItem.id) {
        this.$store.commit('team/SET_CURR_EDIT_TEAM', teamItem)
        this.$store.commit('team/SET_TEAM_DRAWER_STATUS', true)
      } else {
        this.$store.commit('team/SET_TEAM_DRAWER_STATUS', !this.isDrawerOpened)
      }
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
