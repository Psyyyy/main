<template>
  <div >
    <div class="flex items-center">
      <a-avatar
        :size="80"
        :src="info.avatar"
      />
      <div class="ml-4">
        <div class="mb-2 text-xl">{{ info.name }}</div>
        <div>
          <a-button class="ml-1 text-xs">重置</a-button>
        </div>
      </div>
    </div>

    <div class="my-8">
      <a-form
        hide-required-mark
        class="account-form"
        :form="form"
      >
        <a-form-item
          class="account-form__item"
          :key="1"
          label="昵称"
        >
          <a-input
            class="login-input"
            placeholder=""
            v-model="form.name"
          >
          </a-input>
        </a-form-item>
                <a-form-item
          class="account-form__item"
          :key="2"
          label="电话"
        >
          <a-input
            class="login-input"
            placeholder=""
            v-model="form.mobile"
          >
          </a-input>
        </a-form-item>
                <a-form-item
          class="account-form__item"
          :key="3"
          label="邮箱"
        >
          <a-input
            class="login-input"
            placeholder=""
            v-model="form.email"
          >
          </a-input>
        </a-form-item>
                <a-form-item
          class="account-form__item"
          :key="4"
          label="职位"
        >
          <a-input
            class="login-input"
            placeholder=""
            v-model="form.job"
          >
          </a-input>
        </a-form-item>
      </a-form>
    </div>
    <div class="mt-6 flex justify-end">
      <a-button
        class="mr-4"
        size="large"
        type="primary"
        @click="updateUser"
      >保存更改</a-button>
      <a-button size="large" @click="resetForm">取消</a-button>
    </div>

    <a-modal
      centered
      title="更改头像"
      v-model="avatarUploadVisible"
      :mask-closable="false"
      :footer="null"
    >
      <avatar-upload />
    </a-modal>
  </div>
</template>

<script>
import AvatarUpload from '@comp/AvatarUpload.vue'
import _clonedeep from 'lodash.clonedeep'
import { getUserInfo, updateUser } from '@/api/user'

export default {
  name: 'Account',

  components: { AvatarUpload },

  data() {
    return {
      form: {},
      avatarUploadVisible: false,
    }
  },

  computed: {
    info() {
      return this.$store.state.user.info
    },
    currUserID() {
      return window.sessionStorage.getItem('currUserID')
    },
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.getUserInfo(this.currUserID)
      this.form = _clonedeep(this.info)
      console.log('form', this.form)
    },
    resetForm() {
      this.form = _clonedeep(this.info)
    },
    async updateUser() {
      console.log('update', this.form)
      this.form.role = this.form.role === '管理员' ? 'admin' : 'normal'
      const res = await updateUser(this.form)
      // 更新项目失败
      if (res.meta.status !== 200) {
        return this.$message.error('更新失败')
      }
      this.$message.success('更新成功！')
      this.init()
      return true
    },
    async getUserInfo(uid) {
      const { data: res } = await getUserInfo(uid)
      this.$store.commit('user/SET_USER_INFO', res.info)
    },
  },
}
</script>

<style lang="scss" scoped>
.account-form {
  @apply -mx-3 flex flex-wrap;
  &__item::v-deep {
    @apply w-1/2 mb-4 px-3;
    .ant-form-item-label {
      line-height: 28px;
    }
  }
}

.permission-table {
  @apply w-full;
  thead {
    font-size: 18px;
    border-bottom: 2px solid #dedede;
    th {
      padding-bottom: 1rem;
    }
  }
  tr {
    &:not(:last-child) {
      border-bottom: 1px solid #ededed;
    }
    td {
      padding: 1rem 0;
    }
  }
}
</style>
