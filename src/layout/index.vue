<template>
  <Header></Header>
  <div class="content">
    <NavBar></NavBar>
    <appMain></appMain> 
  </div>
  
</template>

<script setup>
import{ Header,appMain,NavBar } from './components'

</script>
<style lang="scss" scoped>
.content{
  display: flex;
}
</style>