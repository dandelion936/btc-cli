<template>
  <div @click="download" class="d2-outport">
    <iframe src="" style="display:none" id="downloadIframe"></iframe>
    <div style="margin: 0 10px;">
      <el-button v-if="!$slots.default" size="small" type="primary">
        <d2-icon name="&#xe615;"></d2-icon>
        导出
      </el-button>
      <slot v-if="$slots.default"></slot>
    </div>
  </div>
</template>
<script>
// 上传的接口写在import文件里
import * as api from '@/api/outport'
export default {
  props: {
    api: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    download() {
      let params = {}
      Object.assign(params,this.data)
      api[this.api](params).then(res => {
        if(res) {
          this.$message({
            type: 'success',
            message: '导出成功'
          })
        }
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error.message
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.d2-outport {
  display: inline-block;
}
</style>
