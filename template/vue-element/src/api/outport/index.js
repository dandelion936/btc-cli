import exporting from '@/plugin/axios/export.js'
import requestParam from '@/plugin/axios/requestParam'
// 文件导出
export function exportOrderTmp (data) {
  return exporting({
    url: 'orderManage/downExcel.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 文件导出2（查看详情）
export function exportOrderExcel(data) {
  return exporting({
    url: 'orderShipManage/exportExcelBylogNo.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 导出订单列表
export function exportOrderList(data) {
  return exporting({
    url: 'orderManage/exportOrderList.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 下载批量订阅模板
export function expsubscription(data) {
  return exporting({
    url: 'subscription/downSubExcel.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
// 下载物流公司编码
export function orderdownLogistics(data) {
  return exporting({
    url: 'orderManage/downLogisticsExcel.do',
    method: 'get',
    params: requestParam(data, 'get')
  })
}
