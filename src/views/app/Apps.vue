<template>
  <div class="apps flex flex-v">
    <div class="top">
      <div class="header flex flex-align-center flex-pack-center">{{ $t('appsTitle') }}</div>
      <div class="tabs flex flex-align-center flex-pack-center">
        <div class="flex1 tabs-item-warp">
          <a :class="{ active: certificationStage === '0' }" @click="changeCert('0')">{{
            $t('iscertBlock')
          }}</a>
        </div>
        <div class="flex1 tabs-item-warp">
          <a :class="{ active: certificationStage === '1' }" @click="changeCert('1')">{{
            $t('uncertBlock')
          }}</a>
        </div>
      </div>
    </div>
    <div class="app-list flex1">
      <!-- 推荐挖矿 -->
      <!-- <a @click="open('https://www.show.sv/')" class="app-item flex flex-align-center">
        <img class="icon" src="@/assets/images/app_icon_showcoin.png" />
        <div class="right flex1 flex flex-align-center">
          <div class="cont flex1">
            <div class="title">
              {{ $t('recommendedMining') }} <img src="@/assets/images/icon_fire.png" />
            </div>
            <div class="drsc">{{ $t('recommendedMiningDrsc') }}</div>
          </div>
        </div>
      </a> -->
      <a
        @click="open(app.url)"
        class="app-item flex flex-align-center"
        v-for="app in apps"
        :key="app.appTag"
      >
        <img class="icon" :src="app.avatarUrl" />
        <div class="right flex1 flex flex-align-center">
          <div class="cont flex1">
            <div class="title">{{ app[`name${i18n.locale.value === 'zh' ? 'ZH' : 'EN'}`] }}</div>
            <div class="drsc">{{ app[`content${i18n.locale.value === 'zh' ? 'ZH' : 'EN'}`] }}</div>
          </div>
          <img
            class="info"
            src="@/assets/images/list_icon_info.png"
            @click.stop="toAppDetail(app.appTag)"
          />
        </div>
      </a>
    </div>
    <div class="app-dowmload flex flex-align-center" @click="open('https://www.show.sv/')">
      <img class="icon" src="@/assets/images/logo_app.png" />
      <div class="flex1">{{ $t('appdownloadTips') }}</div>
      <img class="right" src="@/assets/images/download_icon_ins.png" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { store } from '@/store'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { GetApps } from '../../api'

const i18n = useI18n()
const certificationStage = ref('0')
const apps: AppItem[] = reactive([])
const route = useRoute()
const router = useRouter()

function getApps() {
  return new Promise(async resolve => {
    const res = await GetApps({ certificationStage: certificationStage.value })
    if (res.code === 200) {
      apps.length = 0
      apps.push(...res.result.apps)
    }
  })
}

function changeCert(type: string) {
  if (certificationStage.value === type) return
  certificationStage.value = type
  getApps()
}

function open(url: string) {
  if (store.state.isIOS) {
    ElMessage.warning(i18n.t('iosNotToLink'))
    return
  }
  window.open(url, 'blank')
}

function toAppDetail(tag: string) {
  router.push({
    name: 'appDetail',
    params: {
      isCert: certificationStage.value,
      tag,
    },
  })
}
// debugger
if (route.query.lang && typeof route.query.lang === 'string') {
  i18n.locale.value = route.query.lang
}

getApps()
</script>

<style lang="scss" scoped src="./Apps.scss"></style>
