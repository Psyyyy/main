<template>
  <div>
    <a-modal
      :visible="isFilterModalOpened"
      title="筛选"
      @cancel="closeFilter"
      @ok="onSubmit"
    >
      <!-- 底部按钮 -->
      <template slot="footer">
        <a-button key="back"  @click="resetForm"> 重置 </a-button>
        <a-button key="submit" type="primary" @click="onSubmit">
          筛选
        </a-button>
      </template>
      <!-- 表单内容 -->
      <a-form-model
        ref="ruleForm"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <!-- 标题筛选（输入框）这个放弃，直接搜索吧 -->
        <a-form-model-item
          ref="name"
          label="标题"
          prop="name"
        >
          <a-input placeholder="请输入标题" v-model="form.name" />
        </a-form-model-item>
        <!-- 负责人筛选（下拉框） -->
        <a-form-model-item
          v-if="currFilterType !== 'stage'"
          label="负责人"
        >
          <a-select
            v-model="form.member"
            mode="multiple"
            placeholder="点击选择负责人"
          >
            <a-select-option
              v-for="item in memberList"
              :key="item.uid"
              :value="item.name"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <!-- 负责人筛选（输入框） -->
        <!-- <a-form-model-item ref="name" label="负责人" prop="name">
          <a-input placeholder="请输入负责人" v-model="form.member" />
        </a-form-model-item> -->
        <!-- 迭代筛选（下拉框） -->
        <a-form-model-item
          v-if="currFilterType !== 'stage'"
          label="迭代"
          prop="stage"
        >
          <a-select v-model="form.stage"  mode="multiple" placeholder="点击选择迭代">
            <a-select-option
              v-for="item in stageList"
              :key="item.s_id"
              :value="item.s_id"
            >
              {{ item.s_title }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <!-- 时间筛选 -->
        <a-form-model-item label="起止日期" prop="date">
          <a-date-picker
            v-model="form.start"
            :format="dateFormat"
            type="date"
            placeholder="开始日期"
            style="width: 100%"
          />
          <a-date-picker
            v-model="form.end"
            :format="dateFormat"
            type="date"
            placeholder="截止日期"
            style="width: 100%"
          />
        </a-form-model-item>
        <!-- 状态筛选（多选）迭代模块不放这个筛选了 -->
        <a-form-item label="状态" v-if="currListType==='task'">
          <a-select
            v-model="form.state"
            mode="multiple"
            placeholder="点击选择状态"
          >
            <a-select-option
              v-for="item in stateFilter"
              :key="item"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- 优先级筛选（多选） -->
        <a-form-item label="优先级">
          <a-select
            v-model="form.rank"
            mode="multiple"
            placeholder="点击选择优先级"
          >
            <a-select-option value="2"> 普通 </a-select-option>
            <a-select-option value="1"> 紧急 </a-select-option>
            <a-select-option value="0"> 非常紧急 </a-select-option>
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
           筛选
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
import { filterTask } from '@/api/task'

export default {
  name: 'FilterModal',
  props: {
    // filterItem: { // 根据item决定显示要筛选的条目
    //   type: Array,
    //   required: true,
    // },
    // member: {
    //   type: Array,
    //   required: false,
    // },
    // stage: {
    //   type: Array,
    //   required: false,
    // },
    // rank: {
    //   type: Array,
    //   required: true,
    // },
    // state: {
    //   type: Array,
    //   required: true,
    // },
    // title: {
    //   type: Array,
    //   required: false,
    // },
  },
  computed: {
    isFilterModalOpened() {
      return this.$store.state.filter.isFilterModalOpened
    },
    currFilterType() {
      return this.$store.state.filter.currFilterType
    },
    stageList() {
      return this.$store.state.stage.stageList
    },
    currStage() {
      return this.$store.state.stage.currStage
    },
    stateFilter() {
      return this.$store.getters['filter/stateFilter']
    },
    memberList() {
      return this.$store.state.team.currProjectMemberList
    },
    currListType() {
      return this.$store.state.task.currListType
    },
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    currAddType() {
      return this.$store.state.add.currAddType
    },
  },
  data: () => ({
    currFilter: {},
    // 表单部分
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    other: '',
    dateFormat: 'YYYY/MM/DD',
    form: {
      member: [],
      stage: [],
      rank: [],
      state: [],
      name: '',
      start: '',
      end: '',
      pid: '',
      type: 1,
    },
    formatForm: {},
  }),
  watch: {
    '$store.state.filter.currEditFilter': {
      handler(val) {
        this.currFilter = _clonedeep(val)
      },
      immediate: true,
    },
  },

  created() {
    // console.log(this.memberList)
  },

  methods: {
    closeFilter() {
      this.$store.commit('filter/SET_FILTER_MODAL_STATUS', false)
    },
    handleOk() {
      this.$store.commit('filter/SET_FILTER_MODAL_STATUS', false)
    },
    // 表单部分
    async onSubmit() {
      this.form.pid = this.currProjectID
      if (this.currAddType === 'bug') { // 数据库默认是1 task
        this.form.type = 0
      } else this.form.type = 1
      this.formatForm = _clonedeep(this.form) // 这里要用深拷贝，要不然只是复制了指针而已
      if (this.formatForm.start && this.formatForm.end) {
        if (this.formatForm.start - this.formatForm.end > 0) {
          this.$antdMessage.warning('截止时间早于开始时间！')
          return false
        }
      }
      if (this.formatForm.start) {
        this.formatForm.start = getTimestamp(
          this.formatForm.start.format('YYYY-MM-DD h:m:s'),
        )
      }
      if (this.formatForm.end) {
        this.formatForm.end = getTimestamp(
          this.formatForm.end.format('YYYY-MM-DD h:m:s'),
        )
      }
      if (this.currListType === 'bug') { // 数据库默认是1 task
        this.formatForm.t_type = 0
      } else if (this.currListType === 'task') { // 数据库默认是1 task
        this.formatForm.t_type = 1
      }
      const { data: res } = await filterTask(this.formatForm)
      // console.log('filter', res)
      this.$store.commit('task/SET_TASK_LIST', res)
      console.log('filter', res)
      this.$antdMessage.success('列表已更新！')
      this.closeFilter()
      this.form = {
        member: [],
        stage: [],
        rank: [],
        state: [],
        name: '',
        start: '',
        end: '',
        pid: '',
        type: 1,
      }
      return true
    },
    // console.log(getTimestamp(this.form.end.format('YYYY-MM-DD h:m:s')))
    resetForm() {
      this.$refs.ruleForm.resetFields()
      this.form = {
        member: [],
        stage: [],
        rank: [],
        state: [],
        name: '',
        start: '',
        end: '',
        pid: '',
        type: 1,
      }
    },
  },
}
</script>
