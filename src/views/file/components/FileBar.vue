<template>
  <div>
    <div class="px-6 py-6">
      <a-upload
      multiple
      name="file"
      action="http://106.14.132.104:8888/api/private/v1/file/upload"
      :headers="headers"
      :file-list="[]"
      :custom-request="uploadFile"
      @change="handleChange"
    >
  <div style="width:230px">
       <a-button
        class=" flex justify-center items-center"
        size="large"
        block
        type="primary"
      >
        <feather
          class="mr-1"
          size="20"
          type="plus"
        />
        上传文件
      </a-button>
  </div>
    </a-upload>

    </div>

    <perfect-scrollbar
      style="height: calc(100% - 88px);"
      class="select-none overflow-hidden"
      :options="{
        suppressScrollX: true,
        maxScrollbarLength: 160,
        wheelSpeed: 0.60,
      }"
    >
      <a-menu
        mode="inline"
        class="file-bar-menu"
        :selected-keys="selectedKeys"
        @click="onClickMenuItem"
      >
        <a-menu-item
          disabled
          class="m-0 bg-white cursor-default"
        >
          文件类型
        </a-menu-item>
        <a-menu-item
          v-for="({ id, label, icon }) in filters"
          :key="id"
        >
          <div class="flex items-center">
            <feather
              size="20"
              class="side-menu-icon anticon"
              :type="icon"
            ></feather>
            <span style="margin-top: 1px;">{{ label }}</span>
          </div>
        </a-menu-item>
               <a-menu-item
          disabled
          class="mt-6 mb-0 bg-white cursor-default"
        >
          文件来源
        </a-menu-item>
        <a-menu-item
          v-for="({ id, label, color }) in tags"
          :key="id"
        >
          <div class="flex justify-between items-center">
            <span style="margin-top: 1px;">{{ label }}</span>
            <div
              class="w-2 h-2 mr-2 rounded-full"
              :class="`bg-${color}`"
            ></div>
          </div>
        </a-menu-item>
      </a-menu>
    </perfect-scrollbar>
  </div>
</template>

<script>
import {
  uploadFile, getProjectFileList,
} from '@/api/file'

export default {
  name: 'FileBar',
  data: () => ({
    filters: [
      { id: '1', label: '所有文件', icon: 'menu' },
      { id: '2', label: '文档', icon: 'file-text' },
      { id: '3', label: '图片', icon: 'image' },
      { id: '4', label: '其他', icon: 'archive' },
    ],
    fileList: [],
    tags: [
      { id: '5', label: '需求', color: 'primary' },
      { id: '6', label: '缺陷', color: 'danger' },
    ],
    headers: {
      authorization: 'authorization-text',
    },
  }),

  computed: {
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    selectedKeys() {
      return this.$store.state.file.barKey
    },
    isSideMenuOpened() {
      return this.$store.state.isSideMenuOpened
    },
  },

  methods: {

    onClickMenuItem({ key }) {
      this.$store.commit('file/SET_FILE_BAR_KEY', key)
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        this.$antdMessage.loading('正在上传')
      }
      if (info.file.status === 'done') {
        this.$antdMessage.success(`成功上传 ${info.file.name}`)
      } else if (info.file.status === 'error') {
        this.$antdMessage.error(`${info.file.name} 上传失败`)
      }
    },
    async uploadFile(data) {
      const formData = new FormData()
      formData.append('file', data.file)
      formData.append('token', window.sessionStorage.getItem('token'))// 随便写一个token示例 好像无效
      const uid = window.sessionStorage.getItem('currUserID')
      const pid = this.currProjectID
      console.log('上传uid', uid)
      console.log('上传pid', pid)
      const res = await uploadFile(formData, uid, pid)
      if (res.meta.status !== 200) {
        this.$antdMessage.error('上传失败')
      }
      this.getFileList()
      console.log(res.data)
      this.$antdMessage.success(`【${res.data.f_name}】上传成功`)
      // await this.newDialog('上传了了文件', res.data.f_name)
    },

    async getFileList() {
      const id = this.currProjectID
      const { data: res } = await getProjectFileList(id)
      this.fileList = []
      res.forEach((item, index) => {
        let source = ''
        switch (item.file_source_type) {
          case null:
            source = ''
            break
          case 1:
            source = 'task'
            break
          case 0:
            source = 'bug'
            break
          default: source = ''
        }
        this.fileList.push({
          id: item.id,
          name: item.file_name.split('.')[0],
          end: item.file_name.split('.')[1],
          uploadTime: item.file_latest_ch,
          source,
          sourceId: item.tid,
          sourceName: item.file_source_name,
        })
      })

      this.$store.commit('file/SET_FILE_LIST', this.fileList)
    },
  },
}
</script>

<style lang="scss" scoped>
.file-bar-menu {
  border: none;
}
// .open-btn{
//  &.file-close {
//     margin-left: 190px !important;
//   }
// &.file-open {
//     margin-left: 162px !important;
//   }
//  z-index:999;
// }
</style>
