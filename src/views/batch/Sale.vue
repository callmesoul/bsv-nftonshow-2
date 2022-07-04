<template>
  <InnerPageHeader :title="$t('batchSale')" :is-show-search="false">
    <template #intro>
      <div class="batch-sale-drsc">
        {{ $t('batchSaleDrsc') }},<a>{{ $t('batchSaleDrsc2') }}</a>
      </div>
    </template>
  </InnerPageHeader>

  <div class="batch-create container">
    <!-- 选择系列 -->
    <div class="section-header flex flex-align-center">
      <div class="select-series flex1 screen-item">
        <div class="input-item flex flex-align-center">
          <div class="select-warp flex flex-align-center">
            <div class="key flex1 flex flex-align-center">
              <span class="title">{{ $t('series') }}:</span>
            </div>
            <div class="value">
              <ElSelect v-model="currentSeries" :disabled="isBatchSaled">
                <ElOption
                  key="all"
                  :label="
                    $t('all') + $t('series').toLowerCase() + ' ' + nfts.length + '/' + nfts.length
                  "
                  value="all"
                >
                </ElOption>
                <ElOption
                  v-for="item in seriesList"
                  :key="item.name"
                  :label="item.name + ' ' + item.hasCount + '/' + item.total"
                  :value="item.name"
                >
                </ElOption>
              </ElSelect>
            </div>
          </div>
        </div>
      </div>

      <div class="screen-item flex1">
        <div class="input-item flex flex-align-center">
          <div class="select-warp flex flex-align-center">
            <div class="key flex1 flex flex-align-center">
              <span class="title">{{ $t('sameAmount') }}:</span>
              <ElSwitch v-model="isSameAmount" :disabled="isBatchSaled" />
            </div>
            <div class="value">
              <InputAmount
                :disable="!isSameAmount || isBatchSaled"
                :amount="allAmount"
                :unit="allUnitName"
                @change="onChangeSameAmount"
                @changeUnit="onChangeSanmeUnit"
                :placeholder="$t('price')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex section-bottm">
      <div class="same-sale-drsc flex1 flex">
        <span class="name">{{ $t('sameSaleDrsc') }}:</span>
        <ElSwitch v-model="isSameSaleDrsc" :disabled="isBatchSaled" />
        <div class="textarea flex1" v-if="isSameSaleDrsc">
          <textarea
            class="flex1"
            v-model="allSaleDrsc"
            :disabled="isBatchSaled"
            @change="onChangeSameSaleDrsc"
          ></textarea>
        </div>
      </div>
      <div class="same-sale-drsc flex1 flex sellTime">
        <span class="name">{{ $t('sameSellTime') }}:</span>
        <ElSwitch v-model="isSameTime" :disabled="isBatchSaled" />
        <div class="flex1 ml10">
          <ElDatePicker
            class="el-datetime flex1"
            :disabled="!isSameTime || isBatchSaled"
            v-model="allSellTime"
            @change="onAllPickerChange"
            :editable="false"
            :clearable="false"
            :disabledDate="setDisabledDate"
            type="datetime"
            :placeholder="$t('timeplac')"
          >
          </ElDatePicker>
        </div>
      </div>
    </div>

    <!-- 批量铸造列表 -->
    <div class="batch-create-list">
      <div
        class="batch-create-item"
        v-for="(item, index) in currentNfts"
        :key="item.genesis + item.codehash + item.tokenIndex"
        :class="{
          'un-selected': item.amount === '' || item.amount === '0' || item.sellTime === '',
        }"
      >
        <div class="cover upload-warp">
          <div class="upload">
            <div class="add flex flex-align-center flex-pack-center">
              <ElImage
                class="cover"
                fit="cover"
                :src="$filters.metafile(item.cover)"
                :preview-src-list="[$filters.metafile(item.cover, 0)]"
                :append-to-body="true"
              />
            </div>
          </div>
        </div>
        <div class="name input-item">
          <input type="text" class="disabled" :readOnly="true" v-model="item.name" placeholder="" />
        </div>
        <div class="name input-item">
          <InputAmount
            :amount="item.amount"
            :unit-name="item.unit"
            :disable="isSameAmount || isBatchSaled"
            @changeUnit="val => (item.unit = val)"
            :placeholder="$t('price')"
            @change="value => (item.amount = value.amount)"
          />
          <!-- <input
            type="text"
            class="price"
            v-model="item.amount"
            :placeholder="$t('priceplac') + '0.00001'"
          /> -->
        </div>
        <div class="intro input-item">
          <textarea
            v-model="item.sellDesc"
            :placeholder="$t('offSaleIntro')"
            :disabled="isBatchSaled"
          ></textarea>
        </div>
        <div class="index input-item">
          <ElDatePicker
            class="el-datetime flex1"
            :disabled="isSameTime || isBatchSaled"
            v-model="item.sellTime"
            :editable="false"
            :clearable="true"
            :disabledDate="setDisabledDate"
            type="datetime"
            :placeholder="$t('timeplac')"
          >
          </ElDatePicker>
        </div>
        <router-link
          :to="{
            name: 'detail',
            params: {
              genesisId: item.genesis,
              codehash: item.codehash,
              tokenIndex: item.tokenIndex,
            },
          }"
          class="btn btn-block"
          :class="{ 'btn-gray': !item.isSaled }"
        >
          {{ item.isSaled ? $t('isSale') : $t('unSale') }}
        </router-link>
      </div>
    </div>
    <div class="flex flex-align-center btn-group">
      <template v-if="isBatchSaled">
        <div class="btn btn-block flex1" @click="resetBacth">
          {{ $t('restart') }}
        </div>
      </template>
      <div class="btn btn-block flex1" @click="startBacth">
        {{ isBatchSaled ? $t('continue') : $t('startBatchSale') }}
      </div>
    </div>
  </div>

  <ElDialog
    v-model="isShowResult"
    :title="$t('batchSaleIniting')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="result">
      <div class="batch-create-tips">{{ $t('batchSaleTips') }}</div>
      <div class="result-msg">
        <div class="result-num">
          {{ $t('batchSaleNum') }}:<span>{{
            currentNfts.filter(
              item => item.amount !== '' && item.amount !== '0' && item.sellTime !== ''
            ).length
          }}</span>
          {{ $t('indivual') }}, {{ $t('beSuccess') }}:<span>{{ successNum }}</span>
          {{ $t('indivual') }}
        </div>
        <ElProgress
          :percentage="
            Math.ceil(
              (successNum /
                currentNfts.filter(
                  item => item.amount !== '' && item.amount !== '0' && item.sellTime !== ''
                ).length) *
                100
            )
          "
          :stroke-width="30"
        ></ElProgress>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import {
  CreateNft,
  GetMyNftSummaryList,
  GetSeriesNftList,
  NftApiCode,
  SetDeadlineTime,
} from '@/api'
import { useStore } from '@/store'
import { ElLoading, ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { checkSdkStatus, confirmToSendMetaData } from '@/utils/util'
import { UnitName } from '@/config'
import InnerPageHeader from '@/components/InnerPageHeader/InnerPageHeader.vue'
import InputAmount from '@/components/InputAmount/InputAmount.vue'
import Decimal from 'decimal.js-light'

const router = useRouter()
const store = useStore()
const i18n = useI18n()
const isShowResult = ref(false)
const nfts: {
  codehash: string
  genesis: string
  name: string
  cover: string
  tokenIndex: string
  amount: string
  isSaled: boolean
  unit: UnitName
  sellDesc: string
  sellTime: string
  genesisTxid: string
  sensibleId: string
}[] = reactive([])

const seriesList: {
  name: string
  hasCount: number
  total: number
  genesis: string
  codehash: string
}[] = reactive([])

// 是否已上过架
const isBatchSaled = ref(false)

const isSameAmount = ref(false)
const allAmount = ref('')
const allUnitName = ref(UnitName.BSV)
const minAmount = 1000
const isSameSaleDrsc = ref(false)
const allSaleDrsc = ref('')

const currentSeries = ref('all')
// 成功的数量
const successNum = ref(0)

const currentNfts = computed(() => {
  let list = nfts
  if (currentSeries.value !== 'all') {
    const series = seriesList.find(item => item.name === currentSeries.value)
    list = list.filter(item => item.codehash === series.codehash && item.genesis === series.genesis)
  }
  return list
})

const isSameTime = ref(false)
const allSellTime = ref('')
const setDisabledDate = (time: string) => {
  const now = new Date().getTime() + 1000 * 60 * 30
  const max = now + 30 * 24 * 60 * 60 * 1000
  return new Date(time).getTime() < now || new Date(time).getTime() > max
}

function sleepTime() {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
}

// 开始批量
async function startBacth() {
  // 檢查sdk狀態
  await checkSdkStatus()
  const loading = ElLoading.service()
  const tasks: {
    codehash: string
    genesis: string
    tokenIndex: string
    satoshisPrice: number
    genesisTxid: string
    sensibleId: string
    sellDesc: string
    sellTime: number
  }[] = []

  currentNfts.value.map(item => {
    if (!item.isSaled && item.amount !== '' && item.sellTime !== '') {
      tasks.push({
        codehash: item.codehash,
        genesis: item.genesis,
        tokenIndex: item.tokenIndex,
        satoshisPrice:
          item.unit === UnitName.SATS
            ? new Decimal(item.amount).toNumber()
            : new Decimal(item.amount).mul(Math.pow(10, 8)).toNumber(),
        genesisTxid: item.genesisTxid,
        sensibleId: item.sensibleId,
        sellDesc: item.sellDesc,
        sellTime: new Date(item.sellTime).getTime(),
      })
    }
  })

  if (tasks.length <= 0) {
    loading.close()
    return
  }
  // debugger

  // 计算总费用
  let usedAmount = 0
  for (let i = 0; i < tasks.length; i++) {
    const { sellTime, ...params } = tasks[i]
    const useAmountRes = await store.state.sdk
      ?.nftSell({ checkOnly: true, ...params })
      .catch(() => {
        loading.close()
      })
    if (useAmountRes && useAmountRes.code === 200) {
      usedAmount += useAmountRes.data.amount
    }
  }

  // 确认费用，后支付上链
  try {
    const result = await confirmToSendMetaData(usedAmount)
    if (result) {
      isBatchSaled.value = true
      // 初始化成功数量
      successNum.value = 0
      // 弹出进度框
      isShowResult.value = true
      // 开始上链任务
      for (let i = 0; i < tasks.length; i++) {
        try {
          const { sellTime, ...params } = tasks[i]
          // debugger
          const res = await store.state.sdk?.nftSell({ ...params })
          if (res && res.code === 200) {
            // 上报时间
            const response = await SetDeadlineTime({
              genesis: params.genesis,
              codeHash: params.codehash,
              tokenIndex: params.tokenIndex,
              deadlineTime: sellTime,
            })
            if (response && response.code === NftApiCode.success) {
              // 检查txId状态，确认上链后再跳转，防止上链延迟，跳转后拿不到数据
              await store.state.sdk?.checkNftTxIdStatus(res.data.sellTxId)
              await store.state.sdk?.checkNftTxIdStatus(res.data.txid)
              const nftItem = currentNfts.value.find(
                item =>
                  item.genesis === params.genesis &&
                  item.codehash === params.codehash &&
                  item.tokenIndex === params.tokenIndex
              )
              nftItem.isSaled = true
              successNum.value = successNum.value + 1
              // 延时增加稳定性
              await sleepTime()
            }
          }
        } catch (error) {
          break
        }
      }
      loading.close()
      isShowResult.value = false
    }
  } catch {
    loading.close()
    isShowResult.value = false
  }
}

function getMyNfts(isCover: boolean = false) {
  return new Promise<void>(async resolve => {
    const res = await GetMyNftSummaryList({
      Address: store.state.userInfo.address,
      Page: '1',
      PageSize: '999',
    })
    if (res && res.code === 0) {
      if (isCover) {
        nfts.length = 0
      }
      if (res.data.results.items.length > 0) {
        res.data.results.items.map(async item => {
          if (item.nftMyCount + item.nftMyPendingCount === 1) {
            const nft = item.nftDetailItemList[0]
            nfts.push({
              name: nft.nftName,
              amount: '',
              codehash: nft.nftCodehash,
              genesis: nft.nftGenesis,
              tokenIndex: nft.nftTokenIndex,
              cover: nft.nftIcon,
              isSaled: false,
              sellDesc: '',
              unit: UnitName.BSV,
              sellTime: '',
              genesisTxid: nft.nftGenesisTxId,
              sensibleId: nft.nftSensibleId,
            })
          } else if (item.nftMyCount + item.nftMyPendingCount > 1) {
            seriesList.push({
              codehash: item.nftCodehash,
              genesis: item.nftGenesis,
              name: item.nftSeriesName ? item.nftSeriesName : '--',
              hasCount: item.nftMyCount + item.nftMyPendingCount,
              total: item.nftTotalSupply,
            })
            const response = await GetSeriesNftList({
              // Page: '1',
              flag: '',
              pageSize: '999',
              address: store.state.userInfo!.address,
              codehash: item.nftCodehash,
              genesis: item.nftGenesis,
            })
            if (response.code === 0) {
              response.data.results.items.map(_item => {
                nfts.push({
                  name: _item.nftName,
                  amount: '',
                  codehash: _item.nftCodehash,
                  genesis: _item.nftGenesis,
                  tokenIndex: _item.nftTokenIndex,
                  cover: _item.nftIcon,
                  isSaled: false,
                  sellDesc: '',
                  unit: UnitName.BSV,
                  sellTime: '',
                  genesisTxid: _item.nftGenesisTxId,
                  sensibleId: _item.nftSensibleId,
                })
              })
            }
          }
        })
      }
    }
    resolve()
  })
}

// 初始化
async function resetBacth() {
  const loading = ElLoading.service()
  successNum.value = 0
  isBatchSaled.value = false
  isSameAmount.value = false
  isSameTime.value = false
  getMyNfts(true)
    .then(() => {
      loading.close()
    })
    .catch(() => {
      loading.close()
    })
}

function onChangeSameAmount(params?: { amount: string }) {
  if (!isSameAmount.value) return
  if (params) {
    allAmount.value = params.amount
  }
  nfts.map(item => {
    item.unit = allUnitName.value
    item.amount = allAmount.value
  })
}

function onChangeSanmeUnit(unit: UnitName) {
  allUnitName.value = unit
  nfts.map(item => {
    item.unit = allUnitName.value
  })
}

function onAllPickerChange() {
  nfts.map(item => {
    item.sellTime = allSellTime.value
  })
}

function onChangeSameSaleDrsc() {
  if (!isSameSaleDrsc.value || isBatchSaled.value) return
  nfts.map(item => {
    item.sellDesc = allSaleDrsc.value
  })
}

const loading = ElLoading.service()

function getDatas() {
  if (store.getters.isCerted) {
    getMyNfts().then(() => loading.close())
  } else {
    ElMessage.error(i18n.t('unAuth'))
    loading.close()
    router.push({ name: 'home' })
  }
}

/* checkSdkStatus().then(() => {
  
}) */

if (store.state.userInfo) {
  getDatas()
} else {
  store.watch(
    state => state.userInfo,
    () => {
      if (store.state.userInfo) getDatas()
    }
  )
}
</script>

<style lang="scss" scoped src="./Sale.scss"></style>
