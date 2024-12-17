<template>
 <div class="app-main">
  <section class="contanier">
    <router-view v-slot="{ Component, route }" :key="key">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cacheNames"> 
            <component :is="Component" :key="route.path"/>
        </keep-alive>
      </transition>
    </router-view>
  </section>
</div>
</template>
<script setup>
import globalStore from '@/stores/globa'
import { storeToRefs } from 'pinia'
const global = globalStore()
const { routeList,cacheNames } = storeToRefs(global)
const titles = computed(() => {
  return routeList.value.map(item => item.title)
})
import { useRoute} from "vue-router";

const route = useRoute();
const key = computed(() => {
  return route.path + Math.random();
});
</script>

<style lang="scss" scoped>
.app-main {
  width: calc(100vw - 200px);
  position: relative;
  background-color: var(--bg-app);
  color: var(--text-color);
  flex:1;
  .contanier{
    height: calc(100vh - 85px - 40px);
    position: relative;
    padding:20px;
    overflow: hidden;
  }
}
</style>