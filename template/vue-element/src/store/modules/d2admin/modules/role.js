import { getCharacterList } from '@/api/character'
export default {
  namespaced: true,
  state: {
    roleList: []
  },
  actions: {
    set ({ state, commit }) {
      return new Promise(async resolve => {
        await getCharacterList().then(async res => {
          commit('setRoleList', res)
          if (res.data.length) {
            // end
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },
    get ({ state }) {
      return state.roleList
    }
  },
  mutations: {
    /**
     * @description 设置
     * @param {*} state vuex state
     * @param {*} active active
     */
    setRoleList (state, active) {
      state.roleList = active
    }
  }
}
