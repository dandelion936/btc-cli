<template>
  <div
    class="d2-color"
    ref="d2Color"
  >
    <el-button-group ref="buttons">
      <el-button @click="showColorSelect"><span :style="{'background': color}">&nbsp;&nbsp;&nbsp;&nbsp;</span></el-button>
      <el-button @click="resetColor">重置</el-button>
    </el-button-group>
    <color-picker
      v-model="showColorSelectDilog"
      theme="light"
      :color="color"
      :sucker-hide="false"
      :sucker-canvas="suckerCanvas"
      :sucker-area="suckerArea"
      @changeColor="changeColor"
      @openSucker="openSucker"
      @setPosition="setPosition"
      :style="style"
    />
  </div>
</template>
<script>
import colorPicker from "./Color.vue";
export default {
  components: {
    colorPicker
  },
  props: {
    value: {
      type: String,
      required: true
    },
    initialColor: {
      type: String,
      default: "rgba(255,255,255,1)"
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    format: {
      type: String,
      default: 'rgba'
    }
  },
  data() {
    return {
      showColorSelectDilog: false,
      color: "rgba(255,255,255,1)",
      suckerCanvas: null,
      suckerArea: [],
      isSucking: false,
      style: {
        position: "absolute",
        zIndex: 1000,
        bottom: 0,
        left: 0
      }
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.color = val;
        }
      },
      immediate: true
    }
  },
  methods: {
    showColorSelect() {
      this.showColorSelectDilog = !this.showColorSelectDilog;
    },
    changeColor(color) {
      if(this.format == 'hex') {
        this.color = color.rgba.toHexString();
      }
      if(this.format == 'rgb') {
        this.color = color.rgba.toRgbString()
      }
      if(this.format == 'rgba') {
        this.color = color.rgba.toRgbaString()
      }
      this.$emit("input", this.color);
    },
    resetColor() {
      this.color = this.initialColor;
      this.$emit("input", this.color);
    },
    setPosition(val) {
      if(this.placement == 'bottom') {
        this.$set(this.style, "bottom", -val.height + "px");
        this.$set(
          this.style,
          "left",
          -Math.abs(val.width - this.$refs.d2Color.offsetWidth) / 2 + "px"
        );
      }
      if(this.placement == 'top-start') {
        this.$set(this.style, "bottom", this.$refs.buttons.$el.offsetHeight + "px");
        this.$set(
          this.style,
          "left",
          -Math.abs(val.width) / 2 + "px"
        );
      }
      if(this.placement == 'top') {
        this.$set(this.style, "bottom", this.$refs.buttons.$el.offsetHeight + "px");
        this.$set(
          this.style,
          "left",
          -Math.abs(val.width - this.$refs.d2Color.offsetWidth) / 2 + "px"
        );
      }
      if(this.placement == 'bottom-start') {
        this.$set(this.style, "bottom", -val.height + "px");
        this.$set(
          this.style,
          "left",
          -Math.abs(val.width) / 2 + "px"
        );
      }

    },
    openSucker(isOpen) {
      if (isOpen) {
        // ... canvas be created
        // this.suckerCanvas = canvas
        // this.suckerArea = [x1, y1, x2, y2]
      } else {
        // this.suckerCanvas && this.suckerCanvas.remove
      }
    }
  }
};
</script>
<style lang="scss">
.d2-color {
  position: relative;
  display: inline-block;
}
</style>
