import store from '@/store'
import util from '@/libs/util'
import merge from 'lodash/merge'

export default function (params, requestType = 'post', openDefultParams = true, contentType = 'json') {
  // 默认参数
  var defaults = {
    'token': util.cookies.get('token'),
    'storeId': store.getters['d2admin/store/storeId']
  }
  params = merge(defaults, params)
  return params
}
