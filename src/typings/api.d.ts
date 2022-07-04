declare interface apiResponse {
  code: number
  msg?: string
  count?: number
  data: any
}

declare interface TransactionRecordItem {
  headUrl: string
  username: string
  ownerTime: number
  amount: string
  metaId: string
}

declare interface Classify {
  classify: string
  disabled?: boolean
  name?: string
}

declare interface SaleNftResponstData extends apiResponse {
  data: {
    tokenId: string
  }
}

declare interface SeriesItem {
  currentNumber: number
  maxNumber: number
  codeHash: string
  genesis: string
  genesisTxId: string
  sensibleId: string
  metaId: string
  name: string
}

declare interface ExchangeRate {
  cnyRate: number
  usdtRate: number
  feeRate: number
  message: string
}
declare interface GetSeriestData extends apiResponse {
  data: SeriesItem[]
}
declare interface GetClassiesData extends apiResponse {
  data: Classify[]
}
declare interface GetTxStatusData extends apiResponse {
  data: {
    found: boolean
  }
}

declare interface GetProductListResponstData extends apiResponse {
  data: NftItem[]
}

declare interface GetMetaSvSignRes extends apiResponse {
  data: {
    nonce: string
    publicKey: string
    signEncoded: string
    timestamp: string
  }
  message: string
}

declare interface GetProductDetailResponstData extends apiResponse {
  data: NftItemDetail
}

declare interface TransactionRecordResponstData extends apiResponse {
  data: TransactionRecordItem[]
}

declare interface CreateNftResponstData extends apiResponse {
  data: {
    tokenId: string
  }
}

declare interface CreateNftParams {
  nftName: string
  type: string
  fileUrl: string
  coverUrl: string
  intro: string
  seriesName: string
  tx: string
  classify: string
  codeHash: string
  genesis: string
  nftId: string
  tokenId: string
  tokenIndex: string
  genesisTxId: string
}

declare interface MyNftsResponstData extends apiResponse {
  data: NftItem[]
}

declare interface GetNftIssueRes extends apiResponse {
  data: {
    txId: string
    type: string
    genesisId: string
    genesisTxId: string
    receiverAddress: string
    name: string
    desc: string
    icon: string
    website: string
    issuerName: string
    tokenId: string
    dataStr: string
    timestamp: number
  }
}

declare interface GetMyNftSummaryListParams {
  Address: string
  Page?: string
  PageSize: string
}

declare interface GetMyOnSellNftListParams {
  Page: string
  PageSize: string
  MetaId: string
  sortType: number
  orderType: number
  startPrice: number
  endPrice: number
}

declare interface GetMyNftSummaryListRes extends apiResponse {
  data: {
    total: number
    results: {
      items: MyNftSummaryItem[]
    }
  }
}

declare interface MyNftSummaryItem {
  nftBackIcon: string
  nftCodehash: string
  nftGenesis: string
  nftGenesisTxId: string
  nftSensibleId: string
  nftSymbol: symbol
  nftMyCount: number
  nftMyPendingCount: number
  nftTotalSupply: number
  nftName: string
  nftDesc: string
  nftIcon: string
  nftWebsite: string
  nftIssuer: string
  nftTimestamp: number
  nftIssueVersion: string
  nftDataStr: string
  nftSeriesName: string
  genesisTxId: string
  nftOwnerName: string
  nftTokenIndex: string
  nftIsReady: boolean
  nftOwnerMetaId: string
  nftIssueMetaId: string
  nftOwnerAvatarType: string
  nftIssueAvatarType: string
  nftGenesisCertificationType: number
  nftCertificationType: number
  nftHasCompound: boolean
  nftDetailItemList?: {
    nftBalance: number
    nftCodehash: string
    nftDataStr: string
    nftDesc: string
    nftGenesis: string
    nftGenesisTxId: string
    nftIcon: string
    nftIsReady: boolean
    nftIssueAvatarTxId: string
    nftIssueMetaId: string
    nftIssueVersion: string
    nftIssuer: string
    nftName: string
    nftOwnerAddress: string
    nftOwnerAvatarTxId: string
    nftOwnerMetaId: string
    nftOwnerName: string
    nftPrice: number
    nftSatoshi: number
    nftSellTxId: string
    nftSensibleId: string
    nftSeriesName: string
    nftSymbol: string
    nftTimestamp: number
    nftTokenId: string
    nftTokenIndex: string
    nftTotalSupply: number
    nftWebsite: string
    nftOwnerAvatarType: string
  }[]
}

