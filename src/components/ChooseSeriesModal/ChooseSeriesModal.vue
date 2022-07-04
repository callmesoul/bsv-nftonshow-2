<template>
  <PickerModel
    name="name"
    listKey="name"
    :title="$t('chooseserices')"
    :visible="isShowSeriesModal"
    @confirm="emit('confirm')"
    :list="store.state.series"
    :selecteds="selectedSeries"
    :disabled="disabledFunction"
    @change="selecteds => emit('change', selecteds)"
  >
    <template v-slot:item="{ item }">
      <span
        >{{ item.currentNumber }}/{{ item.maxNumber }}
        <a class="delete" @click.stop="removeSeries(item)">{{ $t('delete') }}</a></span
      >
    </template>
    <template v-slot:topRight>
      <a class="create-series-btn" @click="isShowCreateSeriesModal = true">
        {{ $t('createSerie') }}
      </a>
    </template>
  </PickerModel>

  <!-- 创建系列 -->
  <ElDialog v-model="isShowCreateSeriesModal">
    <div class="create-series">
      <div class="title">{{ $t('createSerieProd') }}</div>
      <div class="drsc">{{ $t('createSerieTips') }}</div>
      <input type="text" v-model="serie.name" :placeholder="$t('createSeriesNamePlar')" />
      <input
        type="number"
        v-model="serie.number"
        min="0"
        :placeholder="$t('createSeriesNumberPlar')"
      />
      <div class="btn btn-block" @click="createSerie">{{ $t('create') }}</div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { GetSeries, NftApiCode } from '@/api'
import PickerModel from '@/components/PickerModal/PickerModel.vue'
import { Mutation, useStore } from '@/store'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['confirm', 'change'])
const props = defineProps<{
  isShowSeriesModal: boolean
  selectedSeries: string[]
}>()

const store = useStore()
const i18n = useI18n()
const serie = reactive({
  name: '',
  number: '',
})
const isShowCreateSeriesModal = ref(false)
const disabledFunction = (item: SeriesItem) => item.maxNumber <= item.currentNumber
let key = ''
let isHasGetOldSeriesKey = ''

//  创建系列
async function createSerie() {
  if (serie.name === '') {
    ElMessage.error(i18n.t('createSeriesNamePlar'))
    return
  }
  if (!serie.number) {
    ElMessage.error(i18n.t('createSeriesNumberPlar'))
    return
  }
  const index = store.state.series.findIndex(item => item.name === serie.name)
  if (index !== -1) {
    ElMessage.error(i18n.t('havedSameNameSeries'))
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
    const response = await store.state.sdk?.genesisNFT({
      seriesName: serie.name,
      nftTotal: serie.number,
    })
    if (response && response.code === 200) {
      store.commit(Mutation.ADDSERIES, {
        name: serie.name,
        maxNumber: parseInt(serie.number),
        codeHash: response.data.codehash,
        genesis: response.data.genesisId,
        genesisTxId: response.data.genesisTxid,
        sensibleId: response.data.sensibleId,
        metaId: store.state.userInfo.metaId,
        currentNumber: 0,
      })
      ElMessage.success(i18n.t('createdSuccess'))
      serie.name = ''
      serie.number = ''
      isShowCreateSeriesModal.value = false
      loading.close()
    }
  } catch (error) {
    loading.close()
    if (error) ElMessage.error(typeof error === 'string' ? error : JSON.stringify(error))
  }
}

async function removeSeries(seriesItem: SeriesItem) {
  ElMessageBox.confirm(`${i18n.t('deleteMessage')} ${seriesItem.name} ?`, i18n.t('niceWarning'), {
    confirmButtonText: i18n.t('confirm'),
    cancelButtonText: i18n.t('cancel'),
  }).then(() => {
    store.commit(Mutation.REMOVESERIES, seriesItem.name)
  })
}
</script>

<style lang="scss" scoped src="./ChooseSeriesModal.scss"></style>
