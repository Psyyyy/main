<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <!-- 最顶层的出口，渲染最高级路由匹配到的组件mainLayout这些 -->
      <!-- 最高级路由：每个路由对象中，最外面那层路由 -->
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'App',

  data: () => ({
    locale: zhCN,
  }),
}
</script>
