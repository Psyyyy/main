<template>
  <div class="todo-app">
    <div>

      <div class="relative flex flex-no-wrap task-list mt-3 pl-6">
         <h3 class="section-card__title">{{currListType==='stage'?'迭代任务':currListType==='task'?'需求管理':'缺陷管理'}}</h3>
        <div class="flex ml-auto">
<a-button
            class="ml-1 w-30 flex "
            type="primary"

          >
            <feather class="mr-1 mt-1" size="20" type="plus" />
            新增{{currListType==='task'?'需求':currListType==='stage'?'需求':'缺陷'}}
          </a-button>

        </div>
      </div>
      <div>
        <a-card :bordered="false">
<a-table :columns="columns" :data-source="data" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
    <template slot="title" slot-scope="">
      Header
    </template>
    <template slot="footer" slot-scope="">
      Footer
    </template>
  </a-table>
        </a-card>
      </div>

      <task :pop-visible="showTask" detail="detailTaskId" @close="closeDetail" />
      <add-modal />
    </div>
  </div>
</template>
<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
]

export default {
  data() {
    return {
      name: 'MemberRes',
      data,
      columns,
    }
  },

}
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>
