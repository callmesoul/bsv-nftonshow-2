<template>
  <div class="legalBalanceWrap">
    <i class="el-icon-back" @click="back"></i>
    <div class="right">
      <div class="header">
        <span>{{ $t('myBalance') }}</span>
        <span>{{ $t('Withdrawal') }}</span>
      </div>
      <div class="balance">
        <span class="myLegalBalance">{{ $t('myBalance') }}(CNY)</span>
        <span class="amount">¥&nbsp;{{ legalAmount ? legalAmount * 0.01 : '--' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { getMyLegalAmount, getMyNftSaleBalance } from '@/api'
import { onMounted, ref } from 'vue'
import { store } from '@/store'
import Decimal from 'decimal.js-light'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const router = useRouter()
const legalAmount = ref(0)
const i18n = useI18n()
store.watch(
  () => store.state.userInfo,
  async newVal => {
    if (newVal.metaId) {
      getBalance()
    }
  }
)

onMounted(() => {
  getBalance()
})

async function getBalance() {
  if (store.state.userInfo?.metaId) {
    try {
      const result = await getMyLegalAmount({
        currency: 'CNY',
        metaid: store.state.userInfo.metaId,
      })
      if (result.code == 0) {
        legalAmount.value = new Decimal(result.data.amount).toNumber()
      }
    } catch {
      return ElMessage.error(`${i18n.t('getBalanceError')}`)
    }
  }
}

function back() {
  router.go(-1)
}
</script>

<style lang="scss" scoped src="./balance.scss"></style>
