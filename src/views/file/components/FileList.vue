<template>
  <div class="relative">

    <perfect-scrollbar
      class="team-list"
      :options="{
        maxScrollbarLength: 160,
        wheelSpeed: 0.6
      }"
    >
      <a-list
        class="demo-loadmore-list"
        item-layout="horizontal"
        :data-source="filterItems"
      >
        <a-list-item class="member-item" slot="renderItem" slot-scope="item">
          <a class="-ml-6 mr-2 " slot="actions">
            <a-tooltip placement="bottom">
              <template slot="title">
                删除文件
              </template>
              <a-popconfirm placement="topRight" title="确定删除该文件？" @confirm="deleteFile(item)">
                <feather size="20" type="trash" />
                <!-- <a-button type="danger" icon="delete" size="small" /> -->
              </a-popconfirm>
            </a-tooltip>
          </a>

          <!-- 角色头像资料 -->
          <a-list-item-meta>
            <a
              href="javascript:void(0)"
              slot="title"
              v-on:click="downloadFile(item)"
            >
              <div class="float-left mt-1">
                <a-icon
                  :type="matchFileIcon(item.end)"
                  :style="{
                    marginLeft: '20px',
                    marginRight: '10px',
                    fontSize: '32px'
                  }"
                  theme="twoTone"
                  :two-tone-color="matchFileColor(item.end)"
                ></a-icon>
              </div>
              <div class="float-left">
                <a-tooltip placement="left">
                   <template slot="title">
                点击下载
              </template>
                   <div class="text-base">{{ item.name }}.{{ item.end }}</div>
                </a-tooltip>

                <div class="text-sm" style="color:#bdc0c9">
                  上传时间：{{ item.uploadTime }}
                </div>
              </div>
            </a>
          </a-list-item-meta>
          <div>
            <!-- 角色标签 -->
            <div
              class="ml-2 px-2 py-1 rounded-lg text-sm"
              :class="[
                item.source === 'task' ? 'primary' : 'danger',
                `bg-${item.source === 'task' ? 'primary' : 'danger'}-light`
              ]"
            >
              {{ item.source === "task" ? "需求" : "缺陷" }}
            </div>
          </div>
        </a-list-item>
      </a-list>
      <!-- <a-empty
        v-else
        class="h-full flex flex-col justify-center items-center"
      /> -->
    </perfect-scrollbar>
  </div>
</template>

<script>
// import FlipList from '@/components/animation/FlipList.vue'
import {
  getProjectFileList, deleteFile,
} from '@/api/file'
import { newDialog } from '@/api/dialog'

export default {
  name: 'FileList',

  // components: { FlipList },

  data: () => ({
    searchInputText: '搜索文件...',
    tags: {
      1: { text: '需求', color: 'primary' },
      2: { text: '缺陷', color: 'danger' },
    },
    // fileList: [],
    // file: {
    //   id: '',
    //   name: '',
    //   end: '',
    //   uploadTime: '',
    //   source: 'task',
    //   sourceId: 0,
    // },
    dialogForm: {
      pid: '', // 决定在哪个项目页显示
      source: '', // this.currListType
      sourceId: '', // task.detail.id
      user: window.sessionStorage.getItem('currUserID'),
      action: '', // 决定内容
      target: '', // 决定内容
    },
  }),

  computed: {
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    filterItems() {
      return this.$store.getters['file/filterItems']
    },
    currUserID() {
      return window.sessionStorage.getItem('currUserID')
    },
    files() {
      return this.$store.state.file.fileList
    },
    fileIcon() {
      return this.$store.state.file.fileIcon
    },

  },
  watch: {
    currProjectID: {
      immediate: true,
      handler() {
        this.getFileList()
      },

    },
  },
  created() {
    this.getFileList()
  },
  methods: {
    // 数据获取
    async getFileList() {
      const id = this.currProjectID
      const res = await getProjectFileList(id)
      const files = []
      if (res.meta.status !== 200) {
        this.$store.commit('file/SET_FILE_LIST', files)
      }
      res.data.forEach((item, index) => {
        files.push({
          id: item.id,
          name: item.file_name.split('.')[0],
          end: item.file_name.split('.')[1],
          uploadTime: item.file_latest_ch,
          source: 'task',
          sourceId: item.tid,
        })
      })
      console.log('文件列表', files)
      this.$store.commit('file/SET_FILE_LIST', files)
    },

    async downloadFile(file) {
      const fileName = `${file.name}.${file.end}`
      window.location.href = `http://127.0.0.1:8888/api/public/file/download?file_name=${fileName}`
      return false
    },
    async deleteFile(file) {
      console.log('文件', file)
      const fileName = `${file.name}.${file.end}`
      const params = {
        file_name: fileName,
      }
      await deleteFile(params).then(() => {
        this.$message.success('删除成功')
        this.getFileList()
        console.log('删除', file)
        if (file.sourceId) {
          this.newDialog(file, '删除了文件', fileName)
        }
      }).catch(() => {
        // this.$message.warning('删除失败')
      })
      return true
    },
    async newDialog(file, action, target) {
      this.dialogForm.pid = this.currProjectID
      this.dialogForm.source = file.source
      this.dialogForm.sourceId = file.sourceId
      this.dialogForm.action = action
      this.dialogForm.target = target
      const res = await newDialog(this.dialogForm)
      console.log('新增Dialog', res)
      this.dialogForm = {
        pid: this.currProjectID, // 决定在哪个项目页显示
        source: '', // this.currListType
        sourceId: '', // task.detail.id
        user: window.sessionStorage.getItem('currUserID'),
        action: '', // 决定内容
        target: '', // 决定内容
      }
      return true
    },
    // UI操作
    matchFileIcon(type) {
      for (let i = 0; i < this.fileIcon.length; i += 1) {
        if (type === this.fileIcon[i].end) {
          return this.fileIcon[i].icon
        }
      }
      return 'file-text'
    },
    matchFileColor(type) {
      for (let i = 0; i < this.fileIcon.length; i += 1) {
        if (type === this.fileIcon[i].end) {
          return this.fileIcon[i].color
        }
      }
      return '#ddd'
    },
  },
}
</script>

<style lang="scss" scoped>
.search-input::v-deep {
  @apply py-1;
  .ant-input {
    @apply h-12 pl-10 shadow-none border-none;
    &::placeholder {
      @apply text-sm;
    }
    &:focus {
      box-shadow: 0 10px 15px -5px rgba($secondary, 0.1);
    }
  }
}

.file-list {
  @apply h-full overflow-hidden;
  height: calc(100% - 58px);
  &__item {
    @apply px-6 py-5 flex items-center cursor-pointer;
    transition: $transition;
    &:hover {
      box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
      transform: translateY(-3px);
    }
  }
  &__item-active {
    background: rgba($primary, 0.05);
  }
}
</style>
