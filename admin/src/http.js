import axios from "axios";
import { ElMessage } from "element-plus";

const http = axios.create({
  baseURL: "http://localhost:3000/admin/api",
});

http.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    if (err.response.data.message) {
      ElMessage({
        type: "error",
        message: err.response.data.message,
      });
    }
    return Promise.reject(err);
  }
)

export default http;