<template>
  <div class="banner">
    <a>
      <img :src="$filters.getI18nContent(topic.val, 'coverPicUrl')" />
    </a>
  </div>

  <div class="series-msg">
    <img class="bg" :src="$filters.getI18nContent(topic.val, 'coverPicUrl')" />
    <div class="mask"></div>
    <div class="white-bg"></div>
    <div class="container">
      <div class="user-avatar">
        <img :src="$filters.avatar(topic.val?.createMetaId || route.params?.metaId)" alt="" />
      </div>
      <div class="series-name">
        {{ $filters.getI18nContent(genesisInfo.val, 'seriesName') }}
        <img src="@/assets/images/icon_cer_nft.png" />
      </div>
      <div class="user flex flex-align-center flex-pack-center">
        <div class="label">{{ $t('creater') }}:</div>
        <div class="name">{{ topic.val?.createName }}</div>
        <img :src="CertIcon" />
      </div>
      <div class="series-drsc">
        <pre
          class="flex1"
        ><template v-if="genesisInfo.val && $filters.getI18nContent(genesisInfo.val,'seriesInfo').length <= 100">{{ $filters.getI18nContent(genesisInfo.val,'seriesInfo')}}</template> <template v-else>{{ $filters.getI18nContent(genesisInfo.val,'seriesInfo').replace(/[\r\n]/g,"").replace(/\s+/g, ' ').slice(0, 100) }}...<a @click="isShowMoreSeriesIntro = true">{{ $t('getmore') }}</a></template><a
              v-if="genesisInfo.val && genesisInfo.val?.website && genesisInfo.val.website !== ''"
              :href="genesisInfo.val.website"
              target="_blank"
              >{{ $t('seriesWebsite') }}</a
            >
            </pre>
      </div>

      <div class="series-statistc flex flex-align-center flex-pack-center ">
        <div class="series-statistc-item flex1" v-for="item in seriesStatistics" :key="item.key">
          <div class="count">
            <template v-if="item.isBsv()">
              <template v-if="item.number() > 0">
                {{ item.number() }} BSV <img :src="BsvIcon" />
              </template>
              <template v-else>--</template>
            </template>
            <template v-else>
              <span v-if="item.isShowUnit">¥</span>
              {{ item.number() }}
            </template>
          </div>
          <div class="label">{{ $t(item.key) }}</div>
        </div>
      </div>
    </div>
  </div>

  <Tab class="tabs" :tabs="tabs" :val="tabActive" @change="val => (tabActive = val)" />
  <!-- 专辑作品 -->
  <KeepAlive>
    <ScreenWarp
      :cell-val="cellVal"
      :screen-list="screenList"
      v-if="tabActive === 0"
      :isLegal="isLegalAlbum"
      @change-screen="changeScreen"
      @change-sort="changeSort"
      @change-cell="val => (cellVal = val)"
      @active-name-change="val => (screenActiveName = val)"
      :isSkeleton="isSkeleton"
      :sort="6"
      :diy-sort-list="isLegalAlbum ? legalSortList : sortList"
      :active-name="screenActiveName"
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
              :is-skeleton="isSkeleton"
            />
          </ElCol>
          <!-- null -->
          <IsNull class="flex1" v-if="!isSkeleton && nfts.length <= 0" />
        </ElRow>
        <LoadMore
          class="flex1"
          :pagination="pagination"
          @getMore="getMore"
          v-if="nfts.length > 0 && !screen.startIndex"
        />
      </div>
    </ScreenWarp>
  </KeepAlive>

  <!-- 价格趋势 -->
  <div class="price-trend" v-show="tabActive === 1">
    <div class="container">
      <Vue3ChartJs v-bind="{ ...lineChart }" />
    </div>
  </div>

  <!-- 系列简介详情 -->
  <MoreContentModal
    :visible="isShowMoreSeriesIntro"
    :title="$filters.getI18nContent(genesisInfo.val, 'seriesName')"
    @change="val => (isShowMoreSeriesIntro = val)"
  >
    <div class="all-intro">{{ $filters.getI18nContent(genesisInfo.val, 'seriesInfo') }}</div>
  </MoreContentModal>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, KeepAlive, computed } from 'vue'
