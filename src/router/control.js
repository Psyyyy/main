import store from '@/store/store'
import NProgress from 'nprogress'
import { getToken, removeToken } from '@/utils/token'
import { setPageTitle, isArray } from '@/utils/util'
import router, { resetRouter } from './router'

import 'nprogress/nprogress.css'

// 配置 NProgress
NProgress.configure({ showSpinner: false })

const accessList = ['Login', 'Register']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  setPageTitle(to.meta?.title)

  if (getToken()) {
    console.log('拿到了token')
    if (to.name === 'Login') {
      // 如果已经有了 token 再访问登录页的话，将会被重定向到首页
      next('/')
    } else {
      next()// 无参数，默认to地址
    }
  } else if (accessList.includes(to.name)) {
    // 如果路由在白名单里面，则直接跳转
    console.log('路由在白名单')
    next()
  } else {
    // console.log('没有拿到token')
    // next('/')
    // 没有token，存下目标地址方便恢复，再重定向回登录页
    store.commit('SET_REDIRECT_PATH', to.fullPath)
    next({ name: 'Login' })
  }
})

router.afterEach(() => {
  NProgress.done()
})
