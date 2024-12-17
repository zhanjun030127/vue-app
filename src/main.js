import '@/assets/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './permission'
import CommonTable from '@/components/commonTable'
import Pagination from '@/components/pagination'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' //引入持久化插件
import 'amfe-flexible'
import './utils/rem.js'
// v3-drag-zoom 组件
import V3DragZoom from "v3-drag-zoom";
// v3-drag-zoom 全局样式（必须导入，否则无法正常使用）
import "v3-drag-zoom/dist/style.css";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import screenShort from 'vue-web-screen-shot';  
window.addEventListener('error', (event) => {
  // 忽略特定错误
  if (event.message.includes('message port closed')) {
    event.preventDefault()
    return false
  }
})

const app = createApp(App)

const pinia = createPinia()
app.directive('permission', (el, binding) => {
  if(binding.value?.name == 'admin'){
     el.style.display = 'block'
  }else if(binding.value?.permission == 'admin'){
     el.style.display = 'none'
  }
})

app.component('CommonTable', CommonTable)
app.component('Pagination', Pagination)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn,
})
pinia.use(piniaPluginPersistedstate)
pinia.use(({store}) => { 
  //store.$state 是一个对象 ，所以需要深深拷贝JSON.parse(JSON.stringify(store.$state))
  const initialState = JSON.parse(JSON.stringify(store.$state)) 
  store.$reset = () => {
      //$patch一次性修改多个无法修改，所以initialState也需要深拷贝
      store.$state = JSON.parse(JSON.stringify(initialState))
  }
})


// 使用截屏插件
app.use(screenShort, { enableWebRtc: false })
app.use(V3DragZoom)
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')