import { useStore } from '@/store'
import IsNull from '@/components/IsNull/IsNull.vue'
import { useRoute, useRouter } from 'vue-router'
import { checkUserInfoFinish, nftDataStrGetClassify } from '@/utils/util'
import { useI18n } from 'vue-i18n'
import Decimal from 'decimal.js-light'
import {
  GetCertUserInfo,
  GetGenesisVolumeInfo,
  GetLegalNfts,
  GetNosGenesisInfo,
  GetTopicNftList,
} from '@/api'
import MoreContentModal from '@/components/Modal/MoreContentModal/MoreContentModal.vue'
import {
  OrderType,
  ScreenTypes,
  SortType,
  legalOrderType,
  legalSortType,
  legalSellType,
} from '@/enum'
// @ts-ignore
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom'
import dataLabels from 'chartjs-plugin-datalabels'
import dayjs from 'dayjs'
import ScreenWarp from '@/components/ScreenWarp/ScreenWarp.vue'
import Tab from '@/components/Tab/Tab.vue'
import { bsv, satoshis } from '@/utils/filters'
import NFT from '@/components/NFT/NFT.vue'
import LoadMore from '@/components/LoadMore/LoadMore.vue'
import CertIcon from '@/assets/images/icon_cer.svg?url'
import BsvIcon from '@/assets/images/logo_bsv.svg?url'
import { converterBSV, converterCNY } from '@/utils/filters'
import { UnitName } from '@/config'
Vue3ChartJs.registerGlobalPlugins([zoomPlugin])

const store = useStore()
const route = useRoute()
const i18n = useI18n()
const nfts: NFTListItem[] = reactive([])
const pagination = reactive({
  ...store.state.pagination,
  pageSize: 100,
})
const isSkeleton = ref(true)
const topic: { val: null | Topic } = reactive({ val: null })
const isShowMoreSeriesIntro = ref(false)
const isLegalAlbum = computed(() => {
  return route.params.key === 'legal'
})

const screenActiveName: string[] = reactive([])

const screenList: ScreenItem[] = reactive([
  {
    label: i18n.t('indexNumber'),
    screenName: 'indexNumber',
    type: ScreenTypes.CheckboxList,
    options: [],
    val: null,
  },
])

const cellVal = ref(1)
const cells = [
  { val: 1, xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
  { val: 2, xs: 12, sm: 8, md: 6, lg: 4, xl: 3 },
]

// @ts-ignore
const screen: {
  sellType?: string
  orderType: OrderType
  sortType: SortType
  metaId?: string
  startPrice?: string
  endPrice?: string
  TopicType?: string
  startIndex?: number
  endIndex?: number
  filterIndex?: number
  filterTagList?: string[]
  [key: string]: any
} = reactive({
  orderType: OrderType.DESC,
  sortType: SortType.Default,
  filterIndex: 0,
  filterTagList: [],
})

// @ts-ignore
const legalScreen: {
  [key: string]: any
  sellType?: legalSellType
  orderType?: legalOrderType
  sortType: legalSortType
  metaId?: string
  startPrice?: number
  endPrice?: number
} = reactive({
  // orderType: legalOrderType.PRICE,
  sortType: legalSortType.ASC,
})

// 用户信息
const userInfo: { val: CertUserInfo | null } = { val: null }

const lineChart = reactive({
  type: 'line',
  // locally registered and available for this chart
  plugins: [dataLabels],
  data: {
    labels: [],
    datasets: [
      {
        label:
          route.params.key === 'legal'
            ? i18n.t('avergeTransactionCNY')
            : i18n.t('averageTransactionPrice'),
        data: [],
        fill: false,
        borderColor: '#feb338',
        backgroundColor: '#feb338',
      },
    ],
  },
  options: {
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
      datalabels: {
        backgroundColor: function(context: any) {
          return context.dataset.backgroundColor
        },
        borderRadius: 4,
        color: 'white',
        font: {
          weight: 'bold',
        },
        formatter: (value: any) => `${value}`,
        padding: 6,
      },
    },
  },
})

