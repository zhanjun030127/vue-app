<template>
  <main class="container">
    <main class="img">
      <img src="@/assets/error-page/404.svg" />
    </main>
    <div class="btn">
        <router-link to="/">
            <el-button type="primary">返回首页</el-button>
        </router-link>
    </div>
  </main>
</template>

<script setup></script>

<style scoped lang="scss">
.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .img{
    width: 400px;
    height: 400px;
  }
  .btn {
    width: fit-content;
    margin: 30px auto 0;
  }
}
</style>
