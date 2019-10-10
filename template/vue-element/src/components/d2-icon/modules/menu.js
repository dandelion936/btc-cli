export default (pre => {
  let list = {
    // 系统管理
    'sys': 'iconxitongguanli',
    // 用户管理
    'users': 'iconyonghuguanli',
    // 菜单管理
    'menus': 'iconjiaoyixulie',
    // 授权管理
    'authorize': 'iconshouquan'
  }
  let exportList = {}
  Object.getOwnPropertyNames(list).forEach(name => {
    exportList[`${pre}${name}`] = list[name]
  })
  return exportList
})('menu-')
