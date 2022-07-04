<template>
  <a @click="toDetail()" class="nft-item" :key="item?.tokenId">
    <div class="cover">
      <NFTCover
        :cover="[item.coverUrl, item.nftBackIcon ? item.nftBackIcon : undefined]"
        :is-remint="item.nftHasCompound"
      />
      <ElImage
        class="cover-image"
        :lazy="true"
        :src="metafileUrl(item.coverUrl)"
        fit="contain"
      ></ElImage>
      <span v-if="item.classify && item.classify.length > 0">{{ $t(item.classify[0]) }}</span>
    </div>
    <div class="cont">
      <div class="name" :title="item.name">
        {{ item?.name }}
      </div>
      <div class="content flex">
        <div class="msg flex1">
          <div class="price" v-if="item.amount || props.isRecommendCard">
            <div class="label">{{ $t('price') }}</div>
            <div class="aount">{{ price }}</div>
          </div>
          <div class="author flex flex-align-center" v-if="!isHideAuthor">
            <img
              src="@/assets/images/ava_mask.png"
              class="mask"
              v-if="item.issueUserAvatarType === 'nft-metabot'"
            />
            <img
              class="avatar"
              :src="$filters.avatar(item?.metaId)"
              :alt="item?.foundryName"
              :class="{
                hasmask: item.avatarType === 'nft-metabot',
              }"
            />
            <span class="username">{{ item?.foundryName }}</span>
            <img class="cert-icon" :src="CertIcon" v-if="item.nftCertificationType" />
            <img
              class="cert-icon"
              src="@/assets/images/icon_cer_nft.png"
              v-if="item.nftGenesisCertificationType"
            />
          </div>
        </div>
      </div>
      <div class="operate flex flex-align-center" v-if="isSelf">
        <div class="timeleft flex1">
          <!-- 系列 且拥有数量 > 1 -->
          <template v-if="item.hasCount && item.hasCount > 1"
            >{{ $t('series') }} {{ item.hasCount }}/{{ item.total }}</template
          >
          <template v-else-if="item.putAway">
            <template v-if="overTime">{{ $t('overTime') }}</template>
            <div v-else class="flex flex-align-center">
              <img :src="TimeIcon" />
              <span>{{ day }}{{ $t('day') }}{{ hour }}{{ $t('hour') }}</span>
            </div>
          </template>
        </div>
        <!-- 系列 -->
        <a class="btn btn-min btn-plain" v-if="item.hasCount && item.hasCount > 1">
          {{ $t('seeAll') }}
        </a>
        <template v-else>
          <!-- 非系列 -->
          <a class="btn btn-min btn-plain" v-if="item?.putAway" @click.stop="offSale">
            {{ $t('offsale') }}
          </a>
          <div v-else class="seriesBtn">
            <a class="btn btn-min" @click.stop="toSale">{{ $t('sale') }}</a>
            <a class="btn btn-min" @click.stop="isOpenSendNft = true">{{
              $t('sendNft')
            }}</a>
          </div>
        </template>
      </div>
    </div>
    <!-- 推荐卡片 -->
    <div class="recommend-card flex flex-v" v-if="props.isRecommendCard">
      <div class="icon">
        <img :src="FireIcon" />
      </div>
      <div class="title">{{ $t('recommentprod') }}</div>
      <div class="drsc flex1">{{ $t('recommenttext') }}</div>
      <div class="more">
        <router-link :to="{ name: 'recommned' }">
          {{ $t('getmore') }}
          <img :src="CardIcon" />
        </router-link>
      </div>
    </div>
  </a>
  <!--转NFT弹窗-->
  <SendNft
    :nft="nft.val"
    :visible="isOpenSendNft"
    @removeNft="removeNft"
    @nftDialogClose="isOpenSendNft = false"
  >
  </SendNft>
</template>

