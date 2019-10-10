// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default (pre => [
  {
    path: '/usersmanage',
    name: `${pre}users`,
    component: _import('system/users'),
    meta: { ...meta, title: '用户管理' }
  },
  {
    path: '/user',
    name: `${pre}user`,
    component: _import('system/user'),
    meta: { ...meta, title: '个人信息' }
  },
  {
    path: '/menu',
    name: 'menu',
    component: _import('system/menu'),
    meta: { ...meta, title: '菜单管理' }
  },
  {
    path: '/character',
    name: 'character',
    component: _import('system/character'),
    meta: { ...meta, title: '授权管理' }
  }
])('system-')
