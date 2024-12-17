<template>
  <div class="hearder">
    <div class="title">
      <span>Ding Kai </span>
      <div class="nav">
        <Breadcrumb></Breadcrumb>
        <TagViews></TagViews>
      </div>
    </div>

    <div class="icon">
      <el-switch
        v-model="isDark"
        @click.stop="toggleTheme"
        style="
          --el-switch-on-color: #f2f2f2;
          --el-switch-off-color: #2c2c2c;
          margin-right: 20px;
        "
      >
        <template #active-action>
          <span class="custom-active-action">☀️</span>
        </template>
        <template #inactive-action>
          <span class="custom-inactive-action">🌒</span>
        </template>
      </el-switch>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :icon="UserFilled" /><span
            style="margin-left: 10px; font-size: 18px; color: var(--text-color)"
            >{{ name }}</span
          >
        </span>
        <template #dropdown>
          <el-dropdown-menu
            style="
              background-color: var(--bg-color);
              border-color: var(--border-color);
            "
          >
            <el-dropdown-item command="a" @click.stop="del()"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { UserFilled } from "@element-plus/icons-vue";
import TagViews from "./tagViews.vue";
import Breadcrumb from "./breadcrumb";
import router from "@/router";
import { useTokenStore, useDarkStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const tokenStore = useTokenStore();
const tokenStore1 = useDarkStore();
const { Dark } = storeToRefs(tokenStore1);
const { name } = storeToRefs(tokenStore);
const del = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

import { ref } from "vue";

const isDark = ref(true);
isDark.value = !Dark.value;
const toggleTheme = (e) => {
  const transition = document.startViewTransition(() => {
    
    if (Dark.value) {
      
      document.documentElement.setAttribute('data-theme', 'acquiesce');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark'); 
    }
    Dark.value = !Dark.value;
  });

  const x = e.clientX;
  const y = e.clientY;
  const radius = Math.sqrt(
    Math.max(x, window.innerWidth - x) ** 2 +
      Math.max(y, window.innerHeight - y) ** 2
  );

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0 at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        pseudoElement: "::view-transition-new(root)",
      }
    );
  });
};


</script>
<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item:not(.is-disabled):focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: var(--el-border-color-light) !important;
  color: var(--el-dropdown-menuItem-hover-color);
}

.hearder {
  width: 100%;
  height: 85px;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: 2;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Rainbow Party;
    font-size: 32px;

    .nav {
      height: 85px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 0;
      box-sizing: border-box;
    }
    span {
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--text-color);
    }
  }
  .icon {
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
:deep(.el-switch__core) {
  min-width: 40px;
  height: 20px;
}

:deep(.el-dropdown__popper .el-popper)  {
  border: 1px solid #49494a;
  border-radius: 5px;
}

:focus-visible {
  outline: -webkit-focus-ring-color auto 0px;
}
</style>
