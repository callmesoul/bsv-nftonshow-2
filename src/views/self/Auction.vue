<template>
  <div class="self-auction">
    <AuctionListVue :isUser="true" />
  </div>
</template>

<script setup lang="ts">
import AuctionListVue from '@/components/Auction/AuctionList.vue'
</script>

<style lang="scss" scoped src="./Auction.scss"></style>
