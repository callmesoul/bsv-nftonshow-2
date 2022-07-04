// @ts-ignore
import { ToBsvType } from '@/enum'
import dayjs from 'dayjs'
import Decimal from 'decimal.js-light'
import i18n from './i18n'
import { router } from '@/router'
import { UnitName } from '@/config'
import { store } from '@/store'
import WalletIcon from '@/assets/svg/icon_wallet.svg?url'

const mode = import.meta.env.MODE
export function avatar(showId: string) {
  if (!showId || showId === '') return WalletIcon
  else {
    return `${
      import.meta.env.VITE_AppImgApi
    }/metafile/avatar/${showId}?time=${new Date().getTime()}`
  }
}

export function dateTimeFormat(timestamp: Date | number, format = 'YYYY-MM-DD HH:mm:ss') {
  if (timestamp === 0) return i18n.global.t('noTime')
  return dayjs(timestamp).format(format)
}

export function bsv(stas: number | string) {
  if (typeof stas === 'undefined') return 0
  return new Decimal(stas).div(Math.pow(10, 8)).toNumber()
}

export function toCNY(stas: number | string) {
  if (typeof stas === 'undefined') return 0

  return Number(stas) / 100
}

export function bsvStr(stas: number | string) {
  if (typeof stas === 'undefined') return '--'
  return new Decimal(stas).div(Math.pow(10, 8)).toString()
}

export function satoshis(stas: number | string) {
  if (typeof stas === 'undefined') return 0
  return new Decimal(stas).mul(Math.pow(10, 8)).toNumber()
}

export function satoshisStr(stas: number | string) {
  if (typeof stas === 'undefined') return '--'
  return new Decimal(stas).div(Math.pow(10, 8)).toString()
}

/**
 * @function 获取对象对应i18n内容
 * @description 获取对象对应i18n内容
 * @param object 获取对应字段所在的对象
 * @param key 对应字段前缀，例如 introJp = intro
 * @param option 需要替换的配置，因为后端返回的翻译字段不一定对应前端字段，后端中文标识是cn 而前端是zh 则可以传 {'zh': 'cn'} 解决
 * _________________ _________________
 * | 年龄 | 姓名 | | 年龄 | 姓名 |
 * ----------------- mergeCells(grid,[0]) -----------------
 * | 18 | 张三 | => | | 张三 |
 * ----------------- - 18 ---------
 * | 18 | 王五 | | | 王五 |
 * ----------------- -----------------
 */
export function getI18nContent(object: any, key: string, option?: any) {
  let localeValue = i18n.global.locale.value
  if (option) {
    for (const i in option) {
      if (localeValue === i) {
        localeValue = option[i]
        break
      }
    }
  }
  const i18nKey = `${key}${localeValue.slice(0, 1).toLocaleUpperCase()}${localeValue.slice(
    1,
    i18n.global.locale.value.length
  )}`
  if (object && object[i18nKey]) {
    return object[i18nKey]
  } else {
    return ''
  }
}

export function metafile(metafile: string, width = 235) {
  
  if (typeof metafile !== 'string') return ''
  if (metafile.indexOf('http://') !== -1 || metafile.indexOf('https://') !== -1) return metafile
  metafile = metafile.replace('metafile://', '')
  if (metafile === '') return ''
  const fileUrl = `${import.meta.env.VITE_AppImgApi}/metafile/${metafile}`
  if (width === -1) {
    return fileUrl
  }
  let query = 'x-oss-process=image/auto-orient,1/quality,q_80'
  if (width) {

    
    query += `/resize,m_lfit,w_${width}`
  }
  return `${fileUrl}?${query}`
}

export function toUser(metaId: string) {
  router.push({
    name: 'user',
    params: {
      metaId,
    },
  })
}

export function converterPrice(amount: number) {
  if (amount) {
    if (store.getters.getterCurrentPrice === UnitName.BSV) {
      return new Decimal(amount).div(10 ** 8).toString() + ' ' + 'BSV'
    } else {
      let cnyPrice = `${(
        new Decimal(amount).div(10 ** 8).toNumber() * store.state.exchangeRate.cnyRate
      ).toFixed(2)}`
      return `¥ ${+cnyPrice < 0.01 ? 0.01 : cnyPrice}`
    }
  } else {
    return '--'
  }
}

export function legalNftConverterPrice(amount: number) {
  if (amount) {
    if (store.getters.getterCurrentPrice === UnitName.BSV) {
      return `${parseFloat(
        new Decimal(amount)
          .div(100)
          .div(store.state.exchangeRate.cnyRate)
          .toNumber()
          .toFixed(8)
      )} BSV`
    } else {
      return `¥ ${new Decimal(amount)
        .div(100)
        .toNumber()
        .toFixed(2)}`
    }
  } else {
    return '--'
  }
}

export function legalNftConverterCNY(amount: number | string) {
  if (amount) {
    let cnyPrice = new Decimal(amount)
      .div(100)
      .toNumber()
      .toFixed(2)
    console.log('zxcz22asdasda', cnyPrice)
    return +cnyPrice < 0.01 ? 0.01 : cnyPrice
  } else {
    return '--'
  }
}

export function legalNftConverterBSV(amount: number | string) {
  if (amount) {
    return parseFloat(
      new Decimal(amount)
        .div(100)
        .div(store.state.exchangeRate.cnyRate)
        .toNumber()
        .toFixed(8)
    )
  } else {
    return '--'
  }
}

export function converterBSV(amount: number | string) {
  if (amount) {
    return new Decimal(amount).div(10 ** 8).toNumber()
  } else {
    return '--'
  }
}

export function converterCNY(amount: number | string) {
  if (amount) {
    let cnyPrice = (
      new Decimal(amount).div(10 ** 8).toNumber() * store.state.exchangeRate.cnyRate
    ).toFixed(2)
    return +cnyPrice < 0.01 ? 0.01 : cnyPrice
  } else {
    return '--'
  }
}
