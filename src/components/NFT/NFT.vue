<template>
  <ElSkeleton :loading="isSkeleton" animated>
    <template #template>
      <div class="nft">
        <div class="cover">
          <ElSkeletonItem variant="rect" />
        </div>
        <div class="cont">
          <div class="name"><ElSkeletonItem variant="text" /></div>
          <div class="user-list">
            <div class="user-item flex flex-align-center">
              <ElSkeletonItem variant="circle" />
              <ElSkeletonItem variant="p" />
            </div>
            <div class="user-item flex flex-align-center">
              <ElSkeletonItem variant="circle" />
              <ElSkeletonItem variant="p" />
            </div>
          </div>
          <div class="operate flex flex-align-center">
            <div class="flex1">
              <template v-if="isSelf">
                <ElSkeletonItem variant="button" />
              </template>
              <template v-else>
                <ElSkeletonItem variant="button" />
              </template>
            </div>
            <div class="like flex flex-align-center" @click.stop="payLike(nft)" v-if="!isSelf">
              <ElSkeletonItem variant="text" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="nft" @click="toDetail">
        <div class="cover">
          <NFTCover
            :cover="[
              $filters.metafile(nft.cover),
              nft.backCover ? $filters.metafile(nft.backCover) : undefined,
            ]"
            :isShowSaleOut="props.isShowSaleOut"
            :isRemint="nft.isCompound"
            :isBlindBox="isBlindBoxPage"
          />
          <!-- <ElImage fit="contain" :lazy="true" :src="$filters.metafile(nft.cover)" /> -->
          <!-- 分类 -->
          <span class="classify" v-if="nft.classify && nft.classify !== '' && !isBlindBoxPage">{{
            $t(nft.classify)
          }}</span>
          <!-- 拍卖 倒计时 -->
          <VueCountdown
            class="countdown"
            :time="nft.acutionEndTime ? nft.acutionEndTime - new Date().getTime() : 0"
            :transform="transformSlotProps"
            v-slot="{ days, hours, minutes, seconds }"
            @end="onCountdownEnd"
            v-if="nft.status === 7"
          >
            <span class="dot"></span
            ><span>{{ parseInt(hours) + parseInt(days) * 24 }}:{{ minutes }}:{{ seconds }}</span>
          </VueCountdown>
        </div>
        <div class="cont">
          <div class="name" v-if="!isBlindBoxPage">
            {{ nft.name }}
          </div>
          <div class="blindBoxName" v-else>
            <span>{{ nft.name }}</span>
            <img :src="CerNft" alt="" />
          </div>
          <div class="user-list">
            <div class="user-item flex flex-align-center">
              <UserAvatar :metaId="nft.issueMetaId" :type="nft.issueAvatarType"></UserAvatar>
              <span class="username">{{ nft.issueName }}</span>
              <span class="label">({{ isBlindBoxPage ? $t('issuer') : $t('creater') }})</span>
            </div>
            <div class="user-item flex flex-align-center" v-if="!isSelf">
              <UserAvatar :metaId="nft.ownerMetaId" :type="nft.ownerAvatarType"></UserAvatar>
              <span class="username">{{ nft.ownerName }}</span>
              <span class="label">({{ $t('owner') }})</span>
            </div>
          </div>
          <div class="operate flex flex-align-center">
            <div class="flex1">
              <div class="blindBoxBtn" v-if="isBlindBoxPage">
                <span>{{ $t('myBlindboxAmount') }}{{ nft.limited }}</span>
                <ElButton
                  @click="continueRemoveBlindBox"
                  :size="store.state.isApp ? 'mini' : ''"
                  class="flex flex-align-center btn-gray"
                >
                  <span>{{ $t('openBlindBox') }}</span>
                </ElButton>
              </div>
              <div v-else class="otherBtn">
                <span class="seriesAmount" v-if="props.nft.hasSeriesCount > 1 && isSelf">
                  {{ $t('nftSeries') }}{{ props.nft.hasSeriesCount }}/{{ props.nft.seriesTotal }}
                </span>
                <ElButton
                  class="flex flex-align-center btn-gray"
                  :type="nftButtonType"
                  :size="'mini'"
                  @click.stop="nftButtonFun"
                  >{{ nftButtonText
                  }}<template v-if="isShowBsvIcon"
                    ><img
                      v-if="
                        store.getters.getterCurrentPrice !== UnitName.RMB ||
                          (!props.nft.isLegal && props.nft.status !== 0)
                      "
                      class="ml5"
                      :src="BsvIcon"
                  /></template>
                </ElButton>
                <ElButton
                  :size="'mini'"
                  v-if="props.nft.hasSeriesCount <= 1 && isSelf "
                  @click.stop="isOpenSendNft = true"
                  class="flex sendNftBtn flex-align-center btn-gray"
                >
                  {{ $t('sendNft') }}
                </ElButton>
              </div>
            </div>

            <div
              class="like flex flex-align-center"
              @click.stop="payLike(nft)"
              v-if="!isSelf && !isBlindBoxPage"
            >
              <img :src="LikedIcon" v-if="nft.isHasLike" />
              <img :src="LikeIcon" v-else />
              {{ nft.likeCount }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </ElSkeleton>

  <!-- pay confirm -->
  <PayConfirmVue
    :price="price"
    :visible="isShowConfirm"
    :genesis="nft.genesis"
    :codehash="nft.codehash"
    :token-index="nft.tokenIndex"
    :isLegal="props.nft.isLegal"
    :uuid="props.nft.uuid"
    @close="isShowConfirm = false"
    @success="buySuccess"
  ></PayConfirmVue>
  <!--盲盒弹窗-->
  <BlindBoxDialogVue
    :blindBoxOpenedResult="blindBoxOpenedResult.val"
    :blindBoxRestNum="nft.limited"
    :visible="isOpenBlindBox"
    @close="isOpenBlindBox = false"
    @goOnRemoveBlindBox="continueRemoveBlindBox"
    @removeNftList="onRemoveNft"
  >
  </BlindBoxDialogVue>
  <!--转NFT弹窗-->
  <SendNft
    @removeNft="emit('remove', props.nft)"
    :nft="nft"
    :visible="isOpenSendNft"
    @nftDialogClose="isOpenSendNft = false"
  >
  </SendNft>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { auctionConfirmSend } from '@/utils/auction'
import { bsv, toCNY } from '@/utils/filters'
import NFTDetail from '@/utils/nftDetail'
import NftOffSale from '@/utils/offSale'
import { checkSdkStatus } from '@/utils/util'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { computed, ref, watch, nextTick, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import VueCountdown from '@chenfengyuan/vue-countdown'
import Buy from '@/utils/buy'
import NFTCover from '@/components/NFT/Cover.vue'
import BsvIcon from '@/assets/images/logo_bsv.svg?url'
import LikeIcon from '@/assets/images/nft_icon_like.svg?url'
import LikedIcon from '@/assets/images/nft_icon_like_active.svg?url'
import PayConfirmVue from '@/components/PayConfirm/PayConfirm.vue'
import { converterPrice, legalNftConverterPrice } from '@/utils/filters'
import { UnitName } from '@/config'
import CerNft from '@/assets/images/icon_cer_nft.png'
import BlindBoxDialogVue from '../BlindBox/BlindBoxDialog.vue'
import { openMyBlindBox, NFTApiGetNFTDetail } from '@/api'
import SendNft from '../common/SendNft.vue'
const emit = defineEmits(['remove', 'removeOneBlindBox', 'removeNft'])
interface Props {
  nft: NFTListItem
  isSkeleton?: boolean
  isShowSaleOut?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isSkeleton: true,
  isShowSaleOut: true,
})

const store = useStore()
const router = useRouter()
const route = useRoute()
const i18n = useI18n()
const price = ref('0')
const isShowConfirm = ref(false)
const isBlindBoxPage = computed(() => {
  return route.name === 'myBlindbox'
})
const isOpenBlindBox = ref(false)
const isOpenSendNft = ref(false)
const cnyMode = computed(() => {
  return store.state.currentPrice === UnitName.RMB
})
const blindBoxOpenedResult: { val: NFTApiGetNFTDetailResDataItem | null } = reactive({
  val: null,
})
watch(
  () => store.state.currentPrice,
  newVal => {
    if (newVal) {
      nextTick(() => {
        if (props.nft.isLegal) {
          price.value = legalNftConverterPrice(props.nft.price)
        } else {
          price.value = converterPrice(props.nft.price)
        }
      })
    }
  },
  { immediate: true }
)

console.log('x2222ssss222xxx', props.nft)
const isSelf = computed(() => {
  if (store.state.userInfo) {
    if (
      store.state.userInfo.metaId === props.nft.ownerMetaId ||
      store.state.userInfo.metaId === route.params.metaId
    ) {
      const userRouterList = ['selfOffsale', 'userSale', 'userAuction', 'userSeries', 'myBlindbox']
      return userRouterList.find(item => item === route.name) ? true : false
    } else {
      return false
    }
  } else {
    return false
  }
})

const nftButtonText = computed(() => {
  if (isSelf.value) {
    // 自己的

    // 系列
    if (props.nft.hasSeriesCount > 1) {
      return i18n.t('seeAll')
    }
    // 下架状态
    else if (props.nft.status === 1) {
      return i18n.t('sale')
    }
    // 上架状态
    else if (props.nft.status === 0) {
      return i18n.t('offsale')
    }
    //  已被购买 -> 下架中
    else if (props.nft.status === 2) {
      return i18n.t('sale')
    }
    //  即将上架/敬请期待 -> 下架中
    else if (props.nft.status === 3) {
      return i18n.t('sale')
    }
    //  抢购中 =》 也就是上架中
    else if (props.nft.status === 4) {
      return i18n.t('offsale')
    }
    //  非销售 -> 下架中
    else if (props.nft.status === 5) {
      return i18n.t('sale')
    }
    //  拍卖未开始 =》 下架中
    else if (props.nft.status === 6) {
      return i18n.t('sale')
    }
    // 拍卖进行中
    else if (props.nft.status === 7) {
      return i18n.t('auctioning')
    }
    // 拍卖结束
    else if (props.nft.status === 8) {
      // 结束但未发出
      return i18n.t('confirmAuctionSend')
    } // 拍卖完成且已发出
    else if (props.nft.status === 9) {
      return i18n.t('isBeBuyed')
    }
  } else {
    // 其他人

    // 下架状态
    if (props.nft.status === 1) {
      return i18n.t('isBeBuyedOrCanceled')
    }
    // 上架状态
    else if (props.nft.status === 0) {
      return price.value
      // if (props.nft.isLegal) {
      //   return toCNY(props.nft.price).toFixed(2)
      // } else {
      //   return bsv(props.nft.price)
      // }
    }
    //  已被购买
    else if (props.nft.status === 2) {
      return i18n.t('isBeBuyedOrCanceled')
    }
    //  即将上架/敬请期待
    else if (props.nft.status === 3) {
      return i18n.t('comingSoon')
    }
    //  抢购中 =》 也就是上架中
    else if (props.nft.status === 4) {
      return price.value
      // if (props.nft.isLegal) {
      //   return toCNY(props.nft.price)
      // } else {
      //   return bsv(props.nft.price)
      // }
    }
    //  非销售
    else if (props.nft.status === 5) {
      return i18n.t('notSale')
    }
    //  拍卖未开始 =》 下架中
    else if (props.nft.status === 6) {
      return i18n.t('unauctioning')
    }
    // 拍卖进行中
    else if (props.nft.status === 7) {
      return i18n.t('iWanToBid')
    }
    // 拍卖结束
    else if (props.nft.status === 8) {
      return bsv(props.nft.price) + ' ' + 'BSV'
      // if (props.nft.isLegal) {
      //   return toCNY(props.nft.price)
      // } else {

      // }
    }
    // 拍卖完成且已发出
    else if (props.nft.status === 9) {
      return bsv(props.nft.price) + ' ' + 'BSV'
      // if (props.nft.isLegal) {
      //   return toCNY(props.nft.price)
      // } else {
      //   return bsv(props.nft.price)
      // }
    } else {
      return price.value
      // if (props.nft.isLegal) {
      //   return toCNY(props.nft.price)
      // } else {
      //   return bsv(props.nft.price)
      // }
    }
  }
})
const showCNYlog = computed(() => {
  return props.nft.status === 0
})
const nftButtonType = computed(() => {
  if (isSelf.value) {
    // 自己的

    // 系列
    if (props.nft.hasSeriesCount > 1) {
      return ''
    }
    // 下架状态
    else if (props.nft.status === 1) {
      return ''
    }
    // 上架状态
    else if (props.nft.status === 0) {
      return 'primary'
    }
    //  已被购买 => 下架中
    else if (props.nft.status === 2) {
      return 'primary'
    }
    //  即将上架/敬请期待
    else if (props.nft.status === 3) {
      return 'primary'
    }
    //  抢购中 =》 也就是上架中
    else if (props.nft.status === 4) {
      return 'primary'
    }
    //  非销售 -> 下架中
    else if (props.nft.status === 5) {
      return 'primary'
    }
    //  拍卖未开始 =》 下架中
    else if (props.nft.status === 6) {
      return 'primary'
    }
    // 拍卖进行中
    else if (props.nft.status === 7) {
      return 'primary'
    }
    // 拍卖结束
    else if (props.nft.status === 8) {
      // 结束但未发出
      if (props.nft.ownerMetaId === store.state.userInfo.metaId) {
        return 'primary'
      } else {
        return 'info'
      }
    } // 拍卖完成且已发出
    else if (props.nft.status === 9) {
      return 'info'
    }
  } else {
    // 其他人

    // 下架状态
    if (props.nft.status === 1) {
      return 'info'
    }
    // 上架状态
    else if (props.nft.status === 0) {
      return 'default'
    }
    //  已被购买
    else if (props.nft.status === 2) {
      return 'info'
    }
    //  即将上架/敬请期待
    else if (props.nft.status === 3) {
      return 'info'
    }
    //  抢购中 =》 也就是上架中
    else if (props.nft.status === 4) {
      return 'snap'
    }
    //  非销售
    else if (props.nft.status === 5) {
      return 'info'
    }
    //  拍卖未开始 =》 下架中
    else if (props.nft.status === 6) {
      return 'info'
    }
    // 拍卖进行中
    else if (props.nft.status === 7) {
      return 'default'
    }
    // 拍卖结束
    else if (props.nft.status === 8) {
      return 'info'
    } // 拍卖完成且已发出
    else if (props.nft.status === 9) {
      return 'info'
    } else {
      return 'primary'
    }
  }
})
const isShowBsvIcon = computed(() => {
  if (isSelf.value) {
    return false
  } else {
    // 其他人

    // 下架状态
    if (props.nft.status === 1) {
      return false
    }
    // 上架状态
    else if (props.nft.status === 0) {
      return true
    }
    //  已被购买
    else if (props.nft.status === 2) {
      return false
    }
    //  即将上架/敬请期待
    else if (props.nft.status === 3) {
      return false
    }
    //  抢购中 =》 也就是上架中
    else if (props.nft.status === 4) {
      return true
    }
    //  非销售
    else if (props.nft.status === 5) {
      return false
    }
    //  拍卖未开始 =》 下架中
    else if (props.nft.status === 6) {
      return false
    }
    // 拍卖进行中
    else if (props.nft.status === 7) {
      return false
    }
    // 拍卖结束
    else if (props.nft.status === 8) {
      return true
    }
    // 拍卖完成且已发出
    else if (props.nft.status === 9) {
      return true
    } else {
      return true
    }
  }
})

async function continueRemoveBlindBox() {
  const res: openMyBlindBoxRes = await openMyBlindBox({
    metaid: store.state.userInfo.metaId,
  })
  if (res.code == 0) {
    const blindBoxOpenNft = await NFTApiGetNFTDetail({
      tokenIndex: res.data.tokenIndex,
      codehash: res.data.codehash,
      genesis: res.data.genesis,
    })
    if (blindBoxOpenNft.data.results.items.length > 0) {
      blindBoxOpenedResult.val = blindBoxOpenNft.data.results.items[0]
      if (!isOpenBlindBox.value) {
        isOpenBlindBox.value = true
      }
      console.log('xzxzxzxzx', blindBoxOpenedResult.val)
      emit('removeOneBlindBox')
    } else {
      ElMessage.error(i18n.t('nftNotExist'))
    }
  }
}

function nftButtonFun() {
  if (isSelf.value) {
    // 自己的

    // 系列
    if (props.nft.hasSeriesCount > 1) {
      toDetail()
    }
    // 下架状态
    else if (props.nft.status === 1) {
      toSale()
    }
    // 上架状态
    else if (props.nft.status === 0) {
      offSale()
    }
    //  已被购买 -> 下架中
    else if (props.nft.status === 2) {
      toSale()
    }
    //  即将上架/敬请期待 -> 下架中
    else if (props.nft.status === 3) {
      toSale()
    }
    //  抢购中 =》 也就是上架中
    else if (props.nft.status === 4) {
      offSale()
    }
    //  非销售 -> 下架中
    else if (props.nft.status === 5) {
      toSale()
    }
    //  拍卖未开始 =》 下架中
    else if (props.nft.status === 6) {
      toSale()
    }
    // 拍卖进行中
    else if (props.nft.status === 7) {
      toDetail()
    }
    // 拍卖结束
    else if (props.nft.status === 8) {
      // 结束但未发出
      if (props.nft.ownerMetaId === store.state.userInfo.metaId) {
        confirmSend()
      } else {
        toDetail()
      }
    }
  } else {
    // 其他人

    // 上架状态 || 抢购中 =》 也就是上架中
    if (props.nft.status === 0 || props.nft.status === 4) {
      // 购买 显示购买确认弹窗
      if (props.nft.isLegal && !cnyMode.value) {
        return ElMessage.error(`${i18n.t('notSupportBsvBuyLegal')}`)
      } else {
        isShowConfirm.value = true
      }
    } else {
      toDetail()
    }
  }
}

async function payLike(nft: NFTListItem) {
  if (nft.isHasLike) return
  await checkSdkStatus()
  const res = await store.state.sdk.addPayLikeProtocol({
    receiveAddress: nft.ownerAddress,
    txId: nft.issueTxId,
  })
  if (res.code === 200) {
    nft.isHasLike = true
    nft.likeCount = nft.likeCount + 1
  }
}

async function confirmSend() {
  if (props.nft.status !== 8) return
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })
  try {
    const params = {
      nft: {
        codehash: props.nft.codehash,
        genesis: props.nft.genesis,
        genesisTxid: props.nft.genesisTxId,
        tokenIndex: props.nft.tokenIndex,
        sensibleId: props.nft.sensibleId,
      },
      issueAddress: props.nft.issueAddress,
      issueMetaId: props.nft.issueMetaId,
      nftAuctionId: props.nft.auctionTxId,
      amount: props.nft.price,
      isFirstSell: props.nft.isFirstSell,
    }
    const result = await await auctionConfirmSend(params)
    if (result) {
      emit('remove', props.nft)
      loading.close()
      ElMessage.success(i18n.t('success'))
    }
  } catch (error) {
    if (error) ElMessage.error(JSON.stringify(error))
    loading.close()
  }
}

