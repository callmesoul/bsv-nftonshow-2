<template>
  <div
    class="section-screen flex flex-align-baseline"
    v-if="classifyList && classifyList.length > 0 && !isBlindBoxPage"
  >
    <div class="tags flex1 flex flex-align-center flex-wrap-wrap">
      <a :class="{ active: classify === 'all' }" @click="emit('changeClassify', 'all')">
        {{ $t('all') }}
      </a>
      <a
        :class="{ active: classify === item.classify }"
        v-for="item in classifyList"
        :key="item.classify"
        @click="emit('changeClassify', item.classify)"
        >{{ $t(item.classify) }}</a
      >
    </div>
    <div class="flex flex-align-center screen-rigth">
      <Sort :sorts="sorts" :sortValue="sortValue" @changeSort="changeSort" />
      <!-- <div class="sort-warp flex flex-align-center">
        <div
          class="sort-item flex flex-align-center"
          v-for="sort in sorts"
          :class="{ active: sort.value === sortValue }"
          @click="emit('changeSort', sort.value)"
        >
          <div class="sort-name">{{ $t(sort.nameKey) }}</div>
          <div class="sort-type">
            <SvgIcon name="sort-asc" v-if="sort.orderType === OrderType.ASC" />
            <SvgIcon name="sort-desc" v-else />
          </div>
        </div>
      </div> -->
      <div class="search-warp flex flex-align-center flex1">
        <input
          class="flex1"
          v-model="key"
          :placeholder="$t('search')"
          @keyup.enter="emit('search', key)"
          type="text"
        />
        <img :src="SearchIcon" @click="emit('search', key)" />
      </div>
    </div>
  </div>

  <NftSkeleton :loading="isShowSkeleton" :count="pagination.pageSize" class="section-cont nft-list">
    <template #default>
      <div class="section-cont nft-list" v-if="!isBlindBoxPage">
        <template v-for="item in nfts">
          <NftItem :item="item" :isHideAuthor="isHideAuthor" :isSelf="isSelf" />
        </template>
      </div>
      <div class="section-cont nft-list" v-else>
        <template v-for="item in blindboxData">
          <BlindBoxItem
            :isSelf="false"
            :isHideAuthor="false"
            :item="item"
            :isBlindBoxPage="isBlindBoxPage"
            :blindBoxRest="item.limit"
          ></BlindBoxItem>
        </template>
      </div>
    </template>
  </NftSkeleton>
  <template v-if="!isShowSkeleton && !isBlindBoxPage">
    <LoadMore :pagination="pagination" @getMore="emit('getMore')" v-if="nfts.length > 0" />
    <IsNull v-else />
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import LoadMore from '@/components/LoadMore/LoadMore.vue'
import IsNull from '@/components/IsNull/IsNull.vue'
import NftItem from '@/components/Nft-item/Nft-item.vue'
import NftSkeleton from '@/components/NftSkeleton/NftSkeleton.vue'
import Sort from '@/components/Sort/Sort.vue'
import { SortType } from '@/enum'
import SearchIcon from '@/assets/images/icon_search.svg?url'
import BlindBoxItem from '@/components/BlindBox/blindBoxItem.vue'
interface Props {
  pagination: Pagination
  isShowSkeleton: boolean
  keyword?: string
  nfts: NftItem[]
  classify?: string
  classifyList?: Classify[]
  isHideAuthor?: boolean
  sorts?: NFTListSortItem[]
  sortValue?: SortType
  isSelf?: boolean
  blindboxData?: BlindBoxItem[]
  isBlindBoxPage?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  keyword: '',
  classify: 'all',
  isHideAuthor: false,
  isSelf: false,
})
const emit = defineEmits(['search', 'changeClassify', 'getMore', 'changeSort'])

const key = ref(props.keyword)

watch(
  () => props.keyword,
  () => {
    key.value = props.keyword
  }
)

function changeSort(value: SortType) {
  emit('changeSort', value)
}
</script>

<style lang="scss" scoped src="./NftList.scss"></style>
