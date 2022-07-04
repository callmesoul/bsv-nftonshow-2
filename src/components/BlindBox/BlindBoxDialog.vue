<template>
  <ElDialog
    custom-class="blindBoxDialog"
    v-model="visible"
    @close="closeDialog"
    center
    :close-on-click-modal="false"
  >
    <template #title>
      <div class="blindBoxDialogTitle">
        <span>{{ $t('blindBoxDialogTitle') }}</span>
      </div>
    </template>
    <div class="blindBoxDialogBody flex">
      <div class="top flex">
        <span>{{ blindBoxOpenedResult.nftName }}</span>
      </div>
      <div class="blindboxImgWrap flex">
        <ElImage
          fit="contain"
          :src="metafileUrl(blindBoxOpenedResult.nftIcon)"
          :preview-src-list="[metafileUrl(blindBoxOpenedResult.nftIcon)]"
        />
      </div>
      <div class="issuerWrap flex">
        <div class="issuer">{{ $t('creater') }}:</div>
        <div class="author">
          <img
            src="@/assets/images/ava_mask.png"
            class="mask"
            v-if="blindBoxOpenedResult.nftIssueAvatarType === 'nft-metabot'"
          />
          <img
            class="avatar"
            :src="$filters.avatar(blindBoxOpenedResult.nftIssueMetaId)"
            :class="{
              hasmask: blindBoxOpenedResult.nftIssueAvatarType === 'nft-metabot',
            }"
          />
          <span class="username">{{ blindBoxOpenedResult.nftIssuer }}</span>
        </div>
      </div>
      <div class="contactAddress flex">
        <div class="left">{{ $t('contractaddr') }}：</div>
        <div class="right flex">
          <span>--</span>
          <!-- <a class="copy" >{{ $t('look') }}</a> -->
        </div>
      </div>
      <ElButton class="btn removeBlindBoxBtn" size="large" @click="removeMoreBlindBox">
        {{ blindBoxRestNum > 0 ? $t('goOnRemove') : $t('noMoreBox') }}
      </ElButton>
      <div class="amountTip flex">
        <span>{{
          blindBoxRestNum > 0 ? `剩余${blindBoxRestNum}个盲盒` : $t('noMoreBlindbox')
        }}</span>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import BlindBoxImg from '@/assets/images/blindBoxImg.png'
import { useStore } from '@/store'
import { onMounted, ref, watch, nextTick } from 'vue'
import { openMyBlindBox, NFTApiGetNFTDetail } from '@/api'
import { reactive } from '@vue/reactivity'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { metafileUrl } from '@/utils/util'

const emit = defineEmits(['blindBoxclose', 'goOnRemoveBlindBox', 'removeFail', 'removeNftList'])
interface Props {
  visible: boolean
  blindBoxRestNum: number
  blindBoxOpenedResult: NFTApiGetNFTDetailResDataItem
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
})
const store = useStore()
const i18n = useI18n()
// const blindBoxOpenedResult: { val: NFTApiGetNFTDetailResDataItem | null } = reactive({
//   val: null,
// })

// watch(
//   () => props.visible,
//   async () => {
//     if (props.visible) {
//       setTimeout(() => {
//         openBlindBox()
//       }, 1000)
//     }
//   }
// )
onMounted(() => {})

function closeDialog() {
  if (props.blindBoxRestNum <= 0) {
    emit('removeNftList')
  }
  emit('blindBoxclose')
}

function toWhatsonchain(txId: string) {
  window.open(`https://whatsonchain.com/tx/${txId}`)
}

function removeMoreBlindBox() {
  if (props.blindBoxRestNum <= 0) {
    return ElMessage.error(`${i18n.t('noMoreBlindbox')}`)
  } else {
    emit('goOnRemoveBlindBox')
  }
}
</script>

<style lang="scss" scoped src="./BlindBoxDialog.scss"></style>
