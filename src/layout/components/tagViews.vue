<template>
  <div class="tag-views">
    <div
      class="item"
      v-for="(item, i) in routeList"
      :key="item.fullPath"
      :class="{ active: item.title === activeMenu }"
      @click="changeRoute(item)"
    >
      <span class="item-name">{{ item.title }}</span>
      <el-icon v-if="item.title !== '首页'">
        <Close
          @click.stop="closeTag(item, i)"
          @contextmenu.prevent="openContextMenu"
        />
      </el-icon>
      <div
        class="context-menu"
        v-if="menuVisible && item.title === activeMenu"
        :style="menuPosition"
      >
        <ul>
          <li @click.stop="refresh(item)">刷新</li>
          <li @click="closeOther(item)">关闭其他</li>
          <li @click="closeAll">关闭全部</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import globalStore from "@/stores/globa";
const route = useRoute();
const router = useRouter();
const global = globalStore();
const menuVisible = ref(false);
const menuPosition = reactive({
  top: 0,
  left: 0,
});
const { routeList, cacheNames, componentNames } = storeToRefs(global);
const activeMenu = computed(() => {
  const { meta } = route;
  return meta.title;
});
// 检测路由组件名称是否重复（组件重名会缓存到不该缓存的组件，而且不容易排查问题，所以开发环境时检测重名）
const checkRouteComponentName = (name, file) => {
  if (componentNames.value[name]) {
    if (componentNames.value[name] !== file) {
      console.warn(
        `${file} 与${componentNames.value[name]} 组件名称重复： ${name}`
      );
    }
  } else {
    componentNames.value[name] = file;
  }
};
// 添加缓存的路由组件
const addCache = (componentName) => {
  if (Array.isArray(componentName)) {
    componentName.forEach(addCache);
    return;
  }
  if (!componentName || cacheNames.value.includes(componentName)) return;
  cacheNames.value.push(componentName);
};
watch(
  () => route,
  (_route) => {
    _route.matched.forEach((routeMatch) => {
      const componentDef = routeMatch.components?.default;
      const componentName = componentDef?.name || componentDef?.__name;
      const file = componentDef?.__file;
      checkRouteComponentName(componentName, file);
      if (routeMatch.meta.keepAlive) {
        if (!componentName) return;
        addCache(componentName);
      }
      if (
        componentName &&
        componentName !== "index" &&
        componentName !== "empty"
      ) {
        const titles = routeList.value.map((item) => item.title);
        if (!titles.includes(routeMatch.meta.title)) {
          routeList.value.push({
            fullpath: _route.fullPath,
            title: _route.meta.title,
            componentName,
            keepAlive: routeMatch.meta.keepAlive,
          });
        }
      }
    });
  },
  {
    immediate: true,
    deep: true,
  }
);

const changeRoute = (item) => {
  if (item.title === activeMenu.value) return;
  router.push(item.fullpath);
};
const closeTag = (item, i) => {
  const list = routeList.value.filter((item) => item.keepAlive);
  const index = list.findIndex(
    (itm) => item.componentName === itm.componentName
  );
  if (index !== -1) {
    cacheNames.value.splice(index, 1);
  }
  setTimeout(() => {
    routeList.value.splice(i, 1);
  }, 10);
  if (item.title !== activeMenu.value) return;
  router.push(routeList.value[i - 1].fullpath);
};
const openContextMenu = (event) => {
  menuVisible.value = true;
  menuPosition.top = `${event.clientY}px`;
  menuPosition.left = `${event.clientX}px`;
};
const hideMenuVisible = () => {
  menuVisible.value = false;
};
const closeAll = () => {
  routeList.value = [routeList.value[0]];
  cacheNames.value = [cacheNames.value[0]];
  setTimeout(() => {
    router.push(routeList.value[0].fullpath);
  }, 10);
  hideMenuVisible();
};
const refresh = async (item) => {
  await router.push("/empty");
  const index = cacheNames.value.indexOf(item.componentName);
  if (index !== -1) {
    cacheNames.value.splice(index, 1);
  }
  router.go(-1);
  hideMenuVisible();
};
const closeOther = (item) => {
  const index = cacheNames.value.indexOf(item.componentName);
  const tagIndex = routeList.value.findIndex(
    (itm) => itm.componentName === item.componentName
  );
  cacheNames.value =
    index !== -1
      ? [cacheNames.value[0], cacheNames.value[index]]
      : [cacheNames.value[0]];
  routeList.value = [routeList.value[0], routeList.value[tagIndex]];
  hideMenuVisible();
};

onMounted(() => {
  window.addEventListener("click", hideMenuVisible);
});
onBeforeUnmount(() => {
  window.removeEventListener("click", hideMenuVisible);
});
</script>
<style lang="scss" scoped>
.tag-views {
  display: flex;
  align-items: center;
  column-gap: 10px;

  padding-left: 10px;
}
.item {
  padding: 5px 10px;
  border-radius: 2px;
  text-align: center;
  background-color: var(--bg-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 10px;
  color: var(--text-color);
  border: 1px solid var(--bg-tag);
  &.active {
    background: #409eff;
    color: #fff;
    border: none;
  }
  .item-name {
    font-size: 12px;
  }
  .el-icon {
    font-size: 12px;
    transition: transform 0.3s ease;
    transform: rotate(0deg);
  }
  .el-icon:hover{
    transition: transform 0.3s ease;
    transform: rotate(180deg);
  }
}
.context-menu {
  position: fixed;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1000;
  li {
    padding: 5px 0;
    cursor: pointer;
    color: #000;
  }
}
</style>
