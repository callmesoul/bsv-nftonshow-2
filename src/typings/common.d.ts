declare interface Pagination {
  page: number
  pageSize: number
  loading?: boolean
  nothing?: boolean
  totalPages?: number
}

declare interface Token {
  access_token: string
  token_type?: string
  refresh_token?: string
  expires_in?: number
  expires_time?: number
}

declare interface UserInfo {
  showId: string
  metaId: string
  xpub: string
  address: string
  pubKey: string
  infoTxId: string
  protocolTxId: string
  name: string
  nameEncrypt: string
  phone: string
  phoneEncrypt: string
  email: string
  emailEncrypt: string
  headUrl: string
  headUrlEncrypt: string
  avatarTxId: string
  timestamp: number
  avatarType?: string
  rootAddress?: string
}

declare interface ScreenItem {
  label: string
  screenName: string
  type: any
  options?: ScreenItemOption[]
  val: any
  confirmVal?: any
  isNotClose?: boolean
}

declare interface ScreenItemOption {
  title: any
  val: any
}

declare interface TabItem {
  name: string
  val: any
  path?: string
}

declare interface SortListItem {
  name: Function
  val: number
  orderType?: number
  sortType: number
}

declare interface SortListItem {
  name: Function
  val: number
  orderType?: number
  sortType: number
}