declare interface NFTSeriesItem {
  cover: string
  name: string
  nftDesc: string
  total: number
  hasCount: number
  genesis: string
  codehash: string
}

declare interface NFTSeriesItemData {
  cover: string
  name: string
  nftDesc: string
  total: number
  hasCount: number
}

declare interface GetSeriesNftListResItem {
  nftCodehash: string
  nftIssueMetaId?: string
  nftIssueAvatarType?: string
  nftGenesis: string
  nftGenesisTxId: string
  nftSymbol: string
  nftBalance: string
  nftName: string
  nftDesc: string
  nftIcon: string
  nftWebsite: string
  nftIssuer: string
  nftTimestamp: number
  nftTotalSupply: string
  nftTokenIndex: string
  nftIssueVersion: string
  nftDataStr: string
  nftIsReady: boolean
  nftOwnerMetaId: string
  nftSensibleId: string
  nftHasCompound: boolean
}

declare interface GetSeriesNftListRes extends apiResponse {
  data: {
    total: number
    results: {
      items: GetSeriesNftListResItem[]
    }
  }
}

declare interface GetMyOnSellNftListRes extends apiResponse {
  data: {
    total: number
    results: {
      items: GetNftIssueyTxIdResItem[]
    }
  }
}

declare interface GetNftAuctionsRes extends apiResponse {
  data: GetNftAuctionsResItem[]
}
declare interface GetNftAuctionRes extends apiResponse {
  data: GetNftAuctionResItem
}

declare interface GetNftAuctionResItem {
  bidPrice: string // 竞价价格
  bidPriceInt: number // 竞价价格
  chargeUnit: string // 竞价单位
  codehash: string
  genesis: string
  genesisTxId: string
  issuerMetaId: string
  issuerMetaTxId: string
  metaId: string
  metanetId: string
  nftAuctionId: string // nft拍卖创建txId
  nftHash: string
  tokenIndex: string
  txId: string
  currentAuctionState: number
  currentBidPrice: string
  currentBidPriceInt: number
  endTimeStamp: number
  userName: string
  startingPrice: string
  startingPriceInt: number
  timestamp: number
  avatarType: string
}

declare interface GetNftAuctionsResItem {
  begin_value: string
  buyer_address: string
  buyer_metaId: string
  buyer_value: string
  codehash: string
  dead_time: number
  final_value: string
  fixed_value: string
  genesis: string
  icon: string
  memo: string
  one_value: string
  status: number
  token_index: number
  update_time: number
  value: string
}
declare interface GetNftAuctionHistorysRes extends apiResponse {
  data: GetNftAuctionHistorysResItem[]
}

declare interface GetNftAuctionHistorysResItem {
  buyer_address: string
  buyer_metaId: string
  buyer_value: string
  codehash: string
  genesis: string
  icon: string
  id: string
  status: number
  token_index: number
  update_time: number
  value: string
}

declare interface GetNftAuctionHistoryRes extends apiResponse {
  data: {
    results: {
      info: {
        responseTime: string
        version: string
      }
      items: GetNftAuctionHistoryResItem[]
    }
  }
}

