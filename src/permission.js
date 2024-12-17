import router from './router'
import {ElMessage} from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth';

NProgress.configure({showSpinner: false});


router.beforeEach((to, from, next) => {
 

  if (getToken()?.token) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
      ElMessage.error('请先登录')
    }
  } else {
    // document.title = '鼎开科技 | ' + to.meta.title;
    NProgress.start()
   next()
  } 
})

router.afterEach(() => {
  NProgress.done()
})
