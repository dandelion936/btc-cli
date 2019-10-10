export default (pre => {
  let baseList = {
    // 全屏
    'full-screen': 'iconquanping',
    // 退出全屏
    'exit-full-screen': 'icontuichuquanping',
    // 主题
    'theme': 'iconzuanshi',
    // 尺寸
    'size': 'iconfont-size',
    // 未选中
    'circle': 'iconico2',
    // 选中
    'dot-circle': 'iconico1',
    // 注销
    'power-off': 'iconzhuxiao1',
    // 关闭左侧
    'arrow-left': 'iconarrow-left',
    // 关闭右侧
    'arrow-right': 'iconarrow-right-copy',
    // 关闭其它
    'times': 'icontimes',
    // 全部关闭
    'times-circle': 'icontimes-circle',
    // 商标
    'copyright': 'iconcopyright',
    // 搜索
    'search': 'iconsousuo',
    // bug
    'bug': 'iconbug',
    // 无bug
    'empty-bug': 'iconweixuanzhong'
  }
  let exportList = {}
  Object.getOwnPropertyNames(baseList).forEach(name => {
    exportList[`${pre}${name}`] = baseList[name]
  })
  return exportList
})('base-')