declare interface GetNftAuctionHistoryResItem {
  bidPrice: string
  bidPriceInt: number
  chargeUnit: string
  codehash: string
  genesis: string
  genesisTxId: string
  issuerMetaId: string
  issuerMetaTxId: string
  metaId: string
  metanetId: string
  nftAuctionId: string
  nftHash: string
  tokenIndex: string
  txId: string
  zeroAddress: string
  timestamp: number
  userName: string
}
declare interface GetMetaBotListRes extends apiResponse {
  data: {
    total: number
    results: {
      items: GetMetaBotListResItem[]
    }
  }
}
declare interface GetCertMetaIdListRes extends apiResponse {
  data: string[]
}
declare interface GetNftHolderListRes extends apiResponse {
  data: {
    total: number
    results: {
      items: {
        holderList: GetNftHolderListResItem[]
        issuer: GetNftHolderListResItem
        owner: GetNftHolderListResItem
      }
    }
  }
}
declare interface GetNftHolderListResItem extends apiResponse {
  avatarTxId: string
  avatarType: string
  codehash: string
  genesis: string
  issuerMetaId: string
  issuerMetaTxId: string
  memo: string
  metaId: string
  name: string
  nftHash: string
  protocol: string
  satoshisPrice: string
  timestamp: 1634203995079
  tokenIndex: string
  txId: string
}
declare interface GetMyNftOnShowSellSuccessListRes extends apiResponse {
  data: {
    total: number
    results: {
      items: GetMyNftOnShowSellSuccessListResItem[]
    }
  }
}
declare interface GetUserDiscountRes extends apiResponse {
  data: {
    nosRate: string
  }
}

declare interface GetRightDetailRes extends apiResponse {
  data: RightItem
}

declare interface GetRightListRes extends apiResponse {
  data: RightItem[]
}
declare interface RightItem {
  metaid: string
  address: string
  genesis: string
  codehash: string
  projectName: string
  prject_team: string
  nftQuantity: number
  cover: string
  dividendCycle: string
  totalDividend: string
  lastDividend: number
  lastDividendDate: number
  nftCertificationType: number
  nftGenesisCertificationType: number
  status: number
}

declare interface GetMyNftOnShowSellSuccessListResItem {
  nftBalance: number
  nftBuyerAvatarTxId: string
  nftBuyerAvatarType: string
  nftBuyerMetaId: string
  nftBuyerName: string
  nftBuyerTimestamp: number
  nftBuyerTimestampStr: string
  nftBuyerTxId: string
  nftCodehash: string
  nftDataStr: string
  nftDesc: string
  nftGenesis: string
  nftGenesisTxId: string
  nftIcon: string
  nftIssueAvatarTxId: string
  nftIssueAvatarType: string
  nftIssueMetaId: string
  nftIssueTimestamp: number
  nftIssueVersion: string
  nftIssuer: string
  nftName: string
  nftOwnerAddress: string
  nftOwnerAvatarTxId: string
  nftOwnerAvatarType: string
  nftOwnerMetaId: string
  nftOwnerName: string
  nftPrice: number
  nftPriceStr: string
  nftSellContractTxId: string
  nftSellDesc: string
  nftSellTxId: string
  nftSensibleId: string
  nftSymbol: string
  nftTimestamp: number
  nftTokenIndex: string
  nftWebsite: string
}
declare interface GetMetaBotListResItem {
  nftSellState: number
  nftBalance: number
  nftBuyTimestamp: number
  nftBuyTxId: string
  nftCancelTimestamp: number
  nftCancelTxId: string
  nftCodehash: string
  nftDataStr: string
  nftDesc: string
  nftGenesis: string
  nftGenesisTxId: string
  nftIcon: string
  nftIssueAvatarTxId: string
  nftIssueMetaId: string
  nftIssueTimestamp: number
  nftIssueVersion: string
  nftIssuer: string
  nftName: string
  nftOwnerAvatarTxId: string
  nftOwnerMetaId: string
  nftOwnerName: string
  nftPrice: number
  nftSellContractTxId: string
  nftSellDesc: string
  nftSellTimestamp: number
  nftSellTxId: string
  nftSensibleId: string
  nftSeriesName: string
  nftSymbol: string
  nftTimestamp: number
  nftTokenIndex: string
  nftWebsite: string
  nftIsReady: boolean
  isAuction?: boolean
  auctionStatus?: number
  currentPrice?: string
  isOnlyDisplay?: boolean
  auctionDeadTime?: number
  nftOwnerAvatarType?: string
  nftIssueAvatarType?: string
  nftCurrentBidPrice: string
  nftCurrentBidPriceInt: number
  nftCurrentAuctionState: number
  nftStartingPrice: string
  nftStartingPriceInt: number
  nftChargeUnit: string
  nftEndTimeStamp: number
  nftCurrentAuctionCreateTxId: string
  nftLikeCount: number
  nftHasDonate: boolean
  nftHasLike: boolean
  nftIssueAddress?: string
  nftIssueMetaTxId: string
  nftOwnerAddress: string
  nftIsFirstSell: boolean
  nftBackIcon: string
  nftHasCompound: boolean
}

