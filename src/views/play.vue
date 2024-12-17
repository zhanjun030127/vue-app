<template>
  <div class="about">
    <el-upload
    class="avatar-uploader"
    action="http://192.168.50.179:3007/my/img"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :headers="headers"
    name="image"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {useTokenStore} from '@/stores/counter';





const imageUrl = ref('')

const headers = {
  token: 'token ' + useTokenStore().token
}
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

const beforeAvatarUpload = async (rawFile) => {
  console.log(rawFile)
  let eachSize = 10 * 1024
  const totalChunks = Math.ceil(rawFile.size / eachSize);  

  const fileChunks = await splitFile(rawFile, eachSize, totalChunks)
  console.log(fileChunks)
 if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

function splitFile(file, eachSize, chunks) {
      return new Promise((resolve, reject) => {
        try {
          setTimeout(() => {
            const fileChunk = [];
            for (let chunk = 0; chunks > 0; chunks--) {
              fileChunk.push(file.slice(chunk, chunk + eachSize));
              chunk += eachSize;
            }
            resolve(fileChunk);
          }, 0);
        } catch (e) {
          console.error(e);
          reject(new Error("文件切块发生错误"));
        }
      });
    }
onMounted(() => {
  console.log("play重新加载");
});
onBeforeUnmount(() => {
  console.log("play销毁");
});
</script>
<style>
.about {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