const genesisVolumeInfo: { val: null | GenesisVolumeInfo } = reactive({ val: null })
const genesisInfo: { val: null | GenesisInfo } = reactive({ val: null })

const legalSortList: SortListItem[] = [
  {
    name: () => i18n.t('DefaultOrder'),
    val: 6,
    // orderType: legalOrderType.PRICE,
    sortType: legalSortType.ASC,
  },
  {
    name: () => i18n.t('sortPriceDesc'),
    val: 2,
    orderType: legalOrderType.PRICE,
    sortType: legalSortType.DESC,
  },
  {
    name: () => i18n.t('sortPriceAsc'),
    val: 3,
    orderType: legalOrderType.PRICE,
    sortType: legalSortType.ASC,
  },
  {
    name: () => i18n.t('sortIndexDesc'),
    val: 4,
    orderType: legalOrderType.ID,
    sortType: legalSortType.DESC,
  },
  {
    name: () => i18n.t('sortIndexAsc'),
    val: 5,
    orderType: legalOrderType.ID,
    sortType: legalSortType.ASC,
  },
]

const sortList: SortListItem[] = [
  {
    name: () => i18n.t('DefaultOrder'),
    val: 6,
    orderType: OrderType.DESC,
    sortType: SortType.Default,
  },
  // { name: i18n.t('sortTimeDesc'), val: 0, orderType: OrderType.DESC, sortType: SortType.Time },
  // { name: i18n.t('sortTimeAsc'), val: 1, orderType: OrderType.ASC, sortType: SortType.Time },
  {
    name: () => i18n.t('sortPriceDesc'),
    val: 2,
    orderType: OrderType.DESC,
    sortType: SortType.Price,
  },
  {
    name: () => i18n.t('sortPriceAsc'),
    val: 3,
    orderType: OrderType.ASC,
    sortType: SortType.Price,
  },
  {
    name: () => i18n.t('sortIndexDesc'),
    val: 4,
    orderType: OrderType.DESC,
    sortType: SortType.Index,
  },
  {
    name: () => i18n.t('sortIndexAsc'),
    val: 5,
    orderType: OrderType.ASC,
    sortType: SortType.Index,
  },
]

