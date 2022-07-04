<template>
  <InnerPageHeader
    :title="$t('batchCreate')"
    :intro="$t('batchCreateDrsc')"
    :is-show-search="false"
  />

  <div class="batch-create container">
    <!-- 批量铸造列表 -->
    <div class="batch-create-list">
      <div class="batch-create-item" v-for="(item, index) in list" :key="item.id" :id="item.id">
        <div class="cover upload-warp">
          <InputImage
            :cover="item.cover"
            :disabled="isCreated"
            :is-preview="true"
            @change="file => ((item.cover = file), (item.sameUuid = uuid()))"
            :placeholder="$t('uploadcover')"
          />
        </div>
        <InputFile
          :placeholder="$t('nftoriginal')"
          :original-file="item.originalFile"
          :disabled="isCreated"
          :align="TextAlign.Start"
          @change="files => ((item.originalFile = files[0]), (item.sameUuid = uuid()))"
        />
        <div class="name input-item" :class="{ disabled: isCreated }">
          <input
            type="text"
            :readOnly="isCreated"
            v-model="item.name"
            :placeholder="$t('nameplac')"
            @change="item.sameUuid = uuid()"
          />
        </div>
        <div class="intro input-item" :class="{ disabled: isCreated }">
          <textarea
            v-model="item.intro"
            :readOnly="isCreated"
            :placeholder="$t('drscplac')"
            @change="item.sameUuid = uuid()"
          ></textarea>
        </div>
        <div
          class="orginFile input-item"
          :class="{ disabled: isCreated }"
          @click="isCreated ? '' : (item.isShowClassifyModal = !item.isShowClassifyModal)"
        >
          <div class="val" v-if="item.classify.length > 0">
            <template v-for="(_item, index) in item.classify" :key="_item">
              {{ $t(_item) }}<template v-if="index !== item.classify.length - 1">,</template>
            </template>
          </div>
          <div class="placeholder" v-else>{{ $t('choosetype') }}</div>
          <PickerModel
            name="classify"
            listKey="classify"
            :title="$t('choosetype')"
            :multiple="true"
            disabled="disabled"
            :visible="item.isShowClassifyModal"
            @confirm="item.isShowClassifyModal = false"
            :list="store.state.classifyList"
            :selecteds="item.classify"
            @change="val => ((item.classify = val), (item.sameUuid = uuid()))"
          />
        </div>
        <div
          class="orginFile input-item"
          @click="isCreated ? '' : (item.isShowSeriesModal = !item.isShowSeriesModal)"
          :class="{ disabled: isCreated }"
        >
          <div class="val" v-if="item.series?.length > 0">
            {{ item.series[0] }}
          </div>
          <div class="placeholder" v-else>{{ $t('chooseserices') }}</div>
          <ChooseSeriesModal
            :isShowSeriesModal="item.isShowSeriesModal"
            :selectedSeries="item.series"
            @change="val => changeItemSeries(val, item)"
            @confirm="item.isShowSeriesModal = false"
          />
        </div>
        <div class="index input-item disabled">
          <input
            type="number"
            :readOnly="true"
            :disabled="true"
            v-model="item.index"
            :placeholder="$t('indexNumber')"
          />
        </div>
        <div class="btn btn-block btn-default" @click="removeItem(index)" v-if="!item.tokenIndex">
          {{ $t('delete') }}
        </div>
        <router-link
          :to="{
            name: 'detail',
            params: {
              genesisId: item.genesis,
              codehash: item.codeHash,
              tokenIndex: item.tokenIndex,
            },
          }"
          class="btn btn-block"
          v-else
        >
          {{ $t('lookDetail') }}
        </router-link>
      </div>
      <!-- 添加 -->
      <div class="batch-create-item" v-if="!isCreated">
        <div class="cover upload-warp">
          <div class="upload">
            <InputImage :placeholder="$t('uploadcover')" />
          </div>
        </div>
        <InputFile :placeholder="$t('nftoriginal')" />
        <div class="name input-item">
          <input type="text" :readOnly="isCreated" :placeholder="$t('nameplac')" />
        </div>
        <div class="intro input-item">
          <textarea :placeholder="$t('drscplac')"></textarea>
        </div>
        <div class="orginFile input-item">
          <div class="placeholder">{{ $t('choosetype') }}</div>
        </div>
        <div class="orginFile input-item">
          <div class="placeholder">{{ $t('choosetype') }}</div>
        </div>
        <div class="index input-item">
          <input type="number" :readOnly="true" :disabled="true" />
        </div>
        <div class="btn btn-block btn-default">
          {{ $t('delete') }}
        </div>
        <div class="add flex flex-align-center flex-pack-center" @click="isShowOption = true">
          +
        </div>
      </div>
    </div>

    <template v-if="isCreated">
      <div class="flex flex-align-center btn-group">
        <div class="btn btn-block flex1" @click="resetBacth">
          {{ $t('resetBatchCreate') }}
        </div>
        <div class="btn btn-block flex1" v-if="successNum < list.length" @click="startBacth">
          {{ $t('continueBatchCreate') }}
        </div>
      </div>
    </template>

    <div class="btn btn-block" @click="startBacth" v-else-if="list.length > 0">
      {{ isBreak ? $t('continue') : $t('startBatchCreate') }}
    </div>
  </div>

  <!-- 添加批量铸造 -->
  <ElDialog
    v-model="isShowOption"
    :title="$t('addcreateBatch')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="option-list">
      <!-- 选择NFT系列 -->
      <div class="option-item">
        <div class="option-item-header flex flex-align-center">
          <div class="label flex1">{{ $t('ChooseNFTSeries') }}</div>
          <div class="same flex flex-align-center">
            {{ $t('sameSeries') }} <ElSwitch :disabled="isCreated" v-model="isSame.series" />
          </div>
        </div>
        <div class="cont">
          <div
            class="series-choose flex flex-align-center"
            @click="isShowSeriesModal = !isShowSeriesModal"
          >
            <span :class="{ placeholder: newItem.val.series.length <= 0 }">{{
              newItem.val.series.length <= 0 ? $t('batchCreateSeriesTips') : newItem.val.series[0]
            }}</span>
            <ChooseSeriesModal
              :isShowSeriesModal="isShowSeriesModal"
              :selectedSeries="newItem.val.series"
              @change="val => (newItem.val.series = val)"
              @confirm="isShowSeriesModal = false"
            />
          </div>
        </div>
      </div>

      <!-- 选择NFT分类 -->
      <div class="option-item">
        <div class="option-item-header flex flex-align-center">
          <div class="label flex1">{{ $t('ChooseNFTClassIfy') }}</div>
          <div class="same flex flex-align-center">
            {{ $t('sameClassify') }} <ElSwitch :disabled="isCreated" v-model="isSame.classify" />
          </div>
        </div>
        <div class="cont flex flex-align-center">
          <ElSelect
            class="flex1"
            v-model="newItem.val.classify"
            multiple
            :placeholder="$t('choosetype')"
          >
            <ElOption
              v-for="item in store.state.classifyList"
              :key="item.classify"
              :label="$t(item.classify)"
              :value="item.classify"
              :disabled="item.disabled"
            >
            </ElOption>
          </ElSelect>
        </div>
      </div>

      <!-- NFT封面 -->
      <div class="option-item">
        <div class="option-item-header flex flex-align-center">
          <div class="label flex1">{{ $t('NFTCover') }}</div>
          <div class="same flex flex-align-center">
            {{ $t('isSameNFTCover') }}
            <ElSwitch :disabled="isCreated" v-model="isSame.cover" />
          </div>
        </div>
        <div class="cont">
          <InputImage
            :disabled="isCreated"
            :cover="newItem.val.cover"
            @change="file => (newItem.val.cover = file)"
            :placeholder="$t('uploadcover')"
          />
        </div>
      </div>

      <!-- NFT源文件 -->
      <div class="option-item">
        <div class="option-item-header flex flex-align-center">
          <div class="label flex1">{{ $t('nftoriginal') }}</div>
          <div class="same flex flex-align-center">
            {{ $t('isSameOriginalFile') }}
            <ElSwitch :disabled="isCreated" v-model="isSame.originalFile" />
          </div>
        </div>
        <div class="cont">
          <InputFile
            class="flex1"
            :align="TextAlign.Start"
            :disabled="isCreated"
            :placeholder="$t('nftoriginal')"
            :original-file="newItem.val.originalFile"
            @change="files => (newItem.val.originalFile = files[0])"
          />
        </div>
      </div>

      <!-- NFT作品名称 -->
      <div class="option-item">
        <div class="option-item-header flex flex-align-center">
          <div class="label flex1">{{ $t('NFTName') }}</div>
          <div class="same flex flex-align-center">
            {{ $t('isSameNFTName') }}
            <ElSwitch :disabled="isCreated" v-model="isSame.name" />
          </div>
        </div>
        <div class="cont">
          <ElInput v-model="newItem.val.name" :placeholder="$t('nameplac')" />
          <div class="tips">
            {{ $t('sameNameTips') }} <br />
            <span>$index</span>&nbsp;{{ $t('sameNameTips2') }}<span>$total</span>&nbsp;{{
              $t('sameNameTips3')
            }}
            <br />
            {{ $t('sameNameTips4') }}
          </div>
        </div>
      </div>

      <!-- NFT作品描述 -->
      <div class="option-item">
        <div class="option-item-header flex flex-align-center">
          <div class="label flex1">{{ $t('NFTDrsc') }}</div>
          <div class="same flex flex-align-center">
            {{ $t('isSameNFTDrsc') }}
            <ElSwitch :disabled="isCreated" v-model="isSame.intro" />
          </div>
        </div>
        <div class="cont">
          <ElInput v-model="newItem.val.intro" type="textarea" :placeholder="$t('drscplac')" />
        </div>
      </div>

      <!-- 设置添加批量铸造的数量 -->
      <div class="option-item">
        <div class="option-item-header flex flex-align-center">
          <div class="label flex1">{{ $t('batchAddMany') }}</div>
          <div class="same flex flex-align-center">
            <ElInputNumber :min="1" v-model="newItem.val.count" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <ElButton size="large" class="flex1" @click="isShowOption = false">{{
        $t('cancel')
      }}</ElButton>
      <ElButton type="primary" size="large" class="flex1" @click="confirmAdd">{{
        $t('confirm')
      }}</ElButton>
    </div>
  </ElDialog>

  <ElDialog
    v-model="isShowResult"
    :title="$t('batchCreateIniting')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <div class="result">
      <div class="batch-create-tips">{{ $t('batchCreateTips') }}</div>
      <div class="result-msg">
        <div class="result-num">
          {{ $t('batchCreatNum') }}:<span>{{ list.length }}</span> {{ $t('indivual') }},
          {{ $t('beSuccess') }}:<span>{{ successNum }}</span>
          {{ $t('indivual') }}
        </div>
        <ElProgress
          :percentage="Math.ceil((successNum / list.length) * 100)"
          :stroke-width="30"
        ></ElProgress>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { Mutation, useStore } from '@/store'
