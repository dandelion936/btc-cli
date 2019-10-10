<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.name ? `${$t('layout.header-aside.header-user.hello')} ${info.name}` : '----'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff" class="dropdown-item">
        {{ $t('layout.header-aside.header-user.log-off') }}
        <d2-icon name="base-power-off"/>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.dropdown-item {
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
