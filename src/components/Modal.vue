<template>
    <div>
        <a-modal
        :visible="changeVisible"
        title="创建项目"
        @ok="addProject"
        @cancel="closeProjectModal"
      >
        <div>
          <a-form-model
            ref="addFormRef"
            :rules="projectRules"
            class="pl-2"
            layout="horizontal"
            :model="newProject"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="项目名称" prop="title" type="name">
              <a-input v-model="newProject.title" />
            </a-form-model-item>
            <a-form-model-item label="项目简介" prop="content">
              <a-input v-model="newProject.content" type="textarea" />
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-modal>
    </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    model: {
      type: Object,
      default() {
        return {}
      },
    },
    popVisible: {
      type: [Boolean],
      default() {
        return false
      },
    },
    from: {
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      visible: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
    }
  },
  methods: {
    showModal() {
      this.visible = this.popVisible
    },
  },
  computed: {
    changeVisible() {
      return this.popVisible
    },
  },
}

</script>
