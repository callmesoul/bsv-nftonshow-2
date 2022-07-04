<template>
  <div class="user-msg">
    <div class="bgImgWrap"></div>
    <div class="container">
      <div class="user-msg-warp flex flex-align-center flex-pack-center">
        <div class="flex-box">
          <div class="avatar">
            <ElSkeletonItem variant="circle" />
          </div>
          <div class="name  flex flex-align-center">
            <ElSkeletonItem variant="text" />
          </div>
          <div class="metaid flex flex-align-center">
            <ElSkeletonItem variant="text" />
          </div>
          <div class="userCenterDesc flex-v">
            <ElSkeletonItem variant="p" />
            <ElSkeletonItem variant="p" />
            <ElSkeletonItem variant="p" />
          </div>
          <div class="fansWrap">
            <ElSkeletonItem variant="p" />
          </div>
          <div class="userCenterOperator">
            <ElSkeletonItem variant="button" />
            <ElSkeletonItem variant="button" />
            <ElSkeletonItem variant="circle" />
          </div>
        </div>

        <!-- operate -->
        <div class="operate flex flex-align-center">
          <ElSkeletonItem variant="button" />
          <ElSkeletonItem variant="button" />
        </div>
      </div>
    </div>
  </div>

  <Tab :tabs="[]" class="tabs" :isSkeleton="true" />
</template>

<script setup lang="ts">
import Tab from '@/components/Tab/Tab.vue'
</script>

<style lang="scss" scoped src="./UserCenterSkeleton.scss"></style>
