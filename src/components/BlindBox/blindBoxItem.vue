<template>
  <a @click="toDetail(item.url)" class="nft-item">
    <div class="cover">
      <NFTCover
        :isBlindBox="item.tag === 'MetaBotAvatar' ? props.isBlindBoxPage : false"
        :blindBoxRest="props.blindBoxRest"
        :cover="[item.info[i18n.locale.value].icon]"
        :is-remint="false"
      />
    </div>
    <div class="cont">
      <div class="name" :title="item.tag">
        <span>{{ item?.tag }}</span>
        <img :src="CertImg" alt="" />
      </div>
      <div class="limited">{{ $t('blindBoxLimited') }}{{ item.limit }}</div>
      <div class="content flex">
        <div class="msg flex1">
          <div class="author flex flex-align-center" v-if="!isHideAuthor">
            <img
              src="@/assets/images/ava_mask.png"
              class="mask"
              v-if="item.issuerAvatarType === 'nft-metabot'"
            />
            <img
              class="avatar"
              :src="$filters.avatar(item?.issuerMetaId)"
              :alt="item?.issuerName"
              :class="{
                hasmask: item.issuerAvatarType === 'nft-metabot',
              }"
            />
            <span class="username">{{ item?.issuerName }}</span>
            <span>{{ $t('blindBoxIssuer') }}</span>
            <img class="cert-icon" :src="CertIcon" />
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CertIcon from '@/assets/images/icon_cer.svg?url'
import CertImg from '@/assets/images/icon_cer_nft.png'
import { metafileUrl } from '@/utils/util'
import { useI18n } from 'vue-i18n'
import NFTCover from '@/components/NFT/Cover.vue'
import { router } from '@/router'
import { reactive } from '@vue/reactivity'

const i18n = useI18n()
const props = defineProps<{
  item: BlindBoxItem
  isHideAuthor?: boolean
  isSelf?: boolean
  isBlindBoxPage: boolean
  blindBoxRest?: number
}>()

function toDetail(url: string) {
  router.push(url)
}
console.log('zxczxczxczx', props.item.info.zh.icon)
</script>

<style lang="scss" scoped src="./blindBoxItem.scss"></style>
