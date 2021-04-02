/* eslint-disable */
<template>
  <div class="todo-app">
    <div>

      <div class="relative flex flex-no-wrap task-list mt-3 pl-6">
         <h3 class="section-card__title">{{currListType==='stage'?'迭代任务':currListType==='task'?'需求管理':'缺陷管理'}}</h3>
        <div class="flex ml-auto">
<a-button
            class="ml-1 w-30 flex "
            type="primary"
            @click="onOpenAdd()"

          >
            <feather class="mr-1 mt-1" size="20" type="plus" />
            新增{{currListType==='task'?'需求':currListType==='stage'?'需求':'缺陷'}}
          </a-button>
          <a-button
            class="ml-1 mr-4 flex"
            @click="onOpenFilter()"
          >
            <feather class="mr-1" size="18" type="search" />
            筛选</a-button
          >
           <a-button
            class="ml-1 mr-4 flex"
            @click="resetTable()"
          >
            <feather class="mr-1 " size="18" type="refresh-cw" />
            清除筛选</a-button
          >
        </div>
        <div class="mr-4">
          <a-dropdown>
            <a-button >更多操作<a-icon type="down" /></a-button>
            <a-menu slot="overlay">
              <a-menu-item>
                <a>导入需求</a>
              </a-menu-item>
              <a-menu-item>
                <a>导出需求</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

        </div>
      </div>
      <div>
        <a-card :bordered="false">
          <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <i class="anticon anticon-info-circle ant-alert-icon"></i
            >已选择&nbsp;<a style="font-weight: 600">{{
              this.selectedRowKeys.length
            }}</a
            >项&nbsp;&nbsp;
            <a style="margin-left: 24px" @click="clearSele()">清空</a>
          </div> -->
          <!-- 需求表格 -->
          <a-table
            ref="table"
            size="middle"
            :scroll="{ y: 490 }"
            :row-key="record => (record.id+'')"
            :pagination="false"
            :default-expand-all-rows="false"
            :columns="columns"
            :data-source="data"
            :loading="loading"
            show-pagination="auto"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange
            }"
            :expanded-row-keys="expandRows"
            :expand-icon="props => expandRowIcon(props)"
            :custom-row="customRow"
            :row-class-name="rowClass"
          >
            <!--:rowSelection="rowSelectionon"-->
            <!-- 搜索弹框 -->
            <div
              slot="filterDropdown"
              slot-scope="{
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
                column
              }"
              style="padding: 8px"
            >
              <a-input
                v-ant-ref="c => (searchInput = c)"
                :placeholder="`查找${column.t_title}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block;"
                @change="
                  e => setSelectedKeys(e.target.value ? [e.target.value] : [])
                "
                @pressEnter="
                  () => handleSearch(selectedKeys, confirm, column.dataIndex)
                "
              />
              <a-button
                type="primary"
                icon="search"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="
                  () => handleSearch(selectedKeys, confirm, column.dataIndex)
                "
              >
                查找
              </a-button>
              <a-button
                size="small"
                style="width: 90px"
                @click="() => handleReset(clearFilters)"
              >
                重置
              </a-button>
            </div>
            <!-- 搜索图标 -->
            <a-icon
              slot="filterIcon"
              slot-scope="filtered"
              type="search"
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
            <!-- 需求条目 -->

            <template slot="task" slot-scope="text, record, index, column">
              <!-- 搜索结果展示 -->
              <span
                v-if="searchText && searchedColumn === column.dataIndex"
                class="task-pointer"
                @click="showDetail(record.id)"
              >
                <template
                  v-for="(fragment, i) in text
                    .toString()
                    .split(
                      new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')
                    )"
                >
                  <mark
                    v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                    :key="i"
                    class="highlight"
                    >{{ fragment }}</mark
                  >
                  <template v-else>{{ fragment }}</template>
                </template>
              </span>

              <template v-else>
                <span class="task-pointer" @click="showDetail(record.id)">
                  <a-tag v-if="currListType==='stage'" :color="record.t_type===1?'blue':'red'">
       {{record.t_type===1?'需求':'缺陷'}}
      </a-tag>
                  {{text}}
                  </span>
                <!-- <editable-cell
            :text="text"
            @change="onCellChange(record.key, 'name', $event)"
          /> -->
              </template>
            </template>
            <span slot="all" style="margin-right:5px"
              ><div
                class="expand-icon"
                @click="expandAllRow"
                v-show="!isExpandAll"
              >
                +
              </div>
              <div
                class="expand-icon"
                @click="closeAllRow"
                v-show="isExpandAll"
              >
                -
              </div>
              任务</span
            >
            <!-- 优先级 -->
            <span slot="rank" slot-scope="rank">
              <div v-if="rank !== ''">
                <a-tag
                  :color="
                    rank === 3 ? '#ff5b5c' : rank === 2 ? '#fdac41' : '#28c175'
                  "
                >
                  {{ rank === 3 ? "非常紧急" : rank === 2 ? "紧急" : "普通" }}
                </a-tag>
              </div>
            </span>

            <!-- 状态 -->
                        <span slot="state" slot-scope="state">
              <div class="pr-2" v-if="state">
                <a-tag
                  :color="stateColor(state)"
                >
                  {{ state }}
                </a-tag>
              </div>
              <div v-else>-</div>
            </span>
            <!-- 负责人 -->
            <template slot="member" slot-scope="text, record, index, column">
              <!-- 搜索结果展示 -->
              <span v-if="searchText && searchedColumn === column.dataIndex">
                <template
                  v-for="(fragment, i) in text
                    .toString()
                    .split(
                      new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')
                    )"
                >
                  <mark
                    v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                    :key="i"
                    class="highlight"
                    >{{ fragment }}</mark
                  >
                  <template v-else>{{ fragment }}</template>
                </template>
              </span>

              <template v-else>
                <span>{{ text }}</span>
                <!-- <editable-cell
            :text="text"
            @change="onCellChange(record.key, 'name', $event)"
          /> -->
              </template>
            </template>
            <!-- 日期 -->
            <span style="text-align:center" slot="start" slot-scope="start">
              <template v-if="start">
                {{start|dateFormat}}
              </template>
              <template v-else>
               -
              </template>
            </span>
            <span style="text-align:center" slot="end" slot-scope="end">
              <template v-if="end">
                {{end|dateFormat}}
              </template>
              <template v-else>
               -
              </template>
            </span>
            <!-- 操作 -->
            <span style="text-align:center" slot="action" slot-scope="record">
              <template>
                <!-- <a-divider type="vertical" /> -->
                <a-popconfirm placement="topRight" title="删除本菜单与下级？"  @confirm="deleteTask(record.id)">
                  <a-icon
                    class="cursor-pointer"
                    type="delete"
                    theme="twoTone"
                    two-tone-color="#ea2e47"

                  />
                  <!-- <a-button type="danger" icon="delete" size="small" /> -->
                </a-popconfirm>
              </template>
            </span>
          </a-table>

          <!-- <add-form ref="addForm" @ok="handleOk"/>
    <edit-form ref="editForm" @ok="handleOk"/> -->
        </a-card>
      </div>

      <task :pop-visible="showTask" detail="detailTaskId" @close="closeDetail" />
      <filter-modal />
      <add-modal />
    </div>
  </div>
