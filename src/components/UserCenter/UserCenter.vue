<template>
  <ElSkeleton :loading="isSkeleton" animated>
    <template #template>
      <UserCenterSkeletonVue />
    </template>
    <template #default>
      <div class="user-msg">
        <div
          class="bgImgWrap"
          @click="uploadFileHandler"
          @mouseover="overBgImg"
          @mouseleave="leaveBgImg"
        >
          <img
            class="bg-cover"
            :src="userCenterInfo.val?.coverUrl"
            v-if="userCenterInfo.val?.coverType === '0' && userCenterInfo.val?.coverUrl"
          />
          <img
            class="edit-icon"
            :src="BgEditIcon"
            v-if="store.state.userInfo && store.state.userInfo.metaId === route.params.metaId"
            @click="openNftBgModal"
          />
        </div>
        <div class="container">
          <div class="user-msg-warp flex flex-align-center flex-pack-center">
            <div class="flex-box">
              <div class="avatar">
                <UserAvatar :metaId="user.metaId" :hasmask="false" />
              </div>
              <div class="name  flex flex-align-center">
                <span>{{ user.name }}</span>
                <CertTemp :metaId="user.metaId" :is-only-icon="true" />
              </div>
              <div
                class="metaid flex flex-align-center"
                @click="store.state.sdk?.toTxLink(user.metaId)"
              >
                <span> MetaID: {{ user.metaId.slice(0, 6) }} </span>
              </div>
              <div class="userCenterDesc">
                <div class="userCenterDesc-warp">
                  <pre>{{
                    metacenterConfigData.val?.signature
                      ? metacenterConfigData.val?.signature
                      : $t('nonSignature')
                  }}<template v-if="store.state.userInfo && store.state.userInfo.metaId === route.params.metaId"><a @click="centerDialogVisible = true">{{ $t('edit') }}</a
                  ><span v-if="!metacenterConfigData.val || (metacenterConfigData.val && metacenterConfigData.val.signature === '')">{{ $t('signature') }}</span></template></pre>
                </div>

                <div
                  class="edit-signature"
                  v-if="store.state.userInfo && store.state.userInfo.metaId === route.params.metaId"
                ></div>
              </div>
              <div class="fansWrap">
                <div class="item">{{ followingList }}&nbsp;{{ $t('follow') }}</div>
                <span>|</span>
                <div class="item">{{ followedList }}&nbsp;{{ $t('fans') }}</div>
              </div>
              <div class="userCenterOperator flex flex-align-center">
                <div class="userCenterOperator-item flex flex-align-center">
                  <el-button class="" round @click="payFollow" type="primary" v-if="!isSelf">{{
                    isFollow ? $t('followd') : $t('follow')
                  }}</el-button>

                  <a
                    class=""
                    :href="`${showTalk}/chat/user/${user.metaId}`"
                    target="_blank"
                    v-if="!isSelf"
                    ><el-button round>{{ $t('sendMsg') }}</el-button></a
                  >
                </div>

                <div class="userCenterOperator-item flex flex-align-center">
                  <el-button class=" flex flex-align-center" round @click="openUrl('showBuzz')">
                    <img :src="ShowBuzzIcon" alt="ShowBuzz" />
                    <span>ShowBuzz</span>
                  </el-button>

                  <el-button class=" flex flex-align-center" round @click="openUrl('metaCenter')">
                    <img class="mr-10" :src="MetaCenterIcon" alt="MetaCenter" />
                    <span>MetaCenter</span>
                  </el-button>
                </div>
              </div>
            </div>

            <div class="operate flex flex-align-center">
              <div class="operate-item flex flex-align-center" @click="openRecordModal">
                <img :src="RecordIcon" />
              </div>
              <div class="operate-item flex flex-align-center" @click="share">
                <img :src="ShapeIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tab class="tabs" :tabs="tabs" />
    </template>
  </ElSkeleton>

  <slot></slot>

  <!-- record -->
  <div class="record-modal">
    <ElDialog v-model="isShowRecordModal" custom-class="" top="0">
      <template #title>
        <div class="tab record-tab">
          <a
            v-for="(tab, index) in recordTabs"
            :class="{ active: index === recordTabIndex }"
            @click="changeRecordTab(index)"
            >{{ $t(tab.key) }}</a
          >
        </div>
      </template>
      <div class="record-list">
        <ElSkeleton :loading="isShowRcordSkeleton" animated :count="recordPagination.pageSize">
          <template #template>
            <div class="record-item flex">
              <ElSkeletonItem variant="image" class="cover" />
              <div class="cont flex1 flex flex-v flex-pack-justify">
                <div class="top flex flex flex-align-center">
                  <div class="title flex1">
                    <ElSkeletonItem variant="text" style="width:40%" />
                  </div>
                  <div class="price" :class="{ active: recordTabIndex === 1 }">
                    <ElSkeletonItem variant="text" style="width:20%" />
                  </div>
                </div>
                <div class="time">
                  <ElSkeletonItem variant="text" style="width:20%" />
                </div>
                <div class="bottom flex flex-align-center">
                  <div class="seller flex1 flex flex-align-center">
                    <ElSkeletonItem variant="text" style="width:30%" />
                  </div>
                  <a>
                    <ElSkeletonItem variant="text" style="width:10%" />
                  </a>
                </div>
              </div>
            </div>
          </template>
          <template #default>
            <div
              class="record-item flex"
              v-for="record in records"
              :key="record.nftSellTxId"
              @click="toDetail(record)"
            >
              <ElImage
                class="cover"
                :src="metafileUrl(record.nftIcon)"
                :lazy="true"
                :preview-src-list="[metafileUrl(record.nftIcon, 800)]"
                fit="contain"
              />
              <div class="cont flex1 flex flex-v flex-pack-justify">
                <div class="top flex flex flex-align-center">
                  <div class="title flex1">
                    {{ recordTabIndex === 0 ? $t('buy') : $t('sell') }} {{ record.nftName }}
                  </div>
                  <div
                    class="price flex flex-align-center"
                    :class="{ active: recordTabIndex === 1 }"
                  >
                    {{ recordTabIndex === 0 ? '-' : '+'
                    }}{{ new Decimal(record.nftPrice).div(Math.pow(10, 8)).toString() }} BSV
                  </div>
                </div>
                <div class="time">
                  {{ dayjs(record.nftBuyerTimestamp).format('YYYY-MM-DD HH:mm') }}
                </div>
                <div class="bottom flex flex-align-center">
                  <div class="seller flex1 flex flex-align-center">
                    <template v-if="recordTabIndex === 1">
                      {{ $t('buyer') }}:
                      <img :src="$filters.avatar(record.nftBuyerMetaId)" />
                      {{ record.nftBuyerName }}
                    </template>
                    <template v-else>
                      {{ $t('seller') }}:
                      <img :src="$filters.avatar(record.nftOwnerMetaId)" />
                      {{ record.nftOwnerName }}
                    </template>
                  </div>
                  <a @click.stop="store.state.sdk?.toTxLink(record.nftSellTxId)"
                    >{{ $t('look') }}TX</a
                  >
                </div>
              </div>
            </div>
            <!-- 加载更多 -->
            <LoadMore
              :pagination="recordPagination"
              @getMore="getMoreRecords"
              v-if="records.length > 0 && !isShowRcordSkeleton"
            />
            <!-- 内容为空 -->
            <IsNull v-else-if="records.length <= 0 && !isShowRcordSkeleton" />
          </template>
        </ElSkeleton>
      </div>
    </ElDialog>
  </div>

  <!--输入 metafile 弹窗-->
  <ElDialog v-model="centerDialogVisible" :title="$t('editSignature')">
    <el-input
      v-model="newSignature"
      :autosize="{ minRows: 2, maxRows: 6 }"
      type="textarea"
      :placeholder="$t('editSignature')"
    >
    </el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="confirmEditSignature">{{ $t('confirm') }}</el-button>
      </span>
    </template>
  </ElDialog>

  <!--输入 metafile 弹窗-->
  <ElDialog v-model="isShowNFTBgModal">
    <template #title>
      <div class="modal-header">
        <div class="modal-header-left">
          <a @click="currentNftBg.val = null" v-if="currentNftBg.val">{{ $t('preStep') }}</a>
        </div>
        <div class="modal-header-title">
          {{ currentNftBg.val ? $t('nftBgTitle') : $t('nftBgTitle2') }}
        </div>
      </div>
    </template>
    <div class="nft-bg-list" v-if="!currentNftBg.val">
      <a
        class="nft-bg-item"
        v-for="item in nftBgs"
        :key="item.genesis + item.codehash + item.tokenIndex"
        @click="currentNftBg.val = item"
      >
        <img :src="item.iconUrl" />
      </a>
      <LoadMore :pagination="nftBgPagination" @getMore="getMoreNftBgs" v-if="nftBgs.length > 0" />
      <!-- 内容为空 -->
      <IsNull v-else />
    </div>
    <div class="nft-bg-preview" v-else>
      <img :src="currentNftBg.val?.iconUrl" />
    </div>
    <template #footer v-if="currentNftBg.val">
      <span class="dialog-footer">
        <a @click="closeNftModal">{{ $t('cancel') }}</a>
        <a @click="confirmNftbg">{{ $t('confirm') }}</a>
      </span>
    </template>
  </ElDialog>

  <!-- 裁剪 -->
  <CropperVue
    :visible="isCropperVisible"
    @cancel="isCropperVisible = false"
    @confirm="cropperConfirm"
    :img="cropperImage.val"
  />
