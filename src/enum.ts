export const enum SortType {
  Time = 0,
  Price = 1,
  Index = 2,
  Default = 3,
}

export const enum OrderType {
  ASC = 1,
  DESC = -1,
}

export const enum ToBsvType {
  Number = 'number',
  String = 'string',
}
export const enum TextAlign {
  Start = 'start',
  End = 'end',
  Right = 'right',
  Center = 'center',
  Justify = 'justify',
  MatchParent = 'match-parent',
}

export enum ScreenTypes {
  ButtonList = 'ButtonList',
  Price = 'Price',
  CheckboxList = 'checkboxList',
}

export enum InfoLang {
  en = 'en',
  zh = 'zh',
  jp = 'jp',
}

export enum legalOrderType {
  PRICE = 1, // 按价格排序
  ID = 2, // 按序号排序
}

export enum legalSortType {
  ASC = 1, // 正序
  DESC = 2, // 倒序
}

export enum legalSellType {
  SALE = 1, // 可购买
  NONSALE = 2, // 非销售
  AUCTION = 3, // 拍卖
  NEWSALE = 4, // 新上架
}

export enum orderError {
  lostParams = 1000,
  notAllowBuy = 1001,
  restEnougth = 1002,
  limitedOnceSale = 1003,
  limitedMetaIdBuy = 1004,
  serviceBusy = 1005,
  notFoundWxCoreId = 1006,
  wxCoreOrderFail = 1007,
  noThatBlindBox = 1008,
  noThisNft = 1009,
}

export enum PayPlatform {
  WechatPay = 1,
  AliPay = 2,
  Sand = 300,
  BSV = 3,
}

export enum PaySource {
  WEB = 'web',
  IOS = 'ios',
  ANDROID = 'android',
}
