<template>
  <div>
    <swiper
      :autoplay="swiper_options.autoplay"
      :loop="swiper_options.loop"
      :speed="swiper_options.speed"
      :slidesPerView="swiper_options.slidesPerView"
      :spaceBetween="swiper_options.spaceBetween"
      :pagination="swiper_options.pagination"
    >
      <swiper-slide>
        <img class="w-100" src="../assets/images/1.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/2.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/3.jpeg" alt="" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
SwiperCore.use([Autoplay, Pagination]);

let swiper_options = reactive({
  autoplay: {
    disableOnInteraction: false, // 鼠标滑动后继续自动播放
    delay: 3000, //3秒切换一次
  },
  speed: 600, //切换过渡速度
  loop: true,
  slidesPerView: "auto", //解决最后一张切换到第一张中间的空白
  centeredSlides: true, //设置slide居中
  spaceBetween: 0,
  pagination: {
    type: "bullets",
    clickable: true,
  },
});
</script>

<style lang="scss"></style>
