<template>
  <div class="create">
    <div class="create-header flex flex-align-center">
      <img class="icon" :src="CastingIcon" />
      <div class="title flex1 flex flex-align-center">
        <span class="flex1">{{ $t('createNft') }}</span>
        <a @click="changeCreateType">
          {{ createTypeIndex === 0 ? $t('createbytx') : $t('createbylocal') }}
          <i class="el-icon-arrow-right"></i>
        </a>
      </div>
    </div>
    <div class="cont-warp">
      <div class="tags" v-if="createTypeIndex !== 1">
        <template v-for="(type, index) in _nftTypes">
          <!-- <ElTooltip :effect="Effect.DARK" placement="top" v-if="type.disabled" :offset="-310">
            <template #content> {{ $t('stayTuned') }} </template>
            <a :class="{ active: type.value === nft.type }" @click="changeTag(index)">
              {{ $t(type.key) }}
            </a>
          </ElTooltip> -->
          <a v-if="type.disabled" @click="ElMessage.info($t('stayTuned'))">{{ $t(type.key) }}</a>
          <a
            v-else
            :class="{ active: type.value === nft.type, disabled: type.disabled }"
            @click="changeTag(index)"
            >{{ $t(type.key) }}</a
          >
        </template>
      </div>
      <div class="tips">
        <template v-if="createTypeIndex === 1">
          {{ $t('nftTxidTips') }}
          <br />
        </template>
        <template v-if="nft.type === '1'">
          {{ $t('nftImageDrsc') }}
          <br />
        </template>
        <template v-if="nft.type === '3'">
          {{ $t('nftCopyrightDrsc') }}
          <br />
          {{ $t('nftCopyrightDrsc2') }}
          <br />
        </template>
        {{ $t('createtips2') }}
        <br />
        {{ $t('createtips3') }}
      </div>
      <!-- txId 铸造 -->
      <div class="create-form-item" v-if="createTypeIndex === 1 || nft.type === '3'">
        <div class="title">TXID</div>
        <div class="cont">
          <div class="input-warp flex flex-align-center">
            <div class="input-value flex1">
              <input
                class="flex1"
                v-model="nft.tx"
                type="text"
                @blur="checkTxIdStatus"
                :placeholder="$t('txIdTips')"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- 源文件 铸造 -->
      <div class="create-form-item" v-else-if="createTypeIndex === 0 && nft.type !== '3'">
        <div class="title">{{ $t('nftoriginal') }}</div>
        <div class="cont">
          <div class="input-warp flex flex-align-center">
            <div class="input-value flex1">
              <span v-if="originalFile && originalFile.name !== ''">{{ originalFile?.name }}</span>
              <span class="placeholder" v-else>{{ $t('uploadTips') }}</span>
            </div>
            <img :src="UploadIcon" />
            <input class="flex1" accept="image/*" type="file" @change="originalFileInputChage" />
          </div>
        </div>
      </div>
      <!-- 封面图 -->
      <div class="create-form-item">
        <div class="title">{{ $t('nftbase') }}</div>
        <div class="cont">
          <div class="upload-warp">
            <div class="upload">
              <div class="add flex flex-align-center flex-pack-center">
                <template v-if="coverFile && coverFile.name !== ''">
                  <ElImage
                    class="cover"
                    fit="cover"
                    :src="coverFile.base64Data"
                    :preview-src-list="[coverFile.base64Data]"
                  />
                  <!-- <img class="cover" :src="coverFile.base64Data"  /> -->
                  <a class="close" @click="removeCover">{{ $t('delete') }}</a>
                </template>
                <template v-else>
                  <div>
                    <img class="icon" :src="ImgUploadIcon" />
                    <div class="label">{{ $t('uploadcover') }}</div>
                  </div>
                  <input type="file" accept="image/*" @change="coverFileInputChage" />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-item name">
        <input v-model="nft.nftName" type="text" :placeholder="$t('nameplac')" />
      </div>
      <div class="input-item drsc">
        <textarea v-model="nft.intro" :placeholder="$t('drscplac')"></textarea>
      </div>
      <div class="input-item type flex flex-align-center" @click="openClassifyModal">
        <div class="select-warp flex flex-align-center">
          <div class="key flex1">{{ $t('choosetype') }}</div>
          <div class="value">
            <template v-if="nft.classify.length > 0">
              <span class="classify" v-for="item in nft.classify" :key="item">{{ $t(item) }}</span>
            </template>
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
            @confirm="isShowClassifyModal = false"
            :list="store.state.classifyList"
            :selecteds="nft.classify"
            @change="val => (nft.classify = val)"
          />
        </div>
      </div>

      <!-- 系列 -->
      <div class="create-form-item seices">
        <div class="title flex flex-align-center">
          <span class="flex1">{{ $t('isserices') }}</span>
          <!-- <ElPopover
            placement="top-start"
            style="word-wrap: break-word; word-break: break-all"
            :width="200"
            :offset="-310"
            trigger="click"
            :content="$t('whatNftSeies')"
          >
            <template #reference>
              <a>{{ $t('whatserices') }}</a>
            </template>
          </ElPopover> -->
        </div>
        <div class="cont">
          <div class="input-item flex flex-align-center" @click="openSeriesModal">
            <div class="select-warp flex flex-align-center">
              <div class="key flex1">{{ $t('chooseserices') }}</div>
              <div class="value">
                <span v-if="selectedSeries.val.length > 0">{{ selectedSeries.val[0] }}</span>
                <span v-else class="placeholder">{{ $t('choose') }}</span>
                <i class="el-icon-arrow-right"></i>
              </div>
              <ChooseSeriesModal
                :isShowSeriesModal="isShowSeriesModal"
                :selectedSeries="selectedSeries.val"
                @confirm="isShowSeriesModal = false"
                @change="val => (selectedSeries.val = val)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="btn btn-block" @click="createNft">{{ $t('confirmcreate') }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage, ElLoading } from 'element-plus'
