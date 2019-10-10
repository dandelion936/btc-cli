<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>菜单信息</span>
    </div>
    <el-tree
      :data="data"
      :props="defaultProps"
      node-key="id"
      :default-expanded-keys="[-99]"
      @node-click="handleNodeClick"
    ></el-tree>
  </el-card>
</template>
<script>
import * as api from '@/api/character'
export default {
  props: {
    successMsg: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted () {
    this.getMenuList()
  },
  watch: {
    successMsg: {
      handler () {
        this.getMenuList()
      }
    }
  },
  methods: {
    getMenuList () {
      api.getMenuList().then(res => {
        this.data = res.data
      })
    },
    handleNodeClick (data) {
      if (data.top === undefined) {
        return ''
      } else {
        this.$emit('hanldTreeClick', data)
      }
    }
  }
}
</script>
