import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')
  const name = ref('admin')
  const limits_of_authority = ref('')
  return {token,name,limits_of_authority}
},{
  persist:true
})

export const useDarkStore = defineStore('Dark', () => {
  const Dark = ref(false)
  return {Dark}
},{
  persist:true
})
