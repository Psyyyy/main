<template>
  <div class="tableCommon-wrapper">
    <a-table
      :columns="tableHead"
      :data-source="tableData"
      :loading="loading"
      :pagination="pagination"
      :row-selection="rowSelection"
      @change="handleTableChange"
      row-key="id"
      :scroll="scroll"
    >
      <template
        slot-scope="text, record, index,tags"
        :slot="slot"
        v-for="slot in Object.keys($scopedSlots).filter(key => key !== 'expandedRowRender')"
      >
        <slot :name="slot" v-bind="{ text, record, index,tags }"></slot>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'standardTable',
  props: {
    tableHead: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean || Object,
    },
    rowSelection: {
      type: Object,
    },
    scroll: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  methods: {
    handleTableChange(val) {
      this.$emit('changeCurrent', val.current)
    },
  },
}
</script>
<style lang="scss" scoped></style>
