<template>
  <d2-container>
    <el-button type="primary" size="small" @click="handleAdd" style="margin-bottom: 10px">
      <d2-icon name="&#xe6ed;"></d2-icon>
      新增
    </el-button>
    <blockquote>
      <span style="color: rgb(19, 206, 102)">绿色：启用用户；</span>
      <span style="color: #ccc;margin-right: 10px;">灰色：冻结用户</span>
    </blockquote>
    <basic-table v-loading="loading" :tableData="tableData"></basic-table>
    <d2-pagination v-if="total" v-model="total" :pageSizes="[10,50,100,200]" :pages="pages" v-on:pageChange="pageChange"></d2-pagination>
    <dialog-add-form v-model="dialogAddFormVisible" v-on:addSuccess="addSuccess"></dialog-add-form>
  </d2-container>
</template>
<script>
import BasicTable from './components/basic-table'
import DialogAddForm from './components/add-user'
import * as api from '@/api/admin'
import { mapActions } from 'vuex'
export default {
  components: {
    BasicTable,
    DialogAddForm
  },
  data () {
    return {
      loading: false,
      tableData: [],
      dialogAddFormVisible: false,
      total: 0,
      pages: {
        page: 1,
        rows: 10
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapActions('d2admin/role', [
      'set'
    ]),
    getList () {
      if (this.loading) {
        return
      }
      this.loading = true
      api.getAccountList(this.pages).then(res => {
        this.tableData = res.rows
        this.total = res.records
        this.loading = false
      })
    },
    handleAdd () {
      let that = this
      this.set().then(res => {
        if (res) {
          that.dialogAddFormVisible = true
        } else {
          this.$errorHandler(new Error('获取角色失败'), this, '角色列表为空')
        }
      })
    },
    addSuccess () {
      this.getList()
    },
    pageChange (page) {
      this.pages = page
      this.getList()
    }
  }
}
</script>
