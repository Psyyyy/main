import Vue from 'vue'
import errorHandler from '@/utils/error-handler'
import vuescroll from 'vuescroll'
import axios from 'axios'
import moment from 'moment'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

import './router/control'
import './plugins'
import '@/assets/scss/reset.scss'
import '@/assets/scss/common.scss'
import './directives' // 自定义指令

Vue.config.errorHandler = errorHandler
Vue.config.productionTip = false

window.addEventListener('unhandledrejection', (e) => {
  console.warn('未处理的 promise rejection:/\n', e.reason)
  e.preventDefault()
})
Vue.use(vuescroll)
Vue.use(moment)
Vue.prototype.$vuescrollConfig = {
  vuescroll: {
    mode: 'native',
  },
  scrollPanel: {
    scrollingX: true,
  },
  bar: {
    delayTime: 500,
    onlyShowBarOnScroll: false,
    background: '#cecece',
    keepShow: false,
  },
}

Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