</template>

<script async setup lang="ts">
import {
  GetMyNftOnShowBuySuccessList,
  GetMyNftOnShowSellSuccessList,
  GetUserInfo,
  GetMyFollowList,
  GetUserNftBgs,
} from '@/api'
import RecordIcon from '@/assets/images/me_icon_record.svg?url'
import { useStore } from '@/store'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import LoadMore from '@/components/LoadMore/LoadMore.vue'
import { ElMessage, ElLoading } from 'element-plus'
import {
  metafileUrl,
  getMetaCenterConfig,
  tranfromImgFile,
  base64ToHex,
  checkUserInfoFinish,
} from '@/utils/util'
import CertTemp from '@/components/Cert/Cert.vue'
import Decimal from 'decimal.js-light'
import dayjs from 'dayjs'
import { router } from '@/router'
import Tab from '@/components/Tab/Tab.vue'
import CropperVue from '../Cropper/Cropper.vue'
import { v1 as uuid } from 'uuid'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import UserCenterSkeletonVue from './UserCenterSkeleton.vue'
import IsNull from '@/components/IsNull/IsNull.vue'
import BgEditIcon from '@/assets/svg/per_bg_edit.svg?url'
import ShowBuzzIcon from '@/assets/icons/logo_showbuzz.svg?url'
import MetaCenterIcon from '@/assets/icons/logo_metacenter.svg?url'
import ShapeIcon from '@/assets/icons/pro_icon_shape.svg?url'

