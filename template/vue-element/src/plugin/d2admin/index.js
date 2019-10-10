// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// flex 布局库
import 'flex.css'
// 组件
import '@/components'
// svg 图标
import '@/assets/svg-icons'
// npm 模块
import moment from 'moment'

// 功能插件
import pluginError from '@/plugin/error'
import pluginLog from '@/plugin/log'
import pluginOpen from '@/plugin/open'
import config from '@/config/config'

export default {
  async install (Vue, options) {
    // 设置为 false 以阻止 vue 在启动时生成生产提示
    // https://cn.vuejs.org/v2/api/#productionTip
    Vue.config.productionTip = false
    // 当前环境
    Vue.prototype.$env = process.env.NODE_ENV
    // 当前的 baseUrl
    Vue.prototype.$baseUrl = process.env.BASE_URL
    // 当前的 serverUrl
    Vue.prototype.$serverUrl = process.env.NODE_ENV === 'development' ? config.development : config.production
    // 当前版本
    Vue.prototype.$version = process.env.VUE_APP_VERSION
    // 构建时间
    Vue.prototype.$buildTime = process.env.VUE_APP_BUILD_TIME
    // 设置searchSize
    Vue.prototype.SEARCHSIZE = 'small'
    // 设置table size
    Vue.prototype.TABLESIZE = 'small'
    // 设置 table button size
    Vue.prototype.TABLEBTNSIZE = 'mini'
    // 挂载日期处理模块
    Vue.prototype.$moment = moment
    // 设置storeUrl
    Vue.prototype.$storeUrl = config.storeUrl
    // Element
    Vue.use(ElementUI)
    // 插件
    Vue.use(pluginError)
    Vue.use(pluginLog)
    Vue.use(pluginOpen)
  }
}
