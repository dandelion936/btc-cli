<template>
  <d2-container>
    <template slot="header">个人信息设置</template>
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <el-form label-width="100px" label-position="left" :model="form" ref="form">
          <el-form-item label="姓名：" prop="username"
          :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
            <span v-if="!isEdit">{{form.username}}</span>
            <el-input v-if="isEdit" v-model="form.username" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="登陆账号：">
            <span>{{form.workNo}}</span>
          </el-form-item>
          <!-- <el-form-item v-if="isEdit" label="密码：" prop="password">
            <el-input type="password" v-if="isEdit" v-model="form.password" placeholder="密码"></el-input>
          </el-form-item> -->
          <!-- <el-form-item v-if="isEdit" label="确认密码：" prop="confrimPassword"
          :rules="[{ required: cheackPassword.value, message: '两次输入不一致', trigger: 'blur' }]">
            <el-input type="password" v-if="isEdit" v-model="form.confrimPassword" placeholder="确认密码"></el-input>
          </el-form-item> -->
          <el-form-item label="状态：">
            <span >{{form.status == 1 ? '启用': '冻结'}}</span>
          </el-form-item>
          <!-- <el-form-item label="邮箱：">
            <span v-if="!isEdit">{{form.mailAddress}}</span>
            <el-input v-if="isEdit" v-model="form.mailAddress" placeholder="邮箱"></el-input>
          </el-form-item> -->
          <el-form-item label="创建日期：">
            <span>{{format(form.createDate,'yyyy-MM-dd')}}</span>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="small" @click="handleEdit">
          <d2-icon name="&#xe62a;"></d2-icon>
          {{editText}}
        </el-button>
        <el-button v-if="isEdit" type="primary" size="small" @click="handleSave('form')">
          <d2-icon name="&#xe617;"></d2-icon>
          保存
        </el-button>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import util from '@/libs/util'
import * as api from '@/api/admin'
import { mapActions } from 'vuex'
export default {
  // 如果需要缓存页面
  // name 字段需要设置为和本页路由 name 字段一致
  // name: 'user',
  data () {
    return {
      isEdit: false,
      editText: '编辑',
      form: {}
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    format (date, type) {
      return util.format(date, type)
    },
    getUser () {
      api.getAccount().then(res => {
        this.form = res.data
        this.form.password = ''
      })
    },
    handleEdit () {
      this.isEdit = !this.isEdit
      if (this.isEdit) {
        this.editText = '取消编辑'
      } else {
        this.editText = '编辑'
      }
    },
    handleSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.postAccountEditSave({
            username: this.form.username,
            password: this.form.password,
            mailAddress: this.form.mailAddress,
            id: this.form.id
          }).then(res => {
            if (res.code === 0) {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 5 * 1000
              })
              this.handleEdit()
              this.$store.dispatch('d2admin/user/set', {
                name: this.form.username
              }, { root: true })
              this.logout({
                vm: this,
                confirm: false
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
