<template>
  <IndexSkeletonVue :loading="isSkeleton">
    <div class="index">
      <!-- banner -->
      <div class="index-banner-out-warp">
        <Swiper
          :modules="[Autoplay]"
          :autoplay="{ delay: 5000 }"
          :loop="true"
          class="hot-topic-list"
        >
          <SwiperSlide v-for="(banner, index) in banners" :key="index">
            <div class="index-banner ">
              <img class="bg" :src="banner[i18n.locale.value].picUrl" />
              <div class="index-banner-warp">
                <div class="container flex flex-align-center">
                  <div class="bootom-bg"></div>
                  <div class="left-warp flex1">
                    <div class="title">{{ banner[i18n.locale.value].title }}</div>
                    <div class="drsc">
                      {{ banner[i18n.locale.value].content }}
                    </div>
                    <!-- 拍卖 倒计时 -->
                    <a @click="toPage(banner[i18n.locale.value].url)"
                      ><ElButton class="collcetionBtn" type="primary">
                        <template
                          v-if="
                            banner[i18n.locale.value].limitTime &&
                              banner[i18n.locale.value].title !== bannerWhiteList
                          "
                        >
                          {{ $t('Comingsoon') }}
                          <VueCountdown
                            class="countdown"
                            :time="banner[i18n.locale.value].limitTime - new Date().getTime()"
                            :transform="transformSlotProps"
                            v-slot="{ days, hours, minutes, seconds }"
                            @end="() => (banner[i18n.locale.value].limitTime = 0)"
                          >
                            <span class="dot"></span
                            ><span
                              >{{ parseInt(hours) + parseInt(days) * 24 }}:{{ minutes }}:{{
                                seconds
                              }}</span
                            >
                          </VueCountdown>
                        </template>
                        <template v-else>{{ $t('lookTopic') }}</template>
                      </ElButton>
                    </a>
                    <a
                      class="metabotavatarLink"
                      v-if="banner[i18n.locale.value].title === bannerWhiteList"
                      @click="buyBlindBox(buyBlindBoxUrl)"
                      ><ElButton type="primary">
                        <template v-if="banner[i18n.locale.value].limitTime">
                          {{ $t('buyblindboxTimeOver') }}
                          <VueCountdown
                            class="countdown"
                            :time="banner[i18n.locale.value].limitTime - new Date().getTime()"
                            :transform="transformSlotProps"
                            v-slot="{ days, hours, minutes, seconds }"
                            @end="() => (banner[i18n.locale.value].limitTime = 0)"
                          >
                            <span class="dot"></span
                            ><span
                              >{{ parseInt(hours) + parseInt(days) * 24 }}:{{ minutes }}:{{
                                seconds
                              }}</span
                            >
                          </VueCountdown>
                        </template>
                        <template v-else>{{ $t('buyBox') }}</template>
                      </ElButton>
                    </a>
                    <a
                      class="metabotAvatarCompose"
                      @click.stop="toCompose"
                      v-if="banner[i18n.locale.value].title === metabotAvatarWhiteList"
                      ><ElButton type="primary">
                        {{ $t('toCompose') }}
                      </ElButton>
                    </a>
                  </div>
                  <div class="right-warp">
                    <a @click="toPage(banner[i18n.locale.value].url)">
                      <div class="cover">
                        <img :src="banner[i18n.locale.value].picUrl" />
                      </div>
                    </a>

                    <div class="cont flex flex-align-center">
                      <div class="avatar">
                        <UserAvatar
                          :metaId="banner[i18n.locale.value].issuerMetaId"
                          :type="banner[i18n.locale.value].issuerAvatarType"
                        ></UserAvatar>
                      </div>
                      <div class="flex1">
                        <div class="name">{{ banner[i18n.locale.value].issuerName }}</div>
                        <div class="metaId">
                          MetaID:{{ banner[i18n.locale.value].issuerMetaId.slice(0, 6) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- 热门专辑 🔥 -->
      <div class="moduel-item container">
        <div class="module-item-name">{{ $t('hotTopic') }} 🔥</div>
        <div class="module-item-cont">
          <div class="swiper-warp">
            <Swiper
              :modules="[Navigation, Pagination]"
              :pagination="{ clickable: true }"
              :navigation="{
                prevEl: '.swiper-button-left-hot',
                nextEl: '.swiper-button-right-hot',
              }"
              :slidesPerView="hotTopicSlidesPerView"
              :spaceBetween="10"
              :loop="true"
              class="hot-topic-list"
            >
              <SwiperSlide v-for="(item, index) in hotTopics" :key="index">
                <div
                  @click="toPage(item[i18n.locale.value].url)"
                  :to="item[i18n.locale.value].url"
                  class="hot-topic-item"
                >
                  <div class="cover">
                    <img
                      :src="item[i18n.locale.value].albumPicUrl"
                      :alt="item[i18n.locale.value].albumTitle"
                    />
                  </div>
                  <div class="cont">
                    <div class="user">
                      <UserAvatar
                        :class="{
                          border: item[i18n.locale.value].issuerAvatarType !== 'nft-metabot',
                        }"
                        :metaId="item[i18n.locale.value].issuerMetaId"
                        :type="item[i18n.locale.value].issuerAvatarType"
                        @click.stop
                      ></UserAvatar>
                      <div
                        class="name flex flex-align-center flex-pack-center"
                        @click.stop="$filters.toUser(item[i18n.locale.value].issuerMetaId)"
                      >
                        <span class="">{{ item[i18n.locale.value].issuerName }}</span
                        ><img :src="CertIcon" />
                      </div>
                      <div
                        class="metaId"
                        @click.stop="$filters.toUser(item[i18n.locale.value].issuerMetaId)"
                      >
                        MetaID:{{ item[i18n.locale.value].issuerMetaId.slice(0, 6) }}
                      </div>
                    </div>
                    <div class="genesis">
                      <div class="name">{{ item[i18n.locale.value].albumTitle }}</div>
                      <div class="intro">
                        {{ item[i18n.locale.value].albumContent }}
                      </div>
                      <div class="flex flex-pack-center">
                        <router-link :to="item[i18n.locale.value].url"
                          ><ElButton type="primary" size="large">{{
                            $t('look')
                          }}</ElButton></router-link
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <a class="swiper-button-left swiper-button-left-hot"><img :src="RightIcon"/></a>
            <a class="swiper-button-right swiper-button-right-hot"><img :src="RightIcon"/></a>
          </div>
        </div>
      </div>

      <!-- 最新专辑 🆕 -->
      <div class="moduel-item container">
        <div class="module-item-name">{{ $t('newTopic') }} 🆕</div>
        <div class="module-item-cont">
          <div class="swiper-warp">
            <Swiper
              :modules="[Navigation, Pagination]"
              :pagination="{ clickable: true }"
              :navigation="{
                prevEl: '.swiper-button-left-new',
                nextEl: '.swiper-button-right-new',
              }"
              :slidesPerView="2"
              :spaceBetween="12"
              :loop="true"
              class="new-topic-list"
            >
              <SwiperSlide v-for="(item, index) in tempNewTopicList" :key="index">
                <div class="new-topic-item" @click="toPage(item[i18n.locale.value].url)">
                  <div class="top flex flex-align-center">
                    <div class="user flex1 flex flex-align-center">
                      <UserAvatar
                        :metaId="item[i18n.locale.value].issuerMetaId"
                        :type="item[i18n.locale.value].issuerAvatarType"
                        @click.stop
                      ></UserAvatar>
                      <div class="cont">
                        <div
                          class="name flex flex-align-center"
                          @click.stop="$filters.toUser(item[i18n.locale.value].issuerMetaId)"
                        >
                          <span class="">{{ item[i18n.locale.value].issuerName }}</span>
                          <img :src="CertIcon" />
                        </div>
                        <div
                          class="metaId"
                          @click.stop="$filters.toUser(item[i18n.locale.value].issuerMetaId)"
                        >
                          MetaID: {{ item[i18n.locale.value].issuerMetaId.slice(0, 6) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="statiscs-list flex flex-align-center">
                    <div class="statiscs-item flex1">
                      <div class="number">{{ item[i18n.locale.value].totalSupply }}</div>
                      <div class="label">{{ $t('issueNumber') }}</div>
                    </div>
                    <div class="statiscs-item flex1">
                      <div class="number">{{ item[i18n.locale.value].ownerTotal }}</div>
                      <div class="label">{{ $t('haveder') }}</div>
                    </div>
                    <div class="statiscs-item flex1">
                      <div class="number flex flex-align-center flex-pack-center">
                        <template v-if="item[i18n.locale.value].issuePrice">
                          <span v-if="store.getters.getterCurrentPrice === unitName.RMB"
                            >¥&nbsp;</span
                          >
                          {{ item[i18n.locale.value].issueCurrentPrice }}
                          <img
                            :src="BsvIcon"
                            v-if="store.getters.getterCurrentPrice === unitName.BSV"
                          />
                        </template>
                        <template v-else>--</template>
                      </div>
                      <div class="label">{{ $t('startPrice') }}</div>
                    </div>
                    <div class="statiscs-item flex1">
                      <div class="number flex flex-align-center flex-pack-center">
                        <template v-if="item[i18n.locale.value].floorPrice">
                          <span v-if="store.getters.getterCurrentPrice === unitName.RMB"
                            >¥&nbsp;</span
                          >
                          {{ item[i18n.locale.value].floorCurrentPrice }}
                          <img
                            :src="BsvIcon"
                            v-if="store.getters.getterCurrentPrice === unitName.BSV"
                          />
                        </template>
                        <template v-else>--</template>
                      </div>
                      <div class="label">{{ $t('floorPrice') }}</div>
                    </div>
                  </div>
                  <div class="list">
                    <div
                      class="item"
                      v-for="nft in item[i18n.locale.value].nftList"
                      @click.stop="toDetail(nft.genesis, nft.codehash, nft.tokenIndex)"
                    >
                      <div
                        :to="{
                          name: 'detail',
                          params: {
                            genesisId: nft.genesis,
                            codehash: nft.codehash,
                            tokenIndex: nft.tokenIndex,
                          },
                        }"
                        class="item-warp"
                      >
                        <img
                          :src="$filters.metafile(nft.icon, 200)"
                          :alt="nft.name"
                          :title="nft.name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <a class="swiper-button-left swiper-button-left-new"><img :src="RightIcon"/></a>
            <a class="swiper-button-right swiper-button-right-new"><img :src="RightIcon"/></a>
          </div>
        </div>
      </div>

      <!-- 最多点赞 👍 -->
      <div class="moduel-item container">
        <div class="module-item-name">{{ $t('moreLike') }} 👍</div>
        <div class="module-item-cont">
          <div class="swiper-warp">
            <Swiper
              :modules="[Navigation, Pagination]"
              :pagination="{ clickable: true }"
              :navigation="{
                prevEl: '.swiper-button-left-like',
                nextEl: '.swiper-button-right-like',
              }"
              :slidesPerView="hotTopicSlidesPerView"
              :spaceBetween="12"
              :loop="true"
              class="like-topic-list"
            >
              <SwiperSlide v-for="(item, index) in hotNFTs" :key="index">
                <a
                  class="like-topic-item"
                  @click="toDetail(item.genesis, item.codehash, item.tokenIndex)"
                >
                  <div class="cover">
                    <img :src="$filters.metafile(item.icon, 400)" />
                  </div>
                  <div class="cont">
                    <div class="user flex flex-align-center">
                      <UserAvatar
                        @click.stop
                        :metaId="item.issuerMetaId"
                        :type="item.issuerAvatarType"
                      ></UserAvatar>
                      <div class="content">
                        <div
                          class="name flex flex-align-center"
                          @click.stop="$filters.toUser(item.issuerMetaId)"
                        >
                          <span class="">{{ item.issuerName }} </span><img :src="CertIcon" />
                        </div>
                        <div class="metaId" @click.stop="$filters.toUser(item.issuerMetaId)">
                          MetaID: {{ item.issuerMetaId.slice(0, 6) }}
                        </div>
                      </div>
                    </div>
                    <div class="msg flex flex-align-center">
                      <div class="name flex1">{{ item.name }}</div>
                      <div class="like">{{ item.likeCount }} 点赞</div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            </Swiper>
            <a class="swiper-button-left swiper-button-left-like"><img :src="RightIcon"/></a>
            <a class="swiper-button-right swiper-button-right-like"><img :src="RightIcon"/></a>
          </div>
        </div>
      </div>

      <!-- 前所未有的功能性NFT体验 -->
      <div class="moduel-item container">
        <div class="module-item-name">{{ $t('nftModuleTitle') }}</div>
        <div class="module-item-cont">
          <div class="nft-intro-list">
            <div class="nft-intro-item">
              <div class="nft-intro-item-warp flex flex-align-center">
                <img :src="Img2Icon" class="cover" />
                <div class="cont flex1">
                  <div class="name">{{ $t('nftModuleName1') }}</div>
                  <div class="drsc">{{ $t('nftModuleDrsc1') }}</div>
                </div>
              </div>
            </div>
            <div class="nft-intro-item">
              <div class="nft-intro-item-warp flex flex-align-center">
                <img :src="Img1Icon" class="cover" />
                <div class="cont flex1">
                  <div class="name">{{ $t('nftModuleName2') }}</div>
                  <div class="drsc">{{ $t('nftModuleDrsc2') }}</div>
                </div>
              </div>
            </div>
            <div class="nft-intro-item">
              <div class="nft-intro-item-warp flex flex-align-center">
                <img :src="Img4Icon" class="cover" />
                <div class="cont flex1">
                  <div class="name">{{ $t('nftModuleName3') }}</div>
                  <div class="drsc">{{ $t('nftModuleDrsc3') }}</div>
                </div>
              </div>
            </div>
            <div class="nft-intro-item">
              <div class="nft-intro-item-warp flex flex-align-center">
                <img :src="Img3Icon" class="cover" />
                <div class="cont flex1">
                  <div class="name">{{ $t('nftModuleName4') }}</div>
                  <div class="drsc">{{ $t('nftModuleDrsc4') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </IndexSkeletonVue>
</template>

<script setup lang="ts">
import { Navigation, Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { GetMarketBanners, GetMarketHotNTFs, GetMarketHotTopics, GetMarketNewTopics } from '@/api'
import { reactive, ref, watch, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import IndexSkeletonVue from './IndexSkeleton.vue'
import VueCountdown from '@chenfengyuan/vue-countdown'
import CertIcon from '@/assets/images/icon_cer.svg?url'
import RightIcon from '@/assets/images/home_icon_ins.svg?url'
import BsvIcon from '@/assets/images/logo_bsv.svg?url'
import Img1Icon from '@/assets/images/img_1.svg?url'
import Img2Icon from '@/assets/images/img_2.svg?url'
import Img3Icon from '@/assets/images/img_3.svg?url'
import Img4Icon from '@/assets/images/img_4.svg?url'
import { useStore, Mutation } from '@/store/index'
import { UnitName } from '@/config'
import { converterPrice, converterBSV, converterCNY } from '@/utils/filters'
const i18n = useI18n()
const router = useRouter()
const store = useStore()
const hotTopicSlidesPerView = window.document.documentElement.clientWidth >= 750 ? 3 : 2
const banners: GetMarketBannersResDataItem[] = reactive([])
const hotTopics: GetMarketHotTopicsResDataItem[] = reactive([])
const hotNFTs: GetMarketHotNTFsResDataItem[] = reactive([])
const newTopics: GetMarketNewTopicsResDataItem[] = reactive([])
const isSkeleton = ref(true)
const unitName = computed(() => {
  return UnitName
})
const bannerWhiteList = ref('MetaBot Avatar')
const metabotAvatarWhiteList = ref('创世MetaBot Avatar')
const buyBlindBoxUrl = ref('/blindbox/detail')
const tempNewTopicList = computed(() => {
  if (store.state.currentPrice === UnitName.BSV) {
    newTopics.map(item => {
      item[i18n.locale.value].issueCurrentPrice = converterBSV(item[i18n.locale.value].issuePrice)
      item[i18n.locale.value].floorCurrentPrice = converterBSV(item[i18n.locale.value].floorPrice)
    })
  } else {
    newTopics.map(item => {
      item[i18n.locale.value].issueCurrentPrice = converterCNY(item[i18n.locale.value].issuePrice)
      item[i18n.locale.value].floorCurrentPrice = converterCNY(item[i18n.locale.value].floorPrice)
    })
  }
  return newTopics
})
// const issuePrice = ref('0')
// const floorPrice = ref('0')

// watch(()=>store.state.currentPrice,(newVal,oldVal)=>{
//   if(newVal !== oldVal){
//     nextTick(()=>{
//      issuePrice.value= converterPrice(props.item?.amount)
//     })
//   }
// })

function toCompose() {
  if (store.state.isApp) {
    window.open(`${import.meta.env.VITE_MetabotAvatarCompose}`, '_self')
  } else {
    window.open(`${import.meta.env.VITE_MetabotAvatarCompose}`, '_blank')
  }
}

function toDetail(genesis: string, codehash: string, tokenIndex: string) {
  // debugger
  router.push({
    name: 'detail',
    params: {
      genesisId: genesis,
      codehash: codehash,
      tokenIndex: tokenIndex,
    },
  })
}

function getDatas() {
  return new Promise<void>(async reslove => {
    const res = await Promise.all([
      GetMarketBanners(),
      GetMarketHotTopics(),
      GetMarketHotNTFs(),
      GetMarketNewTopics(),
    ])
    if (res) {
      console.log('xzxzx222asasa', res)
      if (res[0].code === 0) {
        banners.push(...res[0].data.result)
        res[0].data.result.map(item => {
          if (item[i18n.locale.value].title === 'MetaBot Avatar') {
            store.commit(Mutation.GetLimitedTime, item[i18n.locale.value].limitTime)
          }
        })
      }
      if (res[1].code === 0) {
        hotTopics.push(...res[1].data.result)
      }
      if (res[2].code === 0) {
        hotNFTs.push(...res[2].data.result)
      }
      if (res[3].code === 0) {
        console.log('xzxz222asas', res[3].data.result)
        newTopics.push(...res[3].data.result)
      }
    }
    isSkeleton.value = false
    reslove()
  })
}

function buyBlindBox(url: string) {
  router.push(url)
}

function toPage(path: string) {
  if (path.indexOf('https') !== -1 || path.indexOf('http') !== -1) {
    window.open(path, '_blank')
  } else {
    if (path === '/blindbox/detail') {
      path =
        '/collection/detail/MetaBotAvatar/974e2977d5c9446f7f48fd82c9ea51f82749b9ef7c00d26b73bc450d167d5f31'
    }
    router.push(path)
  }
}

function transformSlotProps(props: any) {
  const formattedProps = {}
  Object.entries(props).forEach(([key, value]) => {
    // @ts-ignore
    formattedProps[key] = value < 10 ? `0${value}` : String(value)
  })
  return formattedProps
}

async function makeTx() {
  const res = await store.state.sdk.makeTx([
    { amount: 2000, address: '12bNpA9cxmbDPy86sNZtr2QS4McuE7Jqdz' },
  ])
  // debugger
}

getDatas()
</script>

<style lang="scss" scoped src="./Index.scss"></style>
