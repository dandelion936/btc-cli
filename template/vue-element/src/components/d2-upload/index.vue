<template>
  <div class="d2-upload">
    <el-upload
      @click.native="handellimit($event)"
      class="el-upload"
      :limit="limit"
      ref="upload"
      action=""
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :file-list="fileList"
      :list-type="listType"
      :auto-upload="false"
      :multiple="multiple"
      :show-file-list = showFileList>
      <i v-if="!$slots.default" class="el-icon-plus"></i>
      <div v-if="$slots.default" slot="trigger">
        <slot></slot>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { uploadImgsDiff, uploadImgs } from '@/api/admin'
export default {
  props: {
    initFiles: {
      type: Array,
      default: ()=> []
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    extraRequest:{
      type:Object,
      default: () => {
        return {}
      }
    },
    multiple:{
      type:Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 10000
    },
    showFileList: {
      type:Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'picture-card'
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileRetrun: [],
      initFilesReset: []
    }
  },
  computed: {
    fileList: {
      get() {
        if(this.initFilesReset.length) {
          return this.initFilesReset
        }else {
          return this.initFiles
        }
      },
      set (val) {
        return val
      }
    }
  },
  watch: {
    fileRetrun: {
      handler(val) {
        if (this.autoUpload) {
          this.uploadFile()
        }
        this.$emit('getFiles',val)
      }
    }
  },
  methods: {
    handellimit(event){
      if(this.fileRetrun.length >= this.limit) {
        event.preventDefault()
        this.$message({
          type: 'error',
          message: '超出限定数量'
        })
      }
    },
    handleRemove(file,fileList) {
      let arr = []
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].url) {
          arr.push(fileList[i].url)
        }
      }
      this.$emit('input',arr.toString())
    },
    handleChange(file,fileList) {
      this.fileRetrun = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile() {
      let arr = []
      if (!this.fileRetrun.length) {
        this.$message({
          message: '请选择图片！',
          type: 'error',
          duration: 5 * 1000
        })
      } else {
        let form = new FormData();
        Object.keys(this.extraRequest).forEach(ele => {
          form.append(ele, this.extraRequest[ele])
        })
        for (let i = 0; i < this.fileRetrun.length; i++) {
          if (this.fileRetrun[i].raw) {
            form.append("imgFile", this.fileRetrun[i].raw)
          } else {
            arr.push(this.fileRetrun[i].url)
          }
        }
        if (Object.keys(this.extraRequest).length) {
          uploadImgsDiff(form).then( res => {
            if (res.code === 1) {
              this.$emit('input', arr.concat(res.data).toString())
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 5 * 1000
              })
              if(!this.multiple) {
                this.$emit('input', res.data[0])
                this.initFilesReset = [{
                  url: res.data[0]
                }]
                this.$refs.upload.clearFiles();
              }else {
                this.$emit('input', arr.concat(res.data).toString())
                let imgUrls = arr.concat(res.data)
                let imgInit = []
                for(let i = 0; i < imgUrls.length; i++) {
                  imgInit.push({
                    url: imgUrls[i]
                  })
                }
                this.initFilesReset = imgInit
                this.$refs.upload.clearFiles();
              }
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
              })
            }
          })
        }else {
          uploadImgs(form).then( res => {
            if (res.code === 1) {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 5 * 1000
              })
              if(!this.multiple) {
                this.$emit('input', res.data[0])
                this.initFilesReset = [{
                  url: res.data[0]
                }]
                this.$refs.upload.clearFiles();
              }else {
                this.$emit('input', arr.concat(res.data).toString())
                let imgUrls = arr.concat(res.data)
                let imgInit = []
                for(let i = 0; i < imgUrls.length; i++) {
                  imgInit.push({
                    url: imgUrls[i]
                  })
                }
                this.initFilesReset = imgInit
                this.$refs.upload.clearFiles();
              }
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
              })
            }
          })
        }
      }
    },
  }
}
</script>