<script setup lang="ts">
import { computed, watch, ref, nextTick, reactive, onMounted } from 'vue'
import { useStore } from '@/store/index'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElLoading } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { Decimal } from 'decimal.js-light'
import NftOffSale from '@/utils/offSale'
import dayjs from 'dayjs'
import { getMyNftEligibility, metafileUrl } from '@/utils/util'
import NFTDetail from '@/utils/nftDetail'
import NFTCover from '@/components/NFT/Cover.vue'
import CertIcon from '@/assets/images/icon_cer.svg?url'
import TimeIcon from '@/assets/images/icon_time.svg?url'
import FireIcon from '@/assets/images/card_icon_fire.svg?url'
import CardIcon from '@/assets/images/card_icon_ins.svg?url'
import { converterPrice } from '@/utils/filters'
import SendNft from '@/components/common/SendNft.vue'
const emit = defineEmits(['remove'])
const store = useStore()
const router = useRouter()
const route = useRoute()
const i18n = useI18n()
const now = new Date().getTime()
const price = ref('0')
const isOpenSendNft = ref(false)
const nft: { val: NFTListItem | null } = reactive({
  val: null,
})
watch(
  () => store.state.currentPrice,
  newVal => {
    if (newVal) {
      nextTick(() => {
        price.value = converterPrice(props.item?.amount)
      })
    }
  },
  { immediate: true }
)

onMounted(() => {
  let obj = {
    classify: props.item.classify[0],
    cover: props.item.nftIcon,
    issueMetaId: props.item.nftIssueMetaId,
    issueName: props.item.nftIssuer,
    issueAvatarType: props.item.nftIssueAvatarType,
    status: 1,
    genesis: props.item.nftGenesis,
    codehash: props.item.nftCodehash,
    genesisTxId: props.item.nftGenesisTxId,
    tokenIndex: props.item.nftTokenIndex,
    name: props.item.nftName,
    backCover: props.item.nftBackIcon ? props.item.nftBackIcon : undefined,
    isCompound: props.item.nftHasCompound,
    isLegal: false, // 是否法币
    ownerMetaId: props.item.nftOwnerMetaId,
    ownerName: props.item.nftOwnerName,
    ownerAvatarType: props.item.nftOwnerAvatarType,
  }
  nft.val = obj
  console.log('22222223123123', nft.val)
})

const day = computed(() => {
  if (now > props.item.deadlineTime!) return 0
  console.log(dayjs(now).diff(dayjs(props.item.deadlineTime!), 'day'))
  return Math.abs(dayjs(now).diff(dayjs(props.item.deadlineTime!), 'day'))
}) // 剩余天数
const hour = computed(() => {
  if (now > props.item.deadlineTime!) return 0
  const day = dayjs(now).diff(dayjs(props.item.deadlineTime!), 'day')
  return Math.abs(dayjs(now).diff(dayjs(props.item.deadlineTime!), 'hour') - day * 24)
}) // 剩余小时
const overTime = computed(() => props.item.deadlineTime && props.item.deadlineTime <= now) // 是否超过时间
const props = defineProps<{
  item: NftItem
  isRecommendCard?: boolean
  isHideAuthor?: boolean
  isSelf?: boolean
}>()

function toDetail() {
  if (props.item.genesis) {
    if (props.item.hasCount && props.item.hasCount > 1) {
      router.push({
        name: 'series',
        params: { genesisId: props.item.genesis, codehash: props.item.codehash },
        query: { name: props.item.name },
      })
    } else {
      router.push({
        name: 'detail',
        params: {
          tokenIndex: props.item.tokenIndex,
          genesisId: props.item.genesis,
          codehash: props.item.codehash,
        },
      })
    }
  }
}

async function toSale() {
  const result = await getMyNftEligibility(props.item.metaId)
  if (!result) return
  if (props.item?.tokenId) {
    router.push({
      name: 'sale',
      params: {
        tokenIndex: props.item.tokenIndex,
        genesisId: props.item.genesis,
        codehash: props.item.codehash,
      },
    })
  }
}

function offSale() {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })
  ElMessageBox.confirm(
    `${i18n.t('offsaleConfirm')} ${props.item.productName} ?`,
    i18n.t('niceWarning'),
    {
      confirmButtonText: i18n.t('confirm'),
      cancelButtonText: i18n.t('cancel'),
      closeOnClickModal: false,
    }
  )
    .then(async () => {
      // 先获取详情
      // const detailRes = await GetNftDetail({
      //   tokenId: props.item.tokenId
      // }).catch(() => {
      //     loading.close()
      // })
      const nft = await NFTDetail(
        props.item.genesis,
        props.item.codehash,
        props.item.tokenIndex
      ).catch(() => loading.close())
      if (nft) {
        NftOffSale(nft, loading)
          .then(() => {
            props.item.putAway = false
            loading.close()
          })
          .catch(() => {
            loading.close()
          })
      }
    })
    .catch(() => loading.close())
}

function removeNft() {
  emit('remove', props.item)
}
</script>

<style lang="scss" scoped src="./Nft-item.scss"></style>
