<template>
  <div>
    <h1 style="text-align: center;">404...</h1>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

setTimeout(() => {
  proxy.$router.push("/");
}, 2000);
</script>

<style lang="scss" scoped>

</style>