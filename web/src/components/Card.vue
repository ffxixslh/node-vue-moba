<template>
  <div class="card bg-white mt-3 px-3">
    <div class="card-header d-flex py-3 ai-center">
      <span class="iconfont" :class="`icon-${props.icon}`"></span>
      <div class="fs-xl flex-1 ml-2">{{ props.title }}</div>
      <span class="iconfont icon-menu text-right"></span>
    </div>
    <div class="card-body py-3 ">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
});
</script>

<style lang="scss">
@import "../assets/sass/variables";

.card {
  border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>
