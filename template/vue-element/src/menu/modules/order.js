export default {
  path: '/order',
  title: '订单管理',
  icon: 'system-board',
  children: (pre => [
    { path: `${pre}ordermanage`, title: '订单管理', icon: 'system-board' },
    { path: `${pre}orderShipManage`, title: '批量发货', icon: 'system-board' },
    { path: `${pre}subscription`, title: '物流订阅', icon: 'system-board' },
    { path: `${pre}pushorder`, title: '订单推送', icon: 'system-board' },
    { path: `${pre}refuse`, title: '退款记录', icon: 'system-board' }
  ])('/')
}
