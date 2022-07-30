<template>
  <div>
    <m-card :icon="icon" :title="title">
      <div class="nav jc-between pb-3">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="nav-item"
          :class="{ active: activeNum === index }"
          @click="activeNum = index"
        >
          <div class="nav-link">{{ category.name }}</div>
        </div>
      </div>
      <div class="pt-1">
        <swiper>
          <swiper-slide v-for="(category, index) in categories" :key="index">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  categories: { type: Array, required: true },
});
const state = reactive({});

const activeNum = ref(0);
</script>

<style lang="scss"></style>
