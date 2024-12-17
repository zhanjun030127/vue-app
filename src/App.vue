<script setup>
import {  RouterView } from 'vue-router'
import {onMounted} from 'vue'
import { useDarkStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
import GlobalScreenShot from '@/components/GlobalScreenShot.vue'
const tokenStore1 = useDarkStore();
const { Dark } = storeToRefs(tokenStore1);


// // 定义点击事件处理函数  
// function handleClick(event) {  
//     console.log(`点击事件：元素 ${event.target.tagName} 被点击，内容：${event.target.innerText}`);  
// }  

// // 定义滚动事件处理函数  
// function handleScroll() {  
//     console.log('页面正在滚动');  
// }  

// // 添加点击事件监听器  
// document.addEventListener('click', handleClick);  

// // 添加滚动事件监听器  
// window.addEventListener('scroll', handleScroll);  

// // 某个情况下需要删除监听（例如，通过按钮点击或其他事件）  
// function removeListeners() {  
//     document.removeEventListener('click', handleClick);  
//     window.removeEventListener('scroll', handleScroll);  
//     console.log('事件监听器已被移除');  
// } 
onMounted(() => {
  
  if (!Dark.value) {
    document.documentElement.setAttribute('data-theme', 'acquiesce');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark'); // 切换到深色主题  
  }
});
</script>
<template>
  <router-view />
  <GlobalScreenShot/>
</template>
<style>
@import './assets/styles/el_ui1.scss';
</style>
<style scoped lang="scss">


</style>
