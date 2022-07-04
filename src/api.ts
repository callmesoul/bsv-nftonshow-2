import HttpRequest from '@/utils/request'
// @ts-ignore
import qs from 'qs'
import {
  OrderType,
  SortType,
  legalOrderType,
  legalSortType,
  legalSellType,
  PayPlatform,
} from './enum'
import { Platform } from './utils/sdk'
import { store } from './store'
import { MetaIdJsRes } from './typings/sdk'
import { isWinterOlympicSeries } from './utils/util'

const env = import.meta.env

export enum NftApiCode {
  success = 0,
}
const sdkApi = new HttpRequest('https://api.showmoney.app').request
const legalApi = new HttpRequest(env.VITE_LegalApi).request
const apiHttp = new HttpRequest(env.VITE_WalletApi).request
const rightHttp = new HttpRequest(env.VITE_ToolApi).request
const nftHttp = new HttpRequest(env.VITE_NftApi, {
  token: () => store.state.nftToken,
  type: () => (store.state.isApp ? '0' : '2'),
  metaId: () => store.state.userInfo?.metaId,
}).request
// const nftHttp = new HttpRequest('').request
const auctionHttp = new HttpRequest(env.VITE_ShowBotApi).request
// const auctionHttp = new HttpRequest('http://192.168.168.118').request
const aggregation = new HttpRequest(env.VITE_AggregationBaseUrl, {
  SiteConfigMetanetId: '123456789',
}).request
const Sensible = new HttpRequest('https://api.sensiblequery.showpay.top').request

const Legal = new HttpRequest(`${env.VITE_WalletApi}/legal-currency`).request

export const GetToken = (params: object) => {
  return apiHttp.post('/showmoney/oauth2/oauth/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    transformRequest: [
      function(data: object) {
        return qs.stringify(data)
      },
    ],
  })
}

export const GetMetaSvSign = (params: { path: string }): Promise<GetMetaSvSignRes> => {
  return apiHttp.post('/metasv-signature/signature', { ...params, NotHeader: true })
}
export const QueryFindMetaData = (params: string) => {
  return apiHttp.get(`/v2showMANDB/api/v1/query/queryFindMetaData/${params}`)
}

export const QueryFindMetaDataForPost = (params: any) => {
  return apiHttp.post('/v2showMANDB/api/v1/query/queryFindMetaDataForPost', {
    data: {
      query: btoa(JSON.stringify(params)),
    },
  })
}

export const GetTxData = (txId: string) => {
  return QueryFindMetaDataForPost({
    find: {
      txId,
    },
    skip: 0,
  })
}

export const GetMetaIdInfo = (metaId: string) => {
  return apiHttp.get(`/v2showMANDB/api/v1/query/getMetaIDInfo/${metaId}`)
}

export const GetProductList = (params: {
  pageSize: number
  page: number
  classifyName?: string
}): Promise<GetProductListResponstData> => {
  return nftHttp.post('/api/v2/product/productList', params)
}

export const GetProductClassifyList = (params: {
  pageSize: number
  page: number
  classifyName?: string
}): Promise<GetProductListResponstData> => {
  return nftHttp.post('/api/v2/product/classify', params)
}

export const GetNftDetail = (params: {
  tokenId: string
}): Promise<GetProductDetailResponstData> => {
  return nftHttp.post('/api/v2/product/productDetails', params)
}

export const TransactionRecord = (params: {
  tokenId: string
}): Promise<TransactionRecordResponstData> => {
  return nftHttp.post('/api/v2/productTransaction/transactionRecord', params)
}

export const CreateNft = (params: CreateNftParams): Promise<CreateNftResponstData> => {
  return nftHttp.post('/api/v2/found/foundNft', params)
}

export const MyNfts = (params: Pagination): Promise<MyNftsResponstData> => {
  return nftHttp.post('/api/v2/product/myProduct', params)
}

export const SaleNft = (params: {
  sellValidTime: number
  amount: number | string
  tokenId: string
  sellTxId: string
}): Promise<SaleNftResponstData> => {
  return nftHttp.post('/api/v2/productTransaction/sell', params)
}

