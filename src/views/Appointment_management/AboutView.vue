<template>
  <div class="crad">
    <div class="search">
      <span>姓名</span>
      <el-input
        v-model="input2"
        style="width: 240px"
        placeholder="请输入"
        :prefix-icon="Search"
      />
    </div>

    <div class="block">
      <span>预约时间</span>
      <el-date-picker
        v-model="value1"
        style="width: 240px"
        type="datetimerange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-time="defaultTime1"
      />
    </div>

    <div class="block">
      <span>预约状态</span>
      <el-select
        v-model="value"
        clearable
        placeholder="全部"
        style="width: 240px"
      >
        <el-option
          v-for="(item, index) in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @click="selectBtn(index)"
        />
      </el-select>
    </div>
    <div class="btn">
      <el-button type="primary" icon="Search">查询</el-button>
      <el-button icon="Refresh" class="watt-plain-btn">重置</el-button>
    </div>
  </div>
  <div
    class="crad"
    style="
      margin-top: 20px;
      height: calc(100% - 20px - 72px);
      flex-direction: column;
    "
    ref="table"
  >
    <div class="Controls">
      <div>
        <el-button
          type="primary"
          icon="CirclePlus"
          @click.stop="dialogVisibleBtn()"
          >新增用户</el-button
        >
        <el-button type="danger" icon="Delete">批量删除</el-button>
      </div>
      <div>
        <el-button
          type="primary"
          icon="Bottom"
          circle
          @click="canvas()"
        ></el-button>
        <el-button type="danger" icon="RefreshRight" circle></el-button>
      </div>
    </div>
      <el-table :data="tableData" style="width: 100%" height="100%">
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column
          label="创建时间"
          align="center"
          prop="formatted_time"
        />
        <el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="role" label="角色" align="center">
          <template #default="scope">
            <el-tag
              v-if="scope.row.role == 1"
              type="primary"
              effect="plain"
              disable-transitions
              >工作人员</el-tag
            >
            <el-tag
              v-else-if="scope.row.role == 2"
              type="warning"
              effect="plain"
              disable-transitions
              >客户</el-tag
            >
            <el-tag v-else type="success" effect="plain" disable-transitions
              >熟人介绍</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="email"
          label="邮箱"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-tag
              v-if="scope.row.status == 1"
              type="success"
              effect="plain"
              disable-transitions
              >启用</el-tag
            >
            <el-tag v-else type="danger" effect="plain" disable-transitions
              >禁用</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              style="color: #f56c6c"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

    <div class="demo-pagination-block">
      <div style="display: flex; justify-content: flex-end">
        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
        />
      </div>
    </div>
  </div>
  <Dialog
    :dialogVisible="dialogVisible"
    @update:dialogVisible="emitDialogVisible"
  />
</template>
<script setup>
import { orderList } from "@/api/index.js";
import Dialog from "./components/el-dialog.vue";
import { gethtml2canvas } from "@/utils/html2canvas";
import { ref } from "vue";
let table = ref(null);

const canvas = () => {
  gethtml2canvas(table.value);
};

let dialogVisible = ref(false); // 控制新增用户弹窗显示
// 获取子组件新增用户弹窗显示的value
const emitDialogVisible = (val) => {
  dialogVisible.value = val;
};

const dialogVisibleBtn = () => {
  dialogVisible.value = true;
};

const tableData = ref([]);
orderList({ sise: 4, page: 1 })
  .then((res) => {
    tableData.value = res.data;
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

const value1 = ref("");
const value = ref("");
const input2 = ref("");
const defaultTime1 = new Date(2000, 1, 1, 12, 0, 0); // '12:00:00'
const options = [
  {
    value: "全部",
    label: "全部",
  },
  {
    value: "已完成",
    label: "已完成",
  },
  {
    value: "已过期",
    label: "已过期",
  },
  {
    value: "待核实",
    label: "待核实",
  },
];

onMounted(() => {
  console.log("about重新加载");
});
onBeforeUnmount(() => {
  console.log("about销毁");
});
</script>
<style scoped lang="scss">
%box {
  display: flex;
  align-items: center;
  margin-right: 30px;
}
.crad {
  width: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  border: 1px solid var(--bg-tag);
  background-color: var(--bg-color);
  border-radius: 5px;
  display: flex;
  .search {
    @extend %box;
    span {
      margin-right: 10px;
    }
  }
  .block {
    @extend %box;
    span {
      display: block;
      width: 50px;
      margin-right: 10px;
    }
  }
}
.watt-plain-btn {
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--bg-tag);
}

.Controls {
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
