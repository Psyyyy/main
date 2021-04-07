<template>
  <div class="kanban">
    <!-- 第一行 -->
    <div class=" -mt-8 w-full pr-3">
      <div class=" no-scroll w-full p-2 title-card">
        <div class="wl">
          <div class="wl">
            <div class="wl mr-2 mt-1">
              <!-- 创建迭代按钮 -->
              <a-button class="text-xl" @click="isAddStageVisible = true"
                >+</a-button
              >
            </div>
            <!-- 迭代阶段切换 -->
            <div class="wl">
              <a-dropdown :trigger="['click']" class=" mr-26">
                <div class=" text-2xl ml-1 flex items-center cursor-pointer ">
                  <!-- <a-icon
                    style="color:#98adf9"
                    theme="filled"
                    type="appstore"
                    class="mr-2"
                  /> -->
                  <h3 class="section-card__title">
                    {{ stage.s_title }}
                  </h3>

                  <feather
                    class="ml-1 text-gray-500"
                    size="18"
                    type="chevron-down"
                  />
                </div>

                <template #overlay>
                  <a-menu class="-ml-1">
                    <a-menu-item
                      style="font-size:15px"
                      v-for="{ s_id, s_title } in stageList"
                      :key="s_id"
                      @click="changeStageTo(s_id, s_title)"
                    >
                      {{ s_title }}
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>

            <div class="wl">
              <feather
                class="text-xl ml-2 text-gray-500"
                size="18"
                type="bookmark"
                style="cursor:pointer;color:#98adf9"
                @click="target"
              />
              <div
                class=" flex-no-wrap inline-block "
                style="color:#bdc0c9;white-space:nowrap;width:30px;margin-top:7px"
              >
                {{ stage.s_start_time | dateFormat }}~{{
                  stage.s_end_time | dateFormat
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="wr">
          <div class="wr ml-2 mt-1">
            <a-dropdown>
              <a-menu
                slot="overlay"
                placement="bottomRight"
                @click="handleStage"
              >
                <a-menu-item key="edit"> 编辑迭代 </a-menu-item>
                <a-menu-item key="delete"> 删除迭代 </a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">
                更多 <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </div>
          <div class="wr mt-1 mr-2">
            <!-- <a-button type="primary" class="mr-4" v-if="!isKbShow" @click="onOpenFilter('task')"
              >筛选</a-button
            > -->
            <a-radio-group default-value="kanban" @change="onChange">
              <a-radio-button value="kanban"
                >看板</a-radio-button
              >
              <a-radio-button value="list"
                >列表</a-radio-button
              >
              <a-radio-button value="board"
                >统计图</a-radio-button
              >
              <a-radio-button value="member">成员</a-radio-button>
            </a-radio-group>
          </div>
          <!-- <h3 class="title-card__title text-xl"> <a-button @click="backToEntry">迭代</a-button></h3> -->

          <!-- <p class="mb-6 text-gray-600">使用 setFieldsValue 来动态设置其他控件的值。</p> -->
        </div>
      </div>
    </div>
    <div v-if="isKbShow">
      <!-- 第二行 -->
      <div>
        <a-button
          class="inline mb-4"
          size="large"
          type="primary"
          @click="onOpenAdd()"
          >创建{{ isTaskShow ? "需求" : "缺陷" }}</a-button
        >
        <div class="ml-4 inline">
          <a-radio-group default-value="task">
            <a-radio-button value="task" @click="showKbBoard('task')"
              >需求</a-radio-button
            >
            <a-radio-button value="bug" @click="showKbBoard('bug')"
              >缺陷</a-radio-button
            >
          </a-radio-group>
        </div>
      </div>
      <!-- 看板 -->
      <div class="kb">
        <div class="kb-col" v-for="(it, i) in boardList" :key="i">
          <div class="kb-col__title overflow-hidden mb-1 flex items-center">
            <span class="kb-col__input"
              ><span class="ml-4"
                >{{ it.state }} · {{ it.datalist.length }}</span
              ></span
            >
          </div>
          <div class="kb-col__board">
            <draggable class="" v-model="it.datalist" v-bind="dragOptions">
              <transition-group tag="ul">
                <li
                  class="kb-col__item"
                  v-for="{
                    id,
                    t_rank,
                    t_title,
                    t_content,
                    t_header_name,
                    end_time,
                    is_done
                  } in it.datalist"
                  :key="id"
                  :data-border="rankColor(is_done,t_rank)"
                  @click="showDetail(id)"
                >
                  <div
                    v-html="t_title"
                    class="boardItem"
                    :class="{ done: is_done }"
                  ></div>
                  <div
                    class="text-sm text-gray-500 boardItem"
                    :class="{ done: is_done }"
                  >
                    {{ t_content }}
                  </div>
                  <div class="mt-1 flex items-center text-xs">
                    <div class="mr-2 flex items-center">
                      <feather
                        class="mr-1"
                        size="12"
                        type="clock"
                        v-if="end_time !== null"
                      />
                      <span v-if="end_time !== null">
                        {{ end_time | dateFormat }}</span
                      >
                    </div>

                    <div class="ml-auto flex-1 flex flex-wrap justify-end">
                      <a-avatar
                        class="kb-col__avatar text-xs primary bg-primary-light"
                        :key="id"
                        :size="30"
                        >{{
                          t_header_name === null ? "暂无" : t_header_name
                        }}</a-avatar
                      >
                    </div>
                  </div>
                </li>
              </transition-group>
            </draggable>
          </div>
        </div>
        <div class="flex flex-no-wrap flex-shrink-0 inline-block overflow-x-scroll" style="white-space:nowrap" v-if="!boardList">        <div class="kb-col" v-for="(it, i) in board" :key="-i-1">
          <div  class="kb-col__title overflow-hidden mb-1 flex items-center">
            <span class="kb-col__input"
              ><span class="ml-4"
                >{{ it.state }} · {{ it.datalist.length }}</span
              ></span
            >
          </div>
          <div class="kb-col__board">
            <draggable class="" v-model="it.datalist" v-bind="dragOptions">
            </draggable>
          </div>
        </div></div>

      </div>
    </div>
    <!-- 列表 -->
    <div v-if="showList" class="mt-10">
      <task-list></task-list>
    </div>
       <div v-if="showMember" class="mt-10">
           <member-list></member-list>

    </div>
    <div v-if="showAnalysis" class="mt-10">
           <analysis-board></analysis-board>

    </div>
    <filter-modal />
    <add-modal />
    <task
      :pop-visible="showTask"
      detail="detailTaskId"
      @close="showTask = false"
    />
    <!-- 创建项目 -->
    <a-modal
      :visible="isAddStageVisible"
      title="创建迭代"
      @ok="editStage('add')"
      @cancel="closeAddStage"
    >
      <div>
        <a-form-model
          ref="addFormRef"
          class="pl-2"
          layout="horizontal"
          :model="newStage"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="迭代名称" type="name" prop="s_title">
            <a-input v-model="newStage.s_title" />
          </a-form-model-item>
          <a-form-model-item label="开始日期" prop="s_start_time">
            <a-date-picker
              v-model="newStage.s_start_time"
              :format="'YYYY/MM/DD'"
              type="date"
              placeholder="开始日期"
              style="width: 100%"
            />
          </a-form-model-item>
          <a-form-model-item label="截止日期" prop="s_end_time">
            <a-date-picker
              v-model="newStage.s_end_time"
              :format="'YYYY/MM/DD'"
              type="date"
              placeholder="截止日期"
              style="width: 100%"
          /></a-form-model-item>
          <a-form-model-item label="迭代目标">
            <a-input v-model="newStage.s_target" type="textarea" />
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
    <!-- 编辑项目 -->
    <a-modal
      :visible="isEditStageVisible"
      title="编辑迭代"
      @ok="editStage('edit')"
      @cancel="isEditStageVisible = false"
    >
      <div>
        <a-form-model
          class="pl-2"
          layout="horizontal"
          :model="currEditStage"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="name" label="迭代名称" type="name">
            <a-input v-model="currEditStage.s_title" />
          </a-form-model-item>
          <a-form-model-item label="起止日期" prop="date">
            <a-date-picker
              v-model="currEditStage.s_start_time"
              :format="'YYYY/MM/DD'"
              type="date"
              placeholder="开始日期"
              style="width: 100%"
            />
            <a-date-picker
              v-model="currEditStage.s_end_time"
              :format="'YYYY/MM/DD'"
              type="date"
              placeholder="截止日期"
              style="width: 100%"
            />
          </a-form-model-item>
          <a-form-model-item label="迭代目标">
            <a-input v-model="currEditStage.s_target" type="textarea" />
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import AddModal from '@/components/AddModal.vue'
import moment from 'moment'
import {
  getStage,
  getStageList,
  newStage,
  updateStage,
  deleteStage,
} from '@/api/stage'
import {
  getTaskList,
  deleteTask,
  getTaskDetail,
  getStageTaskList,
  getBoardList,
} from '@/api/task'
import { getComment } from '@/api/comment'
import { getDialog } from '@/api/dialog'
// import STable from '../../components/Table'
import { getMemberList } from '@/api/member'
import { getTimestamp, dateformat } from '@/utils/util'
import __clonedeep from 'lodash.clonedeep'
import Task from '@/views/task/Task.vue'
import FilterModal from './components/FilterModal.vue'
import MemberList from './components/MemberRes.vue'
import AnalysisBoard from './components/AnalysisBoard.vue'

import TaskList from '../task/TaskList.vue'

export default {
  name: 'Kanban',

  components: {
    TaskList,
    draggable,
    FilterModal,
    Task,
    AnalysisBoard,
    MemberList,
    AddModal,
  },

  data: () => ({
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    state: {}, // 当前stage
    dragOptions: {
      animation: 200,
      group: 'description',
      disabled: true,
      ghostClass: 'ghost',
    },
    currAdd: { id: '', title: '', content: '' },
    rules: {
      s_title: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      s_start_time: [
        { required: true, message: '请选择日期', trigger: 'change' },
      ],
      s_end_time: [{ required: true, message: '请选择日期', trigger: 'change' }],
    },
    showTask: false,
    showMember: false,
    showList: false,
    showAnalysis: false,
    isTaskShow: true,
    isKbShow: true,
    isEditStageVisible: false,
    newStage: {
      s_id: '',
      pro_id: '', // 连数据库后就不自己设这个了
      s_title: '',
      s_target: '',
      s_start_time: null,
      s_end_time: null,
    },
    currEditStage: {
      s_id: '',
      pro_id: '', // 连数据库后就不自己设这个了
      s_title: '',
      s_target: '',
      s_start_time: null,
      s_end_time: null,
    },
    isAddStageVisible: false,
  }),

  created() {
    this.init()
    console.log('tasklist', this.taskList)
  },
  watch: {
    currStage() {
      this.init()
    },
    currProjectID() {
      this.init()
    },
    showTask() {
      this.init()
    },
    showMember() {
      this.init()
    },
    showAnalysis() {
      this.init()
    },
    isAddModalOpened() {
      this.init()
    },
    currListType() {
      this.init()
    },
  },

  methods: {
    consoleBoard() {
      console.log('boardlist', !this.boardList)
      console.log('board', this.board)
    },
    moment,
    dateformat,
    init() {
      this.getStageList()
      this.getStage()
      this.getBoardList()
      this.getMemberList()
      this.$store.commit(// 为了显示空白看板用的！！！
        'add/SET_ADD_MODAL_TYPE',
        'task',
      )
    },
    // 获取数据
    async getStage() {
      const { data: res } = await getStage(this.currStageId)
      console.log('stage', res)
      this.$store.commit('stage/SET_CURR_STAGE', res)
      this.$store.commit('stage/SET_CURR_STAGE_ID', res.s_id)
      this.$store.commit('stage/SET_CURR_STAGE_NAME', res.s_title)
      this.currEditStage = res
      return true
    },
    async getStageList() {
      const pid = this.currProjectID
      const { data: res } = await getStageList(pid)
      console.log('stagelist', res.stagelist)
      this.$store.commit('stage/SET_STAGE_LIST', res.stagelist)

      return true
    },

    addNewBoard() {
      this.taskList.push({ title: '默认标题', dataList: [] })
    },

    addNewItem() {
      if (this.currAdd.content.length > 0) {
        this.taskList.some((el) => {
          if (el.title === this.currAdd.title) {
            el.dataList.push({ id: '10086', content: this.currAdd.content })
            this.reset()
            return true
          }
          return false
        })
      }
    },

    deleteBoard(boardTitle) {
      this.$confirm({
        title: (
          <p>
            此操作将删除<span class="warning">「{boardTitle}」</span>看板
          </p>
        ),
        content: '请点击确定按钮以删除',
        onOk: () => {
          // MOCK: 模拟删除一个看板
          this.taskList.some((el, i, self) => {
            if (el.title === boardTitle) {
              self.splice(i, 1)
              return true
            }
            return false
          })
        },
      })
    },

    orderList() {
      this.list = this.list.sort((one, two) => one.order - two.order)
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    // 删除任务
    delTask(index, k) {
      this.dragList[index].list.splice(k, 1)
    },
    // 删除任务阶段
    delStage(index) {
      this.dragList.splice(index, 1)
    },
    changeStageTo(id, name) {
      console.log(id)
      console.log(name)
      this.$store.commit('stage/SET_CURR_STAGE_NAME', name)
      this.$store.commit('stage/SET_CURR_STAGE_ID', id)
      window.localStorage.setItem('currStageId', id)
      window.localStorage.setItem('currStage', name)
      window.localStorage.setItem('currStageId', id)

      console.log(this.$store.state.stage.currStage)
      this.init()
      // 这里需要向后台提交id拿项目数据，拿回来后重新渲染当前界面
      // 进入管理界面后每次请求都应该附带id，但是要设置默认id是第一个项目
    },
    target() {
      const h = this.$createElement
      this.$info({
        title: '迭代目标：',
        content: h('div', {}, [
          h(
            'h3',
            this.stageList[window.localStorage.getItem('currStageId')].target,
          ),
        ]),
        onOk() {},
      })
    },
    onChange({ target }) {
      this.isKbShow = false
      this.showList = false
      this.showMember = false
      this.showAnalysis = false
      switch (target.value) {
        case 'kanban':
          this.isKbShow = true
          this.showKbBoard()
          break
        case 'list':
          this.showList = true
          this.showListBoard()
          break
        case 'board':
          this.showAnalysis = true
          break
        case 'member':
          this.showMember = true
          console.log('啊啊啊啊', this.showMember)
          break
        default:
          return true
      }
      return false
    },
    // 切换看板视图
    showKbBoard(type) {
      if (type === 'task') {
        // 切换到需求看板
        this.isTaskShow = true
        this.$store.commit(
          'add/SET_ADD_MODAL_TYPE',
          'task',
        )
      }
      if (type === 'bug') {
        // 切换到缺陷看板
        this.isTaskShow = false
        this.$store.commit(
          'add/SET_ADD_MODAL_TYPE',
          'bug',
        )
      }
      this.getBoardList()
      this.$store.commit('filter/SET_FILTER_MODAL_TYPE', type)
      this.currShow = type
      // this.isKbShow = true
      // 点击重新拉取kb数组，重新渲染
    },
    // 切换列表视图
    showListBoard() {
      // 要在这里getTask，getList，然后拼接
      this.$store.commit('task/SET_LIST_TYPE', 'stage')
    },
    onOpenFilter(type) {
      this.$store.commit('filter/SET_FILTER_MODAL_TYPE', type)
      this.$store.commit('filter/SET_FILTER_MODAL_STATUS', true)
    },

    // 创建迭代
    addStage() {
      console.log(this.newStage)
      this.$store.commit('stage/SET_STAGE_List', this.newStage) // 后面就是commit去数据库了，很多这些commit到store的搭前后端后都要移到数据库
      this.isAddStageVisible = false
      this.init()
      // 做个创建迭代的弹窗
    },
    handleStage({ key }) {
      switch (key) {
        case 'edit':
          this.openEditModal()
          break
        case 'delete':
          this.opendeleteModal()
          break
        default:
          return false
      }
      return true
    },
    closeAddStage() {
      this.isAddStageVisible = false
    },
    onStageDateChange(date, dateString) {
      // console.log(date, dateString)
      const { start, end } = dateString
      this.newStage.start = start
      this.newStage.end = end
    },

    // 编辑/删除迭代
    openEditModal() {
      this.currEditStage.s_id = this.stage.s_id
      this.currEditStage.s_title = this.stage.s_title
      this.currEditStage.s_target = this.stage.s_target
      this.currEditStage.start = dateformat(this.stage.s_start_time)
      console.log(this.stage.start_time)
      this.currEditStage.end = dateformat(this.stage.s_end_time)
      this.isEditStageVisible = true
    },
    openDeleteModal(title) {
      const that = this
      this.$confirm({
        title: (
          <p>
            此操作将删除<span class="warning">「{title}」</span>项目
          </p>
        ),
        content: '您确定要删除该项目吗？',
        async onOk() {
          const res = await deleteStage({ title })
          // 更新项目失败
          if (res.meta.status !== 200) {
            return that.$message.error('删除项目失败')
          }
          that.$message.success('删除项目成功！')
          // 重新获取列表数据
          that.getStage()
          return true
        },
      })
    },
    async editStage(options) {
      if (options === 'add') {
        // console.log(e)
        this.$refs.addFormRef.validate(async (valid, field) => {
          // 有未校验通过的字段
          if (!valid) {
            return this.$message.error('存在错误字段，无法创建')
          }
          if (this.newStage.s_start_time && this.newStage.s_end_time) {
            if (this.newStage.s_start_time - this.newStage.s_end_time > 0) {
              this.$message.warning('截止时间早于开始时间！')
              return false
            }
          }
          if (this.newStage.s_start_time) {
            this.newStage.s_start_time = getTimestamp(
              this.newStage.s_start_time.format('YYYY-MM-DD h:m:s'),
            )
          }
          if (this.newStage.s_end_time) {
            this.newStage.s_end_time = getTimestamp(
              this.newStage.s_end_time.format('YYYY-MM-DD h:m:s'),
            )
          }
          this.newStage.pro_id = this.currProjectID
          console.log('要new的信息', this.newStage)
          const res = await newStage(this.newStage)
          console.log('newStage', res)
          // 创建项目失败
          if (res.meta.status !== 200) {
            return this.$message.error('创建项目失败')
          }
          this.$message.success('创建项目成功！')
          // 隐藏 dialog对话框
          this.$refs.addFormRef.resetFields()
          this.isAddStageVisible = false
          // 重新获取列表数据
          this.init()
          return true
        })
      } else {
        console.log('edit', this.currEditStage)
        if (this.currEditStage.s_start_time && this.currEditStage.s_end_time) {
          if (
            this.currEditStage.s_start_time - this.currEditStage.s_end_time
            > 0
          ) {
            this.$message.warning('截止时间早于开始时间！')
            return false
          }
        }
        if (this.currEditStage.s_start_time) {
          this.currEditStage.s_start_time = getTimestamp(
            this.currEditStage.s_start_time.format('YYYY-MM-DD h:m:s'),
          )
        }
        if (this.currEditStage.s_end_time) {
          this.currEditStage.s_end_time = getTimestamp(
            this.currEditStage.s_end_time.format('YYYY-MM-DD h:m:s'),
          )
        }
        this.currEditStage.pro_id = this.currProjectID
        const res = await updateStage(this.currEditStage)
        // 更新项目失败
        if (res.meta.status !== 200) {
          return this.$message.error('编辑项目失败')
        }
        this.$message.success('编辑项目成功！')
        // 隐藏 dialog对话框
        this.currEditStage = {
          s_id: '',
          pro_id: '', // 连数据库后就不自己设这个了
          s_title: '',
          s_target: '',
          s_start_time: null,
          s_end_time: null,
        }
        this.isEditStageVisible = false
        // 重新获取列表数据
        this.init()
        return true
      }
      return false
    },

    // async函数区
    async getBoardList() {
      const pid = this.currProjectID
      const sid = this.currStageId
      const type = this.isTaskShow === true ? 1 : 0
      console.log('board type', pid)
      const { data: res } = await getBoardList(pid, sid, type)
      this.$store.commit('task/SET_BOARD_LIST', res)
      console.log('boardList', res)
      // this.boardList = res
      return true
    },
    async getTaskDetail(id) {
      const pid = this.currProjectID

      const { data: res } = await getTaskDetail(pid, id)
      this.$store.commit('task/SET_TASK_DETAIL', res)
      if (res.detail.t_level !== 0) {
        console.log('当前任务的father', res.parent[0])
        this.$store.commit('task/SET_CURR_FATHER_TASK', res.parent[0])
      }
      return true
    },
    async getDialog(id) {
      const obj = {
        pid: this.currProjectID,
        source: 'task',
        sid: id,
      }
      const { data: res } = await getDialog(obj)
      this.$store.commit('task/SET_TASK_DIALOG', res)
      return true
    },
    async showDetail(id) {
      console.log('id', id)
      this.$store.commit('task/SET_CURR_EDIT_TASK', id)
      await this.getTaskDetail(id)
      await this.getDialog(id)
      await this.getComment(id)
      this.showTask = true
      // this.detailTaskId = id
    },
    async getComment(id) {
      const params = {
        source: 'task',
        sid: id,
      }
      const { data: res } = await getComment(params)
      // this.dialogList = res
      this.$store.commit('task/SET_TASK_COMMENT', res)
      return true
    },

    async getMemberList() {
      const id = this.currProjectID
      const { data: res } = await getMemberList(id)
      console.log('memberlist', res)
      this.$store.commit('team/SET_CURR_PROJECT_MEMBER_LIST', res)
    },
    // async getTask() {
    //   if (this.isTaskShow === true) {
    //     const params = {
    //       pid: this.currProjectID,
    //       sid: this.currStageId,
    //       type: 1,
    //     }
    //     const { data: res } = await getStageTaskList(params)
    //     this.$store.commit('task/SET_TASK_LIST', res)
    //     console.log('list', res)
    //   } else if (this.isTaskShow === false) {
    //     const params = {
    //       pid: this.currProjectID,
    //       sid: this.currStageId,
    //       type: 0,
    //     }
    //     const { data: res } = await getStageTaskList(params)
    //     this.$store.commit('task/SET_TASK_LIST', res)
    //     console.log('list', res)
    //   }
    //   // this.data = res
    //   return true
    // },
    async deleteTask(id) {
      try {
        const res = await deleteTask(id)
        this.$message.success(res.meta.msg)
        this.getTask()
      } catch (err) {
        // console.log(err)
      }
      return true
    },

    // 新建需求
    onOpenAdd() {
      console.log('add')
      this.$store.commit('add/SET_ADD_FROM_DETAIL', false)
      this.$store.commit(
        'add/SET_ADD_MODAL_TYPE',
        this.isTaskShow === 1 ? 'task' : 'bug',
      )
      this.$store.commit('add/SET_ADD_MODAL_STATUS', true)
    },
    rankColor(done, rank) {
      if (done) {
        return 'side-menu-icon-color'
      }

      switch (rank) {
        case 1:
          return 'success'
        case 2:
          return 'warning'
        case 3:
          return 'danger'
        default:
          return ''
      }
    },
  },
  computed: {
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    currStage() {
      return this.$store.state.stage.currStage
    },
    currStageId() {
      return this.$store.state.stage.currStageId
    },
    stage() {
      return this.$store.state.stage.currStageInfo
    },
    stageList() {
      return this.$store.state.stage.stageList
    },
    isFilterModalOpened() {
      return this.$store.state.filter.isFilterModalOpened
    },
    isAddModalOpened() {
      return this.$store.state.add.isAddModalOpened
    },
    currFilterType() {
      return this.$store.state.filter.currFilterType
    },
    taskList() {
      return this.$store.state.task.taskList
    },
    boardList() {
      return this.$store.state.task.boardList
    },
    board() {
      return this.$store.getters['add/boardInit']
    },
  },
}
</script>

<style lang="scss" scoped>
.noscroll {
  overflow-y: hidden;
}
.kb {
  @apply flex flex-none items-start justify-start overflow-x-auto;
  overflow-x: auto;
  //display:inline-block;
  whith-space: nowrap;
  &-col {
    @apply mr-8 mb-4 p-4 bg-gray-200 rounded-lg list-none;
    box-shadow: 0 10px 20px -2px #cbced6;
    flex-shrink: 0;
    width: 330px;
    height: 520px;
    &__title {
      margin-left: -16px;
      width: 330px;
      background-color: #edf2f7;
      z-index: 999;
      height: 40px;
      font-size: 18px;
      margin-top: -10px;
      border-radius: 2px;
      // box-shadow: 0 10px 15px -5px rgba($secondary, 0.1);
      //position: fixed;
    }
    &__board {
      flex-shrink: 0;
      overflow: auto;
      height: 440px;
    }
    &__item {
      @apply relative mb-4 p-3 pl-4 rounded bg-white cursor-pointer;
      box-shadow: 0 10px 15px -5px rgba($secondary, 0.1);

      @each $color in primary, secondary, success, warning, danger, info {
        &[data-border="#{$color}"] {
          &::before {
            @apply absolute top-0 left-0 h-full w-1 overflow-hidden;
            content: "";
            background: map-get($color-map, $color);
          }
        }
      }
    }
    &__avatar {
      @apply relative -ml-2 cursor-pointer;
      transition: $transition;
      border: 2px solid #fff;
      &:hover {
        transform: translateY(-3px);
        z-index: 10;
      }
    }
  }
}
.title-card {
  //apply bg-gray-200;
  box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
  height: 55px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  //border: 1px solid #dfdada;
  position: relative;
  // apply flex-no-wrap p-2 rounded-lg bg-white overflow-auto;
  // &__title {
  //   apply ml-2  text-2xl font-bold;
  //   color: rgba($secondary, 0.8);
  // }
}
.wl {
  float: left;
}
.wr {
  float: right;
}
::-webkit-scrollbar {
  width: 4px;
  height: 10px;
  background-color: transparent;
}
.boardItem {
  &.done {
    color: #b7b8bb;
    text-decoration: line-through;
  }
}
</style>
