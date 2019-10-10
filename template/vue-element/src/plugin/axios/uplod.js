import axios from 'axios'
import util from '@/libs/util'
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
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  config.data.append('token', util.cookies.get('token'))
  return config
}, error => {
  return Promise.reject(error)
})
// response拦截器
// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本\
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          return dataAxios
        case 1:
          // [ 示例 ] code === 1 代表没有错误
          return dataAxios
      }
    }
  }
)

export default service
