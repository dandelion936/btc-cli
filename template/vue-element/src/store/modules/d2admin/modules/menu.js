// 设置文件
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 顶栏菜单
    header: [],
    // 侧栏菜单
    aside: [],
    // 侧边栏收缩
    asideCollapse: setting.menu.asideCollapse
  },
  actions: {
    /**
     * 设置侧边栏展开或者收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse is collapse
     */
    asideCollapseSet ({ state, dispatch }, collapse) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = collapse
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'menu.asideCollapse',
          value: state.asideCollapse,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = !state.asideCollapse
        // 持久化
        await dispatch('d2admin/db/set', {
          dbName: 'sys',
          path: 'menu.asideCollapse',
          value: state.asideCollapse,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * 从持久化数据读取侧边栏展开或者收缩
     * @param {Object} state vuex state
     */
    asideCollapseLoad ({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = await dispatch('d2admin/db/get', {
          dbName: 'sys',
          path: 'menu.asideCollapse',
          defaultValue: setting.menu.asideCollapse,
          user: true
        }, { root: true })
        // end
        resolve()
      })
    },
    /**
     * 格式化菜单数据
     * @param {Object} state vuex state
     * @param {Boolean} menuList is menuList
     */
    formatMenu ({ state, dispatch }, menuList) {
      let arr = []
      let fristPath = ''
      Object.getOwnPropertyNames(menuList).forEach(ele1 => {
        let brr = []
        let icon = ''
        Object.getOwnPropertyNames(menuList[ele1]).forEach(ele2 => {
          icon = menuList[ele1][ele2][0].icon
          fristPath = '/' + menuList[ele1][ele2][0].tag
          brr.push({
            path: menuList[ele1][ele2][0].url,
            title: menuList[ele1][ele2][0].menuName,
            icon: menuList[ele1][ele2][0].secondIcon
          })
        })
        arr.push({
          title: ele1,
          icon: icon,
          children: brr,
          path: fristPath
        })
      })
      return new Promise(async (resolve, reject) => {
        await dispatch('d2admin/db/set', {
          dbName: 'database',
          path: 'menuList',
          value: arr,
          user: false
        }, { root: true })
        state.aside = arr
        resolve()
      })
    },
    /**
     * 格式化菜单数据
     * @param {Object} state vuex state
     * @param {Boolean} menuList is menuList
     */
    asideSet ({ state, dispatch }) {
      return new Promise(async (resolve, reject) => {
        state.aside = await dispatch('d2admin/db/get', {
          dbName: 'database',
          path: 'menuList',
          user: false
        }, { root: true })
        resolve(state.aside)
      })
    }
  },
  mutations: {
    /**
     * @description 设置顶栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    headerSet (state, menu) {
      // store 赋值
      state.header = menu
    },
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet (state, menu) {
      // store 赋值
      state.aside = menu
    }
  }
}
