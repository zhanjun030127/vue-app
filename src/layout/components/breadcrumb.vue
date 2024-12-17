<template>
  <div style="display: flex;align-items: center;">
    <div class="side-bar-collapse">
    <el-icon v-if="!isCollapse" @click="close"><Fold /></el-icon>
    <el-icon v-else @click="open"><Expand /></el-icon>
  </div>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in routes" :key="index">
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  </div>
</template>

<script setup>
import useGlobaStore from "@/stores/globa";
import { storeToRefs } from "pinia";
const globalStore = useGlobaStore();
const { isCollapse } = storeToRefs(globalStore);
const route = useRoute();
const routes = ref([]);
watch(
  () => route,
  (val) => {
    if (
      val.matched.length === 2 &&
      val.matched[0].path === val.matched[1].path
    ) {
      routes.value = [
        {
          title: val.matched[1].meta.title,
          fullpath: val.matched[1].path,
        },
      ];
    } else {
      routes.value = val.matched.map((item) => {
        return {
          title: item.meta.title,
          fullpath: item.path,
        };
      });
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const close = () => {
  globalStore.setCollapse(true);
};
const open = () => {
  globalStore.setCollapse(false);
};
</script>
<style lang="scss" scoped>
.side-bar-collapse {
  width: 20px;
  height: 22px;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-color);
  margin-left: 7.5px;
}
.breadcrumb {
  height: fit-content;
  padding-left: 10px;
  font-size: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 30px;
  color: var(--text-color);
}
:deep(.el-breadcrumb__inner){
  color: var(--text-color);
}

:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner){
  color: var(--text-color);
}
</style>