declare interface GetNftIssueyTxIdResItem {
  nftBalance: number
  nftCertificationType: number
  nftCodehash: string
  nftDataStr: string
  nftDesc: string
  nftDonateCount: number
  nftDonateValue: number
  nftGenesis: string
  nftGenesisCertificationName: string
  nftGenesisCertificationType: number
  nftGenesisTxId: string
  nftHasDonate: boolean
  nftHasLike: boolean
  nftIcon: string
  nftIsReady: boolean
  nftIssueAddress: string
  nftIssueAvatarTxId: string
  nftIssueAvatarType: string
  nftIssueMetaId: string
  nftIssueMetaTxId: string
  nftIssueTimestamp: number
  nftIssueVersion: string
  nftIssuer: string
  nftLikeCount: number
  nftName: string
  nftOwnerAddress: string
  nftOwnerAvatarTxId: string
  nftOwnerAvatarType: string
  nftOwnerMetaId: string
  nftOwnerName: string
  nftPart: string
  nftPrice: number
  nftSatoshi: number
  nftSellContractTxId: string
  nftSellDesc: string
  nftSellTxId: string
  nftSensibleId: string
  nftSymbol: string
  nftTimestamp: number
  nftTokenIndex: string
  nftTotalSupply: number
  nftWebsite: string
  nftBackIcon: string
  nftHasCompound: boolean
}
declare interface GetNftIssueyTxIdRes extends apiResponse {
  data: {
    dataStr: string
    desc: string
    genesisId: string
    genesisTxId: string
    icon: string
    issuerName: string
    metaId: string
    metaIdName: string
    metanetId: string
    name: string
    receiverAddress: string
    timestamp: number
    tokenId: string
    txId: string
    type: string
    version: string
    website: string
  }
}

declare interface NFTApiGetNFTDetailRes extends apiResponse {
  data: {
    total: number
    results: {
      info: {
        version: string
        responseTime: string
      }
      items: NFTApiGetNFTDetailResDataItem[]
    }
  }
}

declare interface NFTApiGetNFTDetailResDataItem {
  [x: string]: any
  nftPrice: number
  nftCodehash: string
  nftGenesis: string
  nftGenesisTxId: string
  nftSensibleId: string
  nftSymbol: symbol
  nftBalance: number
  nftName: string
  nftDesc: string
  nftIcon: string
  nftWebsite: string
  nftIssuer: string
  nftTimestamp: number
  nftTotalSupply: number
  nftTokenIndex: string
  nftIssueVersion: string
  nftIssueMetaId: string
  nftDataStr: string
  nftOwnerAddress: string
  nftOwnerAvatarTxId: string
  nftOwnerMetaId: string
  nftOwnerName: string
  nftSellTxId: string
  nftIsReady: boolean
  nftSellContractTxId: string
  nftSellDesc: string
  nftTokenId: string
  nftIssueMetaTxId: string
  nftSellState: number
  nftOwnerAvatarType: string
  nftIssueAvatarType: string
  nftGenesisCertificationType: number
  nftCertificationType: number
  nftGenesisCertificationName: string
  nftCurrentAuctionCreateTxId: string
  nftIssueAddress: string
  nftBackIcon: string
  nftHasCompound: boolean
  nftIsFirstSell: boolean
  nftMinBidIncreaseInt: number
}

