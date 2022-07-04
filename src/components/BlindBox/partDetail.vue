<template>
  <div class="partDetailWrap container">
    <div class="box">
      <div class="partDetail-top">
        <span>{{ $t('blindBoxDetail') }}</span>
        <span>{{ $t('blindboxTips') }}</span>
      </div>
      <div class="partDetail-list ">
        <div class="partDetail-item" v-for="(item, id) in partListTotal" :key="id">
          <div class="left">
            <ElImage
              fit="contain"
              :src="getSrc(item.partModule, item.id)"
              :preview-src-list="[getSrc(item.partModule, item.id)]"
            />
          </div>
          <div class="right">
            <div class="partName">{{ item.partName }}</div>
            <div class="supplyAmount">
              <div>
                <span>{{ $t('supplyAmount') }}</span
                ><span>{{ item.everyPartIssuerAmout }}</span>
              </div>
              <div>
                <span>{{ $t('probability') }}</span
                ><span>{{ item.probability }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nftDetailAndDesc box">
      <div class="title">{{ $t('authorDescAndDetail') }}</div>
      <div class="work-deail-section">
        <div class="work-detail-item flex flex-align-center">
          <div class="key">{{ $t('workname') }}：</div>
          <div class="value flex1">{{ props.nft.nftName }}</div>
        </div>
        <div class="work-detail-item flex flex-align-center">
          <div class="key">{{ $t('workclass') }}：</div>
          <div class="value flex1">
            <template v-if="props.nft.classify && props.nft.classify.length > 0">
              <span v-for="item in props.nft.classify" :key="item">{{
                item === 'avatar' ? $t('profilepic') : $t(item)
              }}</span>
            </template>
            <template v-else>--</template>
          </div>
        </div>
        <!-- 作品链接 -->
        <!-- <div
          class="work-detail-item flex flex-align-center"
          v-if="
            props.nft.classify.find(item => item === 'article') &&
              props.nft.classify.find(item => item === 'rights')
          "
        >
          <div class="key">{{ $t('worklink') }}：</div>
          <div class="value flex1">
            <a class="link" :href="props.nft.nftWebsite" target="_blank">{{
              $t('workdetaillink')
            }}</a>
          </div>
        </div> -->
        <div class="work-detail-item flex flex-align-baseline">
          <div class="key">{{ $t('workdrsc') }}：</div>
          <div class="value flex1">
            <pre>{{ props.nft.describe }}</pre>
          </div>
        </div>
      </div>
      <div class="work-deail-section">
        <div class="work-detail-item flex flex-align-center">
          <div class="key">{{ $t('createtime') }}：</div>
          <div class="value flex1">{{ $filters.dateTimeFormat(props.nft.forgeTime) }}</div>
        </div>
        <div
          class="work-detail-item flex flex flex-align-baseline"
          v-if="props.nft.sellTxId !== '' && !props.nft?.uuid"
        >
          <div class="key">{{ $t('contractaddr') }}：</div>
          <div class="value flex1">
            {{ props.nft.sellTxId }}
            <a class="copy" @click="copy(props.nft.sellTxId)">{{ $t('copy') }}</a>
            <a class="copy" @click="toWhatsonchain(props.nft.sellTxId)">{{ $t('look') }}</a>
          </div>
        </div>
        <!--
         <div class="work-detail-item flex flex-align-center">
          <div class="key">TokenID：</div>
          <div class="value flex1">
            {{ props.nft.tokenId }}
            <a class="copy" @click="copy(props.nft.tokenId)">{{ $t('copy') }}</a>
          </div>
        </div>
       -->
        <!--
        <div class="work-detail-item flex flex-align-center">
          <div class="key">{{ $t('issueMetaTxId') }}：</div>
          <div class="value flex1">
            {{ props.nft.issueMetaTxId }}
            <a class="copy" @click="copy(props.nft.issueMetaTxId)">{{ $t('copy') }}</a>
            <a class="copy" @click="toWhatsonchain(props.nft.issueMetaTxId)">
              {{ $t('look') }}
            </a>
          </div>
        </div>
       -->
      </div>
      <div class="work-deail-section">
        <div class="work-detail-item flex flex-align-center">
          <div class="key">{{ $t('creater') }}：</div>
          <div class="value flex1">
            <div class="author flex flex-align-center">
              <UserAvatar
                class="avatar"
                :metaId="props.nft.foundryMetaId"
                :type="props.nft.issueUserAvatarType"
              />
              <div class="author-msg flex1">
                <div class="creater">{{ props.nft.foundryName }}</div>
                <div class="metaid" v-if="props.nft.foundryMetaId">
                  MetaID: {{ props.nft.foundryMetaId.slice(0, 6) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="work-detail-item flex flex-align-center">
          <div class="key">{{ $t('haveder') }}：</div>
          <div class="value flex1">
            <div class="author flex flex-align-center">
              <UserAvatar
                class="avatar"
                :metaId="props.nft.ownerMetaId"
                :type="props.nft.ownerAvatarType"
              />
              <div class="author-msg flex1">
                <div class="creater">
                  {{ props.nft.ownerName ? props.nft.ownerName : props.nft.ownerAddress }}
                </div>
                <div class="metaid" v-if="props.nft.ownerMetaId">
                  MetaID:{{ props.nft.ownerMetaId.slice(0, 6) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="remark">
        <div class="remark-item">
          {{ $t('remark1') }}
          <!-- <a @click="more">{{ $t('knowmore') }}</a> -->
        </div>
        <div class="remark-item">{{ $t('remark2') }}</div>
        <div class="remark-item">{{ $t('remark3') }}</div>
      </div>
    </div>
    <div class="blindBoxRecorddWrap box">
      <div class="blindBoxRecordTab">
        <a
          :class="{ active: index === tabIndex }"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="changeTabIndex(index)"
          >{{ $t(tab.key) }}</a
        >
      </div>
      <div class="tab-cont">
        <div class="tabTop">
          <div class="buyRecord" v-if="tabIndex === 0">
            <div class="tr th flex flex-align-center">
              <span class="td flex1">{{ $t('blindboxUser') }}</span>
              <span class="td flex1">MetaID</span>
              <span class="td flex1">{{ $t('blindboxOperation') }}</span>
              <span class="td flex1">{{ $t('blindboxAmount') }}</span>
              <span class="td flex1">{{ $t('blindboxTime') }}</span>
            </div>
            <div
              class="tr flex flex-align-center"
              v-for="(record, index) in historyRecords"
              :key="record.id"
            >
              <div class="td blindboxUser flex1 flex flex-align-center">
                <img :src="$filters.avatar(record.metaid)" alt="" />
                <span>{{ record.name }}</span>
              </div>
              <div class="td blindboxMetaId flex1 flex flex-align-center">
                <span>{{ record.metaid.slice(0, 6) }}</span>
              </div>
              <div class="td blindboxOperation flex1 flex flex-align-center">
                <span>{{ $t('buyBlindBox') }}&nbsp;</span>
                <span>{{ $t('metabotBlindBox') }}</span>
              </div>
              <div class="td blindboxAmount flex1 flex flex-align-center">
                <span>{{ record.quantity }}</span>
              </div>
              <div class="td blindboxTime flex1 flex flex-align-center">
                <span>{{ $filters.dateTimeFormat(+record.create_time, 'YYYY-MM-DD HH:mm') }}</span>
              </div>
            </div>
          </div>

          <div class="extractRecord" v-if="tabIndex === 1">
            <div class="tr th flex flex-align-center">
              <span class="td flex1">{{ $t('blindboxUser') }}</span>
              <span class="td flex1">MetaID</span>
              <span class="td flex1">{{ $t('blindboxOperation') }}</span>
              <span class="td flex1">{{ $t('blindboxTime') }}</span>
            </div>
            <div
              class="tr flex flex-align-center"
              v-for="(record, index) in openRecords"
              :key="record.id"
            >
              <div class="td blindboxUser flex1 flex flex-align-center">
                <img :src="$filters.avatar(record.avatar_txid)" alt="" />
                <span>{{ record.name }}</span>
              </div>
              <div class="td blindboxMetaId flex1 flex flex-align-center">
                <span>{{ record.metaid?.slice(0, 6) }}</span>
              </div>
              <div class="td blindboxOperation flex1 flex flex-align-center">
                <span>{{ $t('openOneBlindBox') }}&nbsp;</span>
                <span>{{ record.metabot_avatar_name }}</span>
              </div>
              <div class="td blindboxTime flex1 flex flex-align-center">
                <span>{{ $filters.dateTimeFormat(+record.create_time, 'YYYY-MM-DD HH:mm') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="getRecordMore" v-if="tabIndex === 0">
          <span @click="loadMore">{{
            historyRecordsNoData ? $t('noMoreRecord') : $t('getRecordMore')
          }}</span>
        </div>
        <div class="getRecordMore" v-else>
          <span @click="loadMore">{{
            openRecordsNoData ? $t('noMoreRecord') : $t('getRecordMore')
          }}</span>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import { useI18n } from 'vue-i18n'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { computed, reactive } from '@vue/reactivity'
import getSrc from '@/configs'
import { BlindBoxBuyReCord, BlindBoxOpenReCord } from '@/api'

interface PartListItem {
  [x: string]: any
  partModule: string
  partName: string
  partStyle?: number
  everyPartIssuerAmout: number
  probability: string
}
const props = defineProps<{
  nft: NftItemDetail | null
}>()
const i18n = useI18n()
const tabIndex = ref(0)
const loading = ref(false)
const tabs = [
  { name: i18n.t('buyRecord'), key: 'buyRecord' },
  { name: i18n.t('extractRecord'), key: 'extractRecord' },
]

const BlindboxPagination = reactive({
  buyVal: {
    page: 1,
    pageSize: 20,
  },
  openVal: {
    page: 1,
    pageSize: 20,
  },
})

const blindBoxTotal = 9540
const partList: PartListItem[] = reactive([
  {
    partModule: 'Body',
    partName: 'MetaBot Avatar - Main Body',
    partStyle: 1,
    everyPartIssuerAmout: 580,
    probability: '6%',
  },
  {
    partModule: 'Arms',
    partName: 'MetaBot Avatar - Arms ',
    partStyle: 14,
    everyPartIssuerAmout: 200,
    probability: '2.1%',
  },
  {
    partModule: 'Legs',
    partName: 'MetaBot Avatar - Legs ',
    partStyle: 14,
    everyPartIssuerAmout: 200,
    probability: '2.1%',
  },
  {
    partModule: 'Boots',
    partName: 'MetaBot Avatar - Boots ',
    partStyle: 14,
    everyPartIssuerAmout: 200,
    probability: '2.1%',
  },
  {
    partModule: 'Tool',
    partName: 'MetaBot Avatar - Tool ',
    partStyle: 14,
    everyPartIssuerAmout: 40,
    probability: '0.4%',
  },
])
const partListTotal: any = computed(() => {
  const newList: PartListItem[] = []
  partList.map((item: PartListItem, id: number) => {
    for (let i = 1; i <= item.partStyle; i++) {
      newList.push({
        partModule: `${item.partModule}`,
        id: i,
        partName: item.partStyle <= 1 ? `${item.partName}` : `${item.partName}${i}`,
        everyPartIssuerAmout: item.everyPartIssuerAmout,
        probability: item.probability,
      })
    }
  })
  return newList
  // return partList.reduce((pre:any,value:any)=>{
  //   return pre + value.partStyle
  // },0)
})

const historyRecords: BlindBoxBuyRecordItem[] = reactive([])
const openRecords: BlindBoxOpenReCordItem[] = reactive([])
const historyRecordsNoData = ref(false)
const openRecordsNoData = ref(false)
async function getBlindBoxRecord(isInit = false) {
  if (isInit) {
    try {
      const initBuyRes = await BlindBoxBuyReCord({
        page: BlindboxPagination.buyVal.page.toString(),
        pageSize: BlindboxPagination.buyVal.pageSize.toString(),
      })
      if (initBuyRes.code == 0) {
        if (!initBuyRes.data) {
          openRecordsNoData.value = true
        } else {
          historyRecords.push(...initBuyRes.data)
        }
      }
    } catch {
      historyRecordsNoData.value = true
    }
    try {
      const initOpenRes = await BlindBoxOpenReCord({
        page: BlindboxPagination.openVal.page.toString(),
        pageSize: BlindboxPagination.openVal.pageSize.toString(),
      })
      if (initOpenRes.code == 0) {
        if (!initOpenRes.data) {
          openRecordsNoData.value = true
        } else {
          openRecords.push(...initOpenRes.data)
        }
      }
    } catch {
      openRecordsNoData.value = true
    }

    // Promise.all([
    //   BlindBoxBuyReCord({
    //     page: BlindboxPagination.buyVal.page.toString(),
    //     pageSize: BlindboxPagination.buyVal.pageSize.toString(),
    //   }),
    //   BlindBoxOpenReCord({
    //     page: BlindboxPagination.openVal.page.toString(),
    //     pageSize: BlindboxPagination.openVal.pageSize.toString(),
    //   }),
    // ]).then(initRes => {
    //   if (initRes[0].code == 0 || initRes[1].code == 0) {
    //     if (!initRes[0].data) {
    //       historyRecordsNoData.value = true
    //     } else {
    //       historyRecords.push(...initRes[0].data)
    //     }
    //     if (!initRes[1].data) {
    //       openRecordsNoData.value = true
    //     } else {
    //       openRecords.push(...initRes[1].data)
    //     }
    //   }
    // })
  } else {
    if (tabIndex.value == 0) {
      const BuyReCordRes: BlindBoxBuyRecord = await BlindBoxBuyReCord({
        page: BlindboxPagination.buyVal.page.toString(),
        pageSize: BlindboxPagination.buyVal.pageSize.toString(),
      })
      if (BuyReCordRes.code == 0 && BuyReCordRes.data) {
        historyRecords.push(...BuyReCordRes.data)
      } else {
        historyRecordsNoData.value = true
      }
    } else {
      const OpenRecordRes: BlindBoxOpenReCord = await BlindBoxOpenReCord({
        page: BlindboxPagination.openVal.page.toString(),
        pageSize: BlindboxPagination.openVal.pageSize.toString(),
      })
      if (OpenRecordRes.code == 0 && OpenRecordRes.data) {
        openRecords.push(...OpenRecordRes.data)
      } else {
        openRecordsNoData.value = true
      }
    }
  }
}

function loadMore() {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })

  if (tabIndex.value == 0) {
    if (historyRecordsNoData.value) {
      loading.close()
      return
    }
    BlindboxPagination.buyVal.page++
  } else {
    if (openRecordsNoData.value) {
      loading.close()
      return
    }
    BlindboxPagination.openVal.page++
  }
  getBlindBoxRecord()
  loading.close()
}

function changeTabIndex(index: number) {
  if (tabIndex.value === index) {
    return
  }
  tabIndex.value = index
}

function copy(value: string) {
  toClipboard(value)
    .then(() => {
      ElMessage.success(i18n.t('copysuccess'))
    })
    .catch(() => {
      ElMessage.success(i18n.t('copyerror'))
    })
}

function toWhatsonchain(txId: string) {
  window.open(`https://whatsonchain.com/tx/${txId}`)
}

onMounted(() => {
  getBlindBoxRecord(true)
})
</script>

<style lang="scss" scoped src="./partDetail.scss"></style>
