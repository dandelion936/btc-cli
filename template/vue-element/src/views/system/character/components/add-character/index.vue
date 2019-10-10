<template>
  <el-dialog title="新增角色" :visible.sync="modal" :close-on-click-modal="false" custom-class="dialog--maxwidth" >
  <el-form :model="form" :rules="rules" ref="formAdd">
    <el-form-item label="角色名称：" :label-width="formLabelWidth" prop="name">
      <el-input v-model="form.name" autocomplete="on"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="modal = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('formAdd')">确 定</el-button>
  </div>
</el-dialog>
</template>
<script>
import { postAddCharacter } from '@/api/character'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      form: {
        name: ''
      },
      formLabelWidth: '100px',
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    modal: {
      get () {
        return this.value
      },
      set (value) {
        if (!value) {
          this.$refs['formAdd'].resetFields()
        }
        this.$emit('input', false)
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postAddCharacter(this.form).then(res => {
            if (res.code === 1) {
              this.modal = false
              this.$emit('addSuccess')
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
