<template>
    <el-dialog v-model="props.dialogVisible" title="新增预约用户信息" width="500" @close="close">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="预约时间" :label-width="formLabelWidth">
        <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="Select date and time"
        />
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="Please select a zone">
          <el-option label="工作人员" value="1" />
          <el-option label="客户" value="2" />
          <el-option label="熟人介绍" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="Cancel()">取消</el-button>
        <el-button type="primary" @click="Confirm()">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>

const value1 = ref()
const props = defineProps({
    dialogVisible:Boolean
})

const emit = defineEmits(['update:dialogVisible'])

const formLabelWidth = '100px'
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

watch(() => props.dialogVisible, (newValue) => {
  if(newValue){
    
    props.dialogVisible = newValue
  }
})
const Cancel = () => {
    emit('update:dialogVisible', false)
}

const Confirm = () => {
    emit('update:dialogVisible', false)
}

const close = () => {
    emit('update:dialogVisible', false)
}
</script>

<style lang="scss" scoped>
:deep(.el-button){
    background-color: var(--bg-color) !important;
    color: var(--text-color) !important;
}
</style>