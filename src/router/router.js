import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'
import Ecommerce from '@/views/dashboard/Ecommerce.vue'

Vue.use(VueRouter)

export const constantRoutes = [// 所有权限都能访问的页面
  {
    path: '/',
    redirect: '/project',
  },

  // 登录注册
  {
    path: '/user',
    redirect: '/user/login',
    component: UserLayout,
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        components: {
          login: () => import('@/views/user/Login.vue'),
        },
        meta: { title: '登录' },
      },
      {
        path: 'register',
        name: 'Register',
        components: {
          register: () => import('@/views/user/Register.vue'),
        },
        meta: { title: '注册' },
      },
    ],
  },

  // 测试页面
  {
    path: '',
    hidden: true,
    component: UserLayout,
    children: [
      {
        path: '/test',
        name: 'Test',
        component: () => import(/* webpackChunkName: 'Test' */ '@/views/Test.vue'),
        meta: { title: '测试' },
      },
    ],
  },
  // 项目选择页面
  {
    path: '/project',
    name: 'Project',
    component: () => import('@/views/project/Project.vue'),
    meta: { title: '项目选择' },

  },

  // 404 路由缺失页面
  {
    path: '/not-found',
    component: () => import('@/views/pages/NotFound.vue'),
    meta: { title: '404 NotFound' },
  },
]

export const asyncRoutes = [
  // 仪表盘
  {
    path: '',
    meta: {
      permission: ['normal', 'admin'], title: '仪表盘', icon: 'monitor', openKey: 'dashboard',
    },
    component: MainLayout,
    children: [
      {
        path: 'ecommerce',
        name: 'Ecommerce',
        component: Ecommerce,
        meta: { permission: ['normal', 'admin'], title: '统计面板', openKey: 'dashboard' },
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('@/views/dashboard/Analytics.vue'),
        meta: { permission: ['admin'], title: '数据分析', openKey: 'dashboard' },
      },
    ],
  },

  // 看板
  {
    path: '',
    component: MainLayout,
    single: true,
    meta: { permission: ['normal', 'admin'] },
    children: [
      {
        path: '/kanban',
        name: 'Kanban',
        component: () => import('@/views/kanban/Kanban.vue'),
        meta: { permission: ['normal', 'admin'], title: '迭代管理', icon: 'trello' },
      },
    ],
  },
  // 任务列表
  {
    path: '',
    component: MainLayout,
    single: true,
    meta: { permission: ['normal', 'admin'] },
    children: [
      {
        path: '/task',
        name: 'Task',
        component: () => import('@/views/task/TaskList'),
        meta: { permission: ['normal', 'admin'], title: '需求管理', icon: 'check-circle' },
      },
    ],
  },
  // 缺陷列表
  {
    path: '',
    component: MainLayout,
    meta: { permission: ['normal', 'admin'] },
    single: true,
    children: [
      {
        path: '/bug',
        name: 'Bug',
        component: () => import('@/views/task/TaskList.vue'),
        meta: { permission: ['normal', 'admin'], title: '缺陷管理', icon: 'alert-circle' },
      },
    ],
  },
  // 文档列表
  {
    path: '',
    component: MainLayout,
    meta: { permission: ['normal', 'admin'] },
    single: true,
    children: [
      {
        path: '/file',
        name: 'File',
        component: () => import('@/views/file/File.vue'),
        meta: { permission: ['normal', 'admin'], title: '文件管理', icon: 'folder' },
      },
    ],
  },
  // 成员列表
  {
    path: '',
    component: MainLayout,
    meta: { permission: ['admin'] },
    single: true,
    children: [
      {
        path: '/team',
        name: 'Team',
        component: () => import('@/views/team/Team.vue'),
        meta: { permission: ['admin'], title: '团队管理', icon: 'users' },
      },
    ],
  },

  // 个人中心
  {
    path: '',
    hidden: true,
    meta: { permission: ['normal', 'admin'] },
    component: MainLayout,
    children: [
      {
        path: '/profile',
        name: 'Profile',
        redirect: '/profile/account',
        meta: { permission: ['normal', 'admin'] },
        component: () => import('@/layouts/ProfileLayout.vue'),
        children: [
          {
            path: 'account',
            name: 'Account',
            component: () => import('@/views/profile/Account.vue'),
            meta: { permission: ['normal', 'admin'], title: '账号设置', breadcrumb: ['个人中心', '账号设置'] },
          },
          {
            path: 'security',
            name: 'Security',
            component: () => import('@/views/profile/Security.vue'),
            meta: { permission: ['normal', 'admin'], title: '安全设置', breadcrumb: ['个人中心', '安全设置'] },
          },
        ],
      },
    ],
  },
  // 我的任务
  {
    path: '',
    hidden: true,
    component: MainLayout,
    single: true,
    meta: { permission: ['normal', 'admin'] },
    children: [
      {
        path: '/todo',
        name: 'Todo',
        component: () => import('@/views/todo/Todo.vue'),
        meta: { permission: ['normal', 'admin'] },
      },
    ],
  },
  // 我的消息
  {
    path: '',
    hidden: true,
    component: MainLayout,
    meta: { permission: ['normal', 'admin'] },
    single: true,
    children: [
      {
        path: '/notice',
        name: 'Notice',
        component: () => import('@/views/notice/Notice.vue'),
        meta: { permission: ['normal', 'admin'] },
      },
    ],
  },

  { path: '*', redirect: '/not-found', hidden: true },
]

const createRouter = () => new VueRouter({
  mode: process.env.VUE_APP_ROUTER_MODE || 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes,
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
