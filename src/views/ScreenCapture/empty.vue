<template>
  <div v-show="showScreenShort">
    <!-- 你的弹框内容 -->
    <el-button 
      type="primary" 
      @click="startScreenShot"
      :loading="isScreenShotting"
    >
      <el-icon><Camera /></el-icon>
      {{ isScreenShotting ? '截图中...' : '快捷截图' }}
    </el-button>
  </div>

  <!-- 截图组件 -->
  <screen-short
    v-if="screenshotStatus"
    @get-image-data="handleImageData"
    @destroy-component="handleDestroy"
  />
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Camera } from '@element-plus/icons-vue'

// 状态控制
const showScreenShort = ref(true)
const screenshotStatus = ref(false)
const isScreenShotting = ref(false)
const uploadlist = ref([])

// 开始截图
const startScreenShot = () => {
  try {
    isScreenShotting.value = true
    showScreenShort.value = false
    screenshotStatus.value = true
  } catch (error) {
    console.error('启动截图失败:', error)
    ElMessage.error('启动截图失败')
    handleDestroy()
  }
}

// 处理截图数据
const handleImageData = async (base64) => {
  try {
    isScreenShotting.value = false
    
    // 创建图片对象
    const image = new Image()
    image.src = base64
    
    // 生成唯一ID
    const imageId = generateUUID()
    
    // 添加到上传列表
    uploadlist.value.push({ 
      id: imageId,
      image: base64,
      name: `screenshot-${imageId}.png`
    })

    // 显示成功消息
    ElMessage.success('截图完成')
    
    // 可以在这里处理图片上传
    // await uploadImage(base64, imageId)
    
  } catch (error) {
    console.error('处理截图失败:', error)
    ElMessage.error('处理截图失败')
  } finally {
    showScreenShort.value = true
    screenshotStatus.value = false
  }
}

// 取消截图
const handleDestroy = () => {
  isScreenShotting.value = false
  screenshotStatus.value = false
  showScreenShort.value = true
}

// 生成UUID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 可选：转换图片为Canvas（如果需要）
const convertImageToCanvas = (image) => {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0)
  return canvas
}

// 可选：上传图片
const uploadImage = async (base64, imageId) => {
  try {
    // 这里添加你的上传逻辑
    // const response = await api.uploadImage({ base64, imageId })
    // return response
  } catch (error) {
    console.error('上传图片失败:', error)
    throw error
  }
}

// 可选：删除图片
const deleteImage = (imageId) => {
  uploadlist.value = uploadlist.value.filter(item => item.id !== imageId)
}
</script>

<style scoped>
.screenshot-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.el-icon {
  margin-right: 4px;
}

/* 如果需要自定义截图组件的样式 */
:deep(.screen-short) {
  /* 自定义样式 */
}
</style>