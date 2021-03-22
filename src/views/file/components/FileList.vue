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
                编辑权限
              </template>
              <feather size="20" type="edit" />
            </a-tooltip>
          </a>
          <a class="ml-1 mr-2" slot="actions">
            <a-tooltip placement="top">
              <template slot="title">
                停用账号
              </template>
              <a-popconfirm placement="topRight" title="确定停用该成员帐号？">
                <feather size="20" type="slash" />
                <!-- <a-button type="danger" icon="delete" size="small" /> -->
              </a-popconfirm>
            </a-tooltip>
          </a>

          <!-- 角色头像资料 -->
          <a-list-item-meta>
            <a slot="title" @click="donwloadFile(item)">
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

export default {
  name: 'FileList',

  // components: { FlipList },

  data: () => ({
    searchInputText: '搜索文件...',
    tags: {
      1: { text: '项目', color: 'primary' },
      2: { text: '需求', color: 'success' },
      3: { text: '迭代', color: 'warning' },
      4: { text: '缺陷', color: 'danger' },
    },
    fileList: [
      {
        name: '项目简介',
        end: 'ppt',
        url: '',
        uploadTime: '2021年3月1日 20:39',
        source: 'task',
      },
      {
        name: '需求分析',
        end: 'doc',
        url: '',
        uploadTime: '2021年3月1日 20:39',
        source: 'task',
      },
      {
        name: '接口文档',
        end: 'xls',
        url: '',
        uploadTime: '2021年3月1日 20:39',
        source: 'bug',
      },
      {
        name: '需求规约',
        end: 'zip',
        url: '',
        uploadTime: '2021年3月1日 20:39',
        source: 'task',
      },
      {
        name: 'UI设计',
        end: 'jpg',
        url: '',
        source: 'bug',
        uploadTime: '2021年3月1日 20:39',
      },
      {
        name: '缺陷截图',
        end: 'md',
        url: '',
        source: 'bug',
        uploadTime: '2021年3月1日 20:39',
      },
      {
        name: '任务说明',
        end: 'txt',
        url: '',
        source: 'task',
        uploadTime: '2021年3月1日 20:39',
      },
    ],
    fileIcon: [
      {
        end: 'ppt',
        icon: 'file-ppt',
        color: '#d14424',
      },
      {
        end: 'pptx',
        icon: 'file-ppt',
        color: '#d14424',
      },

      {
        end: 'pdf',
        icon: 'file-pdf',
        color: '#d14424',
      },
      {
        end: 'doc',
        icon: 'file-word',
        color: '',
      },
      {
        end: 'docx',
        icon: 'file-word',
        color: '',
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
  }),

  computed: {
    // filterItems() {
    //   return this.$store.getters['file/filterItems']
    // },
    // currEditItem() {
    //   return this.$store.state.file.currEditFile
    // },
    // isDrawerOpened() {
    //   return this.$store.state.file.isFileDrawerOpened
    // },
  },

  methods: {
    donwloadFile(file) {
      console.log(file)
    },
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
