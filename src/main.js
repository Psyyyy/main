import Vue from 'vue'
import errorHandler from '@/utils/error-handler'
import vuescroll from 'vuescroll'
import axios from 'axios'
import moment from 'moment'
import * as echarts from 'echarts' // 引入组件
import wlGantt from 'wl-gantt'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import 'wl-gantt/lib/wl-gantt.css'

import './router/control'
import './plugins'
import '@/assets/scss/reset.scss'
import '@/assets/scss/common.scss'
import './directives'

Vue.use(ElementUI)
Vue.use(wlGantt)

Vue.config.errorHandler = errorHandler
Vue.config.productionTip = false

// window.addEventListener('unhandledrejection', (e) => {
//   console.warn('未处理的 promise rejection:/\n', e)
//   e.preventDefault()
// })
Vue.use(vuescroll)
Vue.use(moment)
Vue.prototype.$echarts = echarts
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

// window.onload = function () {
//   setTimeout(() => {
//     const t = performance.timing
//     console.log(`DNS查询耗时 ：${(t.domainLookupEnd - t.domainLookupStart).toFixed(0)}`)
//     console.log(`TCP链接耗时 ：${(t.connectEnd - t.connectStart).toFixed(0)}`)
//     console.log(`request请求耗时 ：${(t.responseEnd - t.responseStart).toFixed(0)}`)
//     console.log(`解析dom树耗时 ：${(t.domComplete - t.domInteractive).toFixed(0)}`)
//     console.log(`白屏时间 ：${(t.responseStart - t.navigationStart).toFixed(0)}`)
//     console.log(`domready时间 ：${(t.domContentLoadedEventEnd - t.navigationStart).toFixed(0)}`)
//     console.log(`onload时间 ：${(t.loadEventEnd - t.navigationStart).toFixed(0)}`)

//     if (t === performance.memory) {
//       console.log(`js内存使用占比 ：${((t.usedJSHeapSize / t.totalJSHeapSize) * 100).toFixed(2)}%`)
//     }
//   })
// }
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
