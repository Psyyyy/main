<template>
  <div style="z-index:9999">
    <a-modal
      :visible="isAddModalOpened"
      :title="currAddType==='bug'?'新增缺陷':'新增需求'"
      @cancel="closeAdd"
      @ok="onSubmit"
    >
      <!-- 底部按钮 -->
      <template slot="footer">
        <a-button key="back"  @click="resetForm"> 重置 </a-button>
        <a-button key="submit" type="primary" @click="onSubmit">
          添加
        </a-button>
      </template>
      <!-- 表单内容 -->
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <!-- 标题添加（输入框） -->
        <a-form-model-item
          ref="t_title"
          label="标题"
          prop="t_title"
        >
          <a-input placeholder="请输入标题" v-model="form.t_title" />
        </a-form-model-item>
        <!-- 负责人添加（下拉框） -->
        <a-form-model-item
          label="负责人"
        >
          <a-select
            placeholder="点击选择负责人"
            v-model="form.t_header_name"
          >
            <a-select-option
              v-for="item in memberList"
              :key="item.uid"
              :value="item.name"
              @click="selectHeader(item.uid,item.name)"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <!-- 负责人添加（输入框） -->
        <!-- <a-form-model-item ref="name" label="负责人" prop="name">
          <a-input placeholder="请输入负责人" v-model="form.member" />
        </a-form-model-item> -->
        <!-- 迭代添加（下拉框） -->
        <a-form-model-item
          label="迭代"
          prop="t_stage_id"
          v-if="currListType !== 'stage'"
        >
          <a-select v-model="form.t_stage_id" placeholder="点击选择迭代">
            <a-select-option
              v-for="item in stageList"
              :key="item.s_id"
              :value="item.s_id"
              @click="selectStage(item.s_id,item.s_title)"
            >
              {{ item.s_title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <!-- 时间添加 -->
        <a-form-model-item label="起止日期" prop="date">
          <a-date-picker
            v-model="form.start_time"
            :format="dateFormat"
            type="date"
            placeholder="开始日期"
            style="width: 100%"
          />
          <a-date-picker
            v-model="form.end_time"
            :format="dateFormat"
            type="date"
            placeholder="截止日期"
            style="width: 100%"
          />
        </a-form-model-item>
        <!-- 状态添加（多选） -->
        <a-form-item label="状态">
          <a-select
            v-model="form.t_state"
            placeholder="点击选择状态"
          >
            <a-select-option
              v-for="item in stateAdd"
              :key="item"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- 优先级添加（多选） -->
        <a-form-item label="优先级">
          <a-select
            v-model="form.t_rank"
            placeholder="点击选择优先级"
          >
            <a-select-option value="1"> 普通 </a-select-option>
            <a-select-option value="2"> 紧急 </a-select-option>
            <a-select-option value="3"> 非常紧急 </a-select-option>
          </a-select>
        </a-form-item>
        <!-- 单选 -->
        <!-- <a-form-model-item label="Resources" prop="resource">
          <a-radio-group v-model="form.resource">
            <a-radio value="1">
              Sponsor
            </a-radio>
            <a-radio value="2">
              Venue
            </a-radio>
          </a-radio-group>
        </a-form-model-item> -->

        <!-- <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
           添加
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item> -->
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import _clonedeep from 'lodash.clonedeep'
import { getTimestamp } from '@/utils/util'
import { addTask } from '@/api/task'
import { getStageList } from '@/api/stage'
import { getMemberList } from '@/api/member'

export default {
  name: 'AddModal',
  props: {
  },
  computed: {
    isAddModalOpened() {
      return this.$store.state.add.isAddModalOpened
    },
    stageList() {
      return this.$store.state.stage.stageList
    },
    currStage() {
      return this.$store.state.stage.currStage
    },
    currStageId() {
      return this.$store.state.stage.currStageId
    },
    stateAdd() {
      return this.$store.getters['add/stateAdd']
    },
    memberList() {
      return this.$store.state.team.currProjectMemberList
    },
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    currEditTask() {
      return this.$store.state.task.currEditTask
    },
    openFrom() {
      return this.$store.state.add.isFromDetail
    },
    currEditTaskLevel() {
      return this.$store.state.task.currEditTaskLevel
    },
    currListType() {
      return this.$store.state.task.currListType
    },
    currAddType() {
      return this.$store.state.add.currAddType
    },
  },
  data: () => ({
    currAdd: {},
    // 表单部分
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    other: '',
    dateFormat: 'YYYY/MM/DD',
    form: {
      t_pid: '', // 这里要根据是在哪里打开新增窗口判断，默认pid=0
      t_level: '', // 这个也要判断，默认0
      t_title: '',
      t_stage_id: '',
      t_stage_name: '',
      t_project_id: '',
      t_content: '',
      t_state: '',
      t_rank: '',
      t_header_id: '',
      t_header_name: '',
      start_time: '',
      end_time: '',
    },
    rules: {
      t_title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
      ],
      t_stage_id: [
        { required: true, message: '请选择迭代', trigger: 'blur' },
      ],
    },
    formatForm: {},
  }),
  watch: {
    '$store.state.add.currEditAdd': {
      handler(val) {
        this.currAdd = _clonedeep(val)
      },
      immediate: true,
    },
  },

  created() {
    console.log('add type', this.currAddType)
    console.log('list type', this.currListType)
    this.getStageList()
    this.getMemberList()
  },

  methods: {
    async getStageList() {
      const pid = this.currProjectID
      const { data: res } = await getStageList(pid)
      console.log('stagelist', res.stagelist)
      this.$store.commit('stage/SET_STAGE_LIST', res.stagelist)

      return true
    },
    selectHeader(id, name) {
      this.form.t_header_id = id
      this.form.t_header_name = name
    },
    selectStage(id, name) {
      this.form.t_stage_id = id
      this.form.t_stage_name = name
    },
    closeAdd() {
      this.resetForm()
      this.$store.commit('add/SET_ADD_MODAL_STATUS', false)
      this.$store.commit('add/SET_ADD_FROM_DETAIL', false)
    },
    handleOk() {
      this.resetForm()
      this.$store.commit('add/SET_ADD_MODAL_STATUS', false)
      this.$store.commit('add/SET_ADD_FROM_DETAIL', false)
    },
    // 表单部分
    async onSubmit() {
      this.formatForm = _clonedeep(this.form) // 这里要用深拷贝，要不然只是复制了指针而已
      if (this.formatForm.start_time && this.formatForm.end_time) {
        if (this.formatForm.start_time - this.formatForm.end_time > 0) {
          this.$antdMessage.warning('截止时间早于开始时间！')
          return false
        }
      }
      if (this.formatForm.start_time) {
        this.formatForm.start_time = getTimestamp(
          this.formatForm.start_time.format('YYYY-MM-DD h:m:s'),
        )
      }
      if (this.formatForm.end_time) {
        this.formatForm.end_time = getTimestamp(
          this.formatForm.end_time.format('YYYY-MM-DD h:m:s'),
        )
      }
      this.formatForm.t_project_id = this.currProjectID
      this.formatForm.t_pid = this.openFrom === true ? this.currEditTask : 0
      this.formatForm.t_level = this.openFrom === true ? this.currEditTaskLevel : 0
      if (this.currListType === 'stage') { // 在迭代界面自动填写当前迭代
        this.formatForm.t_stage_id = this.currStageId
        this.formatForm.t_stage_name = this.currStage
      }
      if (this.currAddType === 'bug') { // 数据库默认是1 task
        this.formatForm.t_type = 0
        this.formatForm.t_state = '新'
      } else this.formatForm.t_type = 1
      // this.formatForm.t_stage_id = this.currStageId
      // console.log('currTask', this.currEditTask)
      // console.log('pid', this.formatForm.t_pid)
      // console.log('level', this.formatForm.t_level)
      // console.log('add内容', this.formatForm)
      try {
        const { data: res } = await addTask(this.formatForm)
        console.log('add结果', res)
        // this.$store.commit('task/SET_TASK_LIST', res)
        this.$antdMessage.success('成功新增需求！')

        this.closeAdd()
        this.$store.commit('add/SET_SUBMIT', true)
        console.log('提交名字', this.form.t_title)
        this.$store.commit('add/SET_SUBMIT_NAME', res.t_title)
        this.$store.commit('add/SET_ADD_FROM_DETAIL', false)
        this.form = {
          t_pid: '', // 这里要根据是在哪里打开新增窗口判断，默认pid=0
          t_level: '', // 这个也要判断，默认0
          t_title: '',
          t_stage_id: '',
          t_stage_name: '',
          t_project_id: '',
          t_content: '',
          t_state: '',
          t_rank: '',
          t_header_id: '',
          t_header_name: '',
          start_time: '',
          end_time: '',
        }
      } catch (err) {
        // console.log(err)
      }
      return true
    },
    // console.log(getTimestamp(this.form.end.format('YYYY-MM-DD h:m:s')))
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.form = {
        t_pid: '', // 这里要根据是在哪里打开新增窗口判断，默认pid=0
        t_level: '', // 这个也要判断，默认0
        t_title: '',
        t_stage_id: '',
        t_stage_name: '',
        t_project_id: '',
        t_content: '',
        t_state: '',
        t_rank: '',
        t_header_id: '',
        t_header_name: '',
        start_time: '',
        end_time: '',
      }
    },
    async getMemberList() {
      const id = this.currProjectID
      const { data: res } = await getMemberList(id)
      console.log('memberlist', res)
      this.$store.commit('team/SET_CURR_PROJECT_MEMBER_LIST', res)
    },
  },
}
</script>
