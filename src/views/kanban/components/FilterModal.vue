<template>
  <div>
    <a-modal
      :visible="isFilterModalOpened"
      title="筛选"
      @cancel="closeFilter"
      @ok="handleOk"
    >
      <!-- 底部按钮 -->
      <template slot="footer">
        <a-button key="back" >
          重置
        </a-button>
        <a-button
          key="submit"
          type="primary"
          @click="handleOk"
        >
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
        <!-- 标题筛选（输入框） -->
        <a-form-model-item
          v-if="currFilterType === 'stage'"
          ref="name"
          label="标题"
          prop="name"
        >
          <a-input placeholder="请输入标题" v-model="form.name" />
        </a-form-model-item>
        <!-- 负责人筛选（输入框） -->
        <a-form-model-item
          v-if="currFilterType === 'stage'"
          ref="name"
          label="负责人"
          prop="name"
        >
          <a-input placeholder="请输入负责人" v-model="form.name" />
        </a-form-model-item>
        <!-- 迭代筛选（下拉框） -->
        <a-form-model-item
          v-if="currFilterType !== 'stage'"
          label="迭代"
          prop="stage"
        >
          <a-select v-model="form.stage">
            <a-select-option
              v-for="item in stageList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <!-- 时间筛选 -->
        <a-form-model-item label="起止日期" prop="date">
          <!-- <a-date-picker
            v-model="form.date1"
            show-time
            type="date"
            placeholder="Pick a date"
            style="width: 100%;"
          /> -->
          <a-range-picker class="w-full" />
        </a-form-model-item>
        <!-- 状态筛选（多选） -->
        <a-form-item label="状态">
          <a-select mode="multiple" placeholder="请选择状态">
            <a-select-option
              v-for="(item, index) in stateFilter"
              :key="index"
              :value="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- 优先级筛选（多选） -->
        <a-form-item label="优先级">
          <a-select mode="multiple" placeholder="请选择优先级">
            <a-select-option value="3">
              高
            </a-select-option>
            <a-select-option value="2">
              中
            </a-select-option>
            <a-select-option value="1">
              低
            </a-select-option>
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
  },
  data: () => ({
    currFilter: {},
    // 表单部分
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    other: '',
    form: {
      member: '',
      stage: '',
      rank: [],
      state: [],
      name: '',
    },
  }),
  watch: {
    '$store.state.filter.currEditFilter': {
      handler(val) {
        this.currFilter = _clonedeep(val)
      },
      immediate: true,
    },
  },

  methods: {
    closeFilter() {
      this.$store.commit('filter/SET_FILTER_MODAL_STATUS', false)
    },
    handleOk() {
      this.$store.commit('filter/SET_FILTER_MODAL_STATUS', false)
    },
    // 表单部分
    onSubmit() {
      // this.$refs.ruleForm.validate((valid) => {
      //   if (valid) {
      //     console.log('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      //   return true
      // })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
  },
}
</script>
