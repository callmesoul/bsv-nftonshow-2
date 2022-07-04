<template>
  <div class="closeWrap">
    <div class="top">
      <img :src="sandPayTitleIcon" alt="" />
      <span>{{ $t('sandPaySuccess') }}</span>
    </div>

    <div class="foot">
      <button @click="sendMsg">{{ $t('confrimSkip') }}</button>
      <span>{{ $t('skipDetail') }}{{ overTime }}{{ $t('overTimeClose') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import sandPayTitleIcon from '@/assets/images/sandPay_title.svg?url'
const skipToDetail = ref(null)
const overTime = ref(5)

onMounted(() => {
  skipToDetail.value = setInterval(() => {
    overTime.value--
    if (overTime.value <= 0) {
      clearInterval(skipToDetail.value)
      window.parent.postMessage('success', '*')
    }
  }, 1000)
})

function sendMsg() {
  window.parent.postMessage('success', '*')
}

onUnmounted(() => {
  clearInterval(skipToDetail.value)
})
</script>

<style lang="scss" scoped src="./callback.scss"></style>
