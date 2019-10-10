import uploading from '@/plugin/axios/uplod.js'

// 文件上传
export function importOrder (data) {
  return uploading({
    url: 'orderShipManage/shipMents.do',
    method: 'post',
    data: data
  })
}

// 批量订阅
export function getGoodsubLogistics(data) {
  return uploading({
    url: 'subscription/subscriptionLogisticsFile.do',
    method: 'POST',
    data: data
  })
}