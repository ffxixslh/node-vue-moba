<template>
  <div class="card bg-white mt-3 px-3">
    <div
      class="card-header d-flex py-3 ai-center"
      :class="{ 'border-bottom': props.plain }"
    >
      <span class="iconfont" :class="`icon-${props.icon}`"></span>
      <div class="fs-xl flex-1 ml-2" :class="{ 'fw-bold': props.plain }">
        {{ props.title }}
      </div>
      <router-link
        to="/"
        v-if="!props.plain"
        class="iconfont icon-menu text-right"
        style="text-decoration: none"
      ></router-link>
    </div>
    <div class="card-body py-3">
      <slot></slot>
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
  plain: {
    type: Boolean,
  },
});
</script>

<style lang="scss">
@import "@/assets/sass/variables";

.card {
  border-bottom: 1px solid $border-color;
}
</style>
