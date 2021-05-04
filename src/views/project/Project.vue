<template>
  <main class="user-layout">
    <!-- 顶部header -->
    <div class="app-header" :class="[{ 'fixed-top': isHeaderFixed }]">
      <img class="w-10" src="@img/logo.png" alt="LOGO" />
      <span class="ml-3 text-3xl font-bold">Venus</span>
      <div class="setting">
        <div class="flex items-center">
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
    <!-- 主体部分 -->
    <div class="select-board px-2">
      <section class="col w-2/3">
        <!--我的项目 -->
        <div class="px-1 ">
          <div class="dashboard-card p-0">
            <div
              style="border-bottom: 1px solid #eee;"
              class="mb-2 px-4 py-3 flex items-center "
            >
              <h3 class="dashboard-card-title">
                我的项目（ {{ projectList.length }} ）
              </h3>
              <div class="ml-auto flex items-center">
                <a-dropdown class="mr-3">
                  <div class="flex items-center cursor-pointer">
                    <feather class="mr-1" size="18" type="list" />
                    {{ showProject }}
                    <feather
                      class="ml-1 text-gray-500"
                      size="18"
                      type="chevron-down"
                    />
                  </div>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1" @click="changeProjectList(true)">
                        列表视图
                      </a-menu-item>
                      <a-menu-item key="2" @click="changeProjectList(false)">
                        图片视图
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
                <div>
                  <a-button
                    class="w-full flex justify-center items-center"
                    size="large"
                    type="primary"
                    @click="isAddProjectVisible = true"
                  >
                    <feather size="15" type="plus" />
                    创建新项目
                  </a-button>
                </div>
              </div>
            </div>
            <!-- 项目列表 -->
            <div
              v-if="showProjectList"
              style="height:550px"
              class="overflow-auto"
            >
              <ul>
                <li
                  class="px-5 py-4 flex items-center project-list-item"
                  v-for="({
                    pro_id,
                    pro_title,
                    pro_content,
                    pro_create_time,
                    finish_task_sum,
                    all_task_sum
                  },
                  i) in projectList"
                  :key="pro_id"
                  @click="enterProject(pro_id, pro_title)"
                >
                  <a-checkbox v-model="projectList[i].pro_done" />
                  <div class="mx-4 truncate text-gray-600">
                    {{ pro_title }}
                    <span class="ml-4 text-base text-gray-400">{{
                      pro_content
                    }}</span>
                  </div>
                  <div class="flex-1 text-right">
                    <span class="ml-4 text-gray-400">项目进度：</span>
                    <a-progress
                      class="w-40  mr-10"
                      :stroke-width="4"
                      stroke-color="#6485ff"
                      :percent="percentCalc(finish_task_sum, all_task_sum)"
                    />
                    <span class="flex-1 mr-2 text-right text-gray-400">{{
                      pro_create_time | dateFormat
                    }}</span>
                  </div>

                  <a-dropdown class="ml-auto">
                    <div
                      class="flex items-center text-base text-gray-500 cursor-pointer"
                    >
                      <feather
                        class="cursor-pointer"
                        size="20"
                        type="more-vertical"
                      ></feather>
                    </div>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item
                          class="flex items-center"
                          @click="openEditModal(pro_id, pro_title, pro_content)"
                        >
                          <feather
                            class="mr-2 cursor-pointer"
                            size="16"
                            type="edit"
                          ></feather>
                          编辑
                        </a-menu-item>
                        <a-menu-item
                          class="flex items-center"
                          @click="openDeleteModal(pro_title)"
                        >
                          <feather
                            class="mr-2 cursor-pointer"
                            size="16"
                            type="trash"
                          ></feather>
                          删除
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </li>
              </ul>
            </div>
            <!-- 项目图示 -->
            <div
              v-if="!showProjectList"
              style="height:540px"
              class="overflow-auto p-2"
            >
              <a-list :grid="{ xs: 4 }" :data-source="projectList">
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-card
                    class="card-focus"
                    :body-style="{ padding: 15 }"
                    :key="item.pro_id"
                    @click="enterProject(item.pro_id, item.pro_title)"
                  >
                    <a-avatar
                      class="flex items-center justify-center mx-auto mt-0 py-2 max-w-full bg-primary"
                      shape="square"
                      :size="200"
                    ><span class="text-3xl">{{item.pro_title}}</span></a-avatar>
                    <a-divider class="m-0" />
                    <div>
                      <span class="text-xl"><div class="single-row">{{item.pro_title}}</div></span>
                      <div style="color:#C7C7C7">
                        <div class="project-content">
                          {{ item.pro_content }}
                        </div>
                        <a-progress
                          :stroke-width="4"
                          stroke-color="#6485ff"
                          :show-info="false"
                          :percent="
                            percentCalc(item.finish_task_sum, item.all_task_sum)
                          "
                        />
                        <a-avatar
                          class="items-center justify-center"
                          size="large"
                          :icon="info.avatar ? '' : 'user'"
                          :src="info.avatar"
                        />
                        <a-dropdown class="float-right mt-3">
                          <div
                            class="flex items-center text-base text-gray-500 cursor-pointer"
                          >
                            <feather
                              class="cursor-pointer"
                              size="20"
                              type="more-vertical"
                            ></feather>
                          </div>
                          <template #overlay>
                            <a-menu>
                              <a-menu-item
                                class="flex items-center"
                                @click="
                                  openEditModal(
                                    item.pro_id,
                                    item.pro_title,
                                    item.pro_content
                                  )
                                "
                              >
                                <feather
                                  class="mr-2 cursor-pointer"
                                  size="16"
                                  type="edit"
                                ></feather>
                                编辑
                              </a-menu-item>
                              <a-menu-item
                                class="flex items-center"
                                @click="openDeleteModal(item.pro_title)"
                              >
                                <feather
                                  class="mr-2 cursor-pointer"
                                  size="16"
                                  type="trash"
                                ></feather>
                                删除
                              </a-menu-item>
                            </a-menu>
                          </template>
                        </a-dropdown>
                        <span class="float-right mt-3">{{
                          item.pro_create_time | dateFormat
                        }}</span>
                      </div>
                    </div>
                  </a-card>
                </a-list-item>
              </a-list>
            </div>
          </div>
        </div>
      </section>
      <section class="col w-1/3">
        <!-- 我的任务 -->
        <div class="mb-3 px-1 ">
          <div class="dashboard-card p-0">
            <div
              style="border-bottom: 1px solid #eee;"
              class="mb-2 px-3 py-4 flex items-center"
            >
              <h3 class="dashboard-card-title">
                我的任务（ {{ todoList.length }} ）
              </h3>
              <div class="ml-auto flex items-center">
                <a-button @click.stop="viewAll()">查看所有任务</a-button>
              </div>
            </div>
            <div style="height:180px" class="overflow-auto">
              <ul>
                <li
                  class="px-5 py-4 flex items-center hover:bg-gray-100 transition cursor-pointer"
                  v-for="{
                    id,
                    t_title,
                    t_rank,
                    end_time,
                    t_content
                  } in todoList"
                  :key="id"
                >
                  <div class="mx-4 truncate text-gray-600">
                    {{ t_title }}
                    <span class="ml-4 text-gray-400">
                      {{ t_content }}
                    </span>
                  </div>
                  <div
                    class="ml-auto flex items-center text-sm rounded-lg text-gray-400"
                    :style="`padding: .1rem 1rem;`"
                  >
                    {{ end_time | dateFormat }}
                  </div>
                  <a-tag
                    class="ml-3"
                    :color="
                      t_rank === 3
                        ? '#ff5b5c'
                        : t_rank === 2
                        ? '#fdac41'
                        : '#28c175'
                    "
                  >
                    <span class="text-sm">
                      {{
                        t_rank === 3
                          ? "非常紧急"
                          : t_rank === 2
                          ? "紧急"
                          : "普通"
                      }}</span
                    >
                  </a-tag>
                  <!-- <a-dropdown>
                    <div
                      class="flex items-center text-base text-gray-500 cursor-pointer"
                    >
                      <feather
                        class="cursor-pointer"
                        size="20"
                        type="more-vertical"
                      ></feather>
                    </div>
                  </a-dropdown> -->
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 项目动态-vue滚动加载 -->
        <div class=" px-1">
          <div class="dashboard-card p-0 ">
            <!-- 动态标题 -->
            <div
              style="border-bottom: 1px solid #eee;"
              class="mb-2 px-4 py-4 flex items-center"
            >
              <h3 class="dashboard-card-title">项目动态</h3>
            </div>

            <div
              style="height:250px"
              class="px-4 overflow-auto"
            >
              <a-list
                class="comment-list"
                item-layout="horizontal"
                :data-source="dialogList"
              >
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-comment :author="item.name">
                    <a-avatar
                      slot="avatar"
                      @click="enterProject(item.d_pid, item.pro_title)"
                      class="flex-wrap text-xs primary bg-primary-light"
                      :size="40"
                    >
                      <a-tooltip placement="top">
                        <template slot="title">
                          <span>点击进入项目页</span>
                        </template>
                        {{ item.pro_title }}
                      </a-tooltip>
                    </a-avatar>
                    <template slot="actions">
                      <span
                        >来自{{ item.t_type === 1 ? "需求" : "缺陷" }}【{{
                          item.t_title
                        }}】</span
                      >
                    </template>
                    <p slot="content">
                      <span>
                        {{ item.d_action
                        }}<span class="warning" v-if="item.d_target !== ''"
                          >「{{ item.d_target }}」</span
                        ></span
                      >
                    </p>
                    <span slot="datetime">{{
                      item.d_create_time | dateFormat
                    }}</span>
                  </a-comment>
                </a-list-item>
              </a-list>
            </div>
          </div>
        </div>
      </section>
      <!-- 添加项目 -->
      <a-modal
        :visible.sync="isAddProjectVisible"
        title="创建项目"
        @ok="editProject('add')"
        @cancel="closeProjectModal"
      >
        <div>
          <a-form-model
            ref="addFormRef"
            :rules="projectRules"
            class="pl-2"
            layout="horizontal"
            :model="newProject"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="项目名称" prop="title" type="name">
              <a-input v-model="newProject.title" />
            </a-form-model-item>
            <a-form-model-item label="项目简介" prop="content">
              <a-input v-model="newProject.content" type="textarea" />
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-modal>
      <!-- 编辑项目 -->
      <a-modal
        :visible.sync="isEditVisible"
        title="编辑项目信息"
        @ok="editProject('update')"
        @cancel="isEditVisible = false"
      >
        <div>
          <a-form-model
            ref="addFormRef"
            :rules="projectRules"
            class="pl-2"
            layout="horizontal"
            :model="currEditProject"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="项目名称" prop="title" type="name">
              <a-input v-model="currEditProject.title" />
            </a-form-model-item>
            <a-form-model-item label="项目简介" prop="content">
              <a-input v-model="currEditProject.content" type="textarea" />
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-modal>
    </div>
  </main>
