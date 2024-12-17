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
  <div class="crad" style="margin-top: 20px;height:calc(100% - 20px - 72px);flex-direction: column;">
    <div class="Controls">
     <div>
      <el-button type="primary" icon="CirclePlus">新增用户</el-button>
      <el-button type="danger" icon="Delete" >批量删除</el-button>
     </div>
     <div>
      <el-button type="primary" icon="Bottom" circle ></el-button>
      <el-button type="danger" icon="RefreshRight" circle  ></el-button>
     </div>
    </div>
    <el-table :data="tableData" style="width: 100%" height="100%">
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column label="时间" align="center">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="用户名" align="center"/>
      <el-table-column
        property="address"
        label="角色"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column property="address" label="手机号" align="center" show-overflow-tooltip />
      <el-table-column property="address" label="邮箱" align="center"   show-overflow-tooltip/>
      <el-table-column property="address" label="状态" align="center" />
      <el-table-column property="address" label="操作" align="center"/>
    </el-table>
    <div class="demo-pagination-block">
   
    <div style="display: flex;justify-content: flex-end;">
      <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 50, 100]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>
  </div>
  </div>
</template>
<script setup>
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

const tableData = [
  {
    date: "2016-05-04",
    name: "Aleyna Kutzner",
    address: "Lohrbergstr. 86c, Süd Lilli, Saarland",
  },
  {
    date: "2016-05-03",
    name: "Helen Jacobi",
    address: "760 A Street, South Frankfield, Illinois",
  },
  {
    date: "2016-05-02",
    name: "Brandon Deckert",
    address: "Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen",
  },
  {
    date: "2016-05-01",
    name: "Margie Smith",
    address: "23618 Windsor Drive, West Ricardoview, Idaho",
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


.Controls{
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
