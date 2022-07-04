<template>
  <ScreenWarp
    :cell-val="cellVal"
    :isSelf="true"
    :isHasScreen="false"
    :isHasSort="false"
    @change-cell="val => (cellVal = val)"
    :is-skeleton="BlindboxPage ? false : isShowNftListSkeleton"
    :active-name="screenActiveName"
    @active-name-change="val => (screenActiveName = val)"
  >
    <div v-if="BlindboxPage">
      <ElRow :gutter="20">
        <ElCol
          class="mb20"
          :xs="cells.find(item => item.val === cellVal).xs"
          :sm="cells.find(item => item.val === cellVal).sm"
          :md="cells.find(item => item.val === cellVal).md"
          :lg="cells.find(item => item.val === cellVal).lg"
          :xl="cells.find(item => item.val === cellVal).xl"
          v-for="(nft, index) in nfts"
          :key="index"
          v-if="nfts.length > 0"
        >
          <NFT
            :isShowSaleOut="false"
            :isBlindBoxPage="BlindboxPage"
            :nft="nft"
            :key="index"
            :is-skeleton="false"
            @removeOneBlindBox="removeBlindBox"
            @removeNft="removeNfts"
          />
        </ElCol>

        <!-- null -->
        <IsNull class="flex1" v-else />
      </ElRow>
    </div>
    <div v-else>
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

        <IsNull class="flex1" v-else />
      </ElRow>
      <LoadMore class="flex1" :pagination="pagination" @getMore="getMore" v-if="nfts.length > 0" />
    </div>
  </ScreenWarp>
  <!-- <NftListVue
    :nfts="nfts"
    :pagination="pagination"
    :isShowSkeleton="isShowNftListSkeleton"
    @get-more="getMore"
  /> -->
</template>

<script setup lang="ts">
import { GetMyNftSummaryList, MyBlindBoxList } from '@/api'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pagination as initPagination } from '@/config'
import { reactive, ref, computed } from 'vue'
import { checkUserInfoFinish, nftDataStrGetClassify } from '@/utils/util'
import ScreenWarp from '@/components/ScreenWarp/ScreenWarp.vue'
import NFT from '@/components/NFT/NFT.vue'
import LoadMore from '@/components/LoadMore/LoadMore.vue'
import IsNull from '@/components/IsNull/IsNull.vue'

import { useI18n } from 'vue-i18n'

const pagination = reactive({
  ...initPagination,
  pageSize: 12,
})
const BlindboxPage = computed(() => {
  return route.name === 'myBlindbox'
})
const myBlindBoxAmount = ref(0)
const store = useStore()
const route = useRoute()
const i18n = useI18n()
const nfts: NFTListItem[] = reactive([])
const isShowNftListSkeleton = ref(true)
const screenActiveName = reactive([])
const cellVal = ref(2)
const cells = [
  { val: 1, xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
  { val: 2, xs: 12, sm: 8, md: 6, lg: 4, xl: 3 },
]

function removeNfts() {
  nfts.length = 0
}

function removeBlindBox() {
  nfts[0].limited--
}

function getMyNfts(isCover: boolean = false) {
  return new Promise<void>(async resolve => {
    const res = await GetMyNftSummaryList({
      Address: store.state.userInfo?.address,
      Page: pagination.page.toString(),

      PageSize: pagination.pageSize.toString(),
    })
    if (res && res.code === 0) {
      if (isCover) {
        nfts.length = 0
      }
      if (res.data.results.items.length > 0) {
        for (let i = 0; i < res.data.results.items.length; i++) {
          const nft = res.data.results.items[i]

          const classify = nftDataStrGetClassify(nft.nftDataStr)
          nfts.push({
            classify,
            cover: nft.nftIcon,
            issueMetaId: nft.nftIssueMetaId,
            issueName: nft.nftIssuer,
            issueAvatarType: nft.nftIssueAvatarType,
            ownerMetaId:
              nft.nftDetailItemList.length > 0 ? nft.nftDetailItemList[0].nftOwnerMetaId : '',
            ownerName:
              nft.nftDetailItemList.length > 0 ? nft.nftDetailItemList[0].nftOwnerName : '',
            ownerAvatarType:
              nft.nftDetailItemList.length > 0 ? nft.nftDetailItemList[0].nftOwnerAvatarType : '',
            status: 1,
            genesis: nft.nftGenesis,
            codehash: nft.nftCodehash,
            genesisTxId: nft.nftGenesisTxId,
            tokenIndex:
              nft.nftDetailItemList.length > 0 ? nft.nftDetailItemList[0].nftTokenIndex : '',
            name: nft.nftMyCount + nft.nftMyPendingCount > 1 ? nft.nftSeriesName : nft.nftName,
            hasSeriesCount: nft.nftMyCount + nft.nftMyPendingCount,
            seriesTotal: nft.nftTotalSupply,
            backCover: nft.nftBackIcon ? nft.nftBackIcon : undefined,
            isCompound: nft.nftHasCompound,
            isLegal: false, // 是否法币
          })
        }
      } else {
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

async function getMyBlindBoxList() {
  const res: MyBlindBoxList = await MyBlindBoxList({
    metaid: store.state.userInfo.metaId,
  })
  if (res.code === 0) {
    myBlindBoxAmount.value = res.data.quantity
    if (myBlindBoxAmount.value > 0) {
      nfts.push({
        classify: i18n.t('fragment'),
        cover: '',
        issueMetaId: '974e2977d5c9446f7f48fd82c9ea51f82749b9ef7c00d26b73bc450d167d5f31',
        issueName: 'ShowPayTeam',
        issueAvatarType: 'nft-metabot',
        ownerMetaId: store.state.userInfo.metaId,
        ownerName: store.state.userInfo.name,
        ownerAvatarType: store.state.userInfo.avatarType,
        status: 1,
        genesis: '',
        codehash: '',
        tokenIndex: '',
        name: 'MetaBotAvatar',
        hasSeriesCount: 0,
        seriesTotal: 9560,
        backCover: '',
        isCompound: false,
        isLegal: false, // 是否法币
        limited: myBlindBoxAmount.value,
      })
    }
  }
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

checkUserInfoFinish().then(() => {
  console.log('zxczxczxczxc', route)

  if (route.name === 'myBlindbox') {
    getMyBlindBoxList()
  } else {
    getMyNfts()
  }

  // if (route.name === 'selfOffsale') {

  // }
})
</script>

<style lang="scss" scoped src="./Offsale.scss"></style>