const props = defineProps({
  userInfoLoading: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Object,
    default: () => {
      return {
        metaId: '',
        name: '',
        address: '',
      }
    },
  },
  isHideAuthor: {
    type: Boolean,
    default: false,
  },
})

const i18n = useI18n()
const store = useStore()
const route = useRoute()

const userDescCont = ref()
const showTalk = import.meta.env.VITE_ShowTalk
let centerDialogVisible = ref(false)
const newSignature = ref('')

const isShowNFTBgModal = ref(false)
const currentNftBg: { val: null | GetUserNftBgsResDataItem } = reactive({ val: null })
const nftBgPagination = reactive({
  ...store.state.pagination,
})
const nftBgs: GetUserNftBgsResDataItem[] = reactive([])

const isSkeleton = ref(true)
const metacenterConfigData: {
  val: {
    signature: string
    coverImg: string | string[]
    publicKey: string
  } | null
} = reactive({ val: null })
const userCenterInfo: { val: UserCenterInfo | null } = reactive({ val: null })
let bgDialogIsShow = ref(false)
let dialogType = ref('')
const followList: { val: MyFollowList | null } = reactive({ val: null })
const isCropperVisible = ref(false)
const cropperImage: { val: any } = reactive({ val: null })
const followingList = computed(() => {
  return followList.val?.followingList?.length
})

const followedList = computed(() => {
  return followList.val?.followedList?.length
})

const isFollow = ref(false)
watch(
  () => followList.val,
  () => {
    isFollow.value =
      (store.state.userInfo &&
        followList.val?.followedList?.includes(store.state.userInfo?.metaId)) ||
      (store.state.userInfo && store.state.userInfo.metaId === route.params.metaId)
  }
)

const metaCenterCover = computed(() => {
  if (metacenterConfigData.val) {
    if (metacenterConfigData.val.coverImg instanceof Array) {
      return metacenterConfigData.val.coverImg[0]
    } else {
      return metacenterConfigData.val.coverImg
    }
  } else {
    return ''
  }
})

