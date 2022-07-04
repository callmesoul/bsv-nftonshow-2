<template>
  <ElDialog
    custom-class="sendNftDialog"
    v-model="visible"
    @close="closeDialog"
    center
    :append-to-body="true"
    :close-on-click-modal="false"
  >
    <template #title>
      <div class="sendNftDialogTitle">
        <span>{{ homePage ? $t('sendNftTitle') : $t('senderNftConfrime') }}</span>
      </div>
    </template>
    <div class="sendNftWrap">
      <div class="home" v-if="homePage">
        <div class="ImgWrap flex">
          <ElImage
            fit="contain"
            :src="metafileUrl(nft.cover)"
            :preview-src-list="[metafileUrl(nft.cover)]"
          />
          <span>{{ nft.name }}</span>
        </div>
        <div class="operate">
          <ElInput
            type="text"
            class="flex1"
            v-model="receviceAddress"
            :placeholder="$t('receviceAddress')"
          />
          <ElButton
            :loading="getMetaIdLoaing"
            @click.stop="getNftReceiverInfo"
            :disabled="btnDiabled"
            :class="[btnDiabled ? 'btnGray' : '']"
            size="large"
          >
            {{ $t('sendNft') }}
          </ElButton>
        </div>
      </div>
      <div class="sendDetail" v-else>
        <div class="top">
          <div class="left">
            <ElImage
              fit="contain"
              :src="metafileUrl(nft.cover)"
              :preview-src-list="[metafileUrl(nft.cover)]"
            />
          </div>
          <div class="right">
            <span class="nftName">{{ nft.name }}</span>
            <div class="issuerInfo">
              <UserAvatar :metaId="nft.issueMetaId" :type="nft.issueAvatarType"></UserAvatar>
              <div class="issuer">
                <span>{{ nft.issueName }}</span>
                <span>{{ $t('issue') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="center">
          <div class="sender">
            <span>{{ $t('sender') }}</span>
            <div class="receviceInfo">
              <div class="left">
                <UserAvatar
                  :metaId="receiverInfo.val?.metaId"
                  :type="receiverInfo.val?.avatarType"
                ></UserAvatar>
              </div>
              <div class="right">
                <span>{{ receiverInfo.val?.name }}</span>
                <span >MetaID:{{ receiverInfo.val?.metaId?.slice(0, 6) }}</span>
              </div>
            </div>
          </div>
          <div class="recevice">
            <span>{{ $t('receviceInfo') }}</span>
            <span>{{ receviceAddress }}</span>
          </div>
        </div>
        <div class="foot">
          <ElButton @click.stop="confrimSendNft" size="large">
            {{ $t('sendNftConfrim') }}
          </ElButton>
        </div>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { metafileUrl } from '@/utils/util'
import { getMetaIdByAddress, GetUserInfoSimple, getPayMailAddress } from '@/api'
import { reactive } from '@vue/reactivity'
import { ElMessage, ElLoading } from 'element-plus'
import { useStore } from '@/store'
const emit = defineEmits(['nftDialogClose', 'removeNft'])
interface Props {
  visible: boolean
  nft: NFTListItem
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
})
const receviceAddress = ref('')
const receiverInfo: { val: Partial<UserSimpleInfo> | null } = reactive({
  val: null,
})
const i18n = useI18n()
const homePage = ref(true)
const store = useStore()
const getMetaIdLoaing = ref(false)
const btnDiabled = computed(() => {
  if (receviceAddress.value) {
    return false
  } else return true
})
watch(
  () => props.visible,
  () => {
    if (props.visible) {
      homePage.value = true
      receviceAddress.value = ''
    }
  }
)

function closeDialog() {
  emit('nftDialogClose')
}

async function confrimSendNft() {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })
  try {
    const res = await store.state.sdk.transferNFT({
      receiverAddress: receviceAddress.value,
      tokenIndex: props.nft.tokenIndex,
      codehash: props.nft.codehash,
      genesisId: props.nft.genesis,
      genesisTxid: props.nft.genesisTxId,
      checkOnly: true,
    })
    if (res.code === 200) {
      loading.close()
      ElMessage.success(`${i18n.t('sendNfrSucc')}`)
      emit('removeNft')
      emit('nftDialogClose')
    } else {
      loading.close()
      ElMessage.error(`${i18n.t('sendNfrFail')}`)
    }
  } catch {
    loading.close()
    // ElMessage.error(`${i18n.t('sendNfrFail')}`)
  }
}

async function getNftReceiverInfo() {
  const paymaiReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  let isPaymail = paymaiReg.test(receviceAddress.value)
  let paymailToAddress
  try {
    getMetaIdLoaing.value = true
    if (isPaymail) {
      const address = await getPayMailAddress({
        Email: receviceAddress.value,
      })
      if (address.code == 0) {
        paymailToAddress = address.data
      }
    }
    const result = await getMetaIdByAddress(isPaymail ? paymailToAddress : receviceAddress.value)
    if (result.code == 0) {
      const res = await GetUserInfoSimple({
        metaId: result.data,
      })
      if (res.code == 0) {
        receiverInfo.val = res.data
        getMetaIdLoaing.value = false
        homePage.value = false
      } else {
        
        getMetaIdLoaing.value = false
        homePage.value = false
       
      }
    } else {
      getMetaIdLoaing.value = false
      homePage.value = false
      
    }
  } catch {
    
    getMetaIdLoaing.value = false
    homePage.value = false
    
  }
}
</script>

<style lang="scss" scoped src="./SendNft.scss"></style>
