<template>
  <d2-container>
    <el-row :gutter="20" style="height: 100%">
      <el-col :span="6">
        <CharacterList v-model="successMsg" v-on:getRoleId="getRoleId" v-on:openAddDialog="openAddDialog"></CharacterList>
      </el-col>
      <el-col :span="18" style="height: 100%">
        <menu-list :roleId="roleId"></menu-list>
      </el-col>
    </el-row>
    <add-character v-model="addCharacterVisible" v-on:addSuccess="addSuccess"></add-character>
  </d2-container>
</template>
<script>
import CharacterList from './components/character-list'
import MenuList from './components/menu-list'
import AddCharacter from './components/add-character'
export default {
  name: 'character',
  components: {
    CharacterList,
    MenuList,
    AddCharacter
  },
  data () {
    return {
      roleId: 0,
      addCharacterVisible: false,
      successMsg: 0
    }
  },
  methods: {
    getRoleId (val) {
      this.roleId = val
    },
    openAddDialog () {
      this.addCharacterVisible = true
    },
    addSuccess () {
      this.successMsg += 1
    }
  }
}
</script>
