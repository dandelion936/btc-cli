<template>
  <div class="vue-viewer">
    <ul
      id="viewer"
      v-show="false"
    >
      <li
        v-for="(item,index) in value"
        :key="index"
      >
        <img
          :src="item"
          :alt="'图片'+(index+1)"
        >
      </li>
    </ul>
  </div>
</template>
<script>
import Viewer from "viewerjs";
import "../../../node_modules/viewerjs/dist/viewer.min.css";
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      viewer: {}
    };
  },
  methods: {
    showImgs(option) {
      if (Object.values(this.viewer).length) {
        this.viewer.reset();
        if(option && option.initialViewIndex) {
          this.viewer.index = option.initialViewIndex
        }
      }
      this.$nextTick(() => {
        if (!Object.values(this.viewer).length) {
          this.viewer = new Viewer(document.getElementById("viewer"),option);
        }
        this.viewer.update();
        this.viewer.show();
      });
    }
  }
};
</script>
