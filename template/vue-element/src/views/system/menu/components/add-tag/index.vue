<template>
  <el-dialog title="新增权限" :visible.sync="modal" width="500" custom-class="dialog--maxwidth">
    <el-form :model="form" :rules="rules" ref="formAdd">
      <el-form-item label="权限名称：" label-width="100px" prop="tagName">
        <el-input v-model="form.tagName" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="权限字段：" label-width="100px" prop="tag">
        <el-input v-model="form.tag" autocomplete="on"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="modal = false">取 消</el-button>
      <el-button type="primary" :loading="btnLoading" @click="submitForm('formAdd')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { postAddTag } from '@/api/character'
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
        tagName: '',
        tag: '',
        top: 2
      },
      path: {
        val: true
      },
      rules: {
        tagName: [
          { required: true, message: '权限名称名称不能为空', trigger: 'blur' }
        ],
        tag: [
          { required: true, message: '权限字段不能为空', trigger: 'blur' }
        ]
      },
      btnLoading: false
    }
  },
  computed: {
    modal: {
      get () {
        this.$set(this.form, 'top', this.value.top)
        this.$set(this.form, 'menuId', this.value.id)
        return this.value.modal
      },
      set (value) {
        if (!value) {
          this.$refs['formAdd'].resetFields()
          this.$set(this.form, 'tagName', '')
          this.$set(this.form, 'tag', '')
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
          postAddTag(this.form).then(res => {
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
