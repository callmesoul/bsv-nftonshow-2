<template>
  <InnerPageHeader
    :title="$t('batchCreate')"
    :intro="$t('batchCreateDrsc')"
    :is-show-search="false"
  />

  <div class="batch-create container">
    <!-- 选择系列 -->
    <div class="section-header flex flex-align-center">
      <div class="select-series flex1 screen-item">
        <div class="input-item flex flex-align-center">
          <div class="select-warp flex flex-align-center">
            <div class="key flex1">{{ $t('chooseserices') }}</div>
            <div
              class="value"
              @click="isCreated ? (isShowSeriesModal = false) : (isShowSeriesModal = true)"
            >
              <span v-if="selectedSeries.length > 0">{{ selectedSeries[0] }}</span>
              <span v-else class="placeholder">{{ $t('choose') }}</span>
              <i class="el-icon-arrow-right"></i>
            </div>
            <ChooseSeriesModal
              :isShowSeriesModal="isShowSeriesModal"
              :selectedSeries="selectedSeries"
              @confirm="onSeriesConfirm"
              ref="root"
            />
          </div>
        </div>
      </div>
      <div class="screen-item flex1">
        <div
          class="input-item flex flex-align-center"
          @click="isSameClassify ? (isShowClassifyModal = true) : (isShowClassifyModal = false)"
        >
          <div class="select-warp flex flex-align-center">
            <div class="key flex1 flex flex-align-center" @click.stop="onChangeSameClassify">
              <span class="title">{{ $t('sameClassify') }}:</span>
              <ElSwitch v-model="isSameClassify" />
            </div>
            <div class="value">
              <span v-if="classify.length > 0">
                <template v-for="(_item, index) in classify" :key="_item">
                  {{ $t(_item) }}<template v-if="index !== classify.length - 1">,</template>
                </template>
              </span>
              <span v-else class="placeholder">{{ $t('choose') }}</span>
              <i class="el-icon-arrow-right"></i>
            </div>
            <PickerModel
              name="classify"
              listKey="classify"
              :title="$t('choosetype')"
              :multiple="true"
              disabled="disabled"
              :visible="isShowClassifyModal"
              @confirm="onSetAllClassify"
              :list="store.state.classifyList"
              :selecteds="classify"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 批量铸造列表 -->
    <div class="batch-create-list">
      <div
        class="batch-create-item"
        v-for="(item, index) in list"
        :key="index"
        :id="'batchItem' + index"
      >
        <div class="cover upload-warp">
          <div class="upload">
            <div class="add flex flex-align-center flex-pack-center">
              <template v-if="item.cover">
                <ElImage
                  class="cover"
                  fit="cover"
                  :src="item.cover.base64Data"
                  :preview-src-list="[item.cover.base64Data]"
                  :append-to-body="true"
                />
                <a class="close" @click="removeCover(index)">{{ $t('delete') }}</a>
              </template>
              <template v-else>
                <div>
                  <img class="icon" :src="UploadIcon" />
                  <div class="label">{{ $t('uploadcover') }}</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  :data-index="index"
                  @change="coverFileInputChage"
                />
              </template>
            </div>
          </div>
        </div>
        <div class="orginFile input-item">
          <input
            type="file"
            :placeholder="$t('nftoriginal')"
            :data-index="index"
            @change="originalFileInputChage"
            v-if="!item.genesis"
          />
          <div class="val" v-if="item.originalFile">{{ item.originalFile.raw?.name }}</div>
          <div class="placeholder" v-else>{{ $t('nftoriginal') }}</div>
        </div>
        <div class="name input-item">
          <input
            type="text"
            :readOnly="item.genesis"
            v-model="item.name"
            :placeholder="$t('nameplac')"
          />
        </div>
        <div class="intro input-item">
          <textarea
            v-model="item.intro"
            :readOnly="item.genesis"
            :placeholder="$t('drscplac')"
          ></textarea>
        </div>
        <div
          class="orginFile input-item"
          @click="
            isSameClassify || item.genesis
              ? (item.isShowClassifyModal = false)
              : (item.isShowClassifyModal = true)
          "
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
          />
        </div>
        <div class="index input-item" v-if="selectedSeries.length > 0">
          <input
            type="number"
            :readOnly="true"
            :disabled="true"
            v-model="item.index"
            :placeholder="$t('indexNumber')"
          />
        </div>
        <div class="btn btn-block btn-default" @click="removeItem(index)" v-if="!item.genesis">
          {{ $t('delete') }}
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
          v-else
        >
          {{ $t('lookDetail') }}
        </router-link>
      </div>
      <!-- 添加 -->
      <div class="batch-create-item" v-if="!isCreated">
        <div class="cover upload-warp">
          <div class="upload">
            <div class="add flex flex-align-center flex-pack-center">
              <template>
                <div>
                  <img class="icon" :src="UploadIcon" />
                  <div class="label">{{ $t('uploadcover') }}</div>
                </div>
                <input type="file" accept="image/*" />
              </template>
            </div>
          </div>
        </div>
        <div class="orginFile input-item">
          <div class="placeholder">{{ $t('nftoriginal') }}</div>
        </div>
        <div class="name input-item">
          <input type="text" :placeholder="$t('nameplac')" />
        </div>
        <div class="intro input-item">
          <textarea :placeholder="$t('drscplac')"></textarea>
        </div>
        <div class="orginFile input-item">
          <div class="placeholder">{{ $t('choosetype') }}</div>
        </div>
        <div class="index input-item" v-if="selectedSeries.length > 0">
          <input type="number" :readOnly="true" :disabled="true" />
        </div>
        <div class="btn btn-block btn-default">
          {{ $t('delete') }}
        </div>
        <div class="add flex flex-align-center flex-pack-center">
          <input v-model="createCount" />
        </div>
      </div>
    </div>

    <div class="btn btn-block" @click="resetBacth">
      {{ $t('resetBatchCreate') }}
    </div>
    <div class="btn btn-block" @click="startBacth">
      {{ isBreak ? $t('continue') : $t('startBatchCreate') }}
    </div>
  </div>

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
        <ElProgress :percentage="(successNum / list.length) * 100" :stroke-width="30"></ElProgress>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { CreateNft, NftApiCode } from '@/api'
