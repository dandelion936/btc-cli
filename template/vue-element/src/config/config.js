const IP = {
  // 正式
  ip_00: 'interface.mxingkong.com',
  // 测试
  ip_01: '47.97.82.25:8094',
  // 测试
  ip_02: '192.168.10.26:3000',
  // 陆留鑫
  ip_03: '192.168.10.134:8083',
  // 丁新春
  ip_04: '192.168.10.91:8082',
  // 王晨
  ip_05: '192.168.10.150:8990'
}
const developmentIp = IP.ip_05
const developmentUrl = `http://${developmentIp}/oa-platform-admin/vue/`
const productionUrl = `http://${IP.ip_00}/vue/`

const storeUrl = {
  s_00: 'http://m.mxingkong.com',
  s_01: 'http://m7.mxingkong.com',
  s_02: 'http://192.168.10.138:8084'
}
export default {
  development: developmentUrl, // 模拟数据
  production: productionUrl, // 正式数据
  storeUrl: process.env.NODE_ENV === 'development' ? storeUrl.s_02 : storeUrl.s_01,
  goodsUrl: process.env.NODE_ENV === 'development' ? storeUrl.s_02 : storeUrl.s_00
}
