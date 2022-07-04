<template>
  <div class="container">
    <img class="img404" :src="NotFountIcon" />
    <div class="tips-btn">
      <router-link to="/">{{ $t('backHome') }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import NotFountIcon from '@/assets/images/404.svg?url'
</script>

<style lang="scss" scoped>
.img404 {
  width: 400px;
  height: auto;
  display: block;
  margin: 0 auto;
}
.tips-btn {
  text-align: center;
  a {
    text-decoration: none;
    color: #456fc4;
  }
}
</style>
