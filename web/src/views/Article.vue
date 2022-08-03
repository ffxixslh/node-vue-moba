<template>
  <div class="page-article" v-if="state.model">
    <div class="d-flex py-3 px-2" style="border-bottom: 1px solid #d4d9de">
      <router-link to="/">
        <div class="iconfont icon-back"></div>
      </router-link>
      <strong class="flex-1 text-ellipsis pr-3 text-a-title">
        {{ state.model.title }}
      </strong>
      <div class="text-gray fs-xs pr-3">2022-08-01</div>
    </div>
    <div v-html="state.model.body" class="body px-3 mb-5"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, watchEffect } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const state = reactive({
  model: {},
});

const { proxy } = getCurrentInstance();
const router = useRouter();
let id = ref();
function back() {
  router.back();
}

async function fetchArticle() {
  const res = await proxy.$http.get(`/articles/${props.id}`);
  console.log(res);
  state.model = res.data;
}

watchEffect(id, fetchArticle);

onMounted(() => {
  fetchArticle();
  id.value = props.id;
});
</script>

<style lang="scss">
.page-article {
  .icon-back {
    font-size: 2.5rem;
    color: #7ec3f9;
    cursor: pointer;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
    }
  }
}
</style>