import {
  checkSdkStatus,
  checkUserCanIssueNft,
  confirmToSendMetaData,
  tranfromImgFile,
} from '@/utils/util'
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { GetTxData, NFTApiGetNFTDetail } from '@/api'
import { Mutation, useStore } from '@/store'
import { router } from '@/router'
import PickerModel from '@/components/PickerModal/PickerModel.vue'
import ChooseSeriesModal from '@/components/ChooseSeriesModal/ChooseSeriesModal.vue'
import { nftTypes } from '@/config'
import CastingIcon from '@/assets/images/icon_casting.svg?url'
import UploadIcon from '@/assets/images/file_upload.svg?url'
import ImgUploadIcon from '@/assets/images/img_upload.svg?url'

const _nftTypes = reactive(nftTypes)
const i18n = useI18n()
const store = useStore()

const nft = reactive({
  nftName: '',
  type: '1',
  fileUrl: '',
  coverUrl: '',
  intro: '',
  tx: '',
  classify: [],
})

const isShowClassifyModal = ref(false)

// 0: create by local 1:create by tx
const createTypeIndex = ref(0)
function changeCreateType() {
  createTypeIndex.value = createTypeIndex.value === 0 ? 1 : 0
}

let originalFile: MetaFile = reactive({
  base64Data: '',
  hexData: '',
  name: '',
  data_type: '',
  raw: null,
  sha256: '',
})
let coverFile: MetaFile = reactive({
  base64Data: '',
  hexData: '',
  name: '',
  data_type: '',
  raw: null,
  sha256: '',
})

async function originalFileInputChage(e: Event) {
  const input = e.target as HTMLInputElement
  let files = input.files
  if (files) {
    const res = await tranfromImgFile(files[0])
    if (res) {
      originalFile.name = res.name
      originalFile.base64Data = res.base64Data
      originalFile.hexData = res.hexData
      originalFile.raw = res.raw
      originalFile.data_type = res.data_type
    }
  }
}

async function coverFileInputChage(e: Event) {
  const input = e.target as HTMLInputElement
  let files = input.files
  if (files) {
    const res = await tranfromImgFile(files[0])
    if (res) {
      coverFile.name = res.name
      coverFile.raw = res.raw
      coverFile.base64Data = res.base64Data
      coverFile.hexData = res.hexData
      coverFile.data_type = res.data_type
    }
  }
}

//系列
const selectedSeries: { val: string[] } = reactive({ val: [] })
const isShowSeriesModal = ref(false)

function openSeriesModal() {
  isShowSeriesModal.value = true
  isShowClassifyModal.value = false
}

function openClassifyModal() {
  isShowClassifyModal.value = true
  isShowSeriesModal.value = false
}

function removeCover() {
  coverFile.name = ''
  coverFile.base64Data = ''
  coverFile.hexData = ''
  coverFile.name = ''
}

function changeTag(index: number) {
  if (createTypeIndex.value === 1) return
  const type = nftTypes[index]
  if (type.disabled) return
  const value = type.value
  if (nft.type === value) return
  nft.type = value
}

