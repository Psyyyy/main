<template>
  <div class="flex flex-col items-center justify-center">
    <a-form
      class="rigister-form"
      :form="form"
      @submit="onRegister"
    >
      <a-form-item
        v-for="({ icon, decorator, size='large', placeholder, type='text' }, index) in formItems"
        :key="index"
      >
        <a-input
          class="rigister-input"
          :size="size"
          :type="type"
          :placeholder="placeholder"
          @keydown.enter="onRegister"
          v-decorator="decorator"
        >
          <template #prefix>
            <feather
              stroke="#aaa"
              size="20"
              :type="icon"
            />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          class="w-full"
          size="large"
          type="primary"
          html-type="submit"
          :loading="loading"
        >
          立即注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  name: 'Register',

  data() {
    const formItems = [
      {
        icon: 'user',
        placeholder: '注册账号',
        decorator: [
          'username',
          { rules: [{ required: true, message: '请输入账号' }] },
        ],
      },
      {
        icon: 'lock',
        placeholder: '登录密码',
        type: 'password',
        decorator: [
          'password',
          { rules: [{ required: true, message: '请输入密码' }] },
        ],
      },
      {
        icon: 'check-circle',
        placeholder: '确认密码',
        type: 'password',
        decorator: [
          'password2',
          {
            rules: [{
              validator: (_, val = '', callback) => {
                const password = this.form.getFieldValue('password')?.trim()
                const password2 = val.trim()
                if (password2.length <= 0) {
                  callback(new Error('请再次确认密码'))
                }
                if (password !== password2) {
                  callback(new Error('两次密码不一致'))
                }
                callback()
              },
            }],
          },
        ],
      },
      {
        icon: 'phone',
        placeholder: '手机号码',
        decorator: [
          'mobile',
          { rules: [{ required: true, message: '请输入手机号' }] },
        ],
      },
      {
        icon: 'box',
        placeholder: '邮箱',
        decorator: [
          'email',
          { rules: [{ required: true, message: '请输入邮箱' }] },
        ],
      },
    ]
    return {
      formItems,
      form: this.$form.createForm(this),
      loading: false,
    }
  },

  methods: {
    onRegister(e) {
      e.preventDefault()

      this.form.validateFields(async (error, values) => {
        if (!error) {
          this.loading = true
          try {
            const res = await register(values)
            if (res.meta.status !== 201) {
              return this.$antdMessage.error(`注册失败：${res.meta.msg}`)
            }
            console.log('register', res)
            this.$antdMessage.success('注册成功，请登录')
            this.$router.push('Login')
          } finally {
            this.loading = false
          }
        }
        return true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.rigister-form {
  width: 100%;
  .rigister-input::v-deep {
    .ant-input {
      padding-left: 40px;
    }
  }
}
</style>