import { ElLoading, ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ChooseSeriesModal from '@/components/ChooseSeriesModal/ChooseSeriesModal.vue'
import {
  checkSdkStatus,
  checkUserCanIssueNft,
  confirmToSendMetaData,
  isExistSha256,
} from '@/utils/util'
import PickerModel from '@/components/PickerModal/PickerModel.vue'
import InnerPageHeader from '@/components/InnerPageHeader/InnerPageHeader.vue'
import InputFile from '@/components/InputFile/InputFile.vue'
import InputImage from '@/components/InputImage/InputImage.vue'
import { TextAlign } from '@/enum'
import { v1 as uuid } from 'uuid'
import RightIcon from '@/assets/images/home_icon_ins.svg'

interface BactchListItem {
  id: string
  sameUuid: string // 判断是否全部内容一样
  cover: null | MetaFile
  originalFile: null | MetaFile
  name: string
  intro: string
  index: number
  classify: string[]
  codeHash?: string
  genesis?: string
  genesisTxId?: string
  sensibleId?: string
  tokenIndex?: string
  series?: string[]
  isShowClassifyModal: boolean
  isShowSeriesModal: boolean
}
const list: BactchListItem[] = reactive([])

interface NewItem {
  cover: null | MetaFile
  originalFile: null | MetaFile
  name: string
  intro: string
  classify: string[]
  series: string[]
  count: number
}
const initNewItem: NewItem = {
  cover: null,
  originalFile: null,
  name: '',
  intro: '',
  classify: [],
  series: [],
  count: 1,
}
const newItem: {
  val: NewItem
} = reactive({ val: { ...JSON.parse(JSON.stringify(initNewItem)) } })

const isSame = reactive({
  cover: false,
  originalFile: false,
  name: false,
  intro: false,
  classify: false,
  series: false,
})

const classify: string[] = reactive([])
const isShowClassifyModal = ref(false)
const router = useRouter()
const store = useStore()
const isShowSeriesModal = ref(false)
const selectedSeries: string[] = reactive([])
const i18n = useI18n()
const isShowResult = ref(false)
const isBreak = ref(false)
const isCreated = ref(false)

const paramsList: any[] = [] // 任务参数列表
const isShowOption = ref(false)

// 成功的数量
const successNum = computed(() => {
  let num = 0
  for (let i = 0; i < list.length; i++) {
    if (list[i].genesis && list[i].codeHash && list[i].tokenIndex) {
      num = num + 1
    } else {
      break
    }
  }
  return num
})

// 删除项
function removeItem(index: number) {
  const oldSeries = list[index].series
  list.splice(index, 1)

  // 更新后面项 的 index
  if (oldSeries.length > 0) {
    for (let i = index; i < list.length; i++) {
      if (list[i].series[0] === oldSeries[0]) {
        const currentIndex = getCurrentIndex(oldSeries[0], index)
        list[i].index = currentIndex
      }
    }
  }
}

// 开始批量铸造
async function startBacth() {
  if (list.length <= 0) return

  paramsList.length = 0
  isBreak.value = false
  // 檢查sdk狀態
  await checkSdkStatus()

  // 检查是否开放铸造
  const result = await checkUserCanIssueNft()
  if (!result) return

  const loading = ElLoading.service()

  try {
    let amount = 0 // 计算的价格
    let isReady = true // 是否可以铸造
    const amountUuids: { uuid: string; amount: number }[] = [] // 根据sameuuid存价格，相同内容时可以直接取，不用再去调用

    for (let i = 0; i < list.length; i++) {
      // 没有tokenIndex 的才事需要铸造的
      if (!list[i].tokenIndex) {
        if (!list[i].cover) {
          ElMessage.error(`${i + 1}: ${i18n.t('uploadcover')}`)
          isReady = false
          loading.close()
          break
        }

        if (!list[i].originalFile) {
          ElMessage.error(`${i + 1}: ${i18n.t('uploadTips')}`)
          isReady = false
          loading.close()
          break
        }

        if (list[i].name.replace(/\s*/g, '') === '') {
          ElMessage.error(`${i + 1}: ${i18n.t('nameplac')}`)
          isReady = false
          loading.close()
          break
        }

        if (list[i].intro === '') {
          ElMessage.error(`${i + 1}: ${i18n.t('drscplac')}`)
          isReady = false
          loading.close()
          break
        }

        if (list[i].classify.length <= 0) {
          ElMessage.error(i18n.t('choosetype'))
          isReady = false
          loading.close()
          break
        }

        const isImgSha256Exist = await Promise.all([
          isExistSha256(list[i].cover.sha256, store.state.userInfo.metaId),
          isExistSha256(list[i].originalFile.sha256, store.state.userInfo.metaId),
        ])
        const nfticon = isImgSha256Exist[0]
          ? `${isImgSha256Exist[0].txId}`
          : {
              fileType: list[i].cover.data_type,
              fileName: list[i].cover.name,
              data: list[i].cover.hexData,
            }
        const iconType = isImgSha256Exist[0] ? 'txId' : 'pic'
        const originalFileTxid = isImgSha256Exist[1]
          ? undefined
          : {
              fileType: list[i].originalFile.data_type,
              fileName: list[i].originalFile.name,
              data: list[i].originalFile.hexData,
            }
        const originalFileIsTxid = isImgSha256Exist[1] ? `${isImgSha256Exist[1].txId}` : undefined

        // 组装参数
        const params = {
          nfticon,
          iconType,
          receiverAddress: store.state.userInfo!.address, //  创建者接收地址
          nftname: list[i].name,
          nftdesc: list[i].intro,
          nftwebsite: '',
          nftissuerName: store.state.userInfo!.name,
          content: {
            originalFileTxid,
            originalFileIsTxid,
            nftType: '1',
            classifyList: JSON.stringify(list[i].classify),
            contentTxId: '',
          },
          codeHash: list[i].codeHash,
          genesis: list[i].genesis,
          genesisTxId: list[i].genesisTxId,
          sensibleId: list[i].sensibleId,
          isBatch: true,
        }

        paramsList.push({
          id: list[i].id,
          ...params,
        })

        /* 价格处理 */
        // 1.先根据sameUuid判断有没有相同内容的价格, 有就直接取来用， 没有就去checkOnly= true 计算价格
        const amountUuid = amountUuids.find(item => item.uuid === list[i].sameUuid)
        if (amountUuid) {
          amount += amountUuid.amount
        } else {
          const res = await store.state.sdk?.createNFT({
            checkOnly: true,
            ...params,
          })
          if (typeof res === 'number') {
            amount += res
            amountUuids.push({
              uuid: list[i].sameUuid,
              amount: res,
            })
          }
        }
      }
    }
    if (!isReady) return

    // 确认支付
    const isConfirm = await confirmToSendMetaData(amount)
    if (isConfirm) {
      isCreated.value = true
      loading.close()
      isShowResult.value = true

      for (let i = 0; i < paramsList.length; i++) {
        // 判断是否铸造成功，不成功要立刻停止，由于try catch 无法break for; 所以用一个参数去判断
        let isCreatedSuccess = false
        try {
          const { id, ...currentParams } = paramsList[i]
          const res = await store.state.sdk?.createNFT({
            ...currentParams,
          })
          if (res && typeof res !== 'number') {
            isCreatedSuccess = true
            const index = list.findIndex(item => item.id === id)
            list[index].codeHash = res.codehash
            list[index].genesis = res.genesisId
            list[index].tokenIndex = res.tokenIndex
            if (parseInt(res.tokenIndex) === list[index].index - 1) {
              // 如果是选择了系列，则需跟新对应系列数量
              if (list[i].series.length > 0) {
                store.commit(Mutation.UPDATESERIESNUM, { series: list[i].series[0] })
              }

              await store.state.sdk?.checkNftTxIdStatus(res.sendMoneyTx)
              /* 间隔一段时间 提高批量铸造稳定性 */
              // await sleepTime()
            } else {
              isBreak.value = true
              isShowResult.value = false
              ElMessage.error(i18n.t('tokenIndexNotMatch'))
              if (i === 2) new Error('error')
              else break
            }
          }
        } catch (error) {
          if (error) ElMessage.error(JSON.stringify(error))
          isShowResult.value = false
        }
        // 判断没有成功就 及时break 以防继续执行
        if (!isCreatedSuccess) {
          break
        }
      }
      isShowResult.value = false
      loading.close()
    }
  } catch (error) {
    loading.close()
    if (error) ElMessage.error(typeof error === 'string' ? error : JSON.stringify(error))
  }
}

// 初始化
async function resetBacth() {
  list.length = 0
  isCreated.value = false
}

const loading = ElLoading.service()
function getDatas() {
  if (store.getters.isCerted) {
    loading.close()
  } else {
    ElMessage.error(i18n.t('unAuth'))
    loading.close()
    router.push({ name: 'home' })
  }
}

function changeItemSeries(val: string[], item: BactchListItem) {
  const oldSeries = item.series
  item.series = val
  const currentSeriesItem: SeriesItem | undefined =
    val.length > 0
      ? store.state.series.find((_item: any) => _item.name === item.series[0])
      : undefined
  item.genesis = currentSeriesItem ? currentSeriesItem.genesis : undefined
  item.codeHash = currentSeriesItem ? currentSeriesItem.codeHash : undefined
  item.genesisTxId = currentSeriesItem ? currentSeriesItem.genesisTxId : undefined
  item.sensibleId = currentSeriesItem ? currentSeriesItem.sensibleId : undefined
  item.sameUuid = uuid()
  // 更行当前项 index
  const index = list.findIndex(_item => _item.id === item.id)
  const currentIndex = getCurrentIndex(val[0], index)
  item.index = currentIndex

  // 更新后面其他项 的index 包括旧的系列项 和 新的系列项
  for (let i = index + 1; i < list.length; i++) {
    // 更新旧的系列项
    if (
      (oldSeries.length > 0 && list[i].series[0] === oldSeries[0]) ||
      (val.length > 0 && val[0] === list[i].series[0])
    ) {
      const newCurrentIndex = getCurrentIndex(list[i].series[0], i)
      list[i].index = newCurrentIndex
    }
  }
}

function getCurrentIndex(series: string, stoplistIndex?: number) {
  // 选择了系列
  if (series) {
    const currentSeriesItem = store.state.series.find((item: SeriesItem) => item.name === series)
    // 过滤当前系列的列表
    const currentSeriesList = list.filter((item, index) => {
      if (
        item.genesis === currentSeriesItem.genesis &&
        item.codeHash === currentSeriesItem.codeHash &&
        item.genesisTxId === currentSeriesItem.genesisTxId &&
        item.sensibleId === currentSeriesItem.sensibleId
      ) {
        if (typeof stoplistIndex === 'number') {
          if (index < stoplistIndex) {
            return item
          }
        } else {
          return item
        }
      }
    })
    // 当前系列 > 0 ？ 获取最后一个即最大的 index + 1 : 否则系列当前数量 + 1
    if (currentSeriesList.length > 0) {
      return currentSeriesList[currentSeriesList.length - 1].index + 1
    } else {
      return currentSeriesItem.currentNumber + 1
    }
  } else {
    // 没有系列默认是1
    return 1
  }
}

function confirmAdd() {
  const loading = ElLoading.service()
  try {
    // debugger
    const { count, ...item } = newItem.val
    const currentSeriesItem: SeriesItem | undefined =
      item.series.length > 0
        ? store.state.series.find((_item: any) => _item.name === item.series[0])
        : undefined
    // 设置相同内容uuid， 如果所有内容有一样则有相同的uuid， 偏于计算价格
    let sameUuid: string | undefined
    if (
      isSame.classify &&
      isSame.cover &&
      isSame.intro &&
      isSame.name &&
      isSame.originalFile &&
      isSame.series
    )
      sameUuid = uuid()

    for (let i = 0; i < count; i++) {
      const currentItemIndex = getCurrentIndex(i === 0 || isSame.series ? item.series[0] : null)
      // 组装数据
      list.push({
        index: currentItemIndex,
        id: uuid(),
        sameUuid: sameUuid ? sameUuid : uuid(),
        genesis: currentSeriesItem ? currentSeriesItem.genesis : undefined,
        codeHash: currentSeriesItem ? currentSeriesItem.codeHash : undefined,
        genesisTxId: currentSeriesItem ? currentSeriesItem.genesisTxId : undefined,
        sensibleId: currentSeriesItem ? currentSeriesItem.sensibleId : undefined,
        cover: i === 0 || isSame.cover ? item.cover : null,
        originalFile: i === 0 || isSame.originalFile ? item.originalFile : null,
        name:
          i === 0 || isSame.name
            ? item.name
                .replaceAll('$index', currentItemIndex.toString())
                .replaceAll(
                  '$total',
                  currentSeriesItem ? currentSeriesItem.maxNumber.toString() : '1'
                )
            : '',
        intro: i === 0 || isSame.intro ? item.intro : '',
        classify: i === 0 || isSame.classify ? item.classify : [],
        isShowClassifyModal: false,
        isShowSeriesModal: false,
        series: i === 0 || isSame.series ? item.series : [],
      })
    }

    isShowOption.value = false
    newItem.val = { ...JSON.parse(JSON.stringify(initNewItem)) }

    // 把所有选项都初始化为 false
    for (let i in isSame) {
      // @ts-ignore
      isSame[i] = false
    }
    loading.close()
  } catch (error) {
    // debugger
    if (error) ElMessage.error(typeof error === 'string' ? error : JSON.stringify(error))
    loading.close()
  }
}

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

<style lang="scss" scoped src="./Create.scss"></style>
