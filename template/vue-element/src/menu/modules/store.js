export default {
  path: '/shop',
  title: '店铺管理',
  icon: 'system-board',
  children: (pre => [
    { path: `${pre}Micropage`, title: '微页面', icon: 'system-board' }
  ])('/')
}
