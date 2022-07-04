<template>
  <div class="apps">
    <div class="top">
      <div class="header flex flex-align-center flex-pack-center">
        <img src="@/assets/images/pop_icon_return.png" class="back" @click="router.back()" />
        {{ $t('appsDetail') }}
      </div>
    </div>
    <div class="app-detail">
      <div class="app-base-info flex">
        <img class="logo" :src="app.val?.avatarUrl" />
        <div class="cont flex1">
          <div class="title" v-if="app.val">
            {{ app.val[`name${i18n.locale.value === 'zh' ? 'ZH' : 'EN'}`] }}
          </div>
          <div class="drsc" v-if="app.val">
            {{ app.val[`content${i18n.locale.value === 'zh' ? 'ZH' : 'EN'}`] }}
          </div>
        </div>
      </div>

      <!-- labels -->
      <div class="labels">
        <span v-if="app.val?.appType === 1">{{ $t('showApp') }}</span>
      </div>

      <!-- 开发者 -->
      <div class="detail-section">
        <div class="name">{{ $t('developers') }}</div>
        <div class="cont flex1">
          <UserMsg
            :width="36"
            :marginRight="8"
            :name="app.val?.developerName"
            :metaId="app.val?.developerMetaId"
            :avatarDisabled="true"
          />
        </div>
      </div>

      <!-- 应用收款地址 -->
      <div class="detail-section">
        <div class="name">{{ $t('appPayAddress') }}</div>
        <div class="cont flex1">
          <div class="detail-section-cont">{{ app.val?.appAddress }}</div>
        </div>
      </div>
      <!-- 应用链接 -->
      <div class="detail-section">
        <div class="name">{{ $t('appLink') }}</div>
        <div class="cont flex1">
          <div class="detail-section-cont">
            {{ app.val?.url }} <a @click="open(app.val?.url)">{{ $t('open') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { GetApps } from '../../api'
import UserMsg from '@/components/UserMsg/UserMsg.vue'
import { ElMessage } from 'element-plus'
import { store } from '@/store'

const i18n = useI18n()
const certificationStage = ref('0')
const app: { val: null | AppItem } = reactive({ val: null })
const router = useRouter()
const route = useRoute()

function getApps() {
  return new Promise<void>(async resolve => {
    const res = await GetApps({
      certificationStage: typeof route.params.isCert === 'string' ? route.params.isCert : '',
    })
    if (res.code === 200) {
      app.val = res.result.apps.find(item => item.appTag === route.params.tag)
    }
    resolve()
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

if (route.query.lang && typeof route.query.lang === 'string') {
  i18n.locale.value = route.query.lang
}

getApps()
</script>

<style lang="scss" scoped src="./AppDetail.scss"></style>
