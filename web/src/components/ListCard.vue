<template>
  <div>
    <m-card :icon="icon" :title="title">
      <div class="nav jc-between pb-3">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="nav-item"
          :class="{ active: activeNum === index }"
          @click="clickView(index)"
        >
          <div class="nav-link">{{ category.name }}</div>
        </div>
      </div>
      <div class="pt-1">
        <swiper @swiper="onSwiper" @slideChange="onSlideChange">
          <swiper-slide v-for="(category, index) in categories" :key="index">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const props = defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  categories: { type: Array, required: true },
});

let activeNum = ref(0);

/**
 * 在外部新增一个 outSwiper 来获取 swiper 内部的 swiper 实例，
 * 然后执行 clickView 里的 outSwiper.slideTo(index) 来滑动到指定的页面
 */
let outSwiper;
const onSwiper = (swiper) => {
  outSwiper = swiper;
  console.log("outSwiper", outSwiper);
};

// swiper8 将滑动事件的元素绑定在了入参 e 上
const onSlideChange = (e) => {
  activeNum.value = e.activeIndex;
};

const clickView = (index) => {
  console.log("index", index);
  activeNum.value = index;
  outSwiper.slideTo(activeNum.value);
};
</script>

<style lang="scss"></style>