const hanlderFile = async (e: any) => {
  // debugger
  const files = e.target.files
  if (files.length > 0) {
    const res = await tranfromImgFile(files[0])
    cropperImage.val = res.base64Data
    isCropperVisible.value = true
  }
  // const result=await uploadFile(file)
  // headImg=result
  // console.log(headImg)
  // const data={
  //   signature:store.state.headImgData?.data.signature,
  //   coverImg:`![metafile](0)`
  // }
  // let attachments=[]
  // attachments.push({
  //   fileName:headImg.name,
  //   fileType:headImg.type,
  //   data:headImg.hexData,
  //   encrypt:0
  // })
  // const blogNode:any={
  //   nodeName:'MetaCenterConfig',
  //   brfcId:'3cdeaa253606',
  //   path:'/Protocols/MetaCenterConfig',

  //   data:JSON.stringify(data),
  //   attachments:attachments
  // }
  // let res
  //  if(JSON.stringify(metacenterConfigData) !== '{}'){
  //   blogNode.nodeKey=store.state.headImgData.publicKey
  //   res=await store.state.sdk.sendMetaDataTxForEdit(blogNode).catch(e=>ElMessage.error(e))

  // }else{
  //   res=store.state.sdk.sendMetaDataTx(blogNode).catch(e=>ElMessage.error(e))
  // }
  // if(JSON.stringify(res) !== '{}'){
  //    getHeadImgAndSignature()
  // ElMessage.success(i18n.t('uploadHeadImgSucc'))
  // }

  // console.log("xz2222asas",res)
}

async function getMetafileTx(inputVal: any) {
  if (inputVal) {
    let data = {}
    if (dialogType.value === `${import.meta.env.VITE_DialogTypeMetafile}`) {
      data = {
        signature: store.state.headImgData?.data.signature,
        coverImg: `metafile://${inputVal}`,
      }
    } else {
      data = {
        signature: inputVal,
        coverImg:
          store.state.headImgData?.data.coverImg || store.state.headImgData?.data.coverImg[0],
      }
    }
    // debugger
    const blogNode: any = {
      nodeName: 'MetaCenterConfig',
      brfcId: '3cdeaa253606',
      path: '/Protocols/MetaCenterConfig',
      data: JSON.stringify(data),
    }
    let res
    if (JSON.stringify(metacenterConfigData) !== '{}') {
      blogNode.nodeKey = metacenterConfigData.publicKey
      res = await store.state.sdk.sendMetaDataTxForEdit(blogNode).catch(e => ElMessage.error(e))
      centerDialogVisible.value = false
    } else {
      res = store.state.sdk.sendMetaDataTx(blogNode).catch(e => ElMessage.error(e))
    }
    if (JSON.stringify(res) !== '{}') {
      getHeadImgAndSignature()
      if (dialogType.value === `${import.meta.env.VITE_DialogTypeMetafile}`) {
        ElMessage.success(i18n.t('uploadHeadImgSucc'))
      } else {
        ElMessage.success(i18n.t('uploadSignatureSucc'))
      }
    }
  }
}

async function payFollow() {
  if (isFollow.value) {
    return ElMessage.error(i18n.t('isFollowed'))
  }
  const data = {
    createTime: new Date().getTime(),
    MetaID: userCenterInfo.val.metaId,
    pay: '2000',
    payTo: userCenterInfo.val.address,
  }
  const FollowParams = {
    nodeName: 'PayFollow',
    brfcId: '8f23b51a047b',
    path: '/Protocols/PayFollow',
    data: JSON.stringify(data),
    payTo: [
      {
        amount: 2000,
        address: userCenterInfo.val.address,
      },
    ],
  }
  const res = await store.state.sdk.sendMetaDataTx(FollowParams)
  if (res.code === 200) {
    followList.val?.followingList.push(store.state.userInfo.metaId)
    isFollow.value = true
    ElMessage.success(i18n.t('success'))
  }
}

async function getHeadImgAndSignature() {
  return new Promise<void>(async resolve => {
    const metaId: string | string[] = route.params.metaId
    const res: any = await getMetaCenterConfig(metaId)
    if (res) {
      metacenterConfigData.val = {
        coverImg: res.data.coverImg,
        signature: res.data.signature,
        publicKey: res.publicKey,
      }
    }
    resolve()
  })
}

async function getUserFollowList() {
  const res: any = await GetMyFollowList({
    metaId: route.params.metaId,
  })
  if (res.code == 0) {
    followList.val = res.data
  }
}

