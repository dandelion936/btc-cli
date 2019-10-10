export default {
  path: '/marketing',
  title: '营销中心',
  icon: 'system-board',
  children: (pre => [
    { path: `${pre}shoppushmanage`, title: '消息推送', icon: 'system-board' },
    { path: `${pre}limitdiscount`, title: '限时折扣', icon: 'system-board' }
  ])('/')
}
