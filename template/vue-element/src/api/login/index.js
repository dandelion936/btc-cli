import request from '@/plugin/axios'
import requestParam from '@/plugin/axios/requestParam'

export function AccountLogin (data) {
  return request({
    url: 'admin/login.do',
    method: 'POST',
    data: requestParam(data, 'post')
  })
}
export function getCode (data) {
  return request({
    url: 'admin/code.do',
    method: 'POST',
    params: data
  })
}