</template>

<script>
import { Empty } from 'ant-design-vue'
import {
  getTaskList, deleteTask,
  getTaskDetail, getStageTaskList,
} from '@/api/task'
import { getComment } from '@/api/comment'
import { getDialog } from '@/api/dialog'
// import STable from '../../components/Table'
import { getMemberList } from '@/api/member'
import AddModal from '@/components/AddModal.vue'
import Task from './Task.vue'
import FilterModal from '../kanban/components/FilterModal.vue'
// import { getOrgTree } from '@/api/modular/system/orgManage'
// import { getUserPage, sysUserDelete, sysUserChangeStatus, sysUserResetPwd } from '@/api/modular/system/userManage'
// import { sysDictTypeDropDown } from '@/api/modular/system/dictManage'

export default {
  name: 'TaskList',
  components: { Task, FilterModal, AddModal },
  data() {
    return {
      columns: [
        {
          dataIndex: 't_title',
          key: 't_title',
          ellipsis: true,
          width: '400px',
          slots: { title: 'all' },
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'task',
          },
          onFilter: (value, record) => record.task.children.task
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          },
        },
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          scopedSlots: { customRender: 'id' },
          width: '90px',
        },
        {
          title: '优先级',
          dataIndex: 't_rank',
          key: 't_rank',
          width: '100px',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.t_rank - b.t_rank,
          scopedSlots: { customRender: 'rank' },
        },
        {
          title: '迭代',
          key: 't_stage_name',
          width: '80px',
          dataIndex: 't_stage_name',
        },
        {
          title: '状态',
          dataIndex: 't_state',
          width: '80px',
          key: 't_state',
          scopedSlots: { customRender: 'state' },
        },
        {
          title: '处理人',
          dataIndex: 't_header_name',
          key: 't_header_name',

          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'member',
          },
          onFilter: (value, record) => record.member.children.t_header_name
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus()
              }, 0)
            }
          },
        },
        {
          title: '预计开始',
          dataIndex: 'start_time',
          key: 'start_time',
          scopedSlots: { customRender: 'start' },
        },
        {
          title: '预计结束',
          dataIndex: 'end_time',
          key: 'end_time',
          scopedSlots: { customRender: 'end' },
        },
        {
          title: '操作',
          key: 'action',
          width: '50px',
          scopedSlots: { customRender: 'action' },
        },
      ],
      // data: [],
      expandRows: [],
      isExpandAll: false,
      showTask: false,
      loading: false,
      isTodoMenuOpened: true,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      selectedRowKeys: [],
      typeDict: [],
      clickRowId: '',
      selectValue: ['china'],
      treeLoading: false,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      nouseData: '',
      detailTaskId: '',

      dialogList: {},
      detail: {},
    }
  },
  created() {
    this.getTask()
    this.getMemberList()
  },

  computed: {
    data() {
      return this.$store.state.task.taskList
    },
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    isAddModalOpened() {
      return this.$store.state.add.isAddModalOpened
    },
    currListType() {
      return this.$store.state.task.currListType
    },
    currStageId() {
      return this.$store.state.stage.currStageId
    },
  },
  watch: {
    currProjectID() {
      this.getTask()
    },
    showTask() {
      this.getTask()
    },
    isAddModalOpened() {
      this.getTask()
    },
    currListType() {
      this.getTask()
    },
    currStageId() {
      this.getTask()
    },
    // isFilterModalOpened() {
    //   if (this.$store.state.filter.isFilterModalOpened === false) {
    //     this.getTask()
    //   }
    // },

  },
  methods: {
    closeDetail() {
      this.showTask = false
    },
    async getMemberList() {
      const id = this.currProjectID
      const { data: res } = await getMemberList(id)
      console.log('memberlist', res)
      this.$store.commit('team/SET_CURR_PROJECT_MEMBER_LIST', res)
    },
    async getTask() {
      const pid = this.currProjectID
      const sid = this.currStageId
      if (this.currListType === 'stage') {
        const { data: res } = await getStageTaskList(pid, sid)
        this.$store.commit('task/SET_TASK_LIST', res)
        console.log('stage模块list', res)
      } else {
        const type = this.currListType === 'task' ? 1 : 0// type:1-需求，2-bug，迭代就是12
        const { data: res } = await getTaskList(pid, type)
        this.$store.commit('task/SET_TASK_LIST', res)
        console.log('需求/缺陷模块list', res)
      }

      // this.data = res
      return true
    },
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
    async logOut() {
      const CAN_LOGOUT = await this.$store.dispatch('user/logout')

      if (CAN_LOGOUT) {
        this.$message.success('成功退出')
        this.$router.replace({ name: 'Login' })
      }
    },
    // 占位函数
    nouse() {
      console.log('占位')
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    clearSele() {
      this.selectedRowKeys = []
    },

    // 条目搜索
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm()

      const [first] = selectedKeys
      this.searchText = first
      this.searchedColumn = dataIndex
    },
    handleReset(clearFilters) {
      clearFilters()
      this.searchText = ''
    },

    handleAdd() {
    },
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find((item) => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },

    expandAllRow() {
      this.isExpandAll = true

      const expandRowKeys = []
      const rows = [...this.data]

      for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i] // row是一行数据
        // const { rowKey } = this

        if (row.children !== undefined) {
          expandRowKeys.push(`${row.id}`)
          for (let k = 0; k < row.children.length; k += 1) {
            const childRow = row.children[k]
            if (childRow.children !== undefined) expandRowKeys.push(`${childRow.id}`)
          }
        }
        // const key = typeof rowKey === 'function' ? rowKey(row, i) : row[rowKey]
        // if (key === undefined) {
        //   expandRowKeys.push(`${i}`)
        // } else {
        //   expandRowKeys.push(`${key}`)
        // }
      }
      this.expandRows = expandRowKeys
    },
    closeAllRow() {
      this.isExpandAll = false
      this.expandRows = []
    },
    // 单个展开，这个函数是点击触发
    expandRowIcon(props) {
      if (
        props.record.children !== undefined
        && props.record.children.length > 0
      ) {
        const { id } = props.record
        if (props.expanded) {
          // 点击的按钮是[-]，则进行收缩操作
          return (
            <div
              class="expand-icon"
              onClick={() => {
                // _.pull(this.expandRows, `${id}`)
                // this.expandRows.pop()
                for (let i = 0; i < this.expandRows.length; i += 1) {
                  if (`${id}` === this.expandRows[i]) this.expandRows.splice(i, 1)
                }
              }}
            >
              -
            </div>
          )
        }
        return (
          <div
            class="expand-icon"
            onClick={() => {
              this.expandRows.push(`${id}`)
            }}
          >
            +
          </div>
        )
      }
      return <span style="margin-left:25px"></span>
    },
    // 鼠标移动悬浮
    customRow(record) {
      return {
        // 这个style就是我自定义的属性，也就是官方文档中的props
        style: {},
        on: {
          click: () => {
            this.clickRowId = record.id
          },
          mouseenter: (event) => {
            event.currentTarget.style.transform = 'translateY(-3px)'
            event.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(71, 95, 123, 0.1)'
            event.currentTarget.style.backgroundColor = '#fff'
            event.currentTarget.style.transition = 'all 0.3s ease'
          },
          mouseleave: (event) => {
            event.currentTarget.style.transform = ''
            event.currentTarget.style.boxShadow = ''
          },
        },
      }
    },
    // // 隔行变色
    rowClass(record) {
      // let className = 'light-row'
      // if (index % 2 === 1) className = 'dark-row'
      // return className
      return record.id === this.clickRowId ? 'clickRowColor' : ''
    },
    stateColor(state) {
      switch (state) {
        case '规划中':
          return 'pink'
        case '实现中':
          return 'blue'
        case '已实现':
          return 'cyan'
        case '已拒绝':
          return 'purple'
        case '已验收':
          return 'green'
        case '已关闭':
          return '#626262'
        // 缺陷
        case '新':
          return 'orange'
        case '处理中':
          return 'blue'
        case '已解决':
          return 'green'
        default:
          return '#626262'
      }
    },
    onOpenFilter() {
      this.$store.commit('filter/SET_FILTER_MODAL_TYPE', 'task')
      this.$store.commit('filter/SET_FILTER_MODAL_STATUS', true)
    },
    onOpenAdd() {
      console.log('add')
      this.$store.commit('add/SET_ADD_FROM_DETAIL', false)
      this.$store.commit('add/SET_ADD_MODAL_TYPE', 'task')
      this.$store.commit('add/SET_ADD_MODAL_STATUS', true)
    },
    resetTable() {
      this.getTask()
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
  },
}
</script>

