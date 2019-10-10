export default {
  path: '/customer',
  title: '客户管理',
  icon: 'system-board',
  children: (pre => [
    { path: `${pre}customer`, title: '客户管理', icon: 'system-board' }
  ])('/')
}
