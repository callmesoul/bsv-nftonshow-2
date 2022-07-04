<template>
  <div class="inner-page-header container flex flex-align-center">
    <div class="inner-page-header-left flex1">
      <div class="title flex flex-align-center">
        <div class="flex1 flex flex-align-center">
          <img @click="router.back()" :src="BannetIcon" v-if="isHasBackIcon" />
          <span>{{ title }}</span>
        </div>
        <slot name="right"></slot>
      </div>
      <div class="drsc">{{ intro }} <slot name="intro"></slot></div>
    </div>
    <div class="search-warp flex flex-align-center" v-if="isShowSearch">
      <input
        class="flex1"
        v-model="keyword"
        :placeholder="$t('search')"
        @keyup.enter="search"
        type="text"
      />
      <img :src="SearchIcon" @click="search" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BannetIcon from '@/assets/images/bannet_icon_ins.svg?url'
import SearchIcon from '@/assets/images/icon_search.svg?url'

const emit = defineEmits(['search']) // 定义事件
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  intro: {
    type: String,
    default: '',
  },
  keyword: {
    type: String,
    default: '',
  },
  isHasBackIcon: {
    type: Boolean,
    default: true,
  },
  isShowSearch: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()

function search() {
  emit('search', props.keyword)
}
</script>

<style lang="scss" scoped src="./InnerPageHeader.scss"></style>
