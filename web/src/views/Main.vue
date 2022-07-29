<template>
  <div>
    <div class="topbar bg-black text-white px-4 py-2 d-flex">
      <img src="../assets/images/logo.png" alt="" height="30">
      <div class="d-flex flex-column px-3 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-gray-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary text-dark">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav d-flex text-white jc-around pb-1">
        <div class="nav-item active">
          <router-link class="nav-link" to="/">
            <span class="text-white">首页</span>
          </router-link>
        </div>
        <div class="nav-item ">
          <router-link class="nav-link" to="/">
            <span class="text-white">攻略中心</span>
          </router-link>
        </div>
        <div class="nav-item ">
          <router-link class="nav-link" to="/">
            <span class="text-white">赛事中心</span>
          </router-link>
        </div>
        <div class="nav-item ">
          <router-link class="nav-link" to="/">
            <span class="text-white">IP新游</span>
          </router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
</style>