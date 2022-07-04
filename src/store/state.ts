import i18n from '@/utils/i18n'
import Sdk from '@/utils/sdk'

declare global {
  interface Window {
    Showmoney?: any
    appMetaIdJs?: any
    appMetaIdJsV2?: any
  }
}

const UA = window.navigator.userAgent.toLowerCase()
const isAndroid = UA && UA.indexOf('android') > 0 ? true : false
const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) ? true : false

export interface State {
  debug: boolean
  version: string
  isInitialized: boolean
  count: number
  token: null | Token
  userInfo: null | UserInfo
  userInfoLoading: boolean
  sdk: null | Sdk
  sdkInitIng: boolean
  isApp: boolean
  hasExtension: boolean
  pagination: Pagination
  nftToken: null | string
  userDiscount: number
  isCertedMetaIds: string[]
  isSetedSystemConfig: boolean
  banners: Banner[]
  topics: Topic[]
  isAndroid: boolean
  isIOS: boolean
  classifyList: Classify[]
  marketClassifyList: Classify[]
  headImgData: any
  myFollowList: MyFollowList
  series: SeriesItem[]
  currentPrice: string
  exchangeRate: ExchangeRate | null
  blindboxLimitedTime: number
}

// @ts-ignore
const appMetaIdJs: null | MetaIdJs = window?.appMetaIdJsV2
  ? window?.appMetaIdJsV2
  : window?.appMetaIdJs
  ? window?.appMetaIdJs
  : null
const hasExtension = !!window.Showmoney

const versionString = import.meta.env.MODE === 'development' ? _APP_VERSION + '-dev' : _APP_VERSION
const tokenString = localStorage.getItem('token')
const token = tokenString ? JSON.parse(tokenString) : null

export const state: State = {
  debug: import.meta.env.MODE === 'development',
  version: versionString,
  isInitialized: false,
  count: 0,
  token,
  userInfo: null,
  userInfoLoading: false,
  sdkInitIng: false,
  hasExtension: !!window.Showmoney,
  // @ts-ignore
  isApp: window?.appMetaIdJsV2 || window?.appMetaIdJs ? true : false,
  // @ts-ignore
  sdk: window.appMetaIdJsV2 || window.appMetaIdJs || window.Showmoney ? new Sdk() : null,
  // 分页参数
  pagination: {
    page: 1,
    pageSize: 12,
    loading: false,
    nothing: false,
  },
  nftToken: null,
  userDiscount: 1,
  isCertedMetaIds: [],
  isSetedSystemConfig: false,
  banners: [],
  topics: [],
  isAndroid,
  isIOS,
  classifyList: [
    { classify: 'rights', disabled: true },
    { classify: 'art' },
    { classify: 'music', disabled: true },
    { classify: 'game' },
    { classify: 'avatar', disabled: true },
    {
      classify: 'card',
      disabled: true,
    },
    {
      classify: 'article',
      disabled: true,
    },
    {
      classify: 'emoji',
      disabled: true,
      name: i18n.global.t('emoji'),
    },
    {
      classify: 'background',
      disabled: true,
      name: i18n.global.t('background'),
    },
  ],
  marketClassifyList: [
    { classify: 'rights', disabled: true },
    { classify: 'art' },
    { classify: 'music' },
    { classify: 'game' },
    {
      classify: 'article',
    },
    {
      classify: 'emoji',
      name: i18n.global.t('emoji'),
    },
    {
      classify: 'background',
      name: i18n.global.t('background'),
    },
  ],
  headImgData: null,
  myFollowList: null,
  series: [],
  currentPrice: 'BSV',
  exchangeRate: null,
  blindboxLimitedTime: 0,
}
