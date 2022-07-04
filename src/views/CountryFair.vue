<template>
  <InnerPageHeader
    :title="$t('countryFair')"
    intro=""
    :is-show-search="false"
    :is-has-back-icon="false"
  >
    <template #intro>
      <div class="intro-tips">
        {{ $t('countryFairIntro') }} <a @click="isShowTipsModal = true">{{ $t('knowMore') }}</a>
      </div>
    </template>
  </InnerPageHeader>

  <div class="container country-fair">
    <NftList
      :nfts="nfts"
      :pagination="pagination"
      :keyword="keyword"
      :isShowSkeleton="isShowNftListSkeleton"
      :classify="classify"
      :classifyList="store.state.marketClassifyList"
      @search="search"
      @changeClassify="changeClassify"
      @get-more="getMore"
      :sorts="sorts"
      :sortValue="sortValue"
      @changeSort="changeSort"
    />
  </div>

  <!-- countryFairTips modal -->
  <ElDialog v-model="isShowTipsModal" custom-class="modal" :title="$t('countryFairTips')">
    <div class="modal-drsc">
      <div class="country-fair-tips-list">
        <div class="country-fair-tips-item">
          {{ $t('countryFairTipsContent1') }}
        </div>
        <div class="country-fair-tips-item">
          {{ $t('countryFairTipsContent2')
          }}<router-link :to="{ name: 'termsOfUse' }">{{
            $t('countryFairTipsContent3')
          }}</router-link
          >,{{ $t('countryFairTipsContent4') }}
        </div>
        <div class="country-fair-tips-item">
          {{ $t('countryFairTipsContent5') }}
        </div>
        <div class="country-fair-tips-item">
          {{ $t('countryFairTipsContent6') }}
          <router-link :to="{ name: 'certification' }">{{
            $t('countryFairTipsContent7')
          }}</router-link
          >{{ $t('countryFairTipsContent8') }}
        </div>
      </div>
    </div>
    <template #footer>
      <div class="modal-footer" slot="footer">
        <div class="btn btn-default" @click="isShowTipsModal = false">{{ $t('iknow') }}</div>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import InnerPageHeader from '@/components/InnerPageHeader/InnerPageHeader.vue'
import { ref } from 'vue-demi'
import NftList from '@/components/NftList/NftList.vue'
import { reactive } from 'vue'
import { pagination as initPagination } from '@/config'
import {
  CertificationType,
  GetAllOnSellNftList,
  GetNftOnShowListByClassify,
  GetNftOnShowListBySearch,
  NftApiCode,
} from '@/api'
import SetHomeDatas from '@/utils/homeSetData'
import { OrderType, SortType } from '@/enum'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'

const classify = ref('all')
const keyword = ref('')
const isShowTipsModal = ref(false)
const isShowNftListSkeleton = ref(true)
const nfts = reactive<NftItem[]>([])
const pagination = reactive({
  ...initPagination,
  pageSize: 24,
})
let apiType = 'GetAllOnSellNftList'
const i18n = useI18n()
const store = useStore()

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

// 更改分类
function changeClassify(classifyName: string) {
  if (classify.value === classifyName) return
  isShowNftListSkeleton.value = true
  classify.value = classifyName
  pagination.page = 1
  pagination.loading = false
  pagination.nothing = false
  if (classifyName === 'all') {
    apiType = 'GetAllOnSellNftList'
  } else {
    apiType = 'GetNftOnShowListByClassify'
  }
  getNftList(true)
  keyword.value = ''
}

//  加载更多
function getMore() {
  pagination.loading = true
  pagination.page++
  getNftList().then(() => {
    pagination.loading = false
  })
}

async function getNftList(isCover: boolean = false) {
  const apiName = {
    GetAllOnSellNftList: GetAllOnSellNftList,
    GetNftOnShowListByClassify: GetNftOnShowListByClassify,
    GetNftOnShowListBySearch: GetNftOnShowListBySearch,
  }
  // @ts-ignore
  const res = await apiName[apiType]({
    PageSize: pagination.pageSize.toString(),
    Page: pagination.page.toString(),
    classify: apiType === 'GetNftOnShowListByClassify' ? classify.value : undefined,
    SearchWord: apiType === 'GetNftOnShowListBySearch' ? keyword.value : undefined,
    CertificationType: CertificationType.unCert,
    orderType: sorts.find(item => item.value === sortValue.value)?.orderType,
    sortType: sortValue.value,
  })
  if (res.code === NftApiCode.success) {
    if (isCover) nfts.length = 0
    if (res.data.results.items.length > 0) {
      const results = await SetHomeDatas(res.data.results.items)
      nfts.push(...results)
    } else {
      pagination.nothing = true
    }
    isShowNftListSkeleton.value = false
  }
}

// 搜索
async function search(_keyword: string) {
  keyword.value = _keyword
  isShowNftListSkeleton.value = true
  pagination.loading = false
  pagination.nothing = false
  pagination.page = 1
  if (keyword.value === '') {
    classify.value = 'all'
    apiType = 'GetAllOnSellNftList'
  } else {
    classify.value = ''
    apiType = 'GetNftOnShowListBySearch'
  }
  getNftList(true)
}

getNftList()
</script>

<style lang="scss" scoped src="./CountryFair.scss"></style>
