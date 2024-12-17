<template>
    <div>
      <screen-short
        v-if="screenshotStatus"
        @get-image-data="handleImageData"
        @destroy-component="handleDestroy"
        :level="10"
        :enableWebRtc="false"
        :full-page="true" 
        :scroll-timeout="1000"  
      />
  
      <el-tooltip content="按 Ctrl + Alt + X 快速截图" placement="left">
        <div class="screenshot-btn" v-show="!screenshotStatus">
          <el-button
            type="primary"
            @click="startScreenShot"
            :loading="isScreenShotting"
            size="small"
            circle
          >
            <el-icon><Camera /></el-icon>
          </el-button>
        </div>
      </el-tooltip>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import { ElMessage } from "element-plus";
  import { Camera } from "@element-plus/icons-vue";
  
  const screenshotStatus = ref(false);
  const isScreenShotting = ref(false);
  
  // 开始截图前准备
  const startScreenShot = () => {
    try {
      // 获取文档的实际高度
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.clientHeight
      );
      
      // 设置容器高度
      document.documentElement.style.minHeight = `${docHeight}px`;
      document.body.style.minHeight = `${docHeight}px`;
  
      // 记录当前滚动位置
      const scrollPos = {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
  
      setTimeout(() => {
        isScreenShotting.value = true;
        screenshotStatus.value = true;
        
        // 恢复滚动位置
        window.scrollTo(scrollPos.x, scrollPos.y);
      }, 100);
    } catch (error) {
      console.error("启动截图失败:", error);
      ElMessage.error("启动截图失败");
      handleDestroy();
    }
  };
  
  // 处理截图数据
  const handleImageData = (base64) => {
    try {
      // 直接下载原始base64数据
      const link = document.createElement("a");
      link.href = base64;
      link.download = `screenshot-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      ElMessage.success("截图完成");
    } catch (error) {
      console.error("处理截图失败:", error);
      ElMessage.error("处理截图失败");
    } finally {
      isScreenShotting.value = false;
      handleDestroy();
      // 恢复原始高度设置
      document.documentElement.style.minHeight = '';
      document.body.style.minHeight = '';
    }
  };
  
  // 取消截图
  const handleDestroy = () => {
    isScreenShotting.value = false;
    screenshotStatus.value = false;
    // 恢复原始高度设置
    document.documentElement.style.minHeight = '';
    document.body.style.minHeight = '';
  };
  
  // 注册快捷键
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "x") {
      event.preventDefault();
      startScreenShot();
    }
  };
  
  onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
  
  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
    // 确保清理高度设置
    document.documentElement.style.minHeight = '';
    document.body.style.minHeight = '';
  });
  </script>
  
  <style scoped>
  .screenshot-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483647;
  }
  
  :deep(.screen-short-container) {
    transform: none !important;
    transform-origin: unset !important;
    height: 100% !important;
  }
  
  :deep(.screen-short) {
    transform: none !important;
    transform-origin: unset !important;
    height: 100% !important;
  }
  
  /* 确保容器可以显示完整内容 */
  :deep(.screen-short-panel) {
    max-height: none !important;
    height: auto !important;
  }
  </style>