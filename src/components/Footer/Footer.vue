<template>
  <footer>
    <div class="footer-top">
      <div class="container flex">
        <div class="logo-warp footer-secion">
          <a class="logo flex flex-align-center">
            <img class="enImg" :src="LogoIconEn" alt="NFTOnShow" />
          </a>
          <div class="slogan">{{ $t('nosSlogan') }}</div>
        </div>

        <!-- NOS市场 -->
        <div class="footer-secion flex1">
          <div class="title">{{ $t('nosMarket') }}</div>
          <div class="footer-secion-list">
            <div class="footer-secion-item">
              <router-link :to="{ name: 'home' }">{{ $t('home') }}</router-link>
            </div>
            <div class="footer-secion-item">
              <router-link :to="{ name: 'topic' }">{{ $t('topic') }}</router-link>
            </div>
            <div class="footer-secion-item">
              <router-link :to="{ name: 'market' }">{{ $t('countryFair') }}</router-link>
            </div>
            <div class="footer-secion-item">
              <router-link :to="{ name: 'create' }" v-if="!isApp">{{
                $t('createnft')
              }}</router-link>
            </div>
          </div>
        </div>

        <!-- 关于NOS -->
        <div class="footer-secion flex1">
          <div class="title">{{ $t('aboutNOS') }}</div>
          <div class="footer-secion-list">
            <div class="footer-secion-item">
              <router-link :to="{ name: 'fees' }">{{ $t('tariffDescription ') }}</router-link>
            </div>
            <div class="footer-secion-item">
              <router-link :to="{ name: 'termsOfUse' }">{{ $t('termsOfUse') }}</router-link>
            </div>
            <div class="footer-secion-item">
              <router-link :to="{ name: 'certification' }">{{ $t('certSystemIntro') }}</router-link>
            </div>
          </div>
        </div>

        <!-- 联系我们 -->
        <div class="footer-secion flex1">
          <div class="title">{{ $t('conactUs') }}</div>
          <div class="footer-secion-list">
            <div class="footer-secion-item">
              <a>{{ $t('email') }}：showpay@showpay.io</a>
            </div>
          </div>
        </div>
        <!-- <div class="cro">{{ $t('contactus') }}</div>
        <div class="bottom flex">
          <div class="email flex1">{{ $t('email') }}：showpay@showpay.io</div>
          <div class="copyright">ShowNFT © 2021</div>
        </div> -->
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备19109852号</a>ShowNFT © 2021
      </div>
    </div>
  </footer>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import LogoIconEn from '@/assets/images/logo_nos_w.svg?url'
// import LogoIconCn from '@/assets/images/logo_nos_cn.svg?url'
// import { useI18n } from 'vue-i18n'
const isApp = window.appMetaIdJsV2 || window.appMetaIdJs ? true : false
// const i18n = useI18n()
// const LogoIcon = computed(() => {
//   return i18n.locale.value === 'zh' ? LogoIconCn : LogoIconEn
// })
</script>
<style lang="scss" scoped src="./Footer.scss"></style>
