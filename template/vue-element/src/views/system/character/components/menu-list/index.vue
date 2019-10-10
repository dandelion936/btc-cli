<template>
  <div class="menu-list">
    <span style="color: red;">菜单列表(选中的为已授权)</span>
    <el-tree
      ref="tree"
      :data="list"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      :default-expanded-keys="[-99]"
      :default-checked-keys="menuList">
    </el-tree>
    <el-button style="position: absolute; top: calc(100% - 30px); left: calc(40% - 30px); text-align: center;" type="danger" size="small" @click="handleSave">授权</el-button>
  </div>
</template>
<script>
import { getMenuList, getCharacterById, postSaveCharacter } from '@/api/character'
export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      list: [],
      menuList: []
    }
  },
  props: {
    roleId: {
      type: String | Number,
      require: true
    }
  },
  watch: {
    roleId: {
      handler (val) {
        this.getListById(val)
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      getMenuList().then(res => {
        this.list = res.data
      })
    },
    getListById (val) {
      getCharacterById({
        roleId: val,
        menuId: ''
      }).then(res => {
        this.menuList = []
        let flag = false
        this.list.forEach(ele1 => {
          if (ele1.children.length) {
            ele1.children.forEach(ele2 => {
              if (ele2.children.length) {
                ele2.children.forEach(ele3 => {
                  if (ele3.children.length) {
                    ele3.children.forEach(ele4 => {
                      flag = false
                      for (let i = 0; i < res.data.authList.length; i++) {
                        if (ele4.auth_id === res.data.authList[i].id) {
                          flag = true
                        }
                      }
                      if (flag) {
                        this.menuList.push(ele4.id)
                      }
                    })
                  }
                })
              }
            })
          }
        })
        this.$refs.tree.setCheckedKeys(this.menuList)
      })
    },
    handleSave () {
      let checked = this.$refs.tree.getCheckedKeys()
      checked = [...new Set(checked)]
      let authConfig = []
      let flag = false
      this.list.forEach(ele1 => {
        if (ele1.children.length) {
          ele1.children.forEach(ele2 => {
            if (ele2.children.length) {
              ele2.children.forEach(ele3 => {
                if (ele3.children.length) {
                  ele3.children.forEach(ele4 => {
                    flag = false
                    for (let i = 0; i < checked.length; i++) {
                      if (ele4.id === checked[i]) {
                        flag = true
                      }
                    }
                    if (flag) {
                      authConfig.push({ id: ele4.id, status: 1, authId: ele4.auth_id, menuId: ele4.menu_id })
                    } else {
                      authConfig.push({ id: ele4.id, status: 2, authId: ele4.auth_id, menuId: ele4.menu_id })
                    }
                  })
                }
              })
            }
          })
        }
      })
      postSaveCharacter({
        roleId: this.roleId,
        authConfig: JSON.stringify(authConfig)
      }).then(res => {
        if (res.code) {
          this.getListById(this.roleId)
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.menu-list {
  position: relative;
  height: 100%;
}
</style>
