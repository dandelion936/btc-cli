export default {
  path: '/goods',
  title: '商品管理',
  icon: 'system-board',
  children: (pre => [
    { path: `${pre}yzgoods`, title: '采集库', icon: 'system-board' },
    { path: `${pre}goodsadd`, title: '商品库', icon: 'system-board' },
    { path: `${pre}goodscategory`, title: '类目管理', icon: 'system-board' },
    { path: `${pre}goodsgroup`, title: '商品分组', icon: 'system-board' }
  ])('/')
}
