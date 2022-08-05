<template>
  <div class="page-hero" v-if="state.model.name">
    <div
      class="topbar bg-dark-1 text-white px-4 py-2 d-flex"
      style="position: sticky; z-index: 10; top: 0; left: 0; right: 0"
    >
      <img src="../assets/images/logo.png" height="30" />
      <div class="d-flex px-3 flex-1 ai-center">
        <div class="text-white">王者荣耀</div>
        <div class="text-white ml-3">攻略站</div>
      </div>
      <router-link
        to="/"
        class="text-white mt-1 d-flex ai-center"
        style="text-decoration: none"
      >
        <span class="fs-xs">更多英雄</span>
        <span class="fs-xxl ml-2"> &gt;</span>
      </router-link>
    </div>
    <div class="top" :style="`background-image: url(${state.model.banner})`">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div>{{ state.model.title }}</div>
        <div class="my-1 fs-xxl" style="font-weight: bold">
          {{ state.model.name }}
        </div>
        <div class="mt-1" style="font-size: 12.0003px">
          {{ state.model.categories?.map((v) => v.name).join("/") }}
        </div>
        <div class="d-flex ai-center jc-between">
          <div class="scores d-flex">
            <span class="attr-name">难度</span>
            <div
              class="attr-score"
              :class="` hero-attr-3-${state.model.scores.difficult - 1}`"
            ></div>
            <span class="attr-name">技能</span>
            <div
              class="attr-score"
              :class="` hero-attr-2-${state.model.scores.skills - 1}`"
            ></div>
            <span class="attr-name">攻击</span>
            <div
              class="attr-score"
              :class="` hero-attr-1-${state.model.scores.attack - 1}`"
            ></div>
            <span class="attr-name">生存</span>
            <div
              class="attr-score"
              :class="`hero-attr-0-${state.model.scores.survive - 1}`"
            ></div>
          </div>
          <router-link
            to="/"
            class="text-gray-3 fs-sm"
            style="text-decoration: none"
            >皮肤：6 &gt;</router-link
          >
        </div>
      </div>
    </div>
    <!-- end of top -->

    <div class="body">
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom text-center">
          <div
            class="nav-item"
            @click="viewChange(0)"
            :class="{ active: activeNum === 0 }"
          >
            <div class="nav-link">英雄初识</div>
          </div>
          <div
            class="nav-item"
            @click="viewChange(1)"
            :class="{ active: activeNum === 1 }"
          >
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper
        autoHeight
        :space-between="10"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link
                  to="/"
                  class="btn btn-lg flex-1 text-center p-2 ml-3"
                >
                  <i class="iconfont icon-cc-menu-circle"></i>英雄介绍视频
                </router-link>
                <div style="width: 6.5px"></div>
                <router-link
                  to="/"
                  class="btn btn-lg flex-1 text-center py-2 mr-3"
                >
                  <i class="iconfont icon-cc-menu-circle"></i>一图识英雄
                </router-link>
              </div>
              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    @click="currentSkillIndex = index"
                    :class="{ active: currentSkillIndex === index }"
                    :src="item.icon"
                    v-for="(item, index) in state.model.skills"
                    :key="item.name"
                    width="70"
                    height="70"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-2">
                    <h3 class="my-0 mr-4">{{ currentSkill.name }}</h3>
                    <span class="text-gray-1 fs-sm">
                      (冷却值：
                      {{ currentSkill.delay }}
                      消耗：
                      {{ currentSkill.cost }})
                    </span>
                  </div>
                  <p class="text-gray-2 mt-3 mb-1">
                    {{ currentSkill.description }}
                  </p>
                </div>
              </div>
            </div>

            <m-card plain icon="cc-menu-circle" title="加点建议">
              <div class="d-flex jc-around text-center">
                <div class="d-flex flex-column">
                  <div class="fs-lg">主升</div>
                  <div class="d-flex">
                    <div class="rec-skill-item d-flex flex-column">
                      <img src="" alt="" width="60" height="60" />
                      <div class="fs-sm mt-2">火球术</div>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <div class="fs-lg">副升</div>
                  <div class="d-flex">
                    <div class="rec-skill-item d-flex flex-column">
                      <img src="" alt="" width="60" height="60" />
                      <div class="fs-sm mt-2">混沌火种</div>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <div class="fs-lg">召唤师技能</div>
                  <div class="d-flex">
                    <div class="rec-skill-item d-flex flex-column">
                      <img src="" alt="" width="60" height="60" />
                      <div class="fs-sm mt-2">闪现</div>
                    </div>
                    <div class="ml-3 rec-skill-item d-flex flex-column">
                      <img src="" alt="" width="60" height="60" />
                      <div class="fs-sm mt-2">治疗术</div>
                    </div>
                  </div>
                </div>
              </div>
            </m-card>
            <m-card
              plain
              icon="cc-menu-circle"
              title="出装推荐"
              class="hero-items"
            >
              <div>
                <div class="fs-xl mb-3">顺风出装</div>
                <div class="d-flex jc-around">
                  <div
                    class="hero-item"
                    v-for="item in state.model.items1"
                    :key="item.name"
                  >
                    <img :src="item.icon" class="icon" />
                    <div class="item-name fs-xxs">{{ item.name }}</div>
                  </div>
                </div>
              </div>
              <div class="border-bottom mt-1 mb-3"></div>
              <div>
                <div class="fs-xl mb-3">逆风出装</div>
                <div class="d-flex jc-around">
                  <div
                    class="hero-item"
                    v-for="item in state.model.items2"
                    :key="item.name"
                  >
                    <img :src="item.icon" class="icon" />
                    <div class="item-name fs-xxs">{{ item.name }}</div>
                  </div>
                </div>
              </div>
            </m-card>
            <m-card plain icon="cc-menu-circle" title="铭文推荐"> </m-card>
            <m-card plain icon="cc-menu-circle" title="使用技巧">
              <p class="m-0">{{ state.model.usageTips }}</p>
            </m-card>
            <m-card plain icon="cc-menu-circle" title="对抗技巧">
              <p class="m-0">{{ state.model.battleTips }}</p>
            </m-card>
            <m-card plain icon="cc-menu-circle" title="团战思路">
              <p class="m-0">{{ state.model.teamTips }}</p>
            </m-card>
            <m-card plain icon="cc-menu-circle" title="英雄关系">
              <div>
                <div class="fs-lg">最佳搭档</div>
                <div class="d-flex flex-column">
                  <div
                    v-for="item in state.model.partners"
                    :key="item._id"
                    class="d-flex py-2"
                  >
                    <img
                      :src="item.hero.avatar"
                      style="border-radius: 0.25rem"
                      width="48"
                      height="48"
                    />
                    <p class="m-0 pt-1 pl-3">{{ item.description }}</p>
                  </div>
                </div>
              </div>
              <div class="border-bottom mb-3"></div>
              <div>
                <div class="fs-lg">被谁克制</div>
                <div class="d-flex flex-column">
                  <div
                    v-for="item in state.model.partners"
                    :key="item._id"
                    class="d-flex py-2"
                  >
                    <img
                      :src="item.hero.avatar"
                      style="border-radius: 0.25rem"
                      width="48"
                      height="48"
                    />
                    <p class="m-0 pt-1 pl-3">{{ item.description }}</p>
                  </div>
                </div>
              </div>
              <div class="border-bottom mb-3"></div>
              <div>
                <div class="fs-lg">克制谁</div>
                <div class="d-flex flex-column">
                  <div
                    v-for="item in state.model.partners"
                    :key="item._id"
                    class="d-flex py-2"
                  >
                    <img
                      :src="item.hero.avatar"
                      style="border-radius: 0.25rem"
                      width="48"
                      height="48"
                    />
                    <p class="m-0 pt-1 pl-3">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="d-flex px-3 flex-column bg-white" style="height: auto">
            <div
              class="video-item d-flex py-3 border-bottom"
              v-for="item in fakeDatas"
              :key="item.title"
            >
              <div class="video-item" style="position: relative">
                <img
                  :src="item.cover"
                  width="116"
                  height="64"
                  style="background-size: cover; border-radius: 0.2rem"
                />
                <span class="video-mask"></span>
              </div>
              <div class="d-flex ml-3 flex-column jc-between flex-1">
                <div class="fs-lg text-dark-2">{{ item.title }}</div>
                <div class="d-flex jc-between">
                  <div class="text-gray-1 fs-sm d-flex flex-1 ai-center">
                    <span class="video-views mx-1"></span>
                    <span>{{ item.views }}万</span>
                  </div>
                  <div class="text-gray-1 fs-sm">{{ item.date }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-light-2 text-gray-1 text-center p-2 fs-sm">全部加载完成</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, getCurrentInstance } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { proxy } = getCurrentInstance();

const state = reactive({
  model: {
    name: "",
    avatar: "",
    banner: "",
    title: "",
    categories: [],
    scores: {
      difficult: 0,
      skills: 0,
      attack: 0,
      survive: 0,
    },
    skills: {},
    items1: [],
    items2: [],
    usageTips: "",
    battleTips: "",
    teamTips: "",
    partners: [],
  },
});

async function fetchHero() {
  const res = await proxy.$http.get(`/heroes/${props.id}`);
  console.log(res.data);
  state.model = res.data;
}

let currentSkillIndex = ref(0);
const currentSkill = computed(() => {
  return state.model.skills[currentSkillIndex.value];
});

let activeNum = ref(0);
let outSwiper;
const onSlideChange = (e) => {
  activeNum.value = e.activeIndex;
};
const onSwiper = (swiper) => {
  console.log(swiper);
  outSwiper = swiper;
};
const viewChange = (index) => {
  activeNum.value = index;
  outSwiper.slideTo(activeNum.value);
};

const fakeData = reactive({
  title: "【快速上手英雄技能】 安琪拉",
  cover: "https://img.yzcdn.cn/vant/cat.jpeg",
  views: "1546.6",
  date: "2017-12-11",
});

const fakeDatas = Array.from({ length: 6 }).fill(fakeData);
console.log(fakeDatas);
onMounted(() => {
  fetchHero();
});
</script>

<style lang="scss">
@import "../assets/sass/variables";

.page-hero {
  height: auto;
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;

    .info {
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      .attr-name {
        font-size: 12.0003px;
      }
      .attr-score {
        display: inline-block;
        width: 13px;
        height: 13px;
        border: none;
        margin: 1.3px 5.2px;
        font-size: 12.0003px;
      }
    }
  }
  .body {
    .skills {
      img.icon {
        width: 5.3846rem;
        height: 5.3846rem;
        border: 0.2308rem solid map-get($map: $colors, $key: "white");
        &.active {
          border: 0.2308rem solid map-get($map: $colors, $key: "primary");
        }
        border-radius: 50%;
      }
    }
    .hero-items {
      .hero-item {
        width: auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img.icon {
          width: 3.5769rem;
          height: 3.5769rem;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
