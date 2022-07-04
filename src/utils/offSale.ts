import Decimal from 'decimal.js-light'
import { ElMessage } from 'element-plus'
import { store } from '@/store'
import { RemoveDeadlineTime } from '@/api'
import i18n from './i18n'
import { confirmToSendMetaData } from './util'

export default function NftOffSale(nft: NftItemDetail, loading?: any) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const params = {
        codehash: nft.codeHash,
        genesis: nft.genesis,
        tokenIndex: nft.tokenIndex,
        genesisTxid: nft.genesisTxId,
        satoshis: new Decimal(nft.amount).toNumber(),
        sensibleId: nft.sensibleId,
        sellTxId: nft.sellTxId,
        sellContractTxId: nft.sellContractTxId,
      }
      // console.log('下架参数', params)
      const useAmountRes = await store.state.sdk?.nftCancel({
        checkOnly: true,
        ...params,
      })
      if (useAmountRes?.code === 200) {
        const result = await confirmToSendMetaData(useAmountRes.data.amount)
        if (result) {
          // 确认支付
          const res = await store.state.sdk?.nftCancel(params)
          if (res?.code === 200) {
            // 上报服务器 移除时间
            await RemoveDeadlineTime({
              genesis: nft.genesis,
              codeHash: nft.codeHash,
              tokenIndex: nft.tokenIndex,
              deadlineTime: nft.remainingTime,
            })

            nft.putAway = false
            ElMessage.success(i18n.global.t('offsale') + i18n.global.t('success'))
            resolve()
          }
        }
      }
    } catch (error) {
      if (loading) loading.close()
      reject(error)
    }
  })
}
