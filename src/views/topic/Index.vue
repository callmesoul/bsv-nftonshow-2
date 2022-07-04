<template>
  <InnerPageHeader
    :title="$t('topic')"
    :intro="$t('topicTips')"
    :isShowSearch="false"
    :keyword="keyword"
    @search="search"
  />

  <div class="topic-list container">
    <div
      @click="toDetail(topic.key, topic.createMetaId)"
      class="hot-topic-item"
      v-for="topic in store.state.topics"
      :key="topic.key"
    >
      <div class="cover">
        <img :src="$filters.getI18nContent(topic, 'coverPicUrl')" :alt="topic.name" />
      </div>
      <div class="cont">
        <div class="user">
          <UserAvatar :metaId="topic.createMetaId" :type="''" @click.stop></UserAvatar>
          <div
            class="name flex flex-align-center flex-pack-center"
            @click.stop="$filters.toUser(topic.createMetaId)"
          >
            <span class="">{{ topic.createName }}</span
            ><img :src="CertIcon" />
          </div>
          <div class="metaId" @click.stop="$filters.toUser(topic.createMetaId)">
            MetaID:{{ topic.createMetaId.slice(0, 6) }}
          </div>
        </div>
        <div class="genesis">
          <div class="name">{{ topic.name }}</div>
          <div class="intro">
            {{ topic.info ? topic.info[i18n.locale.value] : '' }}
          </div>
          <div class="flex flex-pack-center">
            <router-link :to="topic.url"
              ><ElButton type="primary" size="large">{{ $t('look') }}</ElButton></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-- <LoadMoreVue :pagination="pagination" @getMore="getMore" /> -->

    <!-- <div
      :to="{ name: 'topicDetail' }"
      class="topic-item"
      v-for="topic in store.state.topics"
      :key="topic.key"
      @click="toDetail(topic.key, topic.createMetaId)"
    >
      <img class="cover" :src="$filters.getI18nContent(topic, 'coverPicUrl')" />
      <div class="title">{{ topic.name }}</div>
      <div class="msg flex flex-align-center">
        <div class="creater flex1 flex flex-align-center">
          {{ $t('eventParty') }}:<UserAvatar
            :metaId="topic.createMetaId"
            :type="topic.CreateAvatarType"
          />{{ topic.createName }}
        </div>
        <div class="time">{{ $filters.dateTimeFormat(topic.timestamp, 'YYYY-MM-DD') }}</div>
      </div>
    </div> -->

    <!-- <div
      class="topic-item"
      key="shengdan"
      @click="
        toDetail('shengdan', 'f071580414e3a6ce87952b7b7cc66c7c4f35709ff1edd66b88fa1a308c14d6d7')
      "
      v-if="isShowGrayTopic"
    >
      <img
        class="cover"
        src="http://filecdn.showpay.top/nos/topic/Webot%202022%20Revenue%20NFT%20Sale.png"
      />
      <div class="title">shengdan</div>
      <div class="msg flex flex-align-center">
        <div class="creater flex1 flex flex-align-center">
          {{ $t('eventParty') }}:<UserAvatar
            metaId="f071580414e3a6ce87952b7b7cc66c7c4f35709ff1edd66b88fa1a308c14d6d7"
          />
          soul
        </div>
        <div class="time">2021-05-05</div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import InnerPageHeader from '@/components/InnerPageHeader/InnerPageHeader.vue'
import { ref } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStore,Mutation } from '@/store'
import { computed, reactive } from 'vue'
import { getTopics } from '@/api'
import LoadMoreVue from '@/components/LoadMore/LoadMore.vue'
import CertIcon from '@/assets/images/icon_cer.svg?url'
import { UnitName } from '@/config'

const keyword = ref('')
const router = useRouter()
const i18n = useI18n()
const store = useStore()
const mode = import.meta.env.MODE

const pagination: Pagination = reactive({
  ...store.state.pagination,
  pageSize: 16,
})
const collections: Topic[] = reactive([])

function search() {}

const isShowGrayTopic = computed(() => {
  let result = false
  const metaIds = [
    '9bb6bf6aab238912d16018b4ba0cdea4b49ac50c0c319ca7b42dc2649bf76c4c',
    '6fea074ef3faeabc0211624c47d6ff0fb95693e14cfa861a35c029b88177c7e7',
    'c90c06b66c4c155b0ee0ba18c5d075df53d4fd5ad37c1cd2c05ef03f18c57af2',
    'd87608e93f84982acacd186b9aee65c837baf9923186bf5f984a4ad776edcb81',
    'e9ab42667c5f5a6a1e7d45ed023f8961ee6950bba8a771d68732c8fb460a7aae',
  ]
  if (
    store.state.userInfo &&
    metaIds.findIndex(item => item === store.state.userInfo.metaId) !== -1
  ) {
    result = true
  }
  return mode === 'gray' || result
})

function toDetail(key: string, metaId: string) {
  
  router.push({ name: 'topicDetail', params: { key, metaId } })
}

function getCollects(isCover = false) {
  return new Promise<void>(async resolve => {
    const res = await getTopics(pagination)
    if (res.code === 0) {
      if (isCover) collections.length = 0
      collections.push(...res.data.result)

      const totalPages = Math.ceil(res.data.total / pagination.pageSize)
      if (totalPages <= pagination.page) pagination.nothing = true
    }
    resolve()
  })
}

function getMore() {
  pagination.page++
  getCollects()
}

// getCollects()
</script>

<style lang="scss" scoped src="./Index.scss"></style>