export const Upload = (params: FormData): Promise<string> => {
  return nftHttp.post('/api/v2/oss/upload', params)
}

export const GetSeries = (params: { pageSize: number; page: number }): Promise<GetSeriestData> => {
  return nftHttp.post('/api/v2/series/getSeries', params)
}

export const Search = (params: { likeName: string }): Promise<GetProductListResponstData> => {
  return nftHttp.post('/api/v2/product/productLike', params)
}

export const GetClassies = (): Promise<GetClassiesData> => {
  return nftHttp.post('/api/v2/classify/classifyList')
}

export const OffSale = (params: { tokenId: string }): Promise<apiResponse> => {
  return nftHttp.post('/api/v2/productTransaction/unshelve', params)
}

export const BuyNft = (params: {
  tokenId: string
  payMentAddress: string
  collectionAddress: string
  payTxId: string
  amount: number
}): Promise<apiResponse> => {
  return nftHttp.post('/api/v2/productTransaction/transactionProduct', params)
}

export const GetTxStatus = (params: { txId: string }): Promise<GetTxStatusData> => {
  return nftHttp.post('/api/v2/found/getNftStatus', params)
}

export const CreateSerice = (params: {
  name: string
  count: number
  codeHash: string
  genesis: string
  genesisTxId: string
  sensibleId: string
}): Promise<GetTxStatusData> => {
  return nftHttp.post('/api/v2/series/foundSeries', params)
}

export const GetNFTOwnerAddress = (params: { tokenId: string }): Promise<apiResponse> => {
  return nftHttp.post('/api/v2/productTransaction/ownerAddress', params)
}

export const GetDeadlineTime = (params: {
  genesis: string
  codeHash: string
  tokenIndex: string
}): Promise<apiResponse> => {
  return nftHttp.post('/api/v2/productTransaction/getShelvesTime', params)
}

export const SetDeadlineTime = (params: {
  genesis: string
  codeHash: string
  tokenIndex: string
  deadlineTime: number
}): Promise<apiResponse> => {
  return nftHttp.post('/api/v2/productTransaction/setShelvesTime', params)
}

export const RemoveDeadlineTime = (params: {
  genesis: string
  codeHash: string
  tokenIndex: string
  deadlineTime: number
}): Promise<apiResponse> => {
  return nftHttp.post('/api/v2/productTransaction/removeShelvesTime', params)
}

export const Login = (params: {
  metaId: string
  xpub: string
  msg: string
  timestamp: number
  type: string
}): Promise<apiResponse> => {
  return nftHttp.post('/api/v2/user/login', params)
}

export const GetNftIssue = (params: {
  genesisId: string
  tokenId: string
}): Promise<GetNftIssueRes> => {
  return aggregation.post('/v2/app/sensible/getNftIssue', params)
}
export const GetNftIssueyTxId = (params: { txId: string }): Promise<GetNftIssueyTxIdRes> => {
  return aggregation.post('/v2/app/sensible/getNftIssueByTxId', params)
}

export const GetMySelledNfts = (params: Pagination): Promise<MyNftsResponstData> => {
  return nftHttp.post('/api/v2/product/myShelvesProduct', params)
}

export const GetMyNftSummaryList = (
  params: GetMyNftSummaryListParams
): Promise<GetMyNftSummaryListRes> => {
  return aggregation.post('/v2/app/sensible/getMyNftSummaryListV2', params)
}

export const GetMyOnSellNftList = (
  params: GetMyOnSellNftListParams
): Promise<GetMyOnSellNftListRes> => {
  return aggregation.post('/v2/app/nftOnShow/getMyNftOnShowList', params)
}

export enum CertificationType {
  isCert = 1,
  unCert = 2,
}
export const GetAllOnSellNftList = (params: {
  PageSize: string
  Page: string
  CertificationType: CertificationType
}): Promise<GetMyOnSellNftListRes> => {
  return aggregation.post('/v2/app/nftOnShow/getAllNftOnShowList', params)
}