import { useStore } from '@/store'
import { ElLoading, ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue-demi'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import ChooseSeriesModal from '@/components/ChooseSeriesModal/ChooseSeriesModal.vue'
import { checkSdkStatus, tranfromImgFile } from '@/utils/util'
import PickerModel from '@/components/PickerModal/PickerModel.vue'
import InnerPageHeader from '@/components/InnerPageHeader/InnerPageHeader.vue'
import UploadIcon from '@/assets/images/img_upload.svg?url'

const list: {
  cover: null | MetaFile
  originalFile: null | MetaFile
  name: string
  intro: string
  index: number
  isCreated: boolean
  classify: string[]
  isShowClassifyModal: boolean
  codehash?: string
  genesis?: string
  tokenIndex?: string
}[] = reactive([
  {
    cover: null,
    originalFile: null,
    index: 1,
    name: '',
    intro: '',
    isCreated: false,
    classify: [],
    isShowClassifyModal: false,
  },
])
const classify: string[] = reactive([])
const isSameClassify = ref(false)
const isShowClassifyModal = ref(false)
const router = useRouter()
const store = useStore()
const isShowSeriesModal = ref(false)
const selectedSeries: string[] = reactive([])
const i18n = useI18n()
const root = ref()
const isShowResult = ref(false)
const isBreak = ref(false)
const isCreated = ref(false)
const createCount = ref(1)
const currentIndex = ref(null)
const paramsList: any[] = []
// 成功的数量
const successNum = computed(() => {
  let num = 0
  for (let i = 0; i < list.length; i++) {
    if (list[i].genesis && list[i].codehash && list[i].tokenIndex) {
      num = num + 1
    } else {
      break
    }
  }
  return num
})

// 添加项
function addItem() {
  let index = 1
  if (selectedSeries.length > 0) {
    if (list.length > 0) {
      index = list[list.length - 1].index + 1
    } else {
      const seriesIndex = root.value.series.findIndex(
        (item: any) => item.series === selectedSeries[0]
      )
      if (seriesIndex !== -1) {
        index = root.value.series[seriesIndex].currentNumber + 1
      }
    }
  }
  list.push({
    cover: null,
    originalFile: null,
    name: '',
    intro: '',
    isCreated: false,
    classify: isSameClassify.value ? JSON.parse(JSON.stringify(classify)) : [],
    isShowClassifyModal: false,
    index,
  })
}

// 更改封面
async function coverFileInputChage(e: any) {
  const index = parseInt(e.currentTarget.dataset.index)
  const input = e.target as HTMLInputElement
  let files = input.files
  if (files) {
    const res = await tranfromImgFile(files[0])
    if (res) {
      list[index].cover = res
    }
  }
}

// 更改源文件
async function originalFileInputChage(e: any) {
  const index = parseInt(e.currentTarget.dataset.index)
  const input = e.target as HTMLInputElement
  let files = input.files
  if (files) {
    const res = await tranfromImgFile(files[0])
    if (res) {
      list[index].originalFile = res
    }
  }
}

// 删除封面
function removeCover(index: number) {
  list[index].cover = null
}

// 删除项
function removeItem(index: number) {
  if (index === list.length - 1 || selectedSeries.length <= 0) list.splice(index, 1)
  else {
    list.splice(index, 1)
    if (selectedSeries.length > 0) {
      const startNum =
        root.value.series.find((item: any) => item.series === selectedSeries[0]).currentNumber + 1
      for (let i = 0; i < list.length; i++) {
        list[i].index = startNum + i
      }
    }
  }
}

// 更改统一的分类
function onChangeSameClassify() {
  if (isSameClassify.value) {
    list.map(item => {
      item.classify = JSON.parse(JSON.stringify(classify))
      item.isShowClassifyModal = false
    })
  }
}

async function onSetAllClassify() {
  // 檢查sdk狀態
  await checkSdkStatus()
  isShowClassifyModal.value = false
  list.map(item => {
    item.classify = JSON.parse(JSON.stringify(classify))
    item.isShowClassifyModal = false
  })
}

// 确认选择系列
async function onSeriesConfirm() {
  // 檢查sdk狀態
  await checkSdkStatus()
  isShowSeriesModal.value = false
  if (selectedSeries.length > 0) {
    const item: SeriesItem = root.value.series.find(
      (item: any) => item.series === selectedSeries[0]
    )
    if (item) {
      for (let i = 0; i < list.length; i++) {
        list[i].index = item.currentNumber + 1 + i
      }
    }
  } else {
    for (let i = 0; i < list.length; i++) {
      list[i].index = 1
    }
  }
}

// 开始批量铸造
async function startBacth() {
  // 檢查sdk狀態
  await checkSdkStatus()
  if (list.length <= 0) return
  const loading = ElLoading.service()

  let currentSeriesItem: SeriesItem | undefined = undefined
  // 检查是否超出 系列数量
  if (selectedSeries.length > 0) {
    currentSeriesItem = root.value.series.find((item: any) => item.series === selectedSeries[0])
    if (currentSeriesItem && currentSeriesItem.maxNumber < createCount.value) {
      ElMessage.error(i18n.t('overSeriesNum'))
      loading.close()
      return
    }
  }

  let isReady = true
  let i = 0
  if (currentIndex.value !== null) {
    i = currentIndex.value
  }
  if (!isBreak.value) {
    for (let i = 1; i < createCount.value; i++) {
      list.push({ ...list[0], index: i + list[0].index })
    }
    for (; i < list.length; i++) {
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
      if (list[i].name === '') {
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

      paramsList.push({
        receiverAddress: store.state.userInfo!.address, //  创建者接收地址
        nftname: list[i].name,
        nftdesc: list[i].intro,
        nfticon: {
          fileType: list[i].cover!.data_type,
          fileName: list[i].cover!.name,
          data: list[i].cover!.hexData,
        },
        nftwebsite: '',
        nftissuerName: store.state.userInfo!.name,
        content: {
          nftType: '1',
          classifyList: JSON.stringify(list[i].classify),
          originalFileTxid: {
            fileType: list[i].originalFile!.data_type,
            fileName: list[i].originalFile!.name,
            data: list[i].originalFile!.hexData,
          },
          contentTxId: '',
        },
        codeHash: currentSeriesItem ? currentSeriesItem.codeHash : undefined,
        genesis: currentSeriesItem ? currentSeriesItem.genesis : undefined,
        genesisTxId: currentSeriesItem ? currentSeriesItem.genesisTxId : undefined,
        sensibleId: currentSeriesItem ? currentSeriesItem.sensibleId : undefined,
      })

      // checkOnlyTasks.push(
      //   store.state.sdk?.createNFT({
      //     checkOnly: true,
      //     ...params,
      //   })
      // )

      // tasks.push(store.state.sdk?.createNFT(params))
    }
  }

  if (!isReady) return
  //   checkOnly
  isCreated.value = true
  loading.close()
  isShowResult.value = true
  if (currentIndex.value !== null) {
    i = currentIndex.value
  } else {
    i = 0
  }
  for (; i < paramsList.length; i++) {
    try {
      const res = await store.state.sdk
        ?.createNFT({
          ...paramsList[i],
        })
        .catch(() => {
          isBreak.value = true
          ElMessage.error(i18n.t('onLineFail'))
          return
        })
      if (res && typeof res !== 'number') {
        // 上报 更新 系列信息
        const response = await CreateNft({
          nftName: paramsList[i].nftname,
          intro: paramsList[i].nftdesc,
          type: paramsList[i].content.nftType,
          seriesName: selectedSeries[0],
          tx: res.txId,
          classify: paramsList[i].content.classifyList,
          fileUrl: 'test',
          coverUrl: 'test',
          tokenId: res.codehash + res.genesisId + res.tokenIndex,
          nftId: res.txId,
          codeHash: res.codehash,
          genesis: res.genesisId,
          genesisTxId: res.genesisTxid,
          tokenIndex: res.tokenIndex,
        })
        if (response.code === NftApiCode.success) {
          list[i].codehash = res.codehash
          list[i].genesis = res.genesisId
          list[i].tokenIndex = res.tokenIndex
          ElMessage.success(
            `${selectedSeries.length > 0 ? list[i].index : list[i].name}: ${i18n.t(
              'castingsuccess'
            )}`
          )
          await store.state.sdk
            ?.checkNftTxIdStatus(res.sendMoneyTx)
            .catch(() => ElMessage.error(i18n.t('networkTimeout')))
        } else {
          isBreak.value = true
          isShowResult.value = false
          ElMessage.error(i18n.t('reportFail'))
          return
        }
      } else {
        isBreak.value = true
        isShowResult.value = false
        ElMessage.error(i18n.t('onLineFail'))
        return
      }
    } catch {
      isBreak.value = true
      isShowResult.value = false
      return
    }
    currentIndex.value = i + 1
  }
  paramsList.length = 0
  isBreak.value = false
  currentIndex.value = null
  isShowResult.value = false
}

// 初始化
async function resetBacth() {
  await root.value.getSeries()
  list.length = 0
  isCreated.value = false
}

if (store.state.userInfo) {
  setUserCreatCard()
} else {
  store.watch(
    state => state.userInfo,
    () => {
      if (store.state.userInfo) setUserCreatCard()
    }
  )
}

if (!store.state.nftToken) {
  store.watch(
    state => state.nftToken,
    () => {
      // debugger
      if (store.state.nftToken) root.value.getSeries()
    }
  )
}
</script>

<style lang="scss" scoped src="./BatchTest.scss"></style>
