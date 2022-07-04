<template>
  <div class="app-guide flex flex-align-center flex-pack-center">
    <!-- 微信环境引导用户使用浏览器打开 -->
    <div class="wxtip" v-if="isShowWechatModal">
      <img src="@/assets/images/guide/akav9-4xo0e.jpg" />
      <div class="operate">
        <ElButton size="large" @click="isShowWechatModal = false">{{ $t('cancel') }}</ElButton>
      </div>
    </div>

    <div class="flex flex-align-center flex-pack-center app-guide-warp container">
      <img class="bg" src="@/assets/images/guide/emb.png" />
      <div class="flex1">
        <div class="images">
          <img class="img1" src="@/assets/images/guide/app-img.png" />
        </div>

        <div class="logo">
          <img src="@/assets/images/guide/logo_ruoxi.png" />
        </div>

        <div class="drsc">若喜｜元网最大数字藏品市场。</div>

        <div class="operate flex flex-align-center">
          <a class="flex1 flex flex-align-center flex-pack-center" @click="download">
            <div class="warp flex flex-align-center">
              <img class="icon" :src="Android" />
              <div class="cont">
                <div class="title">下载若喜APP</div>
                <div class="subtitle">Android APK</div>
              </div>
            </div>
          </a>
          <a class="flex1 flex flex-align-center flex-pack-center" @click="toNos">
            <span class="title">使用若喜H5商城</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Android from '@/assets/images/guide/android.svg?url'
import { ref } from 'vue'
document.title = '若喜'
const UA = window.navigator.userAgent.toLowerCase()
const isWechat = !!(UA && /micromessenger/.test(UA))
const isShowWechatModal = ref(false)
function download() {
  if (isWechat) isShowWechatModal.value = true
  else {
    window.location.href = 'https://www.show.sv/app/ruoxi.apk'
  }
}
function toNos() {
  window.location.href = 'https://nft.nos.art/'
}
</script>

<style lang="scss" scoped src="./Guide.scss"></style>