declare interface BroadApiRes {
  code: number
  data: {
    total: number
    result: any
  }
}

declare interface GetBannersRes {
  code: number
  data: {
    total: number
    result: Banner[]
  }
}

declare interface Banner {
  picUrlEn: string
  picUrlJp: string
  picUrlZh: string
  sort: number
  tag: string
  url: string
}
declare interface getTopicsRes {
  code: number
  data: {
    total: number
    result: Topic[]
  }
}

declare interface filterTagItem {
  tabName: any
  tabTag: any
}

declare interface Topic {
  CreateAvatarTxId: string
  CreateAvatarType: string
  coverPicUrlEn: string
  coverPicUrlJp: string
  coverPicUrlZh: string
  createMetaId: string
  createName: string
  key: string
  name: string
  sort: number
  tag: string
  timestamp: number
  url: number
  tabList?: {
    tabName: string
    tabTag: string
  }[]
  info: null | {
    [key: string]: string
  }
  filterIndex?: number
  filterTagList?: filterTagItem[]
}

declare interface NFTListSortItem {
  name: string
  nameKey: string
  value: number
  orderType: number
}
declare interface GetGenesisVolumeInfoRes extends apiResponse {
  data: GenesisVolumeInfo
}

declare interface GenesisVolumeInfo {
  averagePricePercentageIncrease: string
  latestPercentageIncrease: string
  maxPrice: number
  maxPriceStr: string
  minPrice: number
  minPriceOnSell: number
  minPriceOnSellStr: string
  minPriceOnSellTxId: string
  minPriceStr: string
  totalSupply: number
  panicPrice: number
  panicPriceStr: string
  totalHolder: number
  dateCountList?: {
    date: string
    percentageIncrease: string
    totalTxPrice: number
    totalTxPriceStr: string
    volume: number
    averagePrice: number
    averagePricePercentageIncrease: string
  }[]
}

declare interface GetCertUserInfoRes extends apiResponse {
  data: CertUserInfo
}

declare interface CertUserInfo {
  idNumber: string
  information: string
  metaId: string
  metaIdName: string
  organizationName: string
  realName: string
  userCertificationType: number
  userProfile: string
}

declare interface GetAppsRes {
  code: number
  result: {
    apps: AppItem[]
  }
}

declare interface AppItem {
  appAddress: string
  appCallbackUrl: string
  appTag: string
  appTimestamp: string
  appType: number
  avatar: string
  avatarUrl: string
  certificationStage: number
  contentEN: string
  contentZH: string
  developerAvatarTxId: string
  developerAvatarType: string
  developerMetaId: string
  developerName: string
  nameEN: string
  nameZH: string
  tokenState: number
  url: string
}

declare interface GetNFTGenesisInfoRes extends apiResponse {
  data: NFTGenesisInfo
}

declare interface NFTGenesisInfo {
  codehash: string
  genesis: string
  sensibleId: string
  metaTxId: string
  metaOutputIndex: number
  name: string
  symbol: string
  desc: string
  icon: string
  website: string
  supply: number
  count: number
  inTimes: number
  outTimes: number
  inSatoshi: number
  outSatoshi: number
}
declare interface GetNosGenesisInfoRes extends apiResponse {
  data: GenesisInfo
}