export const GetNftOnShowListByClassify = (params: {
  PageSize: string
  Page: string
  orderType: OrderType
  sortType: SortType
  classify: string
  CertificationType: CertificationType
}): Promise<GetMyOnSellNftListRes> => {
  return aggregation.post('/v2/app/nftOnShow/getNftOnShowListByClassify', params)
}

export const GetNftOnShowListBySearch = (params: {
  PageSize: string
  Page: string
  orderType: OrderType
  sortType: SortType
  SearchWord: string
  CertificationType: CertificationType
}): Promise<GetMyOnSellNftListRes> => {
  return aggregation.post('/v2/app/nftOnShow/getNftOnShowListBySearch', params)
}

export const GetSeriesNftList = (params: {
  page?: string
  flag?: string
  pageSize: string
  address: string
  codehash: string
  genesis: string
}): Promise<GetSeriesNftListRes> => {
  return aggregation.post('/v2/app/sensible/getMyNftSummaryDetailList', params)
}

export const NFTApiGetNFTDetail = (params: {
  tokenIndex: string
  codehash: string
  genesis: string
}): Promise<NFTApiGetNFTDetailRes> => {
  return aggregation.post('/v2/app/sensible/getOneNftSummaryDetail', params)
}

export const GetRecommendOnSellNftList = (params: {
  PageSize: string
  Page: string
}): Promise<GetMyOnSellNftListRes> => {
  return aggregation.post('/v2/app/nftOnShow/getRecommendNftOnShowList', params)
}

export enum Langs {
  CN = 'cn',
  EN = 'en',
}
export const GetMyNftEligibility = (params: {
  MetaId: string
  IssueMetaId: string
  lang: Langs
}): Promise<apiResponse> => {
  return aggregation.get(
    `/v2/app/nftOnShow/getMyNftEligibility/${params.MetaId}//${params.IssueMetaId}/${params.lang}`
  )
}

export const GetMetaBotList = (params: {
  PageSize: string
  Page: string
  Start: number
  End: number
}): Promise<GetMetaBotListRes> => {
  return aggregation.post('/v2/app/metaBot/getMetaBotListByBetweenNumber', params)
}

export const GetMetaBotListByBetweenNumber = (params: {
  PageSize: string
  Page: string
  Start: number
  End: number
}): Promise<GetMetaBotListRes> => {
  return aggregation.post('/v2/app/metaBot/getMetaBotListByBetweenNumber', params)
}

export const GetMetaBotListBySearch = (params: {
  PageSize: string
  Page: string
  SearchWord: string
}): Promise<GetMetaBotListRes> => {
  return aggregation.post('/v2/app/metaBot/getMetaBotListBySearch', params)
}
export const GetMyNftOnShowSellSuccessList = (params: {
  MetaId: string
  Page: string
  PageSize: string
}): Promise<GetMyNftOnShowSellSuccessListRes> => {
  return aggregation.post('/v2/app/nftOnShow/getMyNftOnShowSellSuccessList', params)
}

export const GetTopicNftList = (params: {
  TopicType: string | string[]
  Page: string
  PageSize: string
  orderType: OrderType
  sortType: SortType
  sellType?: string
  metaId?: string
  startPrice?: number
  endPrice?: number
  startIndex?: number
  endIndex?: number
  filterIndex?: number
  filterTagList?: string[]
}): Promise<GetMetaBotListRes> => {
  return aggregation.post('/v2/app/nftOnShow/getTopicNftList', params)
}

export const GetCertMetaIdList = (): Promise<GetCertMetaIdListRes> => {
  return aggregation.get('/v2/app/nftOnShow/getNosCertificationMetaIdList')
}

export const GetMyNftOnShowBuySuccessList = (params: {
  MetaId: string
  Page: string
  PageSize: string
}): Promise<GetMyNftOnShowSellSuccessListRes> => {
  return aggregation.post('/v2/app/nftOnShow/getMyNftOnShowBuySuccessList', params)
}

