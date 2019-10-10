<template>
  <div class="d2-import">
    <div style="margin: 0 10px;">
      <el-upload
      ref="import"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-remove="beforeRemove"
      :auto-upload="false"
      action=""
      :show-file-list="true">
      <slot v-if="$slots.default"></slot>
      <el-button v-if="!$slots.default" size="small" type="primary">
        <d2-icon name="&#xe672;"></d2-icon>
        选取文件
      </el-button>
      </el-upload>
    </div>
  </div>
</template>
<script>
// 上传的接口写在import文件里
import * as api from '@/api/import'
export default {
  props: {
    api: {
      type: String,
      required: true
    },
    formKey: {
      type: String,
      required: true
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    async handleChange(file,fileList) {
      this.fileList = fileList
      if(this.autoUpload) {
        this.submitFiles()
      }
    },
    handleRemove(file,fileList) {
      this.fileList = fileList
    },
    async submitFiles() {
      let form = new FormData();
      if(this.fileList.length) {
        for(let i = 0; i < this.fileList.length; i++) {
          form.append(this.formKey, this.fileList[i].raw)
        }
        await api[this.api](form).then(res => {
          if(res.code == 1) {
            this.$message({
              type: 'success',
              message: res.msg
            })
          }else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        }).catch(error => {
          this.$message({
            type: 'error',
            message: error.message
          })
        })
        this.$refs.import.clearFiles()
      }else {
        this.$message.error('请选择文件！')
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>
<style lang="scss" scoped>
.d2-import {
  display: inline-block;
}
</style>
