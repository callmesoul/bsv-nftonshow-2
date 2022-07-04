<template>
  <ElSkeleton :loading="loading" animated>
    <template #template>
      <div class="index">
        <div class="index-banner">
          <div class="index-banner-warp flex flex-align-center">
            <div class="bootom-bg"></div>
            <div class="left-warp flex3">
              <div class="title"><ElSkeletonItem variant="p" /></div>
              <div class="drsc">
                <ElSkeletonItem variant="p" />
                <ElSkeletonItem variant="p" />
                <ElSkeletonItem variant="p" />
                <ElSkeletonItem variant="p" />
                <ElSkeletonItem variant="p" />
              </div>
              <router-link to=""><ElSkeletonItem variant="button"/></router-link>
            </div>
            <div class="right-warp flex2">
              <ElSkeletonItem variant="image" />
              <div class="cont flex flex-align-center">
                <ElSkeletonItem variant="circle" />
                <div class="flex1">
                  <div class="name"><ElSkeletonItem variant="text" /></div>
                  <div class="metaId"><ElSkeletonItem variant="text" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 热门专辑 🔥 -->
        <div class="moduel-item container">
          <div class="module-item-name"><ElSkeletonItem variant="text" /></div>
          <div class="module-item-cont">
            <div class="hot-topic-list">
              <ElSkeletonItem variant="rect" />
              <ElSkeletonItem variant="rect" />
              <ElSkeletonItem variant="rect" />
            </div>
          </div>
        </div>

        <!-- 最新专辑 🆕 -->
        <div class="moduel-item container">
          <div class="module-item-name"><ElSkeletonItem variant="text" /></div>
          <div class="module-item-cont">
            <div class="new-topic-list">
              <ElSkeletonItem variant="rect" />
              <ElSkeletonItem variant="rect" />
            </div>
          </div>
        </div>

        <!-- 最多点赞 👍 -->
        <div class="moduel-item container">
          <div class="module-item-name"><ElSkeletonItem variant="text" /></div>
          <div class="module-item-cont">
            <div class="like-topic-list">
              <ElSkeletonItem variant="rect" />
              <ElSkeletonItem variant="rect" />
              <ElSkeletonItem variant="rect" />
            </div>
          </div>
        </div>

        <!-- 前所未有的功能性NFT体验 -->
        <div class="moduel-item container">
          <div class="module-item-name"><ElSkeletonItem variant="text" /></div>
          <div class="module-item-cont">
            <div class="nft-intro-list">
              <ElSkeletonItem class="nft-intro-item" variant="rect" />
              <ElSkeletonItem class="nft-intro-item" variant="rect" />
              <ElSkeletonItem class="nft-intro-item" variant="rect" />
              <ElSkeletonItem class="nft-intro-item" variant="rect" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </ElSkeleton>
</template>

<script setup lang="ts">
interface Props {
  loading: boolean
}
const props = withDefaults(defineProps<Props>(), {})
</script>

<style lang="scss" scoped src="./IndexSkeleton.scss"></style>
