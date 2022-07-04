<template>
  <ScreenWarp
    :cell-val="cellVal"
    :defaultSellType="screen.sellType"
    :isSellTypeNotClose="true"
    :defaultShowScreen="false"
    :sort="0"
    @change-screen="changeScreen"
    @change-sort="changeSort"
    @change-cell="val => (cellVal = val)"
    :active-name="screenActiveName"
    @active-name-change="val => (screenActiveName = val)"
  >
    <div>
      <ElRow :gutter="20">
        <ElCol
          class="mb20"
          :xs="cells.find(item => item.val === cellVal).xs"
          :sm="cells.find(item => item.val === cellVal).sm"
          :md="cells.find(item => item.val === cellVal).md"
          :lg="cells.find(item => item.val === cellVal).lg"
          :xl="cells.find(item => item.val === cellVal).xl"
          v-for="nft in nfts"
          :key="nft.genesis + nft.codehash + nft.tokenIndex"
          v-if="nfts.length > 0"
        >
          <NFT
            :nft="nft"
            :key="nft.genesis + nft.codehash + nft.tokenIndex"
            :is-skeleton="isShowNftListSkeleton"
            @remove="removeItem"
          />
        </ElCol>
        <!-- null -->
        <IsNull class="flex1" v-if="!isShowNftListSkeleton && nfts.length <= 0" />
      </ElRow>
      <LoadMore class="flex1" :pagination="pagination" @getMore="getMore" v-if="nfts.length > 0" />
    </div>
  </ScreenWarp>
  <!-- <NftListVue
    :nfts="nfts"
    :pagination="pagination"
    :isShowSkeleton="isShowNftListSkeleton"
    :isSelf="store.state.userInfo && store.state.userInfo.metaId === route.params.metaId"
    @get-more="getMore"
  /> -->
</template>

<script setup lang="ts">
import { GetMyOnSellNftList, GetUserAuctionList } from '@/api'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pagination as initPagination } from '@/config'
import { reactive, ref } from 'vue'
import { nftDataStrGetClassify } from '@/utils/util'
import ScreenWarp from '@/components/ScreenWarp/ScreenWarp.vue'
import { OrderType, SortType } from '@/enum'
import { satoshis } from '@/utils/filters'
import LoadMore from '@/components/LoadMore/LoadMore.vue'
import IsNull from '@/components/IsNull/IsNull.vue'
import NFT from '@/components/NFT/NFT.vue'

const pagination = reactive({
  ...initPagination,
  pageSize: 12,
})
const store = useStore()
const route = useRoute()
const nfts: NFTListItem[] = reactive([])
const isShowNftListSkeleton = ref(true)

