<template>
  <div class="recommend container">
    <div class="recommend-header flex">
      <img @click="back" :src="BannetIcon" class="back-icon" />
      <div class="flex1 cont">
        <div class="title">
          {{ $t('recommentprod') }}
        </div>
        <div class="drsc">{{ $t('recommenttext') }}</div>
      </div>
    </div>
    <div class="recomment-list nft-list">
      <NftList
        :nfts="nfts"
        :pagination="pagination"
        :isShowSkeleton="isShowSkeleton"
        @get-more="getMore"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NftList from '@/components/NftList/NftList.vue'
import { reactive, ref } from 'vue'
import { pagination as _pagination } from '@/config'
import { GetRecommendOnSellNftList } from '@/api'
import { useRouter } from 'vue-router'
import SetHomeDatas from '@/utils/homeSetData'
import BannetIcon from '@/assets/images/bannet_icon_ins.svg?url'

const router = useRouter()
const nfts = reactive<NftItem[]>([])
const isShowSkeleton = ref(true)
const pagination = reactive({
  ..._pagination,
})

function getRecommendNftList() {
  return new Promise<void>(async resolve => {
    const res = await GetRecommendOnSellNftList({
      Page: pagination.page.toString(),
      PageSize: pagination.pageSize.toString(),
    })
    if (res.code === 0) {
      if (res.data.results.items.length > 0) {
        const results = await SetHomeDatas(res.data.results.items)
        nfts.push(...results)
      } else {
        pagination.nothing = true
      }
      isShowSkeleton.value = false
    }
    resolve()
  })
}

function getMore() {
  pagination.loading = true
  pagination.page++
  getRecommendNftList().then(() => {
    pagination.loading = false
  })
}

function back() {
  router.back()
}

getRecommendNftList()
</script>

<style lang="scss" scoped src="./Recommend.scss"></style>
