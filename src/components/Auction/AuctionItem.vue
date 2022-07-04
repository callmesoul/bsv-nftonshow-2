<template>
  <div class="auction-item" :key="auction.txId" @click="toDetail(auction)">
    <div class="cover">
      <ElImage
        class="cover-image"
        :lazy="true"
        :src="metafileUrl(auction.icon)"
        fit="contain"
      ></ElImage>
      <!-- <img
        class="cover-image"
        :src="metafileUrl(item?.coverUrl)"
        :alt="item?.name"
        :onerror="coverDefaultImg"
      /> -->
      <span class="classify" v-if="auction.classifyList && auction.classifyList.length > 0">{{
        $t(auction.classifyList[0])
      }}</span>

      <VueCountdown
        class="countdown"
        :time="auction.endTimeStampInt ? auction.endTimeStampInt - new Date().getTime() : 0"
        :transform="transformSlotProps"
        v-slot="{ days, hours, minutes, seconds }"
        @end="onCountdownEnd"
        v-if="auction.currentAuctionState === 2"
      >
        <span class="dot"></span
        ><span>{{ parseInt(hours) + parseInt(days) * 24 }}:{{ minutes }}:{{ seconds }}</span>
      </VueCountdown>
    </div>
    <div class="cont">
      <div class="name" :title="auction.name">
        {{ auction.name }}
      </div>
      <div class="user-list">
        <div class="user-item flex flex-align-center">
          <UserAvatar class="avatar" :metaId="auction.issuerMetaId" :type="auction.avatarType" />
          <span class="name">{{ auction.issuerName }}</span>
          <span class="type">({{ $t('creater') }})</span>
        </div>
        <div class="user-item flex flex-align-center">
          <UserAvatar
            class="avatar"
            :metaId="auction.ownerMetaId"
            :type="auction.ownerAvatarType"
          />
          <span class="name">{{ auction.ownerName }}</span>
          <span class="type">({{ $t('owner') }})</span>
        </div>
      </div>
      <!-- 提取 -->
      <div
        class="btn btn-block"
        v-if="
          store.state.userInfo &&
            auction.ownerMetaId === store.state.userInfo.metaId &&
            auction.currentAuctionState === 3
        "
        @click.stop="confirmSend(auction)"
      >
        <div class="mb5">{{ $t('confirmAuctionSend') }}</div>
        {{
          auction.currentBidPrice === '' || auction.currentBidPrice === '0'
            ? $filters.bsvStr(auction.startingPriceInt)
            : $filters.bsvStr(auction.currentBidPrice)
        }}
        BSV
      </div>
      <div
        class="btn btn-block"
        :class="{
          'btn-gray': auction.currentAuctionState !== 2,
        }"
        v-else
      >
        {{
          auction.currentBidPrice === '' || auction.currentBidPrice === '0'
            ? $filters.bsvStr(auction.startingPriceInt)
            : $filters.bsvStr(auction.currentBidPrice)
        }}
        BSV
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { metafileUrl } from '@/utils/util'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { useStore } from '@/store'
import { ElLoading, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { auctionConfirmSend } from '@/utils/auction'

interface Props {
  auction: GetAuctionListResItem
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['remove'])
const store = useStore()
const router = useRouter()
const i18n = useI18n()

function toDetail(auction: GetAuctionListResItem) {
  router.push({
    name: 'detail',
    params: {
      genesisId: auction.genesis,
      codehash: auction.codehash,
      tokenIndex: auction.tokenIndex,
    },
  })
}

function transformSlotProps(props: any) {
  const formattedProps = {}
  Object.entries(props).forEach(([key, value]) => {
    // @ts-ignore
    formattedProps[key] = value < 10 ? `0${value}` : String(value)
  })
  return formattedProps
}

async function confirmSend(auction: GetAuctionListResItem) {
  if (auction.currentAuctionState !== 3) return
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })
  const params = {
    nft: {
      codehash: auction.codehash,
      genesis: auction.genesis,
      genesisTxid: auction.genesisTxId,
      tokenIndex: auction.tokenIndex,
      sensibleId: auction.sensibleId,
    },
    issueAddress: auction.issuerAddress,
    issueMetaId: auction.issuerMetaId,
    nftAuctionId: auction.txId,
    amount: auction.currentBidPriceInt ? auction.currentBidPriceInt : auction.startingPriceInt,
    isFirstSell: auction.nftIsFirstSell,
  }
  const result = await await auctionConfirmSend(params).catch(error => {
    if (error) ElMessage.error(JSON.stringify(error))
    loading.close()
  })
  if (result) {
    emit('remove', auction)
    loading.close()
    ElMessage.success(i18n.t('success'))
  }
}
</script>

<style lang="scss" scoped src="./AuctionItem.scss"></style>