function getDatas(isCover = false) {
  return new Promise<void>(async resolve => {
    let res

    if (route.params.key === 'legal') {
      console.log(legalScreen)

      res = await GetLegalNfts({
        page: pagination.page,
        pageSize: pagination.pageSize,
        orderType: legalScreen.orderType,
        sortType: legalScreen.sortType,
        sellType: legalScreen.sellType,
        startPrice: legalScreen.startPrice,
        endPrice: legalScreen.endPrice,
      })
      console.log('sssssssss22', res)
      if (res.code === 0 && res.data?.items?.length) {
        if (isCover) {
          nfts.length = 0
        }
        for (let i = 0; i < res.data.items.length; i++) {
          const nft = res.data.items[i]

          nfts.push({
            uuid: nft.uuid,
            classify: nft.nftClassifyList && nft.nftClassifyList[0] ? nft.nftClassifyList[0] : '',
            cover: nft.nftIcon,
            issueMetaId: nft.nftIssueMetaId,
            issueName: nft.nftIssuer,
            issueAvatarType: nft.nftIssueAvatarType,
            issueAddress: nft.nftIssueAddress,
            issueTxId: nft.nftIssueMetaTxId,
            ownerMetaId: nft.nftOwnerMetaId,
            ownerName: nft.nftOwnerName,
            ownerAvatarType: nft.nftOwnerAvatarType,
            ownerAddress: nft.nftOwnerAddress,
            status: nft.nftSellState,
            likeCount: nft.nftLikeCount,
            isHasLike: nft.nftHasLike,
            price: Number(nft.nftPrice),
            genesis: nft.nftGenesis,
            codehash: nft.nftCodehash,
            tokenIndex: nft.nftTokenIndex,
            name: nft.nftName,
            auctionTxId: nft.nftCurrentAuctionCreateTxId,
            isFirstSell: nft.nftIsFirstSell,
            backCover: nft.nftBackIcon,
            isCompound: nft.nftHasCompound,
            acutionEndTime: parseInt(nft.nftEndTimeStamp),
            isLegal: true,
          })
        }
        const totalPages = Math.ceil(res.data.total / pagination.pageSize)
        if (totalPages <= pagination.page) {
          pagination.nothing = true
        }
        // if (nfts[0]) {
        //   getSeriesInfo(nfts[0].genesis)
        // }

        // 设置分页按钮
        // if (!topic.val.tabList) {
        //   if (screenList[0].options.length === 0) {
        //     const indexNumberLength = Math.ceil(res.data.total / 100)
        //     const indexNumberOptions: ScreenItemOption[] = []
        //     for (let i = 0; i < indexNumberLength; i++) {
        //       indexNumberOptions.push({
        //         title: `${i * 100 + 1} - ${(i + 1) * 100}`,
        //         val: JSON.stringify([i * 100 + 1, (i + 1) * 100]),
        //       })
        //     }
        //     screenList[0].options = indexNumberOptions
        //   }
        // }

        // const totalPages = Math.ceil(res.data.total / pagination.pageSize)
        // if (totalPages <= pagination.page) {
        //   pagination.nothing = true
        // }
      }
    } else {
      let topicParams = {
        Page: screen.indexNumber ? screen.indexNumber.toString() : pagination.page.toString(),
        PageSize: pagination.pageSize.toString(),
        TopicType: screen.TopicType
          ? screen.TopicType
          : typeof route.params.key === 'string'
          ? route.params.key
          : '',
        orderType: screen.orderType,
        sortType: screen.sortType,
        sellType: screen.sellType,
        metaId: store.state.userInfo ? store.state.userInfo.metaId : undefined,
        startPrice: screen.startPrice ? satoshis(screen.startPrice) : undefined,
        endPrice: screen.endPrice ? satoshis(screen.endPrice) : undefined,
        startIndex: screen.startIndex,
        endIndex: screen.endIndex,
        // @ts-ignore
        nowTimestamp: new Date().getTime(),
        filterIndex: screen.filterIndex ? screen.filterIndex : 0,
        filterTagList: screen.filterTagList,
      }

      res = await GetTopicNftList(topicParams)
      if (res.code === 0) {
        if (isCover) {
          nfts.length = 0
        }
        if (!res.data.results.items.length) {
          pagination.nothing = true
          return
        }
        for (let i = 0; i < res.data.results.items.length; i++) {
          const nft = res.data.results.items[i]
          const classify = nftDataStrGetClassify(nft.nftDataStr)
          nfts.push({
            classify,
            cover: nft.nftIcon,
            issueMetaId: nft.nftIssueMetaId,
            issueName: nft.nftIssuer,
            issueAvatarType: nft.nftIssueAvatarType,
            issueAddress: nft.nftIssueAddress,
            issueTxId: nft.nftIssueMetaTxId,
            ownerMetaId: nft.nftOwnerMetaId,
            ownerName: nft.nftOwnerName,
            ownerAvatarType: nft.nftOwnerAvatarType,
            ownerAddress: nft.nftOwnerAddress,
            status: nft.nftSellState,
            likeCount: nft.nftLikeCount,
            isHasLike: nft.nftHasLike,
            price: nft.nftPrice,
            genesis: nft.nftGenesis,
            codehash: nft.nftCodehash,
            tokenIndex: nft.nftTokenIndex,
            name: nft.nftName,
            auctionTxId: nft.nftCurrentAuctionCreateTxId,
            isFirstSell: nft.nftIsFirstSell,
            backCover: nft.nftBackIcon,
            isCompound: nft.nftHasCompound,
            acutionEndTime: nft.nftEndTimeStamp,
            isLegal: false,
          })
        }

        if (nfts[0]) {
          getSeriesInfo(nfts[0].genesis)
        }

        // 设置分页按钮
        if (!topic.val.tabList) {
          if (screenList[0].options.length === 0) {
            const indexNumberLength = Math.ceil(res.data.total / 100)
            const indexNumberOptions: ScreenItemOption[] = []
            for (let i = 0; i < indexNumberLength; i++) {
              indexNumberOptions.push({
                title: `${i * 100 + 1} - ${(i + 1) * 100}`,
                val: JSON.stringify([i * 100 + 1, (i + 1) * 100]),
              })
            }
            screenList[0].options = indexNumberOptions
          }
        }
        const totalPages = Math.ceil(res.data.total / pagination.pageSize)
        if (totalPages <= pagination.page) {
          pagination.nothing = true
        }
      }
    }
    resolve()
  })
}

