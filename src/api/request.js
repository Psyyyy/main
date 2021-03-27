import axios from 'axios'
import qs from 'querystring'
import { getToken } from '@/utils/token'

// 创建axios，赋给变量service
const service = axios.create({
  // 服务器url请求地址http://localhost:3000
  baseURL: 'http://localhost:8000/api',
  timeout: 20000,
  responseType: 'json',
  withCredentials: true,
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// 请求拦截器（config）
// 对每个接口的请求先用拦截器拦下，进行判断。一般是使用api文件的方法时调用，拦截器一般放在request.js里
service.interceptors.request.use(
  (config) => {
    //   // 在发送请求之前做什么
    //   // 每次请求都带上token
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.data = qs.stringify(config.data)
    return config
  },
  // // 对请求错误做什么
  (error) => {
    Promise.reject(error)
  },
)

// 响应拦截器（response）
service.interceptors.response.use(
  (config) => config,
  // 对请求错误做什么
  (error) => {
    Promise.reject(error)
  },
)

export default service
