<template>
  <div class="relative">
    <div>
      <a-input
        class="search-input"
        size="large"
        :placeholder="searchInputText"
        @focus="searchInputText = '请输入文件关键字...'"
        @blur="searchInputText = '搜索文件...'"
      >
        <template #prefix>
          <feather size="20" type="search" />
        </template>
      </a-input>
    </div>

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
        :data-source="fileList"
      >
        <a-list-item class="member-item" slot="renderItem" slot-scope="item">
          <a class="ml-1 mr-2" slot="actions">
            <a-tooltip placement="top">
              <template slot="title">
                重命名文件
              </template>
              <feather size="20" type="edit" />
            </a-tooltip>
          </a>
          <a class="ml-1 mr-2" slot="actions">
            <a-tooltip placement="top">
              <template slot="title">
                删除文件
              </template>
              <a-popconfirm placement="topRight" title="确定删除该文件？">
                <feather size="20" type="trash" />
                <!-- <a-button type="danger" icon="delete" size="small" /> -->
              </a-popconfirm>
            </a-tooltip>
          </a>

          <!-- 角色头像资料 -->
          <a-list-item-meta>
            <a href="javascript:void(0)" slot="title" v-on:click="downloadFile(item)">
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
                <div class="text-base">{{ item.name }}.{{item.end}}</div>
                <div class="text-sm" style="color:#bdc0c9">上传时间：{{ item.uploadTime }}</div>
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
  getProjectFileList, getTaskFileList, downloadFile, uploadFile, deleteFile, deleteAllFile,
} from '@/api/file'

export default {
  name: 'FileList',

  // components: { FlipList },

  data: () => ({
    searchInputText: '搜索文件...',
    tags: {
      1: { text: '需求', color: 'primary' },
      2: { text: '缺陷', color: 'danger' },
    },
    fileList: [],
    fileIcon: [
      {
        end: 'ppt',
        icon: 'file-ppt',
        color: '#ff5b5c',
      },
      {
        end: 'pptx',
        icon: 'file-ppt',
        color: '#ff5b5c',
      },

      {
        end: 'pdf',
        icon: 'file-pdf',
        color: '#ff5b5c',
      },
      {
        end: 'doc',
        icon: 'file-word',
        color: '#6485ff',
      },
      {
        end: 'docx',
        icon: 'file-word',
        color: '#6485ff',
      },
      {
        end: 'xls',
        icon: 'file-excel',
        color: '#2bbf3d',
      },
      {
        end: 'csv',
        icon: 'file-excel',
        color: '#2bbf3d',
      },
      {
        end: 'txt',
        icon: 'file-text',
        color: '#adafb2',
      },
      {
        end: 'rar',
        icon: 'file-zip',
        color: '#b27c8a',
      },
      {
        end: 'zip',
        icon: 'file-zip',
        color: '#b27c8a',
      },
      {
        end: 'md',
        icon: 'file-markdown',
        color: '#ad99e5',
      },
      {
        end: 'jpeg',
        icon: 'file-image',
        color: '#eb2f96',
      },
      {
        end: 'png',
        icon: 'file-image',
        color: '#eb2f96',
      },
      {
        end: 'jpg',
        icon: 'file-image',
        color: '#eb2f96',
      },
    ],
    file: {
      id: '',
      name: '',
      end: '',
      uploadTime: '',
      source: 'task',
    },
  }),

  computed: {
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    filterItems() {
      return this.$store.getters['team/filterItems']
    },
    currUserID() {
      return window.sessionStorage.getItem('currUserID')
    },

  },
  created() {
    this.getFileList()
  },
  methods: {
    // 数据获取
    async getFileList() {
      const id = this.currProjectID
      const { data: res } = await getProjectFileList(id)
      res.forEach((item, index) => {
        this.fileList.push(
          {
            id: index,
            name: item.file_name.split('.')[0],
            end: item.file_name.split('.')[1],
            uploadTime: item.file_latest_ch,
            source: 'task',
          },
        )
      })
      console.log('文件列表', this.fileList)

      this.$store.commit('file/SET_FILE_LIST', res)
    },
    async downloadFile(file) {
      const uid = this.currUserID
      const fileName = `${file.name}.${file.end}`
      window.location.href = `http://127.0.0.1:8888/api/public/file/download?file_name=${fileName}`
      // const res = await downloadFile(uid, fileName)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('获取资源失败')
      // }
      // this.$message.success('开始下载..')
      return false
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
      return '#000'
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