// 检测 txId 是否可以铸造
async function checkTxIdStatus() {
  const result = await checkTxId()
  if (result.status === TxIdStatus.NotCreate) {
    nft.tx = ''
    ElMessage.error(i18n.t('txidToNftFaile'))
  } else if (result.status === TxIdStatus.NotOwner) {
    nft.tx = ''
    ElMessage.error(i18n.t('txIdNotOwner'))
  } else if (result.status === TxIdStatus.NotRightTxId) {
    nft.tx = ''
    ElMessage.error(i18n.t('notRightTxId'))
  } else if (result.status === TxIdStatus.Success) {
    if (result.data) {
      // MetaFile
      if (result.data.parentNodeName === 'MetaFile') {
        nft.type = '1'
      } else if (result.data.parentNodeName === 'MetaAccessContent') {
        nft.type = '3'
        nft.nftName = result.data.data.title
        nft.intro = result.data.data.artMark
        coverFile = result.data.data.artCover
      } else {
        nft.tx = ''
        ElMessage.error(i18n.t('txidToNftFaile'))
      }
    }
  }
}

const enum TxIdStatus {
  NotCreate = 1,
  NotOwner = 2,
  Success = 3,
  NotRightTxId = 4,
}

async function checkTxId() {
  return new Promise<{
    status: TxIdStatus
    data?: any
  }>(async resolve => {
    const response = await GetTxData(nft.tx)
    if (response.code == 200 && response.result.data.length > 0) {
      const data = response.result.data[0]

      // check user owner
      if (data.rootTxId === store.state.userInfo?.metaId) {
        if (nft.type === '3' && createTypeIndex.value !== 1) {
          if (data.parentNodeName !== 'MetaAccessContent') {
            resolve({
              status: TxIdStatus.NotRightTxId,
              data,
            })
          } else {
            resolve({
              status: TxIdStatus.Success,
              data,
            })
          }
        } else {
          resolve({
            status: TxIdStatus.Success,
            data,
          })
        }
      } else {
        resolve({
          status: TxIdStatus.NotOwner,
          data,
        })
      }
    } else {
      resolve({
        status: TxIdStatus.NotCreate,
      })
    }
    /* const res = await GetTxStatus({
        txId: nft.tx,
      })
      if (res.code === NftApiCode.success) {
        
      } else {
        resolve({
          status: TxIdStatus.NotCreate
        })
      } */
  })
}

