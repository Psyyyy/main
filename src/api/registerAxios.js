import axios from 'axios'
import Message from 'ant-design-vue/es/message'

const service = axios.create({
  // baseURL: process.env.VUE_APP_REQUEST_BASE_URL,http://120.53.120.229:8888/api/private/v1/
  baseURL: 'http://127.0.0.1:8888/api/public/',
  timeout: 20000,
  responseType: 'json',
  withCredentials: true,
})
service.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
)
export default service