const screenActiveName = reactive([])
const cellVal = ref(2)
const cells = [
  { val: 1, xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
  { val: 2, xs: 12, sm: 8, md: 6, lg: 4, xl: 3 },
]

// @ts-ignore
const screen: {
  sellType?: string
  orderType: OrderType
  sortType: SortType
  startPrice?: string
  endPrice?: string
  [key: string]: any
} = reactive({
  sellType: route.query.sellType ? route.query.sellType : '1',
  orderType: OrderType.DESC,
  sortType: SortType.Time,
})

function getMyNfts(isCover: boolean = false) {
  return new Promise<void>(async resolve => {
    const fun =
      screen.sellType === '1' || screen.sellType === '4'
        ? GetMyOnSellNftList
        : store.state.userInfo && GetUserAuctionList
    const params: any = {
      sortType: screen.sortType,
      orderType: screen.orderType,
      startPrice: screen.startPrice ? satoshis(screen.startPrice) : undefined,
      endPrice: screen.endPrice ? satoshis(screen.endPrice) : undefined,
    }

    if (screen.sellType === '1' || screen.sellType === '4') {
      params.MetaId = typeof route.params.metaId === 'string' ? route.params.metaId : ''
      params.Page = pagination.page.toString()
      params.PageSize = pagination.pageSize.toString()
    } else {
      params.metaId = typeof route.params.metaId === 'string' ? route.params.metaId : ''
      params.page = pagination.page
      params.pageSize = pagination.pageSize
    }
    const res = await fun(params)
    if (res && res.code === 0) {
      if (isCover) {
        nfts.length = 0
      }
      if (res.data.results.items.length > 0) {
        for (let i = 0; i < res.data.results.items.length; i++) {
          const nft = res.data.results.items[i]
          const classify = nftDataStrGetClassify(nft.nftDataStr)
          // @ts-ignore
          nfts.push({
            // @ts-ignore
            cover: nft.nftIcon ? nft.nftIcon : nft.icon,
            issueMetaId: nft.nftIssueMetaId ? nft.nftIssueMetaId : nft.issuerMetaId,
            issueName: nft.nftIssuer ? nft.nftIssuer : nft.issuerName,
            issueAvatarType: nft.nftIssueAvatarType ? nft.nftIssueAvatarType : nft.avatarType,
            issueAddress: nft.nftIssueAddress ? nft.nftIssueAddress : nft.issuerAddress,
            issueTxId: nft.nftIssueMetaTxId ? nft.nftIssueMetaTxId : nft.issuerMetaTxId,
            ownerMetaId: nft.nftOwnerMetaId ? nft.nftOwnerMetaId : nft.ownerMetaId,
            ownerName: nft.nftOwnerName ? nft.nftOwnerName : nft.ownerName,
            ownerAvatarType: nft.nftOwnerAvatarType ? nft.nftOwnerAvatarType : nft.ownerAvatarType,
            ownerAddress: nft.nftOwnerAddress ? nft.nftOwnerAddress : nft.ownerAddress,
            status: nft.sellState ? nft.sellState : 0,
            likeCount: nft.nftLikeCount ? nft.nftLikeCount : nft.likeCount,
            isHasLike: nft.nftHasLike ? nft.nftHasLike : nft.hasLike,
            price: nft.nftPrice
              ? nft.nftPrice
              : nft.currentBidPriceInt
              ? nft.currentBidPriceInt
              : nft.startingPriceInt,
            genesis: nft.nftGenesis ? nft.nftGenesis : nft.genesis,
            codehash: nft.nftCodehash ? nft.nftCodehash : nft.codehash,
            tokenIndex: nft.nftTokenIndex ? nft.nftTokenIndex : nft.tokenIndex,
            name: nft.nftName ? nft.nftName : nft.name,
            auctionTxId: nft.txId ? nft.txId : '',
            genesisTxId: nft.nftGenesisTxId ? nft.nftGenesisTxId : nft.genesisTxId,
            sensibleId: nft.nftSensibleId ? nft.nftSensibleId : nft.sensibleId,
            isFirstSell: typeof nft.nftIsFirstSell !== 'undefined' ? nft.nftIsFirstSell : false,
            acutionEndTime: nft.endTimeStampInt ? nft.endTimeStampInt : 0,
            classify:
              nft.classifyList && nft.classifyList.length > 0 ? nft.classifyList[0] : classify,
            backCover: nft.nftBackIcon,
            isCompound: nft.nftHasCompound,
          })
        }
      }

      const totalPages = Math.ceil(res.data.total / pagination.pageSize)
      if (totalPages <= pagination.page) {
        pagination.nothing = true
      }
    }
    isShowNftListSkeleton.value = false
    resolve()
  })
}

function getMore() {
  pagination.page++
  getMyNfts()
}

function changeScreen(type: string, val: any) {
  if (type === 'price') {
    screen.startPrice = val[0]
    screen.endPrice = val[1]
  } else {
    screen[type] = val
  }
  refreshDatas()
}

function removeItem(nft: NFTListItem) {
  const index = nfts.findIndex(
    item =>
      item.genesis == nft.genesis &&
      item.codehash === nft.codehash &&
      item.tokenIndex === nft.tokenIndex
  )
  if (index !== -1) {
    nfts.splice(index, 1)
  }
}

function refreshDatas() {
  isShowNftListSkeleton.value = true
  pagination.page = 1
  pagination.loading = false
  pagination.nothing = false
  getMyNfts(true)
}

function changeSort(params: { sortType: number; orderType: number }) {
  screen.sortType = params.sortType
  screen.orderType = params.orderType
  refreshDatas()
}

getMyNfts()
</script>

<style lang="scss" scoped src="./Offsale.scss"></style>
