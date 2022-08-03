<template>
  <div>
    <swiper
      class="swiper-container"
      :modules="swiper_options.modules"
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
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-gray-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-4 pt-2" v-for="i in 10" :key="i">
          <i class="sprite sprite-news pt-1"></i>
          <div class="pb-1 fs-sm">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!-- end of nav-icons -->
    <m-list-card
      icon="cc-menu-circle"
      title="新闻资讯"
      :categories="state.newsCats"
    >
      <template #items="{ category }">
        <router-link
          :to="`/articles/${news._id}`"
          class="d-flex fs-lg py-2"
          style="overflow: hidden; height: fix-content; margin-bottom: 0.3rem; text-decoration: none;"
          v-for="(news, index) in category.newsList"
          :key="index"
        >
          <span
            class="text-red mr-1 fs-sm"
            style="
              border: 1px solid red;
              border-radius: 2px;
              padding: 0.05rem 0.1rem;
              margin: 0 0.1rem;
              vertical-align: bottom;
            "
            >{{ news.categoryName }}</span
          >
          <!-- <span class="mx-1 text-gray">|</span> -->
          <span
            class="flex-1 text-dark fs-lg mx-1 text-ellipsis"
            style="width: 5rem; vertical-align: base-line"
            >{{ news.title }}</span
          >
          <span class="fs-sm text-gray-1 px-1">{{
            dayjs(news.createdAt).format("MM/DD")
          }}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card
      icon="yingxiongxiangqing"
      title="英雄列表"
      :categories="state.heroCats"
    >
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link :to="`/heroes/${hero._id}`" class="p-2 text-center" v-for="hero in category.heroList" style="width: 20%; text-decoration: none;">
            <img :src="hero.avatar" class="w-100" style="border-radius: 0 0.5rem 0 0.5rem">
            <div class="text-dark fs-sm">{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-list-card
      icon="shipin"
      title="精彩视频"
      :categories="state.newsCats"
    >
      <template #items="{ category }">
        <div
          class="d-flex fs-lg py-2"
          style="overflow: hidden; height: fix-content; margin-bottom: 0.3rem"
          v-for="(news, index) in category.newsList"
          :key="index"
        >
          <span
            class="text-red mr-1 fs-sm"
            style="
              border: 1px solid red;
              border-radius: 2px;
              padding: 0.05rem 0.1rem;
              margin: 0 0.1rem;
              vertical-align: bottom;
            "
            >{{ news.categoryName }}</span
          >
          <!-- <span class="mx-1 text-gray">|</span> -->
          <span
            class="flex-1 text-dark fs-lg mx-1 text-ellipsis"
            style="width: 5rem; vertical-align: base-line"
            >{{ news.title }}</span
          >
          <span class="fs-sm text-gray-1 px-1">{{
            dayjs(news.createdAt).format("MM/DD")
          }}</span>
        </div>
      </template>
    </m-list-card>
    <m-card icon="cc-menu-circle" title="精彩视频"></m-card>
    <m-card icon="cc-menu-circle" title="百态王者"></m-card>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import dayjs from "dayjs";

SwiperCore.use([Autoplay, Pagination]);
let swiper_options = reactive({
  modules: [Pagination],
  autoplay: {
    disableOnInteraction: false, // 鼠标滑动后继续自动播放
    delay: 3000, //3秒切换一次
  },
  speed: 600, //切换过渡速度
  loop: true,
  slidesPerView: "auto", //解决最后一张切换到第一张中间的空白
  centeredSlides: true, //设置slide居中
  spaceBetween: 10,
  pagination: {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class='${className}'></span>`;
    },
  },
});

const { proxy } = getCurrentInstance();

const state = reactive({
  newsCats: [],
  heroCats: [],
});

async function fetchNewsCats() {
  let res = await proxy.$http.get("/news/list");
  console.log("newsCats:", res);
  state.newsCats = res.data;
}

async function fetchHeroCats() {
  let res = await proxy.$http.get("/heroes/list");
  console.log("heroCats:", res);
  state.heroCats = res.data;
}

onMounted(() => {
  fetchNewsCats();
  fetchHeroCats();
});
</script>

<style lang="scss">
@import "@/assets/sass/variables";

.swiper-container {
  .swiper-pagination {
    text-align: right !important;
    padding: 0 1rem 0.5rem 0;

    .swiper-pagination-bullet {
      width: 0.68rem;
      height: 0.68rem;
      display: inline-block;
      margin-right: 0.4rem;
      line-height: 999px;
      overflow: hidden;
      border-radius: 2px;
      background: #ffffff;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background: #4b67af;
    }
  }
}

.nav-icons {
  .nav-item {
    width: 25%;
    border-right: 0.1rem solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>