<style lang="scss" scoped>
.table-operator {
  margin-bottom: 18px;
}
button {
  margin-right: 8px;
}
.task-pointer {
  cursor: pointer; //变小手
  &:hover {
    color: #108ee9; //变色
  }
}
.expand-icon {
  margin-right: 8px;
  margin-top: -13px;
  text-align: center; //文字居中（垂直、水平）
  display: inline-block;
  font-size: 15px; //文字大小
  width: 17px;
  height: 17px;
  line-height: 13px;
  border-radius: 2px; //圆角
  color: #475f7b; //文字颜色
  background-color: #fff; //盒子颜色
  border: 1px solid #d6d4d4; //文字边框样式
  cursor: pointer; //鼠标变小手
  &:hover {
    //鼠标悬停样式
    color: #6485ff; //变色
    border: 1px solid #6485ff;
    transition: all 0.3s;
  }
}
.todo-app {
  @apply relative w-full flex bg-white rounded-lg overflow-hidden;
  margin-top: -30px;
  height: 600px;
  min-height: 600px;
}
.table-page-search-wrapper {
  .ant-form-inline {
    .ant-form-item {
      display: flex;
      margin-right: 0;

      .ant-form-item-control-wrapper {
        flex: 1 1;
        display: inline-block;
        vertical-align: middle;
      }

      > .ant-form-item-label {
        line-height: 32px;
        padding-right: 8px;
        width: auto;
      }
      .ant-form-item-control {
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    white-space: nowrap;
  }
}
.menu-title {
  padding-top: 10px;
  padding-left: 10px;
  font-size: 16px;
  color: #3f4a56;
  font-weight: normal;
  .span {
    margin-left: 0;
    font-size: 16px;
    color: #3f4a56;
  }
}
</style>
