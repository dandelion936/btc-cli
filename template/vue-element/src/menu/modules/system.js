export default {
  path: '/system',
  title: '系统管理',
  icon: 'system-board',
  children: (pre => [
    { path: `${pre}usersmanage`, title: '用户管理', icon: 'system-board' },
    { path: `${pre}user`, title: '个人信息', icon: 'system-board' },
    { path: `${pre}store`, title: '店铺管理', icon: 'system-board' }
  ])('/')
}
