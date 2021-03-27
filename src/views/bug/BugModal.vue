<template>
  <div>
    <a-modal
      width="70%"
      class="bug-detail-modal"
      :dialog-style="{ top: '30px' }"
      :closable="false"
      :visible="changeVisible"
      title=""
      :footer="null"
      @cancel="detailClose"
    >
      <bug-detail @close="detailClose"></bug-detail>
    </a-modal>
  </div>
</template>
<script>
import BugDetail from './BugDetail.vue'

export default {
  components: {
    BugDetail,
  },
  props: {
    popVisible: {
      type: [Boolean],
      default() {
        return false
      },
    },
  },
  computed: {
    changeVisible() {
      return this.popVisible
    },
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
    }
  },
  methods: {
    showModal() {
      this.visible = this.popVisible
    },
    // handleOk() {
    //   this.ModalText = 'The modal will be closed after two seconds'
    //   this.confirmLoading = true
    //   setTimeout(() => {
    //     this.visible = false
    //     this.confirmLoading = false
    //   }, 2000)
    // },
    // handleCancel() {
    //   console.log('Clicked cancel button')
    //   this.visible = false
    // },
    detailClose() {
      // this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss" scoped>
.bug-detail-modal {
  /*display: flex;*/
  /*justify-content: center;*/
  /*flex: 1;*/
  /*min-height: 1px;*/
  /*min-width: 1px;*/

  &.ant-modal {
    padding-bottom: 0;
  }

  .ant-modal-content {
    /*overflow: hidden;*/

    .ant-modal-body {
      padding-top: 0 !important;
    }
  }
}
</style>
