<template>
  <div class="d2-pagination margin-top">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [100, 200, 300, 400]
      }
    },
    pages: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      page: 1,
      rows: this.pageSizes[0]
    }
  },
  watch: {
    pages: {
      handler (val) {
        this.page = this.pages.page
        this.rows = this.pages.rows
      },
      deep: true
    }
  },
  computed: {
    total: function () {
      return this.value
    }
  },
  // mounted () {
  //   this.page = this.pages.page
  //   this.rows = this.pages.rows
  // },
  methods: {
    handleSizeChange (val) {
      this.rows = val
      this.$emit('pageChange', {
        page: this.page,
        rows: val
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.$emit('pageChange', {
        page: val,
        rows: this.rows
      })
    }
  }
}
</script>
