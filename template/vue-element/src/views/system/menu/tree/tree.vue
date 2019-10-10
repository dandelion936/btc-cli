<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>菜单信息</span>
    </div>
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </el-card>
</template>
<script>
import * as api from '@/api/character'
export default {
  data () {
    return {
      data: [
        // {
        //   name: '用户中心',
        //   icon: '&#xe621;',
        //   children: [
        //     {
        //       name: '用户管理',
        //       path: '/usersmanage/',
        //       icon: '&#xe60a;'
        //     },
        //     {
        //       name: '个人信息',
        //       path: '/user/',
        //       icon: '&#xe609;'
        //     }
        //   ]
        // },
        // {
        //   name: '角色权限',
        //   icon: '&#xe621;',
        //   children: [
        //     {
        //       name: '菜单管理',
        //       path: '/menumanage/',
        //       icon: '&#xe60a;'
        //     },
        //     {
        //       name: '授权管理',
        //       path: '/character/',
        //       icon: '&#xe609;'
        //     }
        //   ]
        // },
        // {
        //   name: '报表',
        //   icon: '&#xe60b;',
        //   children: [
        //     {
        //       name: '我的报表',
        //       path: '/myreport/',
        //       icon: '&#xe602;'
        //     },
        //     {
        //       name: '全部报表',
        //       path: '/allreport/',
        //       icon: '&#xe641;'
        //     },
        //     {
        //       name: '我的实时报表',
        //       path: '/reportonline/',
        //       icon: '&#xe612;'
        //     },
        //     {
        //       name: '全部实时报表',
        //       path: '/allreportonline/',
        //       icon: '&#xe60c;'
        //     }
        //   ]
        // }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted () {
    this.getMenuList()
  },
  methods: {
    getMenuList () {
      api.getMenuList().then(res => {
        this.data = res.data
      })
    },
    handleNodeClick (data) {
      this.$emit('hanldTreeClick', data)
    }
  }
}
</script>
