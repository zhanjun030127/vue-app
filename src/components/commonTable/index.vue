<template>
  <div class="base-table">
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <template v-for="item in columns" :key="item.prop">
        <el-table-column
          v-if="item.type === 'selection'"
          type="selection"
          :width="item.width"
          :label="item.label"
        >
        </el-table-column>
        <el-table-column
          v-else-if="item.type === 'index'"
          type="index"
          key="selection"
          :width="item.width"
          :label="item.label"
        >
        </el-table-column>
        <el-table-column
          v-else-if="item.render"
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :align="item.align"
        >
          <template #default="{ row }">
            <slot :row="row" :name="item.prop"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :label="item.label"
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
          :align="item.align"
          :prop="item.prop"
          :formatter="item.formatter"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: [],
  },
  tableData: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(["selectionChange", "currentChange"]);
// 多选
const handleSelectionChange = (rows) => {
  emit("selectionChange", rows);
};
//选中某行数据
const handleCurrentChange = (row) => {
  emit("currentChange", row);
};
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: end;
  margin-top: 10px;
}
</style>
