<template>
  <div class="store-name">{{storeName}}</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("d2admin", {
      storeName: "store/storeName"
    })
  }
};
</script>
<style lang="scss" scoped>
.store-name {
	display: flex;
	align-items: center;
}
</style>