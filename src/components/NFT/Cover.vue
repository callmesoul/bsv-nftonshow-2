<template>
  <ElSkeleton :loading="isSkeleton" animated>
    <template #template>
      <div class="cover">
        <ElSkeletonItem variant="image" />
      </div>
    </template>
    <template #default>
      <div class="cover">
        <span class="remint" v-if="isRemint">{{ $t('isReminted') }}</span>
        <div class="cube" v-if="emptyCover.length > 1">
          <img :src="$filters.metafile(emptyCover[0])" ref="imgRef" @click.stop="change" />
        </div>
        <div class="blindBoxImg" v-else-if="props.isBlindBox">
          <img :src="BlindBoxImg" alt="" />
          <img :src="BlindBoxSaleOff" v-if="blindBoxRest <= 0 && props.isShowSaleOut" alt="" />
          <span v-if="blindBoxRest <= 0 && props.isShowSaleOut">{{ $t('saleOut') }}</span>
        </div>
        <ElImage
          v-else
          fit="contain"
          :lazy="true"
          :src=" $filters.metafile(cover[0])"
          :preview-src-list=" isShowPrew ? [needGizp ? $filters.metafile(cover[0].split('?')[0], -1) : $filters.metafile(cover[0], -1)] : []"
        />
      </div>
    </template>
  </ElSkeleton>
</template>

<script setup lang="ts">
import SellOff from '@/assets/images/bg_sellout.svg?url'
import { metafile } from '@/utils/filters'
import { computed, ref } from 'vue'
import BlindBoxImg from '@/assets/images/blindBoxImg.png'
import BlindBoxSaleOff from '@/assets/images/blindBoxSaleOff.svg?url'
import './ct_effect'
import './ct_effect_cube'
interface Props {
  cover: string[]
  secondCover?: string
  isLazy?: boolean
  isShowPrew?: boolean
  isRemint?: boolean
  isSkeleton?: boolean
  isBlindBox?: boolean
  blindBoxRest: number
  isShowSaleOut?: boolean
  needGizp?:boolean
 
}
const props = withDefaults(defineProps<Props>(), {
  isLazy: true,
  isShowPrew: false,
  isSkeleton: false,
  isBlindBox: false,
  blindBoxRest: 0,
  isShowSaleOut: true,
  needGizp:false
})
console.log('xzxzxzxzxz', props.needGizp)
const imgRef = ref()
const currentImaIndex = ref(0)
const isChangeing = ref(false)

function change() {
  if (isChangeing.value) return
  isChangeing.value = false
  currentImaIndex.value = currentImaIndex.value ? 0 : 1
  imgRef.value
    .execEffect({
      animate: 'cube', // 动画类型
      target: metafile(emptyCover.value[currentImaIndex.value]), // 替换的新图片
    })
    .then(() => {
      isChangeing.value = false
    })
}

const emptyCover = computed(() => {
  return props.cover.filter(item => {
    if (item) return item
  })
})
</script>

<style lang="scss" scoped src="./Cover.scss"></style>