function getMore() {
  if (pagination.loading || pagination.nothing) return
  pagination.loading = true
  pagination.page++
  getDatas().then(() => {
    pagination.loading = false
  })
}

function getSeriesInfo(genesus: string) {
  return new Promise<void>(async resolve => {
    const keys = ['MetaBotV2', 'AthenaV2', 'Athena']
    const key = keys.find(item => item === route.params.key)
    const res = await GetGenesisVolumeInfo(key ? key : genesus)
    if (res.code === 0) {
      const { dateCountList, ...data } = res.data
      genesisVolumeInfo.val = data
      console.log('xxxxxxxxxxx', genesisVolumeInfo.val)
      if (dateCountList && dateCountList.length > 0) {
        const labels: string[] = []
        const values: string[] = []
        // dateCountList.splice(0, dateCountList.length - 7)
        dateCountList.map((item, index) => {
          labels.push(dayjs(item.date).format('MM-DD'))
          values.push(
            parseFloat(new Decimal(item.averagePrice).div(Math.pow(10, 8)).toString()).toFixed(2)
          )
        })
        lineChart.data.labels = labels
        lineChart.data.datasets[0].data = values
      }
    }
    resolve()
  })
}

function getUserInfo() {
  return new Promise<void>(async resolve => {
    if (typeof route.params?.metaId === 'string') {
      const res = await GetCertUserInfo(route.params?.metaId).catch(() => resolve())
      if (res.code === 0) {
        userInfo.val = res.data
      }
    }
    resolve()
  })
}

function getGenesisInfo() {
  return new Promise<void>(async resolve => {
    const res = await GetNosGenesisInfo({
      key: typeof route.params.key === 'string' ? route.params.key : '',
      lang: i18n.locale.value,
    }).catch(() => resolve())
    if (res && res.code === 0) {
      genesisInfo.val = res.data
    }
    resolve()
  })
}

const seriesStatistics = reactive([
  {
    title: i18n.t('issueNumber'),
    key: 'issueNumber',
    number: () => {
      return genesisVolumeInfo.val?.totalSupply
    },
    isBsv: () => false,
    isShowUnit: false,
  },
  {
    title: i18n.t('haveder'),
    key: 'haveder',
    number: () => {
      return genesisVolumeInfo.val?.totalHolder
    },
    isBsv: () => false,
    isShowUnit: false,
  },
  {
    title: i18n.t('startPrice'),
    key: 'startPrice',
    number: () => {
      if (store.state.currentPrice === UnitName.BSV) {
        return converterBSV(genesisVolumeInfo.val?.panicPrice)
      } else {
        return converterCNY(genesisVolumeInfo.val?.panicPrice)
      }
    },
    isBsv: () => {
      return store.getters.getterCurrentPrice === UnitName.BSV
    },
    isShowUnit: true,
  },
  {
    title: i18n.t('floorPrice'),
    key: 'floorPrice',
    number: () => {
      if (store.state.currentPrice === UnitName.BSV) {
        return converterBSV(genesisVolumeInfo.val?.minPriceOnSell)
      } else {
        return converterCNY(genesisVolumeInfo.val?.minPriceOnSell)
      }
    },
    isBsv: () => {
      return store.getters.getterCurrentPrice === UnitName.BSV
    },
    isShowUnit: true,
  },
  {
    title: i18n.t('highestTransactionPrice'),
    key: 'highestTransactionPrice',
    number: () => {
      if (store.state.currentPrice === UnitName.BSV) {
        return converterBSV(genesisVolumeInfo.val?.maxPrice)
      } else {
        return converterCNY(genesisVolumeInfo.val?.maxPrice)
      }
    },
    isBsv: () => {
      return store.getters.getterCurrentPrice === UnitName.BSV
    },
    isShowUnit: true,
  },
])

