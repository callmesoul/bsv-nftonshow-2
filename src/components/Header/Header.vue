<template>
  <header class="flex flex-align-center" v-show="blackListRouter">
    <div class="header-left flex1 flex flex-align-center">
      <a class="menu" @click="isShowDrawer = true">
        <img :src="MenuIcon" alt="menu" />
      </a>
      <!-- 分割线 -->
      <span class="line"></span>
      <router-link to="/" class="logo flex flex-align-center">
        <img class="enImg" :src="LogoIconEn" alt="NFTOnShow" />
      </router-link>

      <div class="serach-warp">
        <ElInput
          v-model="keyword"
          class="w-50 m-2"
          size="large"
          :placeholder="$t('headerSerachPlac')"
          @keyup.enter="search"
        >
          <template #prefix>
            <img class="search-icon" :src="SearchIcon" />
          </template>
        </ElInput>
      </div>
    </div>

    <!-- PC 端 导航 -->
    <nav class="flex flex-align-center flex-pack-center">
      <template v-for="item in nav" :key="item.key">
        <template v-if="item.childrens">
          <ElDropdown trigger="click" @visible-change="val => (item.isShowChildren = val)">
            <a class="tools flex flex-align-center"
              >{{ typeof item.name === 'string' ? item.name : item.name() }}
              <img
                v-if="whiteList.includes(item.key)"
                :class="{ active: item.isShowChildren }"
                :src="NavIcon"
            /></a>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  @click="item.clickFunction ? item.clickFunction(_item) : toPage(_item.link)"
                  v-for="_item in item.childrens"
                  >{{
                    typeof _item.name === 'string' ? _item.name : _item.name()
                  }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </ElDropdown>
        </template>
        <template v-else>
          <router-link :to="item.link">{{
            typeof item.name === 'string' ? item.name : item.name()
          }}</router-link>
        </template>
      </template>
    </nav>

    <div class="operate flex flex-align-center">
      <!-- 登录按钮 -->
      <a
        v-if="!store.state.userInfo"
        class="btn"
        @click="auth"
        v-loading="store.state.userInfoLoading"
        element-loading-background="rgba(255, 255, 255, 0.7)"
        >{{ $t('signinandout') }}</a
      >

      <!-- 登录用户 -->
      <ElDropdown trigger="click" v-else>
        <div class="user-info flex flex-align-center">
          <UserAvatar
            bg="gray"
            class="avatar"
            :metaId="store.state.userInfo?.showId"
            :type="store.state.userInfo.avatarType"
            :disabled="true"
          />
          <!-- <div class="username">{{ store.state.userInfo?.name }}</div> -->
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toSelf">{{ $t('mynft') }}</el-dropdown-item>
            <el-dropdown-item @click="toWallet">{{ $t('mywallet') }}</el-dropdown-item>
            <el-dropdown-item @click="toMyAccount" v-if="false">{{
              $t('myAccount')
            }}</el-dropdown-item>
            <el-dropdown-item @click="isShowApps = true">{{ $t('appsTitle') }}</el-dropdown-item>
            <el-dropdown-item @click="logout">{{ $t('logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </ElDropdown>
    </div>
  </header>

  <!-- 移动端 导航 -->
  <ElDrawer modal-class="menu-drawer" v-model="isShowDrawer" direction="ttb">
    <div class="serach-warp">
      <ElInput
        v-model="keyword"
        class="w-50 m-2"
        size="large"
        :placeholder="$t('headerSerachPlac')"
        @keyup.enter="search"
      >
        <template #prefix>
          <img class="search-icon" :src="SearchIcon" />
        </template>
      </ElInput>
    </div>
    <ElMenu :unique-opened="true">
      <template v-for="item in nav" :key="item.key">
        <template v-if="item.childrens">
          <el-sub-menu :index="item.key">
            <template #title
              ><span>{{ typeof item.name === 'string' ? item.name : item.name() }}</span></template
            >
            <el-menu-item
              @click="item.clickFunction ? item.clickFunction(_item) : toPage(_item.link)"
              :index="_item.key"
              v-for="_item in item.childrens"
            >
              {{ typeof _item.name === 'string' ? _item.name : _item.name() }}
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.key" @click="toPage(item.link)">
            <span>{{ typeof item.name === 'string' ? item.name : item.name() }}</span>
          </el-menu-item>
        </template>
      </template>
    </ElMenu>
  </ElDrawer>

  <!-- 应用广场 -->
  <ElDialog v-model="isShowApps" custom-class="app-modal">
    <iframe :src="`/app/index?lang=${i18n.locale.value}`" frameborder="0" />
  </ElDialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import { useStore, Mutation, Action } from '@/store/index'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import MenuIcon from '@/assets/images/menu.svg?url'
import LogoIconEn from '@/assets/images/logo_nos.svg?url'
// import LogoIconCn from '@/assets/images/logo_nos_cn.svg?url'
import NavIcon from '@/assets/images/nav_icon_ins.svg?url'
import SearchIcon from '@/assets/images/search.svg?url'
import { UnitName } from '@/config'

import { GetBlindBoxSaleDetail } from '@/api'
const i18n = useI18n()
const env = import.meta.env
const store = useStore()
const route = useRoute()
const router = useRouter()
const isShowDrawer = ref(false)
const isShowToolsDropdown = ref(false)
const isShowApps = ref(false)
const keyword = ref('')

const isCert = computed(() => {
  if (store.state.userInfo) {
    return store.state.isCertedMetaIds.find(item => {
      return item === store.state.userInfo.metaId
    })
  } else return false
})
const whiteList = ['price', 'lang']
const blackListRouter = computed(() => {
  if (route.name === 'close') {
    return false
  } else return true
})
// const LogoIcon = computed(() => {
//   return i18n.locale.value === 'zh' ? LogoIconCn : LogoIconEn
// })

const prices = reactive([
  {
    name: 'BSV',
    key: 'bsv',
  },
  {
    name: 'CNY',
    key: 'cny',
  },
])
interface BaseNavItem {
  name: any
  link?: string
  key: string
  childrens?: BaseNavItem[]
}
interface NavItem extends BaseNavItem {
  isShowChildren?: boolean
  clickFunction?: Function
  childrens?: BaseNavItem[]
}
const classifyList: BaseNavItem[] = [
  {
    name: () => {
      return i18n.t('all')
    },
    key: 'all',
    link: `/list?type=all`,
  },
]

store.state.classifyList.map(item => {
  classifyList.push({
    name: () => {
      return i18n.t(item.classify)
    },
    key: item.classify,
    link: `/list?type=classify&val=${item.classify}`,
  })
})

const langs = []
for (let i = 0; i < i18n.availableLocales.length; i++) {
  langs.push({
    name: () => i18n.t(i18n.availableLocales[i]),
    key: i18n.availableLocales[i],
  })
}

// @ts-ignore
const nav: NavItem[] = reactive([
  {
    name: () => {
      return i18n.t('explore')
    },
    key: 'explore',
    isShowChildren: false,
    childrens: [
      {
        name: () => {
          return i18n.t('auction')
        },
        key: 'auction',
        link: '/auction',
      },
      ...classifyList,
    ],
  },
  {
    name: () => {
      return i18n.t('topic')
    },
    key: 'topic',
    link: '/collection',
  },
  {
    name: () => i18n.t('blindBox'),
    key: 'blindBox',
    isShowChildren: false,
    link: '/blindbox',
  },

  {
    name: () => i18n.t('countryFair'),
    key: 'countryFair',
    link: '/market',
  },
  {
    name: () => {
      return i18n.t('nftTools')
    },
    key: 'nftTools',
    isShowChildren: false,
    childrens: [
      {
        name: () => i18n.t('createnft'),
        key: 'createnft',
        link: '/create',
      },
      {
        name: i18n.t('batchCreate'),
        key: 'batchCreate',
        link: 'batchCreate',
      },
      {
        name: i18n.t('batchSale'),
        key: 'batchSale',
        link: 'batchSale',
      },
      {
        name: i18n.t('rightsList'),
        key: 'rightsList',
        link: '/right',
      },
    ],
  },
  {
    name: () => {
      return i18n.t('help')
    },
    key: 'help',
    // isShowChildren: false,
    childrens: [
      {
        name: i18n.t('tariffDescription '),
        key: 'tariffDescription ',
        link: '/fees',
      },
      {
        name: i18n.t('Royalty Instruction '),
        key: 'tariffDescription ',
        link: '/royaltyInstruction',
      },
      {
        name: i18n.t('termsOfUse'),
        key: 'termsOfUse',
        link: '/termsOfUse',
      },
      {
        name: i18n.t('certSystemIntro'),
        key: 'certSystemIntro',
        link: '/certification',
      },
    ],
  },

  {
    name: () => {
      return `${i18n.t(i18n.locale.value)}`
    },
    key: 'lang',
    isShowChildren: false,
    childrens: langs,
    clickFunction: (navItem: BaseNavItem) => {
      setLang(navItem.key)
      if (isShowDrawer.value) isShowDrawer.value = false
    },
  },
  {
    name: () => {
      return i18n.t('prices') + store.state.currentPrice
    },
    key: 'price',
    isShowChildren: false,
    childrens: prices,
    clickFunction: (navItem: BaseNavItem) => {
      store.commit(Mutation.CHANGEPRICES, navItem.name)
      window.localStorage.setItem('currentPrice', navItem.name)
      if (navItem.name === UnitName.RMB) {
        store.commit(Mutation.GETEXCHANGERATE, true)
      }
    },
  },
])

const metaId = computed(() => {
  return store.state.userInfo.showId || store.state.userInfo.metaId
})

// 跳转授权
function auth() {
  if (store.state.userInfoLoading) return
  if (store.state.hasExtension) {
    store.commit(Mutation.SETUSERINFOLOADING, true)
    return store.dispatch(Action.connectExt)
  }
  // 清楚缓存的信息，避免意外
  store.commit(Mutation.LOGOUT, undefined)
  let url = `${env.VITE_AuthUrl}/userLogin?response_type=code&client_id=${env.VITE_AppId}&redirect_uri=${env.VITE_Hosts}${env.VITE_RedirectPath}&scope=app&from=${env.VITE_Hosts}`
  // 添加邀请码
  const refCode = localStorage.getItem('refCode')
  if (refCode) url += `&refCode=${refCode}`
  window.location.href = url
}

// 退出登录
function logout() {
  store.commit(Mutation.LOGOUT, undefined)
  if (route.meta && route.meta.isAuth) {
    router.replace('/')
  }
}

// 设置语言
function setLang(lang: string) {
  // const lang = i18n.locale.value === 'en' ? 'zh' : 'en'
  i18n.locale.value = lang
  window.localStorage.setItem('lang', lang)
}
function toSelf() {
  router.push(`/self/${store.state.userInfo.metaId}`)
}
function toWallet() {
  window.open(import.meta.env.VITE_AuthUrl)
}

function toMyAccount() {
  router.push({ name: 'legalbalance' })
}

function toPage(path: string) {
  if (path.indexOf('/') !== -1) {
    router.push(path)
  } else {
    router.push({ name: path })
  }

  if (isShowDrawer.value) isShowDrawer.value = false
}

function search() {
  if (keyword.value === '') return
  router.push({
    name: 'list',
    query: {
      type: 'search',
      val: keyword.value,
    },
  })
}

function onToolsVisibleChange(value: boolean) {
  isShowToolsDropdown.value = value
}

onMounted(() => {
  if (window.Showmoney) {
    window.Showmoney.onLogout(logout)
  }
})
</script>

<style lang="scss" scoped src="./Header.scss"></style>