declare interface GenesisInfo {
  genesis: string
  seriesIconCn: string
  seriesIconEn: string
  seriesIconJp: string
  seriesInfoCn: string
  seriesInfoEn: string
  seriesInfoJp: string
  seriesNameCn: string
  seriesNameEn: string
  seriesNameJp: string
  website: string
}

declare interface GetAuctionAddressRes extends apiResponse {
  data: string
}
declare interface GetAuctionListRes extends apiResponse {
  data: {
    total: number
    results: {
      items: GetAuctionListResItem[]
    }
  }
}

declare interface GetAuctionListResItem {
  avatarTxId: string
  avatarType: string
  certificationType: number
  chargeUnit: string
  classifyList: string[]
  classifyListStr: string
  codehash: string
  currentAuctionState: number
  currentBidPrice: string
  currentBidPriceInt: number
  dataStr: string
  desc: string
  endTimeStamp: string
  endTimeStampInt: number
  genesis: string
  genesisCertificationName: string
  genesisCertificationType: number
  genesisTxId: string
  icon: string
  issueTimestamp: number
  issueVersion: string
  issuerMetaId: string
  issuerMetaTxId: string
  metaId: string
  metanetId: string
  name: string
  nftHash: string
  number: number
  part: string
  seriesName: string
  sig: string
  startingPrice: string
  startingPriceInt: number
  timestamp: number
  tokenIndex: string
  txId: string
  userName: string
  website: string
  zeroAddress: string
  ownerAvatarTxId: string
  ownerAvatarType: string
  ownerMetaId: string
  ownerName: string
  sensibleId: string
  issuerName: string
  issuerAddress: string
  nftIsFirstSell: boolean
}

declare interface GetUserCanCreateClassifyRes extends apiResponse {
  data: string[]
}

declare interface GetMarketBannersRes extends apiResponse {
  data: {
    total: number
    result: GetMarketBannersResDataItem[]
  }
}

declare interface GetMarketBannersResDataItem {
  [key: string]: {
    content: string
    issuerAvatarTxId: string
    issuerAvatarType: string
    issuerMetaId: string
    issuerName: string
    picUrl: string
    title: string
    url: string
    limitTime: number
  }
}
declare interface GetMarketHotTopicsRes extends apiResponse {
  data: {
    total: number
    result: GetMarketHotTopicsResDataItem[]
  }
}

declare interface GetMarketHotTopicsResDataItem {
  [key: string]: {
    albumContent: string
    albumPicUrl: string
    albumTitle: string
    issuerAvatarTxId: string
    issuerAvatarType: string
    issuerMetaId: string
    issuerName: string
    url: string
  }
}

declare interface GetMarketHotNTFsRes extends apiResponse {
  data: {
    total: number
    result: GetMarketHotNTFsResDataItem[]
  }
}

declare interface GetMarketHotNTFsResDataItem {
  albumUrl: string
  codehash: string
  genesis: string
  icon: string
  issuerAvatarTxId: string
  issuerAvatarType: string
  issuerMetaId: string
  issuerName: string
  likeCount: 0
  name: string
  rewardCount: 0
  rewardValue: 0
  seriesName: string
  tokenIndex: string
}

declare interface GetMarketNewTopicsRes extends apiResponse {
  data: {
    total: number
    result: GetMarketNewTopicsResDataItem[]
  }
}

declare interface GetMarketNewTopicsResDataItem {
  [key: string]: {
    issueCurrentPrice?: number
    floorCurrentPrice?: number
    floorPrice: number
    issuePrice: number
    issuerAvatarTxId: string
    issuerAvatarType: string
    issuerMetaId: string
    issuerName: string
    nftList: {
      codehash: string
      genesis: string
      icon: string
      name: string
      tokenIndex: string
    }[]
    ownerTotal: number
    tag: string
    totalSupply: number
    url: string
  }
}

declare interface GetUserInfoRes extends apiResponse {
  data: UserCenterInfo
}