export const GetNftHolderList = (params: {
  codehash: string
  genesis: string
  tokenIndex: string
  page: string
  pageSize: string
}): Promise<GetNftHolderListRes> => {
  const { codehash, genesis, tokenIndex, ..._params } = params
  return aggregation.get(
    `/v2/app/nftOnShow/getNftHolderList/${codehash}/${genesis}/${tokenIndex}`,
    {
      params: _params,
    }
  )
}

export const CreateNftAuction = (params: {
  codehash: string
  genesis: string
  token_index: number
  value: string
  fixed_value: string
  begin_value: string
  icon: string
  memo: string
  one_value: string
  dead_time: number
  auction_tx: string
}): Promise<GetMetaBotListRes> => {
  return auctionHttp.post('/v1/app/admin/addMetaBot', params)
}

export const GetNftAuctions = (params: {
  page: number
  page_size: number
}): Promise<GetNftAuctionsRes> => {
  return auctionHttp.post('/v1/app/metabot/all', params)
}

export const GetNftAuction = (txId: string): Promise<GetNftAuctionRes> => {
  return aggregation.get(`/v2/app/nftAuction/getNftAuctionBidByTxId/${txId}`)
}

export const GetNftAuctionDetail = (txId: string): Promise<GetNftAuctionRes> => {
  return aggregation.get(`/v2/app/nftAuction/getNftAuctionCreateByTxId/${txId}`)
}

export const GetAuctionList = (params: {
  page: number
  pageSize: number
  nowTimestamp?: number
}): Promise<GetAuctionListRes> => {
  return aggregation.get('/v2/app/nftAuction/getAllNftAuctionList', { params: params })
}

export const GetUserAuctionList = (params: {
  metaId: string
  page: number
  pageSize: number
  nowTimestamp?: number
}): Promise<GetAuctionListRes> => {
  return aggregation.get(`/v2/app/nftAuction/getMyNftAuctionList/${params.metaId}`, {
    params: params,
  })
}

export const CheckUserCanAuction = (params: {
  codehash: string
  genesis: string
  token_index: number
  value: string
}): Promise<GetMetaBotListRes> => {
  return auctionHttp.post('/v1/app/metabot/offerCheck', params)
}

export const SubmitBid = (params: {
  codehash: string
  genesis: string
  token_index: number
  value: string
  tx: string
  raw_tx: string
  buyer_meta_id: string
  buyer_address: string
}): Promise<GetMetaBotListRes> => {
  return auctionHttp.post('/v1/app/metabot/offer', params)
}

export const GetNftAuctionHistorys = (params: {
  codehash: string
  genesis: string
  token_index: number
  page: number
  page_size: number
}): Promise<GetNftAuctionHistorysRes> => {
  return auctionHttp.post('/v1/app/metabot/itemHistory', params)
}

export const GetNftAuctionHistory = (params: {
  auctionTxId: string
  page: number
  pageSize: number
}): Promise<GetNftAuctionHistoryRes> => {
  const { auctionTxId, ..._params } = params
  return aggregation.get(`/v2/app/nftAuction/getNftAuctionBidListByAuctionId/${auctionTxId}`, {
    params: _params,
  })
}

export const GetUserAuctionHistorys = (params: {
  meta_id: string
  page: number
  page_size: number
}): Promise<GetMetaBotListRes> => {
  return auctionHttp.post('/v1/app/metabot/metaId', params)
}

