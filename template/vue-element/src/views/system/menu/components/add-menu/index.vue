<template>
  <el-dialog :title="value.title" :visible.sync="modal" width="500" custom-class="dialog--maxwidth">
    <el-form :model="form" :rules="rules" ref="formAdd">
      <el-form-item label="菜单名称：" label-width="100px" prop="name">
        <el-input v-model="form.name" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item v-if="path.val" label="路径：" label-width="100px" prop="url">
        <el-input v-model="form.url" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="图标名称：" label-width="100px" prop="icon">
        <el-input v-model="form.icon" autocomplete="on"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="modal = false">取 消</el-button>
      <el-button type="primary" :loading="btnLoading" @click="submitForm('formAdd')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { postAddMenu, postEditMenu } from '@/api/character'
import { truncate } from 'fs';
export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: {
        name: '',
        url: '',
        icon: '',
        top: 0
      },
      path: {
        val: true
      },
      rules: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '路径不能为空', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '图标名称不能为空', trigger: 'blur' }
        ]
      },
      btnLoading: false
    }
  },
  computed: {
    modal: {
      get () {
        if (this.value.modal && this.value.row) {
          if (this.value.row && this.value.row.top === 0) {
            this.$set(this.form, 'icon', this.value.row.icon)
            this.$set(this.path, 'val', false)
          } else {
            this.$set(this.form, 'icon', this.value.row.second_icon)
          }
          this.$set(this.form, 'name', this.value.row.name)
          this.$set(this.form, 'url', this.value.row.url)
          this.$set(this.form, 'id', this.value.row.id)
          this.$set(this.form, 'top', this.value.row.top)
        }
        return this.value.modal
      },
      set (value) {
        if (!value) {
          this.$refs['formAdd'].resetFields()
          this.$set(this.form, 'name', '')
          this.$set(this.form, 'url', '')
          this.$set(this.form, 'icon', '')
          this.$set(this.form, 'id', '')
          this.$set(this.form, 'top', 0)
          this.$set(this.path, 'val', true)
        }
        this.$emit('input', {
          modal: value
        })
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.btnLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.value.title === '编辑菜单') {
            postEditMenu(this.form).then(res => {
              this.btnLoading = false
              if (res.code === 1) {
                this.modal = false
                this.$emit('saveSuccess')
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error',
                  duration: 5 * 1000
                })
              }
            })
          } else {
            postAddMenu(this.form).then(res => {
              this.btnLoading = false
              if (res.code === 1) {
                this.modal = false
                this.$emit('saveSuccess')
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error',
                  duration: 5 * 1000
                })
              }
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.dialog--maxwidth {
  max-width: 600px;
}
</style>
