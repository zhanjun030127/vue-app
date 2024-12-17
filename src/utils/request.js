import axios from "axios";
import { ElMessage } from "element-plus";
import {useTokenStore} from '@/stores/counter';
import router from "../router";
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
  timeout: 5000,
});
console.log(import.meta.env.VITE_APP_BASE_API)
// import.meta.env.VITE_APP_BASE_API
request.interceptors.request.use(
  (config) => {
    config.headers['token'] = 'token '+ useTokenStore().token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    let data = response.data.message;
    if (response.data.status !== 200) {
    let message = "";
    switch (response.data.status) {
      case 401:
        localStorage.removeItem("token");
        router.push("/login");
        message = data;
        break;
      case 400:
        message = data;
      break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器出现问题";
        break;
      default:
        message = "网络出现问题";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
      return Promise.reject(response.data);
    }
    ElMessage({
      type: "success",
      message:data,
    });
    return Promise.resolve(response.data);
  },
  (error) => {
    let message = "";
    const status = error.status;
    console.log(error)
    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器出现问题";
        break;
      default:
        message = "网络出现问题";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
    return Promise.reject(error);
  }
);
//对外暴露
export default request;