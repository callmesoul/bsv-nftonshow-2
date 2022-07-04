<template>
  <div class="is-null">
    <img :src="NullIcon" />
    <div class="tips">
      {{ $t('null') }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import NullIcon from '@/assets/images/null.svg?url'
</script>
<style lang="scss" scoped src="./IsNull.scss"></style>
