<template>
  <div>
    <div class="section-card mb-8 ">
      <h3 class="section-card__title flex items-center text-xl">
       全部通知
       <a-button class="ml-4 mt-1" size="small">
           全部标为已读 <a-icon type="check"></a-icon>
       </a-button>
      </h3>
<div class="mt-2"> <ul class="notice-list ">
            <li
              class="notice-item p-2 flex items-center text-sm rounded"
              v-for="({ id, title, time, type }) in noticeList"
              :key="id"
              :class="`hover-${noticeTypes[type].color}`"
            >
              <div
                class="mr-4 flex items-center justify-center rounded-full"
                style="padding: 0.35rem;"
                :class="`bg-${noticeTypes[type].color}-light`"
              >
                <feather
                  size="18"
                  :class="noticeTypes[type].color"
                  :type="noticeTypes[type].icon"
                />
              </div>
              <div>
                <div class="title transition">{{ title }}</div>
                <div class="text-gray-500">{{ time }}</div>
              </div>
            </li>
          </ul></div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Notice',
  data: () => ({
    noticeList: [
      {
        id: '1', title: '订单已创建', time: '2 分钟前', type: 'primary',
      },
      {
        id: '2', title: '系统升级程序已准备就绪', time: '30 分钟前', type: 'success',
      },
      {
        id: '3', title: '今日剩余 3 项待办事项', time: '1 小时前', type: 'warning',
      },
      {
        id: '4', title: '系统存在 2 个安全隐患', time: '5 小时前', type: 'danger',
      },
      {
        id: '5', title: '6 个文件已完成下载', time: '2020-08-01', type: 'info',
      },
    ],
    noticeTypes: {
      undefined: {
        icon: 'bell',
        color: 'primary',
      },
      primary: {
        icon: 'bell',
        color: 'primary',
      },
      success: {
        icon: 'check-circle',
        color: 'success',
      },
      warning: {
        icon: 'layers',
        color: 'warning',
      },
      danger: {
        icon: 'alert-circle',
        color: 'danger',
      },
      info: {
        icon: 'download',
        color: 'info',
      },
    },
  }),

}
</script>

<style lang="scss" scoped>
.notice-item{
        transition: $transition;
    &:hover {
        cursor:pointer;
      box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
      transform: translateY(-3px);
    }
}
</style>
