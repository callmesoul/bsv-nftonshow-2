<template>
  <div class="sort-warp flex flex-align-center">
    <div
      class="sort-item flex flex-align-center"
      v-for="sort in sorts"
      :class="{ active: sort.value === sortValue }"
      @click="emit('changeSort', sort.value)"
    >
      <div class="sort-name">{{ $t(sort.nameKey) }}</div>
      <div class="sort-type">
        <SortAscIcon v-if="sort.orderType === OrderType.ASC" />
        <SortDescIcon v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SortType, OrderType } from '@/enum'
import SortAscIcon from '@/assets/images/sort-asc.svg'
import SortDescIcon from '@/assets/images/sort-desc.svg'

const emit = defineEmits(['changeSort'])

interface Props {
  sorts: NFTListSortItem[]
  sortValue: SortType
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped src="./Sort.scss"></style>
