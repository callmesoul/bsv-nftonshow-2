<template>
  <a @click="toDetail()" class="nft-item">
    <div class="cover">
      <img class="cover-image" :src="metafileUrl(props.item.cover)" :alt="item?.name" />
    </div>
    <div class="cont">
      <div class="name">{{ item.name }}</div>
      <div class="operate" style="text-align: right;">
        <span class="timeleft">{{ props.item.hasCount }}/{{ props.item.total }}</span>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { metafileUrl } from '@/utils/util'

const router = useRouter()

const props = defineProps<{
  item: NFTSeriesItem
}>()

function toDetail() {
  router.push({
    name: 'series',
    params: { genesisId: props.item.genesis, codehash: props.item.codehash },
    query: { name: props.item.name },
  })
}
</script>

<style lang="scss" scoped src="./SeriesItem.scss"></style>
