<template>
  <div className="basic-table">
    <el-table
    :data="tableData"
    :border="true"
    :stripe="true"
    style="width: 100%">
      <el-table-column
          prop="createDate"
          label="创建日期"
          align="center">
          <template slot-scope="scope">
            <span>{{ format(scope.row.createDate,'yyyy-MM-dd') }}</span>
          </template>
      </el-table-column>
      <el-table-column
          prop="workNo"
          label="账号"
          align="center">
      </el-table-column>
      <el-table-column
          prop="roleName"
          label="角色"
          align="center">
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="是否冻结"
        align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :inactive-value="2"
            :active-value="1"
            @change="handelSwitchChange(scope.$index, scope.row)"
            active-color="#13ce66"
            inactive-color="#ccc">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150"
        >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleResetPassword(scope.$index, scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import util from '@/libs/util'
import * as api from '@/api/admin'
export default {
  name: 'BasicTable',
  props: {
    tableData: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    format (date) {
      return util.format(date, 'yyyy-MM-dd')
    },
    handleEdit (index, row) {
      this.$emit('setDialogEditForm', {
        modal: true,
        id: row.id
      })
    },
    handelSwitchChange (index, row) {
      api.postAccountEditSave(row).then(res => {
        if (row.status === 2) {
          this.$message({
            message: '冻结成功',
            type: 'success',
            duration: 5 * 1000
          })
        } else {
          this.$message({
            message: '启用成功',
            type: 'success',
            duration: 5 * 1000
          })
        }
      })
    },
    handleResetPassword (index, row) {
      api.postResetPassword({
        id: row.id
      }).then(res => {
        this.$message({
          message: '重置成功',
          type: 'success',
          duration: 5 * 1000
        })
      })
    }
  }
}
</script>

<style>

</style>
