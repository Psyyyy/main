/* eslint-disable */
<template>
  <div class="todo-app">
    <a-row :gutter="24">

        <x-card>
          <div slot="content" class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="16 ">

                             <a-col :md="3" :sm="24"  class="flex-no-wrap">
               <a-button
        class="w-full flex justify-center items-center"
        size="large"
        type="primary"
        @click="handleAdd"
      >
        <feather
          class="mr-1"
          size="20"
          type="plus"
        />
        新增需求
      </a-button>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-item label="关键词">
                    <a-input
                      v-model="nouseData"
                      allow-clear
                      placeholder="请输入姓名、账号、手机号"
                    />
                  </a-form-item>
                </a-col>
                <a-col :md="5" :sm="24">
                  <a-form-item label="状态">
                    <a-select
                      v-model="selectValue"
                      mode="multiple"
                      style="width:200px"
                      placeholder="select one country"
                      option-label-prop="label"
                    >
                      <a-select-option value="china" label="China">
                        <span role="img" aria-label="China">
                          🇨🇳
                        </span>
                        China (中国)
                      </a-select-option>
                      <a-select-option value="usa" label="USA">
                        <span role="img" aria-label="USA">
                          🇺🇸
                        </span>
                        USA (美国)
                      </a-select-option>
                      <a-select-option value="japan" label="Japan">
                        <span role="img" aria-label="Japan">
                          🇯🇵
                        </span>
                        Japan (日本)
                      </a-select-option>
                      <a-select-option value="korea" label="Korea">
                        <span role="img" aria-label="Korea">
                          🇰🇷
                        </span>
                        Korea (韩国)
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24" >
                  <a-button
        class=" justify-center items-center"
        size="medium"
        type="primary"
        @click="onOpenDrawer"
      >

        查询
      </a-button>

                    <a-button
        class=" justify-center items-center"
        size="medium"
        @click="onOpenDrawer"
      >

        重置
      </a-button>
                </a-col>
              </a-row>
            </a-form>
          </div>
        </x-card>
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
            :scroll="{ y: 500 }"
            :row-key="record => record.id"
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
                :placeholder="`查找${column.title}`"
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
                @click="showTask = true"
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
                <span class="task-pointer" @click="showTask = true">{{
                  text
                }}</span>
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
              需求</span
            >
            <!-- 优先级 -->
            <span slot="rank" slot-scope="rank">
              <div style="text-align:center" v-if="rank !== ''">
                <a-tag
                  :color="
                    rank === '3' ? 'red' : rank === '2' ? 'geekblue' : 'green'
                  "
                >
                  {{ rank === "3" ? "高" : rank === "2" ? "中" : "低" }}
                </a-tag>
              </div>
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
            <!-- 操作 -->
            <span style="text-align:center" slot="action" slot-scope="" >
              <template>
                <!-- <a-divider type="vertical" /> -->
                <a-popconfirm placement="topRight" title="删除本菜单与下级？">
                  <a-icon type="delete"   theme="twoTone" two-tone-color="#ea2e47"/>
                  <!-- <a-button type="danger" icon="delete" size="small" /> -->
                </a-popconfirm>
              </template>
            </span>
          </a-table>

          <!-- <add-form ref="addForm" @ok="handleOk"/>
    <edit-form ref="editForm" @ok="handleOk"/> -->
        </a-card>
        <task-detail :pop-visible="showTask" @close="showTask = false" />

    </a-row>
  </div>
</template>

<script>
import { Empty } from 'ant-design-vue'
// import STable from '../../components/Table'
import XCard from '../../components/xnComponents/XCard.vue'
import TaskDetail from './Task.vue'
// import { getOrgTree } from '@/api/modular/system/orgManage'
// import { getUserPage, sysUserDelete, sysUserChangeStatus, sysUserResetPwd } from '@/api/modular/system/userManage'
// import { sysDictTypeDropDown } from '@/api/modular/system/dictManage'

