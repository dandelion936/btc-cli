export default {
  path: '/steward',
  title: '客服管理',
  icon: 'system-board',
  children: (pre => [
    { path: `${pre}custServiceManage`, title: '客服管理', icon: 'system-board' }
  ])('/')
}
