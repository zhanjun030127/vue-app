<template>
  <div v-if="!item.hidden">
    <template v-if="(item.children && item.children.length ===1 ) || !!!item.children">
      <el-menu-item :index="basePath" v-if="item.path !=='/login'" v-permission="{ permission: item?.meta?.permission, name: name }">
        <el-icon v-if="item?.meta?.icon"><component :is="item.meta.icon"></component></el-icon>
        <template #title><span class="menu-title" :title="hasTitle(item?.meta?.title)">{{ item?.meta?.title }}</span></template>
      </el-menu-item>
    </template>
    <el-sub-menu v-else ref="subMenu" popper-append-to-body :index="basePath" v-permission="{ permission: item?.meta?.permission, name: name }">
      <template v-if="item?.meta" #title>
        <el-icon v-if="item?.meta?.icon"><component :is="item.meta.icon"></component></el-icon>
        <span class="menu-title" :title="hasTitle(item.meta.title)">{{ item.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="getPath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>
<script setup>
import {useTokenStore} from "@/stores/counter";
import { storeToRefs } from "pinia";
const tokenStore = useTokenStore();
const {name} = storeToRefs(tokenStore);
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})
function getPath(url){
  return `${props.basePath}/${url}`;
}
function hasTitle(title){
  if (title && title.length > 5) {
    return title;
  } else {
    return "";
  }
}
</script>
<style lang="scss" scoped>
.el-menu--collapse {
  .el-tooltip__trigger{
    .menu-title{
      display: none;
    }
  }
}
</style>