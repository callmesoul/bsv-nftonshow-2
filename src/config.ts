import i18n from '@/utils/i18n'

export const nftTypes = [
  { name: i18n.global.t('image'), value: '1', disabled: false, key: 'image' },
  { name: i18n.global.t('inkind'), value: '2', disabled: true, key: 'inkind' },
  { name: i18n.global.t('copyright'), value: '3', disabled: true, key: 'copyright' },
]
export enum UnitName {
  // SATS = 'SATS',
  BSV = 'BSV',
  RMB = 'CNY',
}

export enum Platform {
  native = 1,
  app = 2,
  h5 = 3,
  jsapi = 4,
}

export interface Unit {
  unit: string
  sats: number
  min: number
}
export const units: Unit[] = [
  {
    unit: UnitName.BSV,
    sats: 0.00000001,
    min: 0.00001,
  },
  // {
  //   unit: UnitName.SATS,
  //   sats: Math.pow(10, 8),
  //   min: 1000,
  // },
]

export const RMBUnit: Unit = {
  unit: UnitName.RMB,
  sats: 1,
  min: 5,
}

export const pagination: Pagination = {
  page: 1,
  pageSize: 16,
  loading: false,
  nothing: false,
}
