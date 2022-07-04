<template>
  <InnerPageHeader :title="pageTitle" :isShowSearch="false" :isHasBackIcon="isHasBackIcon" />
  <div class="container list-warp">
    <NftList
      :isBlindBoxPage="isBlindBoxPage"
      :blindboxData="blindboxData"
      :nfts="Nfts"
      :pagination="pagination"
      :isShowSkeleton="isShowNftListSkeleton"
      :sorts="sorts"
      :sortValue="sortValue"
      @changeSort="changeSort"
      @getMore="getMore"
    />
  </div>
</template>

<script setup lang="ts">
import InnerPageHeader from '@/components/InnerPageHeader/InnerPageHeader.vue'
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { SortType, OrderType } from '@/enum'
import {
  GetAllOnSellNftList,
  GetNftOnShowListByClassify,
  GetNftOnShowListBySearch,
  GetBlindBoxList,
  CertificationType,
  NftApiCode,
} from '@/api'
import { useRoute } from 'vue-router'
import SetHomeDatas from '@/utils/homeSetData'
import NftList from '@/components/NftList/NftList.vue'
import { pagination as initPagination } from '@/config'
import { useStore } from 'vuex'

const store = useStore()
const i18n = useI18n()
const route = useRoute()

const Nfts = reactive<NftItem[]>([])
const blindboxData = reactive<BlindBoxItem[]>([])
const isBlindBoxPage = computed(() => {
  console.log(route.name === 'blindbox')

  return route.name === 'blindbox'
})

const isHasBackIcon = computed(() => {
  return route.name != 'blindbox'
})
const pagination = reactive({
  ...initPagination,
  pageSize: 24,
})
const isShowNftListSkeleton = ref(true)
const classify = ref('all')
const sorts: NFTListSortItem[] = reactive([
  {
    name: i18n.t('time'),
    nameKey: 'time',
    value: SortType.Time,
    orderType: OrderType.DESC,
  },
  {
    name: i18n.t('price'),
    nameKey: 'price',
    value: SortType.Price,
    orderType: OrderType.DESC,
  },
])
const sortValue = ref(SortType.Time)

const pageTitle = computed(() => {
  let title = ''
  if (typeof route.query.type === 'string') {
    title = i18n.t(route.query.type)

    if (route.query.type !== 'all') {
      title += ':'
      if (typeof route.query.val == 'string') {
        if (route.query.type === 'search') {
          title += route.query.val
        } else {
          title += i18n.t(route.query.val)
        }
      }
    }
  } else if (route.name === 'blindbox') {
    title = i18n.t('blindBox')
  }

  return title
})

function changeSort(value: SortType) {
  if (sortValue.value === value) {
    const index = sorts.findIndex(item => item.value === value)
    sorts[index].orderType =
      sorts[index].orderType === OrderType.ASC ? OrderType.DESC : OrderType.ASC
  } else {
    sortValue.value = value
  }
  pagination.page = 1
  pagination.loading = false
  pagination.nothing = false
  getNftList(true)
}

async function getNftList(isCover: boolean = false) {
  const apiName = {
    all: GetAllOnSellNftList,
    classify: GetNftOnShowListByClassify,
    search: GetNftOnShowListBySearch,
  }
  let res
  if (route.name === 'blindbox') {
    res = await GetBlindBoxList({
      pageSize: pagination.pageSize,
      page: pagination.page,
    })
    if (res.code === NftApiCode.success) {
      if (isCover) Nfts.length = 0
      if (res.data.results.items.length > 0) {
        let tempList = []
        tempList.push(...res.data.results.items)
        blindboxData.push(...tempList.reverse())
      } else {
        pagination.nothing = true
      }
      isShowNftListSkeleton.value = false
    }
  } else {
    // @ts-ignore
    res = await apiName[route.query.type]({
      PageSize: pagination.pageSize.toString(),
      Page: pagination.page.toString(),
      classify: route.query.type === 'classify' ? route.query.val : undefined,
      SearchWord: route.query.type === 'search' ? route.query.val : undefined,
      CertificationType: CertificationType.isCert,
      orderType: sorts.find(item => item.value === sortValue.value)?.orderType,
      sortType: sortValue.value,
    })

    if (res.code === NftApiCode.success) {
      if (isCover) Nfts.length = 0
      if (res.data.results.items.length > 0) {
        const results = await SetHomeDatas(res.data.results.items)
        Nfts.push(...results)
      } else {
        pagination.nothing = true
      }
      isShowNftListSkeleton.value = false
    }
  }
}

//  加载更多
function getMore() {
  pagination.loading = true
  pagination.page++
  getNftList().then(() => {
    pagination.loading = false
  })
}
getNftList()
</script>

<style lang="scss" scoped src="./NFTList.scss"></style>
