import { ComponentCustomProperties } from 'vue'
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: {
      avatar: (showId: string) => string
      dateTimeFormat: (timestamp: Date | string | number, format?: string) => string
      bsv: (stas: string | number) => number
      bsvStr: (stas: string | number) => string
      assetsUrl: (stas: string) => string
      getI18nContent: (object: any, key: string, option?: any) => string
      metafile: (metafile: string, width?: number) => string
      toUser: (metaId: string) => void
      converterPrice: (amount: number) => string
      [key: symbol]: (value: any) => any
    }
  }
}
