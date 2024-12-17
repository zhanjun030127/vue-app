<template>
  <div class="side-bar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :default-openeds="[activeMenu]"
        :unique-opened="true"
        active-text-color="dark"
        collapse-transition
        :collapse="isCollapse"
        mode="vertical"
        router
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    <!-- <div class="side-bar-collapse">
      <el-icon v-if="!isCollapse" @click="close"><Fold /></el-icon>
      <el-icon v-else @click="open"><Expand /></el-icon>
    </div> -->
  </div>
</template>
<script setup>
import SidebarItem from "./sidebarItem";
import { constantRoutes } from "@/router";
import useGlobaStore from '@/stores/globa'
import { storeToRefs } from 'pinia'
const globalStore = useGlobaStore();
const {isCollapse} = storeToRefs(globalStore);
const route = useRoute();
const sidebarRouters = computed(() => constantRoutes);
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});

</script>
<style lang="scss" scope>
.side-bar{
  height: calc(100vh - 85px);
  background-color: var(--bg-color);
  overflow: auto;
  flex-shrink: 0;
  box-shadow: 0 0 6px rgba(0,0,0,.12);
  position: relative;
  z-index: 1;
  // .side-bar-collapse{
  //   position: absolute;
  //   right:0px;
  //   top: 0px;
  //   font-size: 20px;
  //   cursor: pointer;
  //   color:#000
  // }
}
.el-menu{
  background-color: var(--bg-color);
  border:none;
  // .menu-title{
  //   color:#000;
  // }
  // .el-icon{
  //   color:#000;
  // }
  .el-menu-item:hover {
    background-color: var(--bg-color-hover);
  }
  .el-sub-menu__title:hover{
    background-color: var(--bg-color-hover);
  }
  .el-menu-item{
    
    &.is-active{
      background-color: var(--bg-color-hover);
      color: var(--bg-text-menu);
    }
    &.is-active::before{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 2px;
      height: 100%;
      background-color: #409eff;
    }
  }
  
}
.el-sub-menu__title{
  color: var(--text-color);
}
.el-menu-item {
  color: var(--text-color);
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>