async function createNft() {
  // 檢查 sdk 狀態
  await checkSdkStatus()

  // 检查是否开放铸造
  const result = await checkUserCanIssueNft()
  if (!result) return

  // nft 类型
  if (nft.type === '') {
    ElMessage.warning(i18n.t('nftTypeTips'))
    return
  }

  if (createTypeIndex.value == 0) {
    // 源文件创建
    if (originalFile.name === '') {
      ElMessage.warning(i18n.t('uploadTips'))
      return
    }
  } else {
    // Tx 创建
    if (nft.tx === '') {
      ElMessage.warning(i18n.t('txIdTips'))
      return
    }
  }

  // 封面图
  if (coverFile.name === '') {
    ElMessage.warning(i18n.t('uploadcover'))
    return
  }

  // 名称
  if (nft.nftName.replace(/\s*/g, '') === '') {
    ElMessage.warning(i18n.t('nameplac'))
    return
  }

  // 描述
  if (nft.intro === '') {
    ElMessage.warning(i18n.t('drscplac'))
    return
  }

  // 分类
  if (nft.classify.length <= 0) {
    ElMessage.warning(i18n.t('chooseserices'))
    return
  }

  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })
  try {
    let seriesIndex = -1
    if (selectedSeries.val[0]) {
      seriesIndex = store.state.series.findIndex((item: any) => item.name === selectedSeries.val[0])
    }
    const params = {
      receiverAddress: store.state.userInfo!.address, //  创建者接收地址
      nftname: nft.nftName,
      nftdesc: nft.intro,
      nfticon: {
        fileType: coverFile.data_type,
        fileName: coverFile.name,
        data: coverFile.hexData,
      },
      nftwebsite: '',
      nftissuerName: store.state.userInfo!.name,
      content: {
        nftType: nft.type,
        classifyList: JSON.stringify(nft.classify),
        originalFileTxid: {
          fileType: originalFile.data_type,
          fileName: originalFile.name,
          data: originalFile.hexData,
        },
        contentTxId: nft.tx,
      },
      codeHash: seriesIndex !== -1 ? store.state.series[seriesIndex].codeHash : undefined,
      genesis: seriesIndex !== -1 ? store.state.series[seriesIndex].genesis : undefined,
      genesisTxId: seriesIndex !== -1 ? store.state.series[seriesIndex].genesisTxId : undefined,
      sensibleId: seriesIndex !== -1 ? store.state.series[seriesIndex].sensibleId : undefined,
    }
    console.log(params)
    const useAmount = await store.state.sdk?.createNFT({
      checkOnly: true,
      ...params,
    })
    console.log(useAmount, typeof useAmount)
    if (typeof useAmount === 'number') {
      console.log('popup')
      const result = await confirmToSendMetaData(useAmount)
      console.log('result', result)
      if (result) {
        // 余额足够且确认支付
        const res = await store.state.sdk?.createNFT(params)
        console.log('confirmed res', res)
        if (res && typeof res !== 'number') {
          if (selectedSeries.val[0] && seriesIndex !== -1) {
            store.commit(Mutation.UPDATESERIESNUM, { series: selectedSeries.val[0] })
          }
          // 循环获取到 nft 信息 才跳去成功页面
          await getNftDetailCycle({
            tokenIndex: res.tokenIndex,
            genesis: res.genesisId,
            codehash: res.codehash,
          })
          if (loading) loading.close()
          ElMessage.success(i18n.t('castingsuccess'))
          router.replace({
            name: 'nftSuccess',
            params: {
              genesisId: res.genesisId,
              tokenIndex: res.tokenIndex,
              codehash: res.codehash,
            },
            query: {
              type: 'created',
              txId: res.txId,
            },
          })

          /* if (loading) loading.close()
          ElMessage.success(i18n.t('castingsuccess'))
          router.replace({
            name: 'nftSuccess',
            params: {
              genesisId: res.genesisId,
              tokenIndex: res.tokenIndex,
              codehash: res.codehash,
            },
            query: {
              type: 'created',
              txId: res.txId,
            },
          }) */

          /* ElMessage.success(i18n.t('castingsuccess'))
        router.replace({ name: 'createSuccess', 
          params: { 
            genesisId: res.genesisId,
            tokenIndex: res.tokenIndex,
            codehash: res.codehash,
          }
        }) */

          // 上传源文件到阿里云
          // const originalFileForm = new FormData()
          // originalFileForm.append('file', originalFile.raw ? originalFile.raw : '')
          // const fileUrl = await Upload(originalFileForm)

          // 上传封面图到阿里云
          // const coverForm = new FormData()
          // coverForm.append('file', coverFile.raw ? coverFile.raw : '')
          // const coverUrl = await Upload(coverForm)

          /* const params = {
            nftName: nft.nftName,
            intro: nft.intro,
            type: nft.type,
            seriesName: selectedSeries[0],
            tx: res.txId,
            classify: nft.classify.join(','),
            fileUrl: 'test',
            coverUrl: 'test',
            tokenId: res.genesisId + res.tokenIndex,
            nftId: res.txId,
            codeHash: res.codehash,
            genesis: res.genesisId,
            genesisTxId: res.genesisTxid,
            tokenIndex: res.tokenIndex,
          }
          const response = await CreateNft(params)
          if (response.code === NftApiCode.success) {
            if (loading) loading.close()
            ElMessage.success(i18n.t('castingsuccess'))
            router.replace({
              name: 'nftSuccess',
              params: {
                genesisId: res.genesisId,
                tokenIndex: res.tokenIndex,
                codehash: res.codehash,
              },
              query: {
                type: 'created',
                txId: res.txId,
              },
            })
          } */
        }
      }
    }
  } catch (error) {
    // debugger
    if (loading) loading.close()
    if (error) ElMessage.error(typeof error === 'string' ? error : JSON.stringify(error))
    new Error(JSON.stringify(error))
  }
}

function getNftDetailCycle(
  params: { tokenIndex: string; codehash: string; genesis: string },
  curretNum = 0,
  parentResolve?: Function
) {
  return new Promise<void>(async resolve => {
    curretNum++
    try {
      const res = await NFTApiGetNFTDetail(params)
      if (res && res.code === 0 && res.data.results.items.length > 0) {
        if (parentResolve) parentResolve()
        else resolve()
      } else {
        new Error('get nft detail fail')
      }
    } catch (error) {
      if (curretNum < 10) {
        setTimeout(() => {
          getNftDetailCycle(params, curretNum, parentResolve ? parentResolve : resolve)
        }, 1000)
      } else {
        if (parentResolve) parentResolve()
        else resolve()
      }
    }
  })
}
</script>
<style lang="scss" scoped src="./Create.scss"></style>
