<template>
  <div class="table-wrapper">
    <a-card :hoverable="true" :bordered="false">
      <div slot="title" class="flex flex-wrap">
        <a-button
          type="danger"
          icon="delete"
          style="margin:0 16px 10px"
          :loading="deleteLoading"
          @click="batchDeleteTable"
        >
          批量删除
        </a-button>
        <div class="filter-wrapper">
          <span class="label">付款人：</span>
          <a-input placeholder="付款人" class="select-width" v-model="filterList.name" />
        </div>
        <div class="filter-wrapper" style="margin:0 15px">
          <span class="label">订单状态：</span>
          <a-select placeholder="订单状态" class="select-width" allow-clear @change="changeStatus">
            <a-select-option v-for="item in typeOption" :key="item.key" :value="item.key">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>

        <a-button type="primary" icon="search" class="select-bottom" style="margin-right:16px" @click="search">
          查询
        </a-button>
        <a-button type="primary" icon="export" class="select-bottom" :loading="exportLoading" @click="handleExport">
          导出
        </a-button>
      </div>

        <standard-table
          :table-data="tableData"
          :table-head="tableHead"
          :loading="loading"
          :pagination="{
            pageSize: filterList.size,
            current: filterList.page,
            total: filterList.total,
            showTotal: total => `${filterList.total} 条`
          }"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: handleSelect }"
          @changeCurrent="handleChangeCurrent"
        >
          <div slot="index" slot-scope="{ index }">
            {{ index + 1 }}
          </div>
           <div slot="tags" slot-scope="{tags}">
      <a-tag
        v-for="tag in tags"
        :key="tag"
        :color="tag === '高' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
      >
        {{ tag.toUpperCase() }}
      </a-tag>
      </div>
          <div slot="text" slot-scope="{ task }"> {{ task }}</div>

          <div slot="action" slot-scope="{ text }">
            <a-button type="primary" size="small" @click="handleEdit(text)">
              编辑
            </a-button>
            <a-popconfirm title="你确定要删除当前列吗?" ok-text="是" cancel-text="否" @confirm="handleDelete(text)">
              <a-button type="danger" size="small" style="margin-left:8px">
                删除
              </a-button>
            </a-popconfirm>
          </div>
        </standard-table>
    </a-card>

    <a-modal
      title="编辑"
      :visible="editShow"
      ok-text="确认"
      cancel-text="取消"
      :width="620"
      @ok="handleOk"
      @cancel="editShow = false"
    >
      <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" hide-required-mark>
        <a-form-model-item prop="id" label="id">
          <a-input v-model="currentEdit.id" disabled />
        </a-form-model-item>
        <a-form-model-item prop="name" label="付款人">
          <a-input v-model="currentEdit.name" disabled />
        </a-form-model-item>
        <a-form-model-item prop="status" label="订单状态">
          <a-input v-model="currentEdit.status" disabled />
        </a-form-model-item>
        <a-form-model-item prop="date" label="下单时间">
          <a-input v-model="currentEdit.date" disabled />
        </a-form-model-item>
        <a-form-model-item prop="money" label="付款金额">
          <a-input v-model="currentEdit.money" disabled />
        </a-form-model-item>
        <a-form-model-item prop="text" label="备注">
          <a-input v-model="currentEdit.text" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import standardTable from '../../components/StandardTable.vue'

export default {
  name: 'tables',
  components: { standardTable },
  data() {
    return {
      typeOption: [
        {
          key: '待付款',
          label: '待付款',
        },
        {
          key: '待发货',
          label: '待发货',
        },
        {
          key: '已发货',
          label: '已发货',
        },
        {
          key: '已收货',
          label: '已收货',
        },
        {
          key: '已评价',
          label: '已评价',
        },
      ],
      tableHead: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          scopedSlots: { customRender: 'id' },
          width: 60,
        },
        {
          title: '需求',
          dataIndex: 'task',
          key: 'task',
          ellipsis: true,
          scopedSlots: { customRender: 'text' },
        },
        {
          title: '优先级',
          dataIndex: 'rank',
          key: 'rank',
          scopedSlots: { customRender: 'tags' },
        },
        {
          title: '迭代',
          key: 'stage',
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
      tableData: [{
        id: '1',
        title: '开发功能',
        rank: '高',
        stage: '迭代1',
        state: '规划中',
        member: 'amy',
        start: '2021.1.1',
        end: '2021.3.1',
        children: [
          {
            id: '1',
            title: '开发功能',
            rank: '高',
            stage: '迭代1',
            state: '规划中',
            member: 'amy',
            start: '2021.1.1',
            end: '2021.3.1',
          },
          {
            id: '1',
            title: '开发功能',
            rank: '高',
            stage: '迭代1',
            state: '规划中',
            member: 'amy',
            start: '2021.1.1',
            end: '2021.3.1',
          },
          {
            id: '1',
            title: '开发功能',
            rank: '高',
            stage: '迭代1',
            state: '规划中',
            member: 'amy',
            start: '2021.1.1',
            end: '2021.3.1',
          },
        ],
      },
      {
        id: '1',
        title: '开发功能',
        rank: '高',
        stage: '迭代1',
        state: '规划中',
        member: 'amy',
        start: '2021.1.1',
        end: '2021.3.1',
      },
      {
        id: '1',
        title: '开发功能',
        rank: '高',
        stage: '迭代1',
        state: '规划中',
        member: 'amy',
        start: '2021.1.1',
        end: '2021.3.1',
        children: [
          {
            id: '1',
            title: '开发功能',
            rank: '高',
            stage: '迭代1',
            state: '规划中',
            member: 'amy',
            start: '2021.1.1',
            end: '2021.3.1',
          },
          {
            id: '1',
            title: '开发功能',
            rank: '高',
            stage: '迭代1',
            state: '规划中',
            member: 'amy',
            start: '2021.1.1',
            end: '2021.3.1',
          },
        ],
      }],
      loading: false,
      selectedRowKeys: [],
      selectValue: [],
      currentEdit: {},
      editShow: false,
      filterList: {
        name: '',
        status: '',
        page: 1,
        size: 15,
        total: 0,
      },
      deleteLoading: false,
      exportLoading: false,
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    handleSelect(key, value) {
      this.selectedRowKeys = key
      this.selectValue = value
    },

    changeStatus(val) {
      this.filterList.status = val
    },
    handleChangeCurrent(val) {
      this.filterList.page = val
      this.getTableData()
    },
    search() {
      this.filterList.page = 1
      this.getTableData()
    },
    handleEdit(val) {
      this.currentEdit = { ...val }
      this.editShow = true
    },

    // 导出
    // handleExport() {
    //   // 由于是前端导出，所以只能导出当前的页的15条数据
    //   this.exportLoading = true
    //   import('@/vendor/Export2Excel').then((excel) => {
    //     const header = []
    //     const filterVal = []
    //     this.tableHead.forEach((item) => {
    //       if (item.title !== '操作' && item.title != '序号') {
    //         header.push(item.title)
    //         filterVal.push(item.dataIndex)
    //       }
    //     })
    //     const data = formatJson(this.tableData, filterVal)
    //     excel.export_json_to_excel({
    //       header,
    //       data,
    //       filename: '表单统计',
    //     })
    //     this.exportLoading = false
    //   })
    // },
  },
}
</script>
<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .filter-wrapper {
    width: 230px;
    .label {
      min-width: 80px;
    }
    .select-width {
      width: 150px;
    }
  }
}
</style>
