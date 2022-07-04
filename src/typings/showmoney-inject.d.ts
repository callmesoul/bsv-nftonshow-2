export interface ObjTypes<T> {
  [key: string]: T
  [key: number]: T
}
export interface ExtActionResponseTypes {
  code: number
  status: 'success' | 'cancel' | 'error'
  data?: ObjTypes<any>
}
export interface ExtActionParamsTypes {
  callback?: (
    res: ExtActionResponseTypes,
    resolve: { (value: ExtActionResponseTypes | PromiseLike<ExtActionResponseTypes>): void; (arg0: ExtActionResponseTypes): void },
    reject: { (reason?: any): void; (): void }
  ) => void
  payload?: ObjTypes<unknown>
}

export interface ShowmoneyInjectorTypes {
  isConnected: boolean,
  getUserInfo: (params: ExtActionParamsTypes) => void
  issueNFT: (params: ExtActionParamsTypes) => void
  genesisNFT: (params: ExtActionParamsTypes) => void
  getBalance: (params: ExtActionParamsTypes) => void
  nftSell: (params: ExtActionParamsTypes) => void
  nftBuy: (params: ExtActionParamsTypes) => void
  nftCancel: (params: ExtActionParamsTypes) => void
  nftStartAuction: (params: ExtActionParamsTypes) => void
  nftAuctionBid: (params: ExtActionParamsTypes) => void
  nftAuctionWithdraw: (params: ExtActionParamsTypes) => void
  addProtocolNode: (params: ExtActionParamsTypes) => void
}
