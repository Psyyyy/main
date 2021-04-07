<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottom"
  >
    <template #content>
      <div class="w-64">
        <div class="flex justify-between items-center">
          <div class="text-gray-900">{{news.length}}条新通知</div>
          <div
            class="text-gray-500 hover:primary transition cursor-pointer"
            @click="haveRead"
          >全部已读</div>
        </div>

        <div class="divider"></div>

        <a-spin :spinning="spinning" class="notice-board">
           <div v-for="notice in news" :key="notice.id">
             <a-comment v-if="notice.uid!==1">
    <a slot="author" class="text-base"> {{notice.user}}</a>
    <a-avatar
      slot="avatar"
      class="bg-primary"
    >{{notice.user}}</a-avatar>
   <p slot="content" class="notice-item">

     <span class="warning">{{notice.title}}</span>：{{notice.action}} <span class="warning" v-if="notice.target!==''">「{{notice.target}}」</span>
    </p>
    <a-tooltip slot="datetime" >
      <span>{{notice.create|dateFormat}}</span>
    </a-tooltip>
  </a-comment>
          </div>
        </a-spin>

        <div class="divider"></div>

        <div @click="checkNotice" class="primary text-center cursor-pointer opacity-75 hover:opacity-100 transition">查看全部通知</div>
      </div>
    </template>
    <a-badge
:count="news.length"
dot
      class="mt-1"
    >
      <feather type="bell" />
    </a-badge>
  </a-popover>
</template>

<script>
import { getNoticeList, updateAllNotice } from '@/api/notice'

export default {
  name: 'HeaderNotice',

  data: () => ({
    visible: false,
    spinning: false,
    news: [],
  }),
  created() {
    this.getNoticeList()
  },
  computed: {
    noticeList() {
      return this.$store.state.notice.noticeList
    },
    currUserID() {
      return window.sessionStorage.getItem('currUserID')
    },
    newNotice() {
      return this.$store.state.notice.NewNotice
    },
    haveNewNotice() {
      return this.$store.state.notice.haveNewNotice
    },
  },
  watch: {
    // 会陷入死循环...
    // noticeList() {
    //   this.getNoticeList()
    // },
  },
  methods: {
    setAllNoticeRead() {
      this.spinning = true
      setTimeout(() => {
        this.spinning = false
      }, 1000)
    },
    checkNotice() {
      this.visible = false
      this.$router.push({ path: '/notice' })
      console.log(this.$router)
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
    async haveRead() {
      const res = await updateAllNotice(this.currUserID)
      if (res.meta.status !== 200) {
        return this.$message.error('全部已读失败')
      }
      await this.getNoticeList()
      this.$message.success('已全部标为已读')
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
@each $color in primary, success, warning, danger, info {
  .hover-#{$color}:hover {
    background: rgba(var(--#{$color}), 0.06);
    .title {
      color: rgba(var(--#{$color}), 1);
    }
  }
}

.notice-list {
  max-height: 290px;
  overflow-y: auto;
}

.divider {
  @apply my-2 bg-gray-300;
  width: 100%;
  height: 1px;
}
.notice-item{
  overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.notice-board{
  height:200px;
  overflow-y:scroll;
}
</style>
