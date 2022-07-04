<template>
  <ScreenWarp
    :cell-val="cellVal"
    :isSellTypeNotClose="true"
    :is-has-screen="false"
    :is-has-sort="false"
    @change-cell="val => (cellVal = val)"
    :active-name="screenActiveName"
    @active-name-change="val => (screenActiveName = val)"
  >
    <div class="user-series">
      <ElRow class="user-series-list" :gutter="20">
        <ElCol
          v-if="seriesList.length > 0"
          v-for="item in seriesList"
          :key="item.genesis + item.codehash"
          :xs="cells.find(item => item.val === cellVal).xs"
          :sm="cells.find(item => item.val === cellVal).sm"
          :md="cells.find(item => item.val === cellVal).md"
          :lg="cells.find(item => item.val === cellVal).lg"
          :xl="cells.find(item => item.val === cellVal).xl"
        >
          <div class="user-series-item">
            <div class="cover">
              <img :src="$filters.metafile(item.icon)" />
            </div>
            <div class="cont">
              <div class="name flex flex-align-center">
                <span></span>
                <!-- <img src="@/assets/images/icon_cer_nft.png" /> -->
              </div>
              <div class="drsc">
                {{ item }}
              </div>
              <div class="nft-list">
                <a
                  v-for="(nft, index) in item.nftList.filter((item, index) => index <= 3)"
                  :key="index"
                >
                  <img :src="$filters.metafile(nft.icon)" :title="nft.name" :alt="nft.name" />
                </a>
              </div>
            </div>
          </div>
        </ElCol>
        <!-- null -->
        <IsNull class="flex1" v-else />
      </ElRow>
      <LoadMore
        class="flex1"
        :pagination="pagination"
        @getMore="getMore"
        v-if="seriesList.length > 0"
      />
    </div>
  </ScreenWarp>
</template>

<script setup lang="ts">
import { GetUserSeries } from '@/api'
import { store } from '@/store'
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import ScreenWarp from '@/components/ScreenWarp/ScreenWarp.vue'
import LoadMore from '@/components/LoadMore/LoadMore.vue'
import IsNull from '@/components/IsNull/IsNull.vue'

const screenActiveName = reactive([])
const seriesList: GetUserSeriesResDataItem[] = reactive([])
const cellVal = ref(1)
const cells = [
  { val: 1, xs: 24, sm: 12, md: 8, lg: 8, xl: 6 },
  { val: 2, xs: 12, sm: 8, md: 6, lg: 6, xl: 4 },
]
const route = useRoute()
const pagination: Pagination = {
  ...store.state.pagination,
}
function getSeries(isCover = false) {
  return new Promise(async resolve => {
    const res = await GetUserSeries({
      ...pagination,
      metaId: route.params.metaId,
    })
    if (isCover) {
      seriesList.length = 0
    }
    seriesList.push(...res.data.results.items)
    const totalPage = Math.ceil(res.data.total / pagination.pageSize)
    if (totalPage <= pagination.page) pagination.nothing = true
  })
}

function getMore() {
  if (pagination.loading || pagination.nothing) return
  pagination.loading = true
  pagination.page++
  getSeries().then(() => {
    pagination.loading = false
  })
}

getSeries()
</script>

<style lang="scss" scoped src="./Series.scss"></style>
