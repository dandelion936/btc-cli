import axios from 'axios'
import qs from 'qs'
import config from '@/config/config'
var baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = config.development
} else {
  baseURL = config.production
}
// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  timeout: 1000 * 300,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// request拦截器
service.interceptors.request.use(config => {
  // 获取请求得接口
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})
// response拦截器
service.interceptors.response.use(response => {
  document.querySelector('#downloadIframe').setAttribute('src', response.request.responseURL)
  return response
}, error => {
  return Promise.reject(error)
})
export default service
