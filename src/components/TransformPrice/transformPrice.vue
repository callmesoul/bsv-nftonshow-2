<template>
  <span v-if="props.pure"></span>
  <span v-else>
    {{ i18n.locale.value === 'zh' ? `以 ${price}  购买` : `Buy Now At ${price} ` }}
  </span>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useStore } from '@/store/index'
import { converterPrice, legalNftConverterPrice } from '@/utils/filters'
import { useI18n } from 'vue-i18n'
const price = ref('0')
const i18n = useI18n()
const store = useStore()
interface Props {
  nftPrice?: number
  isLegal: boolean
  nftVal?: NftItemDetail
  pure: boolean
}
const props = withDefaults(defineProps<Props>(), {
  nftPrice: 0,
  isLegal: false,
  pure: false,
})
defineExpose({
  price,
})
watch(
  (): string | [string, NftItemDetail] =>
    props.nftVal ? [store.state.currentPrice, props.nftVal] : store.state.currentPrice,
  newVal => {
    if (newVal && newVal.length == 1) {
      nextTick(() => {
        if (props.isLegal) {
          price.value = legalNftConverterPrice(props.nftPrice)
        } else {
          price.value = converterPrice(props.nftPrice)
        }
      })
    } else if (newVal && newVal.length > 1) {
      if (props.isLegal) {
        price.value = legalNftConverterPrice(props.nftVal.nftPrice)
      } else {
        price.value = converterPrice(props.nftVal.amount)
      }
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped></style>
