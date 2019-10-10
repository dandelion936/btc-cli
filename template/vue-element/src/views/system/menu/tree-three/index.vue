<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="margin-right: 20px;">当前选择的菜单：
        <span style="color:red">{{treeTwo.name}}</span>
      </span>
      <el-button type="primary" size="small" plain>
        <d2-icon name="&#xe630;"></d2-icon>
        新增权限
      </el-button>
    </div>
    <el-table
      :data="tableData"
      :border="true"
      :stripe="true"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="权限名称"
        align="center">
      </el-table-column>
      <el-table-column
        label="权限字段"
        align="center">
        <!-- <template slot-scope="scope">
          <d2-icon
          v-html="scope.row.icon ? scope.row.icon:scope.row.second_icon"/>
        </template> -->
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">
              编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import * as api from '@/api/character'
export default {
  props: {
    treeTwo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.getMenuChild(this.treeTwo)
  },
  watch: {
    treeTwo: {
      handler (val) {
        this.getMenuChild(val)
      },
      deep: true
    }
  },
  methods: {
    getMenuChild (val) {
      api.getMenuChild({
        id: val.id,
        top: val.top
      }).then(res => {
        this.tableData = res.data
      })
    },
    handleEdit () {

    }
  }
}
</script>