const recordPagination = reactive({
  ...store.state.pagination,
})

const recordTabs = [
  { name: i18n.t('purchaseHistory'), key: 'purchaseHistory' },
  { name: i18n.t('saleRecord'), key: 'saleRecord' },
]
const isSelf = computed(() => {
  const metaId = route.params.metaId
  if (store.state.userInfo && store.state.userInfo.metaId === metaId) {
    return true
  } else return false
})
const tabs = computed(() => {
  const metaId = route.params.metaId

  let _tabs = [
    {
      name: i18n.t('inSale'),
      val: 3,
      path: `/user/${metaId}/sale`,
    },
    {
      name: i18n.t('topic'),
      val: 4,
      path: `/user/${metaId}/series`,
    },
  ]
  if (isSelf.value) {
    let selfTab = [
      { name: i18n.t('mynft'), val: 1, path: `/self/${metaId}/offsale` },
      {
        name: i18n.t('blindBox'),
        val: 2,
        path: `/self/${metaId}/myblindbox`,
      },
    ]
    _tabs = [...selfTab, ..._tabs]
    // _tabs.unshift({ name: i18n.t('mynft'), val: 1, path: `/self/${metaId}/offsale` })
  }

  return _tabs
})
const isShowRcordSkeleton = ref(true)
const records: GetMyNftOnShowSellSuccessListResItem[] = reactive([])
const recordTabIndex = ref(0)
const isShowRecordModal = ref(false)

async function uploadFileHandler(e: Event) {}

function overBgImg() {
  if (store.state.userInfo && route.params.metaId === store.state.userInfo.metaId) {
    bgDialogIsShow.value = true
  } else return
}
function leaveBgImg() {
  bgDialogIsShow.value = false
}

function backgroundTx(tx: string) {
  if (tx) {
    const metafileTx = tx.replace('metafile://', '')
    return `url(${import.meta.env.VITE_AppImgApi}/metafile/${metafileTx})`
  } else {
    return ''
  }
}

function openUrl(type: string) {
  let url =
    type === 'showBuzz'
      ? `https://www.showbuzz.app/user_index/user_buzz/${props.user.metaId}`
      : `https://metacenter.top/#/pages/index/indexCenter?metaId=${props.user.metaId}`
  window.open(url)
}

function getMoreRecords() {
  recordPagination.loading = true
  recordPagination.page++
  getRecordList().then(() => {
    recordPagination.loading = false
  })
}

async function getRecordList(isCover: boolean = false) {
  return new Promise<void>(async resolve => {
    let res
    const params = {
      MetaId: typeof route.params.metaId === 'string' ? route.params.metaId : '',
      Page: recordPagination.page.toString(),
      PageSize: recordPagination.pageSize.toString(),
    }
    if (recordTabIndex.value === 1) {
      res = await GetMyNftOnShowSellSuccessList(params)
    } else {
      res = await GetMyNftOnShowBuySuccessList(params)
    }
    if (res.code === 0) {
      if (isCover) records.length = 0
      records.push(...res.data.results.items)
      isShowRcordSkeleton.value = false
      const totalPages = Math.ceil(res.data.total / recordPagination.pageSize)
      if (recordPagination.page >= totalPages) {
        recordPagination.nothing = true
      }
    }
    resolve()
  })
}

function changeRecordTab(index: number) {
  if (recordTabIndex.value === index) return
  recordPagination.page = 1
  recordPagination.loading = false
  recordPagination.nothing = false
  recordTabIndex.value = index
  getRecordList(true)
}

function openRecordModal() {
  getRecordList(true)
  isShowRecordModal.value = true
}

function toDetail(record: GetMyNftOnShowSellSuccessListResItem) {
  router.push({
    name: 'detail',
    params: {
      genesisId: record.nftGenesis,
      codehash: record.nftCodehash,
      tokenIndex: record.nftTokenIndex,
    },
  })
}

async function cropperConfirm(base64Data: string) {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })
  const params: any = {
    nodeName: 'MetaCenterConfig',
    brfcId: '3cdeaa253606',
    path: '/Protocols/MetaCenterConfig',

    data: JSON.stringify({
      signature: metacenterConfigData.val ? metacenterConfigData.val.signature : '',
      coverImg: `![metafile](0)`,
    }),
    attachments: [
      {
        fileName: `${uuid()}.jpeg`,
        fileType: 'image/jpeg',
        data: base64ToHex(base64Data),
        encrypt: 0,
      },
    ],
    nodeKey: metacenterConfigData.val ? metacenterConfigData.val.publicKey : undefined,
  }
  const res = await store.state.sdk.sendMetaDataTx(params)
  if (res.code === 200) {
    await getHeadImgAndSignature()
    ElMessage.success(i18n.t('uploadHeadImgSucc'))
    isCropperVisible.value = false
    loading.close()
  }
}

