<template>
  <div>
    <div class="section-card mb-8 ">
      <h3 class="section-card__title flex items-center text-xl">
        全部通知
        <a-button class="ml-4 mt-1" size="small" @click="haveReadAll">
          全部标为已读 <a-icon type="check"></a-icon>
        </a-button>
      </h3>
      <div class="mt-2">
        <ul class="notice-list ">
          <div class="px-6" v-for="notice in noticeList" :key="notice.id">
             <a-comment v-if="notice.uid!==1" class="notice-item" @click="showDetail(notice.sourceId,notice.id)">
    <a slot="author" class="text-base"> {{notice.user}}</a>
    <a-avatar
      slot="avatar"
      class="bg-primary"
    >{{notice.user}}</a-avatar>
    <p slot="content">

     <span class="warning">{{notice.title}}</span>：{{notice.action}} <span class="warning" v-if="notice.target!==''">「{{notice.target}}」</span>
    </p>
    <a-tooltip slot="datetime" >
      <span>{{notice.create|dateFormat}}</span><span v-if="notice.read===0" class="ml-3" style="color:#f72727;font-weight:bold;font-style: italic">new !</span>
    </a-tooltip>
  </a-comment>
          </div>
        </ul>
      </div>
    </div>
     <task :pop-visible="showTask" detail="detailTaskId" @close="showTask = false" />
      <add-modal />
  </div>
</template>

<script>
import { getTaskDetail } from '@/api/task'
import { getComment } from '@/api/comment'
import { getDialog } from '@/api/dialog'
import { getNoticeList, updateAllNotice, updateOneNotice } from '@/api/notice'
import AddModal from '@/components/AddModal.vue'
import Task from '@/views/task/Task.vue'

export default {
  name: 'Notice',
  components: { Task, AddModal },
  data: () => ({
    showTask: false,
  }),
  computed: {
    noticeList() {
      return this.$store.state.notice.noticeList
    },
    currUserID() {
      return window.sessionStorage.getItem('currUserID')
    },
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    isAddModalOpened() {
      return this.$store.state.add.isAddModalOpened
    },
    currListType() {
      return this.$store.state.task.currListType
    },
    currStageId() {
      return this.$store.state.stage.currStageId
    },
  },
  created() {
    this.getNoticeList()
  },
  methods: {
    // 任务详情
    closeDetail() {
      this.showTask = false
    },
    onOpenAdd() {
      console.log('add')
      this.$store.commit('add/SET_ADD_FROM_DETAIL', false)
      this.$store.commit('add/SET_ADD_MODAL_TYPE', 'task')
      this.$store.commit('add/SET_ADD_MODAL_STATUS', true)
    },
    resetTable() {
      this.getTask()
    },
    async getTaskDetail(id) {
      const pid = this.currProjectID

      const { data: res } = await getTaskDetail(pid, id)
      this.$store.commit('task/SET_TASK_DETAIL', res)
      if (res.detail.t_level !== 0) {
        console.log('当前任务的father', res.parent[0])
        this.$store.commit('task/SET_CURR_FATHER_TASK', res.parent[0])
      }
      return true
    },
    async getDialog(id) {
      const obj = {
        pid: this.currProjectID,
        source: 'task',
        sid: id,
      }
      const { data: res } = await getDialog(obj)
      this.$store.commit('task/SET_TASK_DIALOG', res)
      return true
    },
    async getComment(id) {
      const params = {
        source: 'task',
        sid: id,
      }
      const { data: res } = await getComment(params)
      // this.dialogList = res
      this.$store.commit('task/SET_TASK_COMMENT', res)
      return true
    },
    async showDetail(tid, nid) {
      await this.haveReadOne(nid)
      this.$store.commit('task/SET_CURR_EDIT_TASK', tid)
      await this.getTaskDetail(tid)
      await this.getDialog(tid)
      await this.getComment(tid)
      this.showTask = true
    // this.detailTaskId = id
    },
    async getNoticeList() {
      const uid = window.sessionStorage.getItem('currUserID')
      const { data: res } = await getNoticeList(uid)
      this.$store.commit('notice/SET_NOTICE_LIST', res)
      console.log('notice', res)
      let haveNew = false
      for (let i = 0; i < res.length; i += 1) {
        if (res[i].is_read === 0) haveNew = true
      }
      this.$store.commit('notice/SET_NOTICE_STATUS', haveNew)
      return true
    },
    async haveReadAll() {
      const res = await updateAllNotice(this.currUserID)
      if (res.meta.status !== 200) {
        return this.$message.error('全部已读失败')
      }
      await this.getNoticeList()
      this.$message.success('已全部标为已读')
      return true
    },
    async haveReadOne(nid) {
      console.log('啊啊啊啊啊啊啊啊啊啊啊啊啊')
      await updateOneNotice(nid)
      await this.getNoticeList()
      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.notice-item {
  transition: $transition;
  &:hover {
    cursor: pointer;
    box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
    transform: translateY(-3px);
  }
}

</style>
