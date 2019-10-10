<template>
  <d2-container>
    <el-row
      :gutter="20">
      <el-col
        :span="6">
        <tree v-on:hanldTreeClick="hanldTreeClick" :successMsg="successMsg"></tree>
      </el-col>
      <el-col
        :span="18">
        <tree-two  v-if="treeTwo.top < 2" :treeTwo="treeTwo" v-on:addMenu="addMenu" :successMsg="successMsg"></tree-two>
        <tree-three v-if="treeTwo.top >= 2 || treeTwo.top === undefined" :treeTwo="treeTwo" v-on:addTag="addTag" :successMsg="successMsg"></tree-three>
      </el-col>
    </el-row>
    <add-menu v-model="addMenuData" @saveSuccess="saveSuccess"></add-menu>
    <add-tag v-model="addTagData" @saveSuccess="saveSuccess"></add-tag>
  </d2-container>
</template>
<script>
import Tree from './components/tree'
import TreeTwo from './components/tree-two'
import TreeThree from './components/tree-three'
import AddMenu from './components/add-menu'
import AddTag from './components/add-tag'
export default {
  components: {
    Tree,
    TreeTwo,
    TreeThree,
    AddMenu,
    AddTag
  },
  data () {
    return {
      treeTwo: {
        id: -99,
        top: 0,
        name: '沿汇'
      },
      addMenuData: {},
      addTagData: {},
      successMsg: 0
    }
  },
  methods: {
    hanldTreeClick (val) {
      this.$set(this.treeTwo, 'id', val.id)
      this.$set(this.treeTwo, 'top', val.top)
      this.$set(this.treeTwo, 'name', val.name)
    },
    addMenu (val) {
      this.addMenuData = val
    },
    addTag (val) {
      this.addTagData = val
    },
    saveSuccess () {
      this.successMsg += 1
    }
  }
}
</script>