export const GetTxRaw = (
  txid: string,
  params: {
    'MetaSV-Client-Pubkey': string
    'MetaSV-Nonce': string
    'MetaSV-Signature': string
    'MetaSV-Timestamp': string
  }
): Promise<GetMetaBotListRes> => {
  return new Promise((resolve, reject) => {
    fetch(`https://apiv2.metasv.com/tx/${txid}/raw`, {
      headers: params,
    })
      .then(function(response) {
        return response.json()
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const GetUserDiscount = (params: {
  metaId: string
  zeroAddress: string
}): Promise<GetUserDiscountRes> => {
  return aggregation.get(
    `/v2/app/nftOnShow/getMyNosCommissionRate/${params.metaId}/${params.zeroAddress}/1`
  )
}

/* 权益 api */
export const CreateRight = (params: {
  projectName: string
  teamSide: string
  nftQuantity: number
  dividendCycle: string
  genesis: string
  codehash: string
}) => {
  return rightHttp.post('/api/v1/equity/dividend/project/address', params)
}

export const GetRightDetail = (params: {
  genesis: string
  codehash: string
}): Promise<GetRightDetailRes> => {
  return rightHttp.get(`/api/v1/equity/dividend/project/${params.genesis}/${params.codehash}`)
}

export const GetRightList = (): Promise<GetRightListRes> => {
  return rightHttp.get('/api/v1/equity/dividend/project')
}

export const GetBanners = (): Promise<GetBannersRes> => {
  return apiHttp.get('/broad/v1/nos/topic/getNosBannerList')
}

export const getTopics = (): Promise<getTopicsRes> => {
  return apiHttp.get('/broad/v1/nos/topic/getNosTopicInfoList')
}

export const GetGenesisVolumeInfo = (
  genesis: string,
  day = 7
): Promise<GetGenesisVolumeInfoRes> => {
  return apiHttp.get(`/broad/v1/nos/count/getGenesisVolumeInfo/${genesis}`, { params: { day } })
}

export const GetCertUserInfo = (metaId: string): Promise<GetCertUserInfoRes> => {
  return apiHttp.get(`/broad/v1/nos/certification/getNosCertificationUserInfo/${metaId}`)
}

export const GetNosGenesisInfo = (params: {
  key: string
  lang: string
}): Promise<GetNosGenesisInfoRes> => {
  return apiHttp.get(
    `/broad/v1/nos/certification/getNosGenesisInfo/${params.key}?lang=${params.lang}`
  )
}

// 获取appWeb列表
export const GetApps = (params?: {
  // metaId: string
  certificationStage: string
}): Promise<GetAppsRes> => {
  return apiHttp.post('/serviceapi/api/v1/showService/getAppWebviewList', {
    data: JSON.stringify(params),
  })
}

export const GetNFTGenesisInfo = (params: {
  codehash: string
  genesis: string
}): Promise<GetNFTGenesisInfoRes> => {
  return Sensible.get(`/nft/genesis-info/${params.codehash}/${params.genesis}`)
}

export const GetAuctionAddress = (): Promise<GetAuctionAddressRes> => {
  return apiHttp.get('/issue/api/bsv/address')
}

export const GetUserCanCreateClassify = (key: string): Promise<GetUserCanCreateClassifyRes> => {
  return apiHttp.get(`/broad/v1/nos/certification/getNosCertificationMetaIdListByKey/${key}`)
}

export const GetFeeInfo = (params: {
  codehash: string | string[]
  genesis: string | string[]
}): Promise<GerFeeInfoRes> => {
  // 冬奥nft 费率固定 3 3
  const result = isWinterOlympicSeries(
    typeof params.genesis === 'string' ? params.genesis : '',
    typeof params.codehash === 'string' ? params.codehash : ''
  )
  if (result) {
    return new Promise(resolve => {
      resolve({
        code: 0,
        data: {
          first_platform: 3,
          first_royalty: 3,
          other_platform: 3,
          other_royalty: 3,
          royalty: 3,
        },
      })
    })
  } else {
    return apiHttp.get(`/broad/v1/nft/market/feeinfo/${params.codehash}/${params.genesis}`)
  }
}

export const UpoladPay = (params: {
  amount: number
  fee: number
  fromMetaid: string
  fromTx: string
  metaid: string
  nft: string
  totalFee: number
  feeTx: string
  address: string
}): Promise<MetaIdJsRes> => {
  return apiHttp.post('/royalty/v2/royalty/setconsumption', params)
}
export const Get = (params: {
  amount: number
  fee: number
  fromMetaid: string
  fromTx: string
  metaid: string
  nft: string
  totalFee: number
  address: string
}): Promise<MetaIdJsRes> => {
  return apiHttp.post('/royalty/v2/royalty/setconsumption', params)
}

export const GetMarketBanners = (): Promise<GetMarketBannersRes> => {
  return apiHttp.get('/broad/v1/nft/market/getNftMarketBannerList')
}

export const GetMarketHotTopics = (): Promise<GetMarketHotTopicsRes> => {
  return apiHttp.get('/broad/v1/nft/market/getNftMarketHottestAlbumList')
}

export const GetMarketHotNTFs = (): Promise<GetMarketHotNTFsRes> => {
  return apiHttp.get('/broad/v1/nft/market/getNftMarketHottestNftList')
}

export const GetMarketNewTopics = (): Promise<GetMarketNewTopicsRes> => {
  return apiHttp.get('/broad/v1/nft/market/getNftMarketNewestAlbumList')
}

export const GetUserInfo = (params: { metaId: string | string[] }): Promise<GetUserInfoRes> => {
  return aggregation.post('/v2/app/user/getUserInfo', params)
}

export const GetUserSeries = (params: {
  metaId: string | string[]
  page: number
  pageSize: number
}): Promise<GetUserSeriesRes> => {
  return aggregation.get(`/v2/app/nftMarket/getMyAlbumList/${params.metaId}`, { params })
}

export const GetMyFollowList = (params: {
  metaId: string | string[]
}): Promise<GetMyFollowListRes> => {
  return aggregation.post('/v2/app/follow/getMyFollow', params)
}

// 获取用户背景nft列表
export const GetUserNftBgs = (params: {
  address: string
  page: number
  pageSize: number
}): Promise<GetUserNftBgsRes> => {
  const { address, ..._params } = params
  return aggregation.get(`/v2/app/nftService/getMyNftBackgroundList/${address}`, {
    params: _params,
  })
}

export const GetMetaFileByHash = (hash256: string): Promise<GetMetaFileByHashRes> => {
  return aggregation.get(`/v2/app/metaFile/getMetaFileByHash/${hash256}`)
}

export const GetLegalNfts = (params: {
  page?: number
  pageSize?: number
  orderType?: legalOrderType
  sortType?: legalSortType
  sellType?: legalSellType
  startPrice?: number
  endPrice?: number
}): Promise<GetLegalNftsRes> => {
  return Legal.post('/api/v1/nos/legal/list', params)
}

export const LegalSaleNft = (params: {
  price: string
  sellDesc: string
  txid: string
}): Promise<GetSaleLegalNftsRes> => {
  return Legal.post('/api/v1/nos/legal/sell', params)
}

export const GetLegalRecevierAddress = (): Promise<GetLegalAddress> => {
  return Legal.get('/api/v1/nos/legal/address')
}

export const GetLegalNftDetail = (params: { uuid: string }): Promise<GetLegalNftDetail> => {
  return Legal.post('/api/v1/nos/legal/detail', params)
}
// 购买法币NFT
export const GetLegalBuyNftInfo = (params: {
  uuid: string
  metaid: string
  type: number
  openid?: string
  goodName?: string
  payType: number
  quitUrl?: string
  from: string
}): Promise<GetLegalBuyNft> => {
  return Legal.post('/api/v1/nos/legal/buy', params)
}

// 创建NFT法币购买订单
export const createNftOrderForLegal = (params: {
  address: string | Promise<string>
  amount: string
  codehash: string
  contract: string
  currency: string
  description: string
  genesis: string
  goods_name: string
  index: string
  metaid: string
  open_id?: string
  types: number
  pay_type: PayPlatform
  quit_url: string
}) => {
  return legalApi.post('/wxcore/legalbsv/getOrderId', params)
}

// 汇率接口

export const getExchangeRate = (): Promise<GetExchangeRate> => {
  return legalApi.get('wxcore/legalbsv/getExchangeRate')
}

// 获取我的法币余额(欧阳)
export const getMyLegalAmount = (params: {
  currency: string
  metaid: string
}): Promise<GetLegalNftDetail> => {
  return Legal.post('/api/v1/nos/legal/balance', params)
}

// 获取我的法币余额(楷)
export const getMyNftSaleBalance = (metaid: string): Promise<GetMyNftSaleBalance> => {
  return legalApi.get(`/wxcore/legalbsv/getBalance/${metaid}`)
}

// 获取所有盲盒NFT列表
export const GetBlindBoxList = (params: {
  page: number
  pageSize: number
}): Promise<GetBlindBoxList> => {
  const qsParams = qs.stringify(params)
  return apiHttp.get(`/broad/v1/nft/market/getBlindBoxAlbumList?${qsParams}`)
}

// 获取盲盒销售信息
export const GetBlindBoxSaleDetail = (): Promise<BlindBoxSaleDetail> => {
  return apiHttp.get('/metabot-avatar/api/v1/blind-box/sell/detail')
}

// 购买盲盒

export const BuyBlindBox = (params: {
  quantity: number
  metaid: string
  address: string
  openid?: string
  currency: string // BSV orCNY
  type: number
}): Promise<BuyBlindBoxData> => {
  return apiHttp.post('/metabot-avatar/api/v1/blind-box/buy', params)
}

// 查询我的盲盒数

export const MyBlindBoxList = (params: { metaid: string }): Promise<MyBlindBoxList> => {
  return apiHttp.post('/metabot-avatar/api/v1/blind-box/user/detail', params)
}

// 购买盲盒微信服务回调

export const wxcoreForBuyBlindBox = (params: {
  status: number
  order_id: string
  transaction_id: string
}): Promise<wxcoreForBuyBlindBox> => {
  return apiHttp.post('/metabot-avatar/api/v1/blind-box/confirm', params)
}

// 购买盲盒状态回调

export const BuyBlindBoxStatus = (params: {
  wxCoreOrderId: string
}): Promise<wxcoreForBuyBlindBox> => {
  return apiHttp.post('/metabot-avatar/api/v1/blind-box/buy/status', params)
}

// 盲盒购买记录

export const BlindBoxBuyReCord = (params: {
  page: string
  pageSize: string
}): Promise<BlindBoxBuyRecord> => {
  return apiHttp.post('/metabot-avatar/api/v1/blind-box/buy/history', params)
}

// 盲盒打开记录

export const BlindBoxOpenReCord = (params: {
  page: string
  pageSize: string
}): Promise<BlindBoxOpenReCord> => {
  return apiHttp.post('/metabot-avatar/api/v1/blind-box/open/history', params)
}

// 法币买盲盒(楷)

export const realBuyBlindBox = (params: {
  amount: string
  codehash: string
  currency: string
  description: string
  from: string
  genesis: string
  goods_name: string
  metaid: string
  open_id: string
  types: number
  uuid: string
}): Promise<realBuyBlindBox> => {
  return legalApi.post('/wxcore/blindbox/getOrderId', params)
}

// 拆盲盒

export const openMyBlindBox = (params: { metaid: string }): Promise<openMyBlindBoxRes> => {
  return apiHttp.post('/metabot-avatar/api/v1/blind-box/open', params)
}

export const SendRawTx = (params: {
  address: string
  metaId: string
  orderId: string
  tx_raw: string
}): Promise<openMyBlindBoxRes> => {
  return legalApi.post('/wxcore/bsvblindbox/rawTx', params)
}

//通过地址获取metaid信息

export const getMetaIdByAddress = (address:string): Promise<getMetaId> => {
  return aggregation.get(`/v2/app/user/metaId/${address}/address`)
}

export const GetUserInfoSimple = (params: { metaId: string }): Promise<GetUserInfoSimpleRes> => {
  return aggregation.post('/v2/app/user/getUserInfo', params)
}

export const getPayMailAddress = (params: { Email: string }): Promise<GetPayMailAddress> => {
  return sdkApi.post(`/paymail/v2/paymail/address`, params)
}
