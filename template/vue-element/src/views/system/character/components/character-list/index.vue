<template>
  <div class="character">
    <el-row>
      <el-col :span="24">
        <span style="margin-left:12px;float:left;color: red">角色列表</span>
        <el-button style="float:right" type="success" size="small" @click="handleAddCharacter">添加角色</el-button>
      </el-col>
      <el-col :span="24">
        <ul class="scroll-ul">
          <li v-for="(item,index) in roleList" class="scroll-li" @click="tab(item.id)" :key="index" v-bind:class="{'scoll-li-action' :roleId==item.id}">
            <span>{{item.name}}</span>
              <transition name="fade">
                <d2-icon name="&#xe716;" size="20" style="color:#19be6b" v-if="roleId==item.id"></d2-icon>
            </transition>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCharacterTag } from '@/api/character'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      roleList: [],
      roleId: ''
    }
  },
  watch: {
    value: {
      handler () {
        this.getList()
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      getCharacterTag().then(res => {
        this.roleList = res.data.roles
      })
    },
    tab (val) {
      this.roleId = val
      this.$emit('getRoleId', this.roleId)
    },
    handleAddCharacter () {
      this.$emit('openAddDialog')
    }
  }
}
</script>
<style lang="scss" scoped>
.character{
  padding: 0;
  margin: 0;
  max-width: 300px;
  .scroll-ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
    .scroll-li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      line-height: 40px;
      width: 100%;
      border: 1px solid #dce0e6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
      margin-bottom: 1px;
      padding: 0 16px;
      transition: all 0.5s liner;
    }
    .scoll-li-action{
      border-color:#19be6b;
    }
  }
}
</style>