async function toSale() {
  router.push({
    name: 'sale',
    params: {
      tokenIndex: props.nft.tokenIndex,
      genesisId: props.nft.genesis,
      codehash: props.nft.codehash,
    },
  })
}

function offSale() {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })
  ElMessageBox.confirm(`${i18n.t('offsaleConfirm')} ${props.nft.name} ?`, i18n.t('niceWarning'), {
    confirmButtonText: i18n.t('confirm'),
    cancelButtonText: i18n.t('cancel'),
    closeOnClickModal: false,
  })
    .then(async () => {
      // 先获取详情
      // const detailRes = await GetNftDetail({
      //   tokenId: props.item.tokenId
      // }).catch(() => {
      //     loading.close()
      // })
      const nftDetail = await NFTDetail(
        props.nft.genesis,
        props.nft.codehash,
        props.nft.tokenIndex
      ).catch(() => loading.close())
      if (nftDetail) {
        NftOffSale(nftDetail, loading)
          .then(() => {
            emit('remove', props.nft)
            loading.close()
          })
          .catch(() => {
            loading.close()
          })
      }
    })
    .catch(() => loading.close())
}

function toDetail() {
  if (isBlindBoxPage.value) {
    return
  }
  if (props.nft.hasSeriesCount > 1) {
    // 系列
    router.push({
      name: 'series',
      params: {
        genesisId: props.nft.genesis,
        codehash: props.nft.codehash,
      },
      query: { name: props.nft.name },
    })
  } else {
    console.log('跳转到详情页', 1231321321)
    const query: any = {}
    // 拍卖
    if (props.nft.status >= 6 && props.nft.status <= 8) {
      query.isAuctioin = true
    }
    if (props.nft.isLegal) {
      router.push({
        name: 'legaldetail',
        params: {
          uuid: props.nft.uuid,
        },
      })
    } else {
      router.push({
        name: 'detail',
        params: {
          genesisId: props.nft.genesis,
          codehash: props.nft.codehash,
          tokenIndex: props.nft.tokenIndex,
        },
        query,
      })
    }
  }
}

function transformSlotProps(props: any) {
  const formattedProps = {}
  Object.entries(props).forEach(([key, value]) => {
    // @ts-ignore
    formattedProps[key] = value < 10 ? `0${value}` : String(value)
  })
  return formattedProps
}

function buySuccess() {
  props.nft.status = 1
  props.nft.ownerMetaId = store.state.userInfo!.metaId
  props.nft.ownerName = store.state.userInfo!.name
  ElMessage.success(i18n.t('buySuccess'))
  isShowConfirm.value = false
  console.log('xz222', props.nft)
  router.push({
    name: 'nftSuccess',
    params: {
      genesisId: props.nft.genesis,
      tokenIndex: props.nft.tokenIndex,
      codehash: props.nft.codehash,
    },
    query: {
      type: props.nft.uuid ? 'buylegal' : 'buyed',
      uuid: props.nft.uuid ? props.nft.uuid : '',
    },
  })
}

function onCountdownEnd() {
  props.nft.status = 8
}

function onRemoveNft() {
  emit('removeNft')
}
</script>

<style lang="scss" scoped src="./NFT.scss"></style>
