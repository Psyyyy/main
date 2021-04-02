<template>
  <a-drawer
    class="relative"
    width="500"
    :closable="false"
    :mask="false"
    :get-container="false"
    :wrap-style="{ position: 'absolute' }"
    :visible="isTeamDrawerOpened"
  >
    <template #title>
      <div class="flex items-center">
        <div class="flex ">成员信息</div>
        <div class="ml-auto flex items-center text-gray-600">
          <feather
            class="ml-2 cursor-pointer"
            size="21"
            type="x"
            @click="onCloseDrawer"
          />
        </div>
      </div>
    </template>
    <div style="display:flex;flex:1;align-items:flex-start; ">
      <a-avatar
        class="ml-1 mb-2 "
        :size="64"
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      />
      <div class="ml-4 mt-1 ">
        <div class="text-2xl">{{ currEditMember.name }}</div>
        <div style="color:rgb(181, 186, 192);">{{ currEditMember.email }}</div>
      </div>
      <div class="ml-24 mt-4">
        <a-select
          :default-value="currEditMember.role === 'admin' ? '管理员' : '普通成员'"
          style="width: 120px"
          @change="changeRole"
        >
          <a-select-option value="manager">
            管理员
          </a-select-option>
          <a-select-option value="normal">
            普通成员
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="详细资料">
          <div class="ml-3">
            <a-descriptions :column="4" title="详细信息">
              <a-descriptions-item span="2" label="姓名">
                {{ currEditMember.name }}
              </a-descriptions-item>
              <a-descriptions-item span="2" label="邮箱">
                {{ currEditMember.email }}
              </a-descriptions-item>
              <a-descriptions-item span="2" label="职位">
                {{ currEditMember.job }}
              </a-descriptions-item>
              <a-descriptions-item span="2" label="电话">
                {{ currEditMember.mobile}}
              </a-descriptions-item>
              <a-descriptions-item span="2" label="所属部门">
                {{ currEditMember.department }}
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Ta的任务" force-render>
          <div>
             <perfect-scrollbar
            tag="ul"
            style="height: 360px;"
            class="overflow-hidden"
            :options="{
                suppressScrollX: true,
                maxScrollbarLength: 160,
                wheelSpeed: 0.60,
              }"
          >
            <li
              class="hover-style py-3 flex items-center"
              v-for="({ t_title, t_content,index }) in currMemberTask"
              :key="index"
            >
              <div class="w-8 h-10 mr-2 flex justify-center items-center rounded-full">
                <a-checkbox disabled/>
              </div>
              <div class="flex-1 overflow-hidden">
                <div>{{ t_title }}<a-tag class="ml-3 text-sm" color="blue">
       项目一
      </a-tag></div>
                <div class="truncate">{{ t_content }}</div>
              </div>
              <div class="ml-auto text-lg text-gray-600 font-bold">

              </div>
            </li>
          </perfect-scrollbar>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Ta的项目">
          <div><a-list item-layout="horizontal" :data-source="currMemberProject">
    <a-list-item class="hover-style" slot="renderItem" slot-scope="item">
      <a-list-item-meta
        :description="item.pro_content"
      >
        <a slot="title">{{ item.pro_title }}</a>
        <a-avatar
        :size="64"
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-list-item-meta>
    </a-list-item>
  </a-list></div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="absolute right-0 bottom-0 mr-3 mb-3">
      <a-button type="primary" @click="onCloseDrawer">
        关闭
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
import _clonedeep from 'lodash.clonedeep'

export default {
  name: 'TeamDrawer',

  computed: {
    isTeamDrawerOpened() {
      return this.$store.state.team.isTeamDrawerOpened
    },
    currEditMember() {
      return this.$store.state.team.currEditMember
    },
    currMemberTask() {
      return this.$store.state.team.currMemberTask
    },
    currMemberProject() {
      return this.$store.state.team.currMemberProject
    },
  },

  data: () => ({
    currUser: {},
  }),

  // watch: {
  //   '$store.state.team.currEditMember': {
  //     handler(val) {
  //       this.currEditMember = _clonedeep(val)
  //       console.log(this.currEditMember)
  //     },
  //     immediate: true,
  //   },
  // },
  created() {
    console.log('open drawer', this.isTeamDrawerOpened)
  },
  methods: {
    onCloseDrawer() {
      this.$store.commit('team/SET_TEAM_DRAWER_STATUS', false)
    },
    changeRole(role) {
      if (role === 'manager') {
        console.log('管理员')
      } else {
        console.log('普通成员')
      }
      // 这里要更改角色，更新数据库
    },
  },
}
</script>

<style lang="scss" scoped>
.sec {
  @apply mb-6;
  &__title {
    @apply mb-1 text-gray-600;
  }
}
.hover-style{
     transition: $transition;
    &:hover {
      cursor:pointer;
      box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
      transform: translateY(-3px);
    }
}
</style>
