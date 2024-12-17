
import { defineStore } from 'pinia'

export default defineStore('globa',  {
  state:()=> {
    return {
      isCollapse: false,
      routeList: [{
        fullpath: "/dashboard",
        title: '首页',
        componentName: "dashboard",
        keepAlive:true
      }],
      cacheNames: ['dashbord'],
      componentNames:{}
    }
  },
  actions: {
    setCollapse(value) {
      this.isCollapse = value
    },
    setRouteList(value) {
      this.routeList = value
    }
  },
  persist: {
    enabled: true
}
}
)
