<template>
<el-dialog title="新增" :visible.sync="modal" :close-on-click-modal="false" custom-class="dialog--maxwidth" >
  <el-form :model="form" :rules="rules" ref="formAdd">
    <el-form-item label="账号：" :label-width="formLabelWidth" prop="workNo">
      <el-input v-model="form.workNo" autocomplete="on"></el-input>
    </el-form-item>
    <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
      <el-input v-model="form.password" autocomplete="off" show-password></el-input>
    </el-form-item>
    <el-form-item label="用户名：" :label-width="formLabelWidth" prop="userName">
      <el-input v-model="form.userName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
      <el-select v-model="form.roleId" filterable placeholder="角色">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="modal = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('formAdd')">确 定</el-button>
  </div>
</el-dialog>
</template>
<script>
import * as api from '@/api/admin'
import { mapActions } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    modal: {
      get () {
        return this.value
      },
      set (value) {
        if (!value) {
          this.cancelSubmit('formAdd')
        }

        this.$emit('input', value)
      }
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.get().then(res => {
          this.roleList = res.data
        })
      }
    }
  },
  data () {
    return {
      form: {
        workNo: '',
        password: '',
        userName: '',
        roleId: ''
      },
      roleList: [],
      formLabelWidth: '120px',
      rules: {
        workNo: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.postAccountAddSave(this.form).then(res => {
            this.modal = false
            this.$emit('addSuccess')
          })
        } else {
          return false
        }
      })
    },
    cancelSubmit (formName) {
      this.$refs[formName].resetFields()
    },
    ...mapActions('d2admin/role', [
      'get'
    ])
  }
}
</script>
<style lang="scss">
.dialog--maxwidth {
  max-width: 600px;
}
</style>