declare interface GetUserInfoSimpleRes extends apiResponse {
  data: UserSimpleInfo
}

declare interface GetPayMailAddress extends apiResponse {
  data: any
}

declare interface GetMyFollowListRes extends apiResponse {
  data: {
    metaId: string
    followingList: string[]
    followedList: string[]
    blackList: string[]
    friendList: string[]
  }
}

declare interface MyFollowList {
  metaId: string
  followingList: string[]
  followedList: string[]
  blackList: string[]
  friendList: string[]
}

declare interface UserCenterInfo {
  address: string
  avatarEncrypt: string
  avatarTxId: string
  coverPublicKey: string
  coverType: string
  coverUrl: string
  email: string
  emailEncrypt: string
  infoTxId: string
  metaId: string
  metaIdTag: string
  name: string
  nameEncrypt: string
  phone: string
  phoneEncrypt: string
  protocolTxId: string
  pubKey: string
  timestamp: number
}

declare interface UserSimpleInfo {
  address: string
  avatarTxId: string
  avatarType: string
  coverPublicKey: string
  coverType: string
  coverUrl: string
  metaId: string
  name: string
  publicKey: string
}

declare interface GetUserSeriesRes extends apiResponse {
  data: {
    total: number
    results: {
      items: GetUserSeriesResDataItem[]
    }
  }
}

declare interface GetUserSeriesResDataItem {
  codehash: string
  genesis: string
  icon: string
  metaId: string
  metanetId: string
  nftList: {
    icon: string
    name: string
  }[]
  seriesName: string
  totalSupply: string
  txId: string
}
declare interface GerFeeInfoRes extends apiResponse {
  data: {
    first_platform: number
    first_royalty: number
    other_platform: number
    other_royalty: number
    royalty: number
  }
}

declare interface GetUserNftBgsRes extends apiResponse {
  data: {
    total: number
    results: {
      items: GetUserNftBgsResDataItem[]
    }
  }
}

declare interface GetUserNftBgsResDataItem {
  codehash: string
  genesis: string
  tokenIndex: string
  imageType: string
  issueMetaTxId: string
  issueMetaId: string
  issueAddress: string
  width: 0
  height: 0
  name: string
  icon: string
  iconUrl: string
  sensibleUrl: string
}

declare interface GetMetaFileByHashRes extends apiResponse {
  data: {
    total: number
    results: {
      items: GetMetaFileByHashResDataItem[]
    }
  }
}

declare interface GetMetaFileByHashResDataItem {
  txId: string
  metaId: string
  metanetId: string
  hash: string
  md5: string
  resUrl: string
  fileType: number
  fileDataType: string
  fileSize: number
  fileSizeStr: string
  blockHeight: number
  timestamp: number
}

declare interface GetLegalAddress extends apiResponse {
  code: number
  data: {
    address: string
  }
}

declare interface GetLegalNftDetail extends apiResponse {
  code: number
  data: any
}

declare interface GetLegalBuyNft extends apiResponse {
  code: number
  data: {
    buyOrderId: string
    wxCoreOrderId: string
    url: string
  }
}

declare interface GetExchangeRate extends apiResponse {
  code: number
  data: {
    cnyRate: number
    usdtRate: number
    feeRate: number
    message: string
  }
}

declare interface GetMyNftSaleBalance extends apiResponse {
  code: number
  data: {
    balanceCny: number
  }
}

declare interface GetLegalNftsRes extends apiResponse {
  data: {
    items?: LegalNFT[] | any[]
    total?: number
  }
}

declare interface GetSaleLegalNftsRes extends apiResponse {
  data: {}
}

