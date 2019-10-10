export default {
  path: '/report',
  title: '报表管理',
  icon: 'system-board',
  children: (pre => [
    { path: `${pre}channelonline`, title: '渠道汇总', icon: 'system-board' },
    { path: `${pre}goodsonline`, title: '商品汇总', icon: 'system-board' }
  ])('/')
}