async function confirmEditSignature() {
  if (newSignature.value === '') {
    ElMessage.error(i18n.t('signatureNotAllowNull'))
    return
  }
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })
  const params: any = {
    nodeName: 'MetaCenterConfig',
    brfcId: '3cdeaa253606',
    path: '/Protocols/MetaCenterConfig',

    data: JSON.stringify({
      signature: newSignature.value,
      coverImg: metacenterConfigData.val ? metacenterConfigData.val.coverImg : '',
    }),
    nodeKey: metacenterConfigData.val ? metacenterConfigData.val.publicKey : undefined,
  }
  const res = await store.state.sdk.sendMetaDataTx(params)
  if (res.code === 200) {
    await getHeadImgAndSignature()
    ElMessage.success(i18n.t('uploadSignatureSucc'))
    centerDialogVisible.value = false
    loading.close()
  }
}

// 分享
function share() {
  const value = `${props.user.name}:${window.location.href}`
  toClipboard(value)
    .then(() => {
      ElMessage.success(i18n.t('copyShareSuccess'))
    })
    .catch(() => {
      ElMessage.success(i18n.t('copyerror'))
    })
}

function closeNftModal() {
  isShowNFTBgModal.value = false
  currentNftBg.val = null
}

function getNftBgs(isCover = false) {
  return new Promise<void>(async resolve => {
    const res = await GetUserNftBgs({
      ...nftBgPagination,
      address: store.state.userInfo.address,
    })
    if (res.code === 0) {
      if (isCover) nftBgs.length = 0
      nftBgs.push(...res.data.results.items)

      const totalPages = Math.ceil(res.data.total / nftBgPagination.pageSize)
      if (totalPages <= nftBgPagination.page) {
        nftBgPagination.nothing = true
      }
    }
    resolve()
  })
}

async function openNftBgModal() {
  if (nftBgs.length <= 0) {
    const loading = ElLoading.service()
    await getNftBgs()
    loading.close()
  }
  isShowNFTBgModal.value = true
}

function getMoreNftBgs() {
  nftBgPagination.loading = true
  nftBgPagination.page++
  getNftBgs().then(() => {
    nftBgPagination.loading = false
  })
}

async function confirmNftbg() {
  const res = await store.state.sdk.sendMetaDataTx({
    data: JSON.stringify({
      codehash: currentNftBg.val.codehash, //string
      genesis: currentNftBg.val.genesis, //string
      tokenIndex: currentNftBg.val.tokenIndex, //string
      coverType: '0', //string
      coverImage: '', //string
    }),
    brfcId: 'a62aa0ed5daa',
    nodeName: 'SimpleMetaBackground',
    path: '/Protocols/SimpleMetaBackground',
    nodeKey:
      userCenterInfo.val?.coverPublicKey && userCenterInfo.val?.coverPublicKey !== ''
        ? userCenterInfo.val?.coverPublicKey
        : undefined,
  })
  if (res.code === 200) {
    await getUserInfo()
    userCenterInfo.val.coverType = '0'
    userCenterInfo.val.coverUrl = `${import.meta.env.VITE_AppImgApi}/metafile/sensible/${
      currentNftBg.val.codehash
    }/${currentNftBg.val.genesis}/${currentNftBg.val.tokenIndex}`
    ElMessage.success(i18n.t('editBgSuccess'))
    isShowNFTBgModal.value = false
    currentNftBg.val = null
  }
}

function getUserInfo() {
  return new Promise<void>(async resolve => {
    const res = await GetUserInfo({ metaId: route.params.metaId })
    if (res.code == 0) {
      userCenterInfo.val = res.data
    }
    resolve()
  })
}

onMounted(async () => {
  await checkUserInfoFinish(false)
  await getUserFollowList()
  getHeadImgAndSignature()
  await getUserInfo()
  isSkeleton.value = false
  setTimeout(() => {
    // console.log(userDescCont.value.childNodes)
  }, 3000)
})
</script>

<style lang="scss" scoped src="./UserCenter.scss"></style>
