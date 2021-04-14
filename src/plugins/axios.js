import axios from 'axios'
import Message from 'ant-design-vue/es/message'
import { getToken, removeToken } from '@/utils/token'
import responseHandler from '@/utils/response-handler'

const errorHandler = (error) => {
  const { status = 'default', statusText = '错误信息' } = error.response
  responseHandler[status](status, statusText)

  return Promise.reject(error)
}

const service = axios.create({
  // baseURL: process.env.VUE_APP_REQUEST_BASE_URL,http://120.53.120.229:8888/api/private/v1/
  // baseURL: 'http://106.14.132.104:8888/api/private/v1/',
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  timeout: 20000,
  responseType: 'json',
  // withCredentials: true,
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `${token}`
      config.userInfo = 'test'// ？
    }
    return config
  },
  errorHandler,
)

service.interceptors.response.use(
  (response) => {
    const { data } = response
    if (!data.meta) {
      return Promise.reject(data)
    }
    if (data.meta.status !== 200) {
      Message.warning(data.meta.msg)
      if (data.meta.status === 4018) {
        removeToken()
        window.location.reload()
      }

      return Promise.reject(data)
    }
    return data
  },
  errorHandler,
)

export default service
