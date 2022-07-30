import axios from "axios";
import router from './router.js'
import { ElMessage } from "element-plus";

const http = axios.create({
  baseURL: "http://localhost:3000/admin/api",
});

http.interceptors.request.use(
  (config) => {
    console.log("请求拦截：", config)
    if (localStorage.token) {
      // console.log("local token:",localStorage.getItem("token"))
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    if (err.response.data.message) {
      ElMessage({
        type: "error",
        message: err.response.data.message,
      });
      if (err.response.status === 401) {
        router.push('/login')
      }
    }
    return Promise.reject(err);
  }
);

export default http;
