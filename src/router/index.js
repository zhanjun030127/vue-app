import { createRouter, createWebHashHistory } from 'vue-router'  

export const constantRoutes = [  
  {  
    path: '/',  
    redirect: '/dashboard',  
    hidden: true,  
  },  
  {  
    path: '/login',  
    name: 'login',  
    component: () => import('@/views/login'),  
  },  
  {  
    path: '/dashboard',  
    name: 'dashboard',  
    component: () => import('@/layout/index'),  
    meta: { title: '首页', icon: 'House' },  
    children: [  
      {  
        path: '', 
        name: 'dashboardOverview',  // 修改子路由名称，确保唯一  
        component: () => import('@/views/home/dashbord'), 
        meta: { title: '首页', icon: 'House', keepAlive: true },  
      },  
    ],  
  },  
  {  
    path: '/about',  
    name: 'about',  
    component: () => import('@/layout/index'),  
    meta: { title: '预约管理', icon: 'ChatDotRound', permission: 'admin' },  
    children: [  
      {  
        path: 'about',  
        name: 'aboutList', // 修改名称以确保唯一  
        component: () => import('@/views/Appointment_management/AboutView'),  
        meta: { title: '预约列表', icon: 'dashboard', keepAlive: false },  
      },  
      {  
        path: 'default',  
        name: 'appointmentDefault', // 修改名称以确保唯一  
        component: () => import('@/views/Appointment_management/Default_management'),  
        meta: { title: '爽约列表', icon: 'dashboard', keepAlive: false },  
      },  
    ],  
  },  
  {  
    path: '/order',  
    name: 'order',  
    component: () => import('@/layout/index'),  
    meta: { title: '订单管理', icon: 'ChatDotRound', permission: 'admin' },  
    children: [  
      {  
        path: '', // 这里不需要前导/  
        name: 'orderList', // 修改名称以确保唯一  
        component: () => import('@/views/Order_management/order'),  
        meta: { title: '订单管理', icon: 'dashboard', keepAlive: false },  
      },  
    ],  
  },  
  {  
    path: '/member',  
    name: 'member',  
    component: () => import('@/layout/index'),  
    meta: { title: '会员管理', icon: 'ChatDotRound', permission: 'admin' },  
    children: [  
      {  
        path: '', // 这里不需要前导/  
        name: 'memberList', // 修改名称以确保唯一  
        component: () => import('@/views/member_management/member'),  
        meta: { title: '会员管理', icon: 'dashboard', keepAlive: false }, // 修改 title 以确保描述正确  
      },  
    ],  
  },  
  {  
    path: '/category',  
    name: 'category',  
    component: () => import('@/layout/index'),  
    meta: { title: '图纸', icon: 'Document', affix: true },  
    children: [  
      {  
        path: 'feather',  
        name: 'feather', // 保留原名称  
        meta: { title: '羽点列表', icon: '', keepAlive: true },  
        children: [ 
          {  
            path: 'goods',  
            name: 'goods', // 修改名称以确保唯一  
            component: () => import('@/views/DrawingList/FeatherPoint/goods.vue'),  
            meta: { title: '羽点玻璃', icon: '', keepAlive: true },  
          }, 
          {  
            path: 'goods',  
            name: 'goods', // 修改名称以确保唯一  
            component: () => import('@/views/DrawingList/FeatherPoint/goods.vue'),  
            meta: { title: '羽点玻璃', icon: '', keepAlive: true },  
          }, 
        ]
      },
      {  
        path: 'menu',  
        name: 'menu', // 保留原名称  
        meta: { title: '箱变列表', icon: '', keepAlive: true },  
        children: [  
          {  
            path: 'box1',  
            name: 'box1', // 保留原名称  
            component: () => import('@/views/DrawingList/BoxTransformer/box1'),  
            meta: { title: '400KVA箱变', icon: '', keepAlive: true },  
          },  
          {  
            path: 'box2',  
            name: 'box2', // 修改名称以确保唯一  
            component: () => import('@/views/DrawingList/BoxTransformer/box2'),  
            meta: { title: '新建箱变', icon: '', keepAlive: true },  
          },  
          
            
        ],  
      },  
      {  
        path: 'grace',  
        name: 'grace', // 保留原名称  
        meta: { title: '天恩列表', icon: '', keepAlive: true },  
        children: [ 
          {  
            path: 'graceo1',  
            name: 'graceo1', // 修改名称以确保唯一  
            component: () => import('@/views/DrawingList/GodIsGrace/graceo1'),  
            meta: { title: '公变', icon: '', keepAlive: true },  
          },  
          {  
            path: 'graceo2',  
            name: 'graceo2', // 修改名称以确保唯一  
            component: () => import('@/views/DrawingList/GodIsGrace/graceo2'),  
            meta: { title: '公变', icon: '', keepAlive: true },  
          },
         
        ]
      },
      {  
        path: 'village1',  
        name: 'village1', // 修改名称以确保唯一  
        component: () => import('@/views/DrawingList/RuralIndustry/village1'),  
        meta: { title: '农村产业', icon: '', keepAlive: true },  
      },
    ],  
  },    
  {  
    path: '/play',  
    name: 'play',  
    component: () => import('@/layout/index'),  
    meta: { title: '上传图片', icon: '', keepAlive: true },  
    children: [  
      {  
        path: '', // 这里不需要前导/  
        name: 'playimg', // 修改名称以确保唯一  
        component: () => import('@/views/play'),     
        meta: { title: '上传图片', icon: 'dashboard', keepAlive: true }, // 修改 title 以确保描述正确  
      },  
    ],  
  },   
  {
    path: '/ScreenCapture',  
    name: 'ScreenCapture',  
    component: () => import('@/layout/index'),  
    meta: { title: '截屏', icon: '', keepAlive: true },  
    children: [  
      {  
        path: '', // 这里不需要前导/  
        name: 'ScreenCapturePage', // 修改名称以确保唯一  
        component: () => import('@/views/ScreenCapture/empty.vue'),     
        meta: { title: '上传图片', icon: 'dashboard', keepAlive: true }, // 修改 title 以确保描述正确  
      },  
    ],  
  },
  {  
    path: '/:pathMatch(.*)*',  
    name: '404',  
    component: () => import('@/views/404/index'),  
    hidden: true,  
  },  
];  

const router = createRouter({  
  history: createWebHashHistory(),  
  routes: constantRoutes,  
  scrollBehavior(_to, _from, savedPosition) {  
    if (savedPosition) {  
      return savedPosition;  
    } else {  
      return { top: 0 };  
    }  
  },  
});  

export default router;