const tabs: TabItem[] = [
  { name: i18n.t('collectionProduction'), val: 0 },
  { name: i18n.t('PriceTrend'), val: 1 },
]

const tabActive = ref(0)

function refreshDatas() {
  return new Promise<void>(async resolve => {
    isSkeleton.value = true
    pagination.page = 1
    pagination.loading = false
    pagination.nothing = false
    await getDatas(true)
    isSkeleton.value = false
    resolve()
  })
}

function changeScreen(type: string, val: any) {
  if (route.params.key === 'legal') {
    if (type === 'price') {
      legalScreen.startPrice = val[0]
      legalScreen.endPrice = val[1]
    } else if (type === 'series') {
      legalScreen.sellType = val
    } else if (type === 'indexNumber') {
      val = JSON.parse(val)
      legalScreen.startIndex = val[0]
      legalScreen.endIndex = val[1]
    } else {
      legalScreen[type] = val
    }
  } else {
    if (type === 'price') {
      screen.startPrice = val[0]
      screen.endPrice = val[1]
    } else if (type === 'series') {
      screen.sellType = val
    } else if (type === 'indexNumber') {
      val = JSON.parse(val)
      screen.startIndex = val[0]
      screen.endIndex = val[1]
    } else if (type === 'MetaBotAvatar') {
      screen.filterTagList.length = 0
      screen.filterIndex = 2
      if (val !== 'all') {
        screen.filterTagList.push(val)
      }
    } else {
      screen[type] = val
    }
  }

  refreshDatas()
}

function changeSort(params: { sortType: number; orderType?: number }) {
  if (isLegalAlbum.value) {
    legalScreen.sortType = params.sortType
    legalScreen.orderType = params.orderType
  } else {
    screen.sortType = params.sortType
    screen.orderType = params.orderType
  }
  refreshDatas()
}

function setScreenSeries() {
  const options: ScreenItemOption[] = []
  if (topic.val?.tabList && topic.val?.tabList.length > 0) {
    screenActiveName[0] = 'TopicType'
    screenList.length = 0
    topic.val.tabList.map(item => {
      options.push({
        title: item.tabName,
        val: item.tabTag,
      })
    })

    screen.TopicType = options[0].val

    screenList.push({
      label: i18n.t('series'),
      screenName: 'TopicType',
      type: ScreenTypes.CheckboxList,
      val: options[0].val,
      options,
    })
  } else if (topic.val?.filterIndex == 2 && topic.val?.filterTagList.length) {
    let initOptions = {
      title: {
        en: 'AllPart',
        jp: 'AllPart',
        zh: '全部',
      },
      val: 'all',
    }
    screenActiveName[0] = 'MetaBotAvatar'
    screenList.length = 0
    topic.val.filterTagList.map(item => {
      options.push({
        title: item.tabName,
        val: item.tabTag,
      })
    })
    options.unshift(initOptions)

    screen.TopicType = 'MetaBotAvatar'
    screenList.push({
      label: i18n.t('catagory'),
      screenName: 'MetaBotAvatar',
      type: ScreenTypes.CheckboxList,
      val: options[0].val,
      options,
    })
  }
}

onMounted(async () => {
  if (route.params.key === 'legal') {
    await getDatas()
    isSkeleton.value = false
  } else {
    const topicItem = store.state.topics.find(item => item.key === route.params.key)
    if (topicItem) {
      topic.val = topicItem
    }
    if (isSkeleton.value) {
      setScreenSeries()
      getGenesisInfo()
      pagination.page = 1
      pagination.loading = false
      pagination.nothing = false
      await checkUserInfoFinish(false)
      await getDatas()
      await getUserInfo()
      isSkeleton.value = false
    }
  }
})
</script>

<style lang="scss" scoped src="./Detail.scss"></style>
