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
        <div class="text-2xl">{{ currTeam.title }}</div>
        <div style="color:rgb(181, 186, 192);">{{ currTeam.email }}</div>
      </div>
      <div class="ml-24 mt-4">
        <a-select
          :default-value="currTeam.manager === true ? '管理员' : '普通成员'"
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
            <a-descriptions title="详细信息">
              <a-descriptions-item span="2" label="姓名">
                {{ currTeam.title }}
              </a-descriptions-item>
              <a-descriptions-item span="2" label="电话">
                {{ currTeam.email }}
              </a-descriptions-item>
              <a-descriptions-item span="2" label="职位">
                {{ currTeam.job }}
              </a-descriptions-item>
              <a-descriptions-item span="2" label="加入时间">
                2021.3.1
              </a-descriptions-item>
              <a-descriptions-item span="2" label="所属部门">
                事业部
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
              v-for="({ title, sub,index }) in [
                  { title: '琵琶行', sub: '浔阳江头夜送客，枫叶荻花秋瑟瑟' },
                  { title: '是唐朝诗人白居易', sub: '主人下马客在船，举酒欲饮无管弦。醉不成欢惨将别，别时茫茫江浸月。' },
                  { title: '的长篇乐府诗之一', sub: '忽闻水上琵琶声，主人忘归客不发' },
                  { title: '作于元和十一年', sub: '寻声暗问弹者谁？琵琶声停欲语迟。' },
                  { title: '千呼万唤始出来', sub: '犹抱琵琶半遮面' },
                   { title: '作于元和十一年', sub: '寻声暗问弹者谁？琵琶声停欲语迟。' },
                  { title: '千呼万唤始出来', sub: '犹抱琵琶半遮面' },
                ]"
              :key="index"
            >
              <div class="w-8 h-10 mr-2 flex justify-center items-center rounded-full">
                <a-checkbox disabled/>
              </div>
              <div class="flex-1 overflow-hidden">
                <div>{{ title }}<a-tag class="ml-3 text-sm" color="blue">
       项目一
      </a-tag></div>
                <div class="truncate">{{ sub }}</div>
              </div>
              <div class="ml-auto text-lg text-gray-600 font-bold">

              </div>
            </li>
          </perfect-scrollbar>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Ta的项目">
          <div><a-list item-layout="horizontal" :data-source="currTeam.project">
    <a-list-item class="hover-style" slot="renderItem" slot-scope="item">
      <a-list-item-meta
        :description="item.description"
      >
        <a slot="title">{{ item.name }}</a>
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
  },

  data: () => ({
    currTeam: {},
  }),

  watch: {
    '$store.state.team.currEditTeam': {
      handler(val) {
        this.currTeam = _clonedeep(val)
        console.log(this.currTeam)
      },
      immediate: true,
    },
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
