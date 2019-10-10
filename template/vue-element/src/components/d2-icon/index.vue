<template>
  <i :class="[font, `${IconConfig[name]}`]" aria-hidden="true"></i>
</template>

<script>
import menu from './modules/menu'
import base from './modules/base'
export default {
  name: 'd2-icon',
  props: {
    name: {
      type: String,
      required: false,
      default: 'font-awesome'
    },
    font: {
      type: String,
      default: 'iconfont'
    }
  },
  data() {
    return {
      IconConfig: {
        ...menu,
        ...base,
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_1449147_nzkxr3zdgak.css');
@import './style/deco-icon.scss';
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