export default {
  components: { XCard, TaskDetail },
  data() {
    return {
      columns: [
        {
          dataIndex: 'task',
          key: 'task',
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
          dataIndex: 'rank',
          key: 'rank',
          width: '100px',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.rank - b.rank,
          scopedSlots: { customRender: 'rank' },
        },
        {
          title: '迭代',
          key: 'stage',
          width: '100px',
          dataIndex: 'stage',
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
        },
        {
          title: '处理人',
          dataIndex: 'member',
          key: 'member',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'member',
          },
          onFilter: (value, record) => record.member.children.member
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
          dataIndex: 'start',
          key: 'start',
        },
        {
          title: '预计结束',
          dataIndex: 'end',
          key: 'end',
        },
        {
          title: '操作',
          key: 'action',

          scopedSlots: { customRender: 'action' },
        },
      ],
      data: [
        {
          id: '1',
          task: '开发功能',
          rank: '3',
          stage: '迭代1',
          state: '规划中',
          member: 'judy',
          start: '2021.1.1',
          end: '2021.3.1',
          children: [
            {
              id: '11',
              task: '故人西辞黄鹤楼，烟花三月下扬州',
              rank: '3',
              stage: '迭代1',
              state: '规划中',
              member: 'jack',
              start: '2021.1.1',
              end: '2021.3.1',
            },
            {
              id: '12',
              task: '开发功能',
              rank: '2',
              stage: '迭代1',
              state: '规划中',
              member: 'amy',
              start: '2021.1.1',
              end: '2021.3.1',
            },
            {
              id: '13',
              task:
                '故人西辞黄鹤楼，烟花三月下扬州,故人西辞黄鹤楼，烟花三月下扬州',
              rank: '1',
              stage: '迭代1',
              state: '规划中',
              member: 'lily',
              start: '2021.1.1',
              end: '2021.3.1',
            },
          ],
        },
        {
          id: '2',
          task: '故人西辞黄鹤楼，烟花三月下扬州',
          rank: '1',
          stage: '迭代1',
          state: '规划中',
          member: 'amy',
          start: '2021.1.1',
          end: '2021.3.1',
          children: [],
        },
        {
          id: '3',
          task: '故人西辞黄鹤楼，烟花三月下扬州',
          rank: '1',
          stage: '迭代1',
          state: '规划中',
          member: 'monica',
          start: '2021.1.1',
          end: '2021.3.1',
          children: [
            {
              id: '31',
              task: '故人西辞黄鹤楼，烟花三月下扬州',
              rank: '2',
              stage: '迭代1',
              state: '规划中',
              member: 'amy',
              start: '2021.1.1',
              end: '2021.3.1',
            },
            {
              id: '32',
              task: '开发功能',
              rank: '3',
              stage: '迭代1',
              state: '规划中',
              member: 'joey',
              start: '2021.1.1',
              end: '2021.3.1',
            },
            {
              id: '33',
              task: '故人西辞黄鹤楼，烟花三月下扬州',
              rank: '2',
              stage: '迭代1',
              state: '规划中',
              member: 'amy',
              start: '2021.1.1',
              end: '2021.3.1',
            },
            {
              id: '34',
              task: '故人西辞黄鹤楼，烟花三月下扬州',
              rank: '2',
              stage: '迭代1',
              state: '规划中',
              member: 'amy',
              start: '2021.1.1',
              end: '2021.3.1',
            },
          ],
        },
      ],
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
    }
  },

  created() {},
  methods: {
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
      const { data } = this
      const random = Math.ceil(Math.random() * 30)
      const newData = {
        id: random,
        task: '',
        rank: '',
        stage: '',
        state: '',
        member: '',
        start: '',
        end: '',
      }
      this.data = [...data, newData]
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
                  if (id === this.expandRows[i]) this.expandRows.splice(i, 1)
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
.menu-title{
  padding-top:10px;
  padding-left:10px;
    font-size: 16px;
    color: #3f4a56;
    font-weight: normal;
    .span{
      margin-left: 0;
    font-size: 16px;
    color: #3f4a56;}
}
</style>