declare interface LegalNFT {
  nftBackIcon: string
  nftBalance: number
  nftCertificationType: number
  nftChargeUnit: string
  nftClassifyList: string[]
  nftCodehash: string
  nftCurrentAuctionBidTxId: string
  nftCurrentAuctionCreateTxId: string
  nftCurrentAuctionState: number
  nftCurrentBidPrice: string
  nftCurrentBidPriceInt: number
  nftDesc: string
  nftDonateCount: number
  nftEndTimeStamp: string
  nftGenesis: string
  nftGenesisCertificationName: string
  nftGenesisCertificationType: number
  nftGenesisTxId: string
  nftHasCompound: false
  nftHasDonate: false
  nftHasLike: false
  nftIcon: string
  nftIsFirstSell: false
  nftIsReady: true
  nftIssueAddress: string
  nftIssueAvatarTxId: string
  nftIssueAvatarType: string
  nftIssueMetaId: string
  nftIssueMetaTxId: string
  nftIssueVersion: string
  nftIssuer: string
  nftLikeCount: number
  nftName: string
  nftOwnerName: string
  nftOwnerAvatarType: string
  nftOwnerAddress: string
  nftOwnerAvatarTxId: string
  nftOwnerMetaId: string
  nftPrice: string
  nftSatoshi: number
  nftSellDesc: string
  nftSellState: number
  nftSensibleId: string
  nftSeriesName: string
  nftStartingPrice: string
  nftStartingPriceInt: number
  nftSymbol: string
  nftTimestamp: number
  nftTokenId: string
  nftTokenIndex: string
  nftTotalSupply: number
  nftWebsite: string
  uuid: string
}

declare interface BlindBoxItem {
  tag: string
  codehashGenesisList: any[]
  issuerMetaId: string
  issuerName: string
  issuerAvatarTxId: string
  issuerAvatarType: string
  limit: number
  timestamp: number
  url: string
  info: {
    en: {
      title: string
      content: string
      icon: string
    }
    jp: {
      title: string
      content: string
      icon: string
    }
    zh: {
      title: string
      content: string
      icon: string
    }
  }
}

declare interface GetBlindBoxList extends apiResponse {
  code: number
  data: {
    total?: number
    results: {
      items: BlindBoxItem[]
    }
  }
}

/**
 *
 */

declare interface BlindBoxSaleDetail extends apiResponse {
  code: number
  data: {
    total: number // 轮次总量
    remain: number // 剩余数
    round: number // 轮次
    bsvPrice: number // bsv价格
    rmbPrice: number // 人民币价格
    codehash: string
    genesis: string
    sellDesc: string // 销售上架描述
  }
}

declare interface BuyBlindBoxData extends apiResponse {
  code: number
  error: string
  data: {
    buyOrderId: string
    wxCoreOrderId: string
    url: string
    address: string
    amount: number
  }
}

declare interface wxcoreForBuyBlindBox extends apiResponse {
  code: number
  data: string
}

declare interface MyBlindBoxList extends apiResponse {
  code: number
  data: {
    quantity: number
  }
}

declare interface BlindBoxBuyRecordItem {
  metaid: string
  name: string
  avatar_txid: string
  avatar_type: string
  quantity: string
  create_time: string
  id: number
}

declare interface BlindBoxOpenReCordItem {
  metaid: string
  name: string
  id: number
  avatar_txid: string
  avatar_type: string
  metabot_avatar_name: string // nft名
  create_time: string
}

declare interface BlindBoxBuyRecord extends apiResponse {
  code: number
  data: BlindBoxBuyRecordItem[]
}

declare interface BlindBoxOpenReCord extends apiResponse {
  code: number
  data: BlindBoxOpenReCordItem[]
}

declare interface realBuyBlindBox extends apiResponse {
  code: number
  data: {
    order_id: string
    url: string
  }
}

declare interface openMyBlindBoxRes extends apiResponse {
  code: number
  data: {
    codehash: string
    genesis: string
    genesisTxid: string
    sensibleId: string
    tokenIndex: string
  }
}

declare interface getMetaId extends apiResponse {
  data:string
}
