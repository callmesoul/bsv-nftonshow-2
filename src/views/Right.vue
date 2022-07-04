<template>
  <InnerPageHeader :title="$t('rightsList')" :intro="$t('rightsListTips')" :isShowSearch="false" />

  <div class="right-list container">
    <div class="right-item" v-for="(right, index) in rights" :key="index">
      <div class="right-item-msg flex">
        <div class="cover">
          <img :src="metafileUrl(right.cover)" />
        </div>
        <div class="cont flex1">
          <div class="name">{{ right.projectName }}</div>
          <div class="cont-list">
            <div class="cont-item flex flex-align-center">
              <span class="key">{{ $t('projecter') }}：</span>
              <span class="value flex flex-align-center">
                <div class="avatar-warp">
                  <UserAvatar
                    bg="gray"
                    class="avatar"
                    :metaId="right.metaid"
                    :type="''"
                    :disabled="true"
                  />
                </div>
                {{ right.prject_team }}
                <img class="cert-icon" :src="CertIcon" v-if="right.nftCertificationType" />
                <img
                  class="cert-icon"
                  src="@/assets/images/icon_cer_nft.png"
                  v-if="right.nftGenesisCertificationType"
                />
              </span>
            </div>
            <div class="cont-item">
              <span class="key">{{ $t('nftCount') }}：</span>
              <span class="value">{{ right.nftQuantity }}</span>
            </div>
          </div>
        </div>
        <div class="status flex flex-align-center">
          <span class="key">{{ $t('status') }}:</span>
          <span class="value flex flex-align-center"
            ><span class="dot" :class="{ active: right.status }"></span>
            {{ right.status ? $t('normoal') : $t('unStar') }}</span
          >
        </div>
      </div>
      <div class="right-item-data flex flex-align-center">
        <div class="data-item flex1">
          <div class="name">{{ $t('historicalTotalDividend') }}</div>
          <div class="value">
            {{ right.totalDividend ? $filters.bsv(right.totalDividend) : '--' }} BSV
          </div>
        </div>
        <div class="data-item flex1">
          <div class="name">{{ $t('lastDividend') }}</div>
          <div class="value">
            {{ right.lastDividend ? $filters.bsv(right.lastDividend) : '--' }} BSV
          </div>
        </div>
        <div class="data-item flex1">
          <div class="name">{{ $t('lastDividendTime') }}</div>
          <div class="value">
            {{ right.lastDividendDate ? $filters.dateTimeFormat(right.lastDividendDate) : '--' }}
          </div>
        </div>
        <div class="data-item flex1">
          <div class="name">{{ $t('dividendCycle') }}</div>
          <div class="value">{{ right.dividendCycle }}</div>
        </div>
        <!-- <div class="data-item flex1">
          <div class="name">{{ $t('estimatedDividendIncome') }}</div>
          <div class="value">4,125.88 BSV</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetRightDetail, GetRightList } from '@/api'
import InnerPageHeader from '@/components/InnerPageHeader/InnerPageHeader.vue'
import { reactive } from 'vue-demi'
import { metafileUrl } from '@/utils/util'
import CertIcon from '@/assets/images/icon_cer.svg?url'
const rights: RightItem[] = reactive([])
function getRightDetail(params: { genesis: string; codehash: string }) {
  return new Promise(async resolve => {
    const res = await GetRightDetail(params)
    if (res.code === 0) {
      rights[0] = res.data
    }
  })
}

function getRightList() {
  return new Promise<void>(async resolve => {
    const res = await GetRightList()
    if (res && res.code === 0) {
      rights.length = 0
      rights.push(...res.data)
    }
    resolve()
  })
}

getRightList()
</script>

<style lang="scss" scoped src="./Right.scss"></style>