</template>

<script>
import _debounce from 'lodash.debounce'
import { getDay, isValidUrl } from '@/utils/util'
// import reqwest from 'reqwest'
import {
  getProjectList,
  newProject,
  updateProject,
  deleteProject,
} from '@/api/project'
import { getMemberList } from '@/api/member'
import { getUserTaskList } from '@/api/task'
import { getNoticeList } from '@/api/notice'
import { getStageList } from '@/api/stage'
import { getDialog } from '@/api/dialog'
import screenfull from 'screenfull'
import infiniteScroll from 'vue-infinite-scroll'
import HeaderNotice from '../../layouts/components/app-header/HeaderNotice.vue'

export default {
  name: 'Project',
  components: { HeaderNotice },
  directives: { infiniteScroll },
  data: () => ({
    labelCol: { span: 5 },
    wrapperCol: { span: 14 },
    projectList: [],
    dialogList: [],
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
    todos: [
      {
        id: '1',
        title: '白日依山尽，黄河入海流。',
        tag: '前端',
        tagColor: 'success',
        percent: 60,
        avatar: 'A',
        done: false,
      },
      {
        id: '2',
        title: '故人西辞黄鹤楼，烟花三月下扬州。',
        tag: '后端',
        tagColor: 'danger',
        percent: 60,
        avatar: 'B',
        done: false,
      },
      {
        id: '3',
        title: '两岸猿声啼不住，轻舟已过万重山。',
        tag: 'UI/UX',
        tagColor: 'primary',
        percent: 80,
        avatar: 'C',
        done: true,
      },
      {
        id: '4',
        title: '红颜未老恩先断，斜倚薰笼坐到明。',
        tag: '界面设计',
        tagColor: 'info',
        percent: 60,
        avatar: 'D',
        done: false,
      },
      {
        id: '5',
        title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
        tag: 'JAVASCRIPT',
        tagColor: 'warning',
        percent: 20,
        avatar: 'E',
        done: false,
      },
      {
        id: '6',
        title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
        tag: 'JAVASCRIPT',
        tagColor: 'warning',
        percent: 30,
        avatar: 'E',
        done: false,
      },
      {
        id: '7',
        title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
        tag: 'JAVASCRIPT',
        tagColor: 'warning',
        percent: 20,
        avatar: 'E',
        done: false,
      },
    ],
    more_todos: [
      {
        id: '1',
        title: '白日依山尽，黄河入海流。',
        tag: '前端',
        tagColor: 'success',
        percent: 60,
        avatar: 'A',
        done: false,
      },
      {
        id: '2',
        title: '故人西辞黄鹤楼，烟花三月下扬州。',
        tag: '后端',
        tagColor: 'danger',
        percent: 60,
        avatar: 'B',
        done: false,
      },
      {
        id: '3',
        title: '两岸猿声啼不住，轻舟已过万重山。',
        tag: 'UI/UX',
        tagColor: 'primary',
        percent: 80,
        avatar: 'C',
        done: true,
      },
      {
        id: '4',
        title: '红颜未老恩先断，斜倚薰笼坐到明。',
        tag: '界面设计',
        tagColor: 'info',
        percent: 60,
        avatar: 'D',
        done: false,
      },
      {
        id: '5',
        title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
        tag: 'JAVASCRIPT',
        tagColor: 'warning',
        percent: 20,
        avatar: 'E',
        done: false,
      },
      {
        id: '6',
        title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
        tag: 'JAVASCRIPT',
        tagColor: 'warning',
        percent: 30,
        avatar: 'E',
        done: false,
      },
      {
        id: '7',
        title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
        tag: 'JAVASCRIPT',
        tagColor: 'warning',
        percent: 20,
        avatar: 'E',
        done: false,
      },
      {
        id: '8',
        title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
        tag: 'JAVASCRIPT',
        tagColor: 'warning',
        percent: 30,
        avatar: 'E',
        done: false,
      },
      {
        id: '9',
        title: '嫦娥应悔偷灵药，碧海青天夜夜心。',
        tag: 'JAVASCRIPT',
        tagColor: 'warning',
        percent: 20,
        avatar: 'E',
        done: false,
      },
    ],
    team: [
      {
        name: 'amy',
        percent: 40,
        state: 'primary',
      },
      {
        name: 'tom',
        percent: 20,
        state: 'danger',
      },
      {
        name: 'lucy',
        percent: 80,
        state: 'success',
      },
      {
        name: 'jack',
        percent: 10,
        state: 'danger',
      },
      {
        name: 'nancy',
        percent: 30,
        state: 'primary',
      },
      {
        name: 'bob',
        percent: 20,
        state: 'success',
      },
      {
        name: 'lily',
        percent: 14,
        state: 'danger',
      },
    ],
    newProject: {
      title: '',
      content: '',
      createTime: '',
      founder: '',
    },
    projectRules: {
      title: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
      content: [{ required: true, message: '请输入项目内容', trigger: 'blur' }],
    },
    news: [],
    isFullScreen: false,
    showProjectList: false,
    showProject: '图片视图',
    loading: false,
    busy: false,
    isAddProjectVisible: false,
    isEditVisible: false,
    currEditProject: {
      id: '',
      title: '',
      content: '',
    },
  }),
  //   beforeMount() {
  //     this.fetchData((res) => {
  //       this.todos = res.results
  //     })
  //   },
  computed: {
    info() {
      return this.$store.state.user.info
    },
    isHeaderFixed() {
      return this.$store.state.isHeaderFixed
    },
    todoList() {
      return this.$store.state.todo.todoList
    },
    fileList() {
      return this.$store.state.file.fileList
    },
    fileIcon() {
      return this.$store.state.file.fileIcon
    },
  },
  created() {
    this.getProject()
    this.getTask()
    this.getNoticeList()
    this.getDialog()
  },
  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        this.isFullScreen = screenfull.isFullscreen
      })
    }
    // 观察滚动距离，调整顶部导航栏背景色
    window.onscroll = _debounce(() => {
      const scrollTop = window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop
        || 0
      if (scrollTop > 10) {
        this.$store.commit('SET_HEADER_STATUS', true)
      } else {
        this.$store.commit('SET_HEADER_STATUS', false)
      }
    }, 250)
  },
  watch: {
    '$route.name': {
      handler(name) {
        this.activeKey = name
      },
      immediate: true,
    },
  },

  methods: {
    percentCalc(done, all) {
      const tmp = done / all
      return tmp * 100
    },
    viewAll() {
      this.$router.push({ name: 'Todo' })
    },
    viewFiles() {
      this.$router.push({ name: 'File' })
    },
    async getProject() {
      const uid = window.sessionStorage.getItem('currUserID')
      const { data: res } = await getProjectList(uid)
      console.log('项目列表', res)
      this.projectList = res
      return true
    },
    async logOut() {
      const CAN_LOGOUT = await this.$store.dispatch('user/logout')

      if (CAN_LOGOUT) {
        this.$message.success('成功退出')
        this.$router.replace({ name: 'Login' })
      }
    },

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
    editProject(options) {
      if (options === 'add') { // 创建项目
        this.$refs.addFormRef.validate(async (valid, field) => {
          // 有未校验通过的字段
          if (!valid) {
            return this.$message.error('存在错误字段，无法创建')
          }
          this.newProject.founder = this.info.id
          this.newProject.createTime = Date.parse(new Date()) / 1000
          const res = await newProject(this.newProject)
          // 创建项目失败
          if (res.meta.status !== 200) {
            return this.$message.error('创建项目失败')
          }
          this.$message.success('创建项目成功！')
          // 隐藏 dialog对话框
          this.$refs.addFormRef.resetFields()
          this.isAddProjectVisible = false
          // 重新获取列表数据
          this.getProject()
          return true
        })
      } else {
        this.$refs.addFormRef.validate(async (valid, field) => {
          // 有未校验通过的字段
          if (!valid) {
            return this.$message.error('存在错误字段，无法提交编辑')
          }
          const res = await updateProject(this.currEditProject)
          // 更新项目失败
          if (res.meta.status !== 200) {
            return this.$message.error('编辑项目失败')
          }
          this.$message.success('编辑项目成功！')
          // 隐藏 dialog对话框
          this.$refs.addFormRef.resetFields()
          this.isEditVisible = false
          // 重新获取列表数据
          this.getProject()
          return true
        })
      }
    },
    closeProjectModal() {
      this.$refs.addFormRef.resetFields()
      this.isAddProjectVisible = false
    },
    changeProjectList(changeToList) {
      if (!changeToList) {
        this.showProject = '图片视图'
        this.showProjectList = changeToList
      } else {
        this.showProject = '列表视图'
        this.showProjectList = changeToList
      }
    },
    openEditModal(id, title, content) {
      this.isEditVisible = true
      this.currEditProject.id = id
      this.currEditProject.title = title
      this.currEditProject.content = content
    },
    openDeleteModal(title) {
      const that = this
      this.$antdConfirm({
        title: (
          <p>
            此操作将删除<span class="warning">「{title}」</span>项目
          </p>
        ),
        content: '您确定要删除该项目吗？',
        async onOk() {
          const res = await deleteProject({ title })
          // 更新项目失败
          if (res.meta.status !== 200) {
            return that.$message.error('删除项目失败')
          }
          that.$message.success('删除项目成功！')
          // 重新获取列表数据
          that.getProject()
          return true
        },
      })
    },
    handleInfiniteOnLoad() {
      // 项目动态用的
      const { todos } = this
      this.loading = true
      if (todos.length > 6 && todos.length < 8) {
        this.$message.warning('正在加载')
        this.busy = true
        this.loading = false
      }
      this.todos = this.more_todos
      this.loading = false
      //   this.fetchData((res) => {
      //     this.data = todos.concat(res.results)
      //     this.loading = false
      //   })
    },
    async enterProject(id, name) {
      const { data: res } = await getMemberList(id)
      this.$store.commit('project/SET_CURR_PROJECT_NAME', name)
      this.$store.commit('project/SET_CURR_PROJECT_ID', id)
      this.$store.commit('team/SET_CURR_PROJECT_MEMBER_LIST', res)
      window.localStorage.setItem('currProject', name)
      window.localStorage.setItem('currProjectID', id)
      this.getStageList(id)

      this.$router.push('Analytics')
    },
    async getStageList(pid) {
      const { data: res } = await getStageList(pid)
      console.log('stagelist', res.stagelist)
      this.$store.commit('stage/SET_STAGE_LIST', res.stagelist)

      return true
    },

    enterFolder() {
      console.log('进入文库')
    },
    async getTask() {
      const uid = window.sessionStorage.getItem('currUserID')
      const { data: res } = await getUserTaskList(uid)
      console.log('todo', res)
      this.$store.commit('todo/SET_TODO_LIST', res)
      console.log('todo Task', res)
      return true
    },
    async getNoticeList() {
      const uid = window.sessionStorage.getItem('currUserID')
      const { data: res } = await getNoticeList(uid)
      this.$store.commit('notice/SET_NOTICE_LIST', res)
      console.log('notice', res)
      let haveNew = false
      this.news = []
      for (let i = 0; i < res.length; i += 1) {
        if (res[i].read === 0 && res[i].uid !== 1) {
          haveNew = true
          this.news.push(res[i])
        }
      }
      console.log('noticelist', this.news)
      this.$store.commit('notice/SET_NEW_NOTICE', this.news)
      this.$store.commit('notice/SET_NOTICE_STATUS', haveNew)
      return true
    },
    async getDialog() {
      const obj = {
        uid: window.sessionStorage.getItem('currUserID'),
      }
      const { data: res } = await getDialog(obj)
      this.dialogList = res
      console.log('项目dialog信息', res)
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.user-layout {
  @apply min-h-screen flex flex-col items-center justify-center;
  //background: center no-repeat url(~@/assets/images/user_layout_bg.svg);

  &-section {
    @apply mt-4 mb-6;
  }
  &-content {
    @apply py-4 px-8 rounded-lg bg-white;
    @media screen and (max-width: 450px) {
      width: 85%;
    }
    width: 450px;

    .tabs::v-deep {
      .ant-tabs-bar {
        text-align: center;
        border: none;
        .ant-tabs-tab {
          @apply text-lg;
        }
      }
      .ant-tabs-content {
        @apply py-5;
      }
    }
  }
}
.app-header {
  @apply fixed top-0 right-0 flex items-center;
  z-index: 999;
  height: $header-height;
  width: 100%;
  padding: 0 $section-gap;
  transition: $transition;
  &.fixed-top {
    background: #fff;
    box-shadow: $header-shadow;
  }
}

.setting {
  @apply h-full ml-auto flex items-center cursor-pointer flex-wrap;
}
.select-board {
  @apply items-center select-none min-w-full;

  margin-top: $header-height;
  height: calc(100% - #{$header-height});
}
.col {
  @apply mb-6 flex-wrap h-full;
  //flex-wrap: nowrap;
  vertical-align: top;
  display: inline-block;
  .dashboard-card {
    @apply h-full px-6 py-4 bg-white rounded-lg;
    &-icon {
      @apply flex-1 py-3 flex flex-col items-center justify-center;
      .icon {
        @apply w-12 h-12 mb-2 flex justify-center items-center rounded-full;
        border-radius: 50%;
      }
    }

    &-title {
      @apply flex items-center justify-between text-xl text-gray-600 font-semibold whitespace-no-wrap;
    }
  }
}
.project-content {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card-focus {
  @apply cursor-pointer;
  &:hover {
    box-shadow: 0 15px 30px -5px rgba($secondary, 0.3);
    transform: translateY(-5px);
  }
}
.a {
  display: flex;
}
.team {
  @apply flex overflow-y-hidden;
  padding-top: 25px;
  height: 142px;
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  overflow-x: auto;
}
.team-progress {
  @apply mx-3 flex flex-no-wrap overflow-y-hidden;

  display: inline-block;
  height: 100px;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 90px;
  height: 90px;
  background: rgba(101, 101, 101, 0.6);
  color: #ffffff;
  opacity: 0;
  h3 {
    margin-top: 35px;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    text-align: center;
  }
  &:hover {
    @apply cursor-pointer;
    opacity: 1;
    transform: translateY(-20px);
  }
}
.project-list-item {
  transition: $transition;
  &:hover {
    cursor: pointer;
    background: rgba(247, 250, 252, 1);
    box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
    transform: translateY(-3px);
  }
}
</style>
