import { store } from '@/store'
import Decimal from 'decimal.js-light'
import { ElMessage, ElMessageBox } from 'element-plus'
import i18n from './i18n'
import { checkSdkStatus } from './util'

export default async function buy(nft: NftItemDetail) {
  return new Promise<boolean>(async (resolve, reject) => {
    if (!nft.putAway) {
      reject()
    } else {
      checkSdkStatus()
        .then(async () => {
          if (store.state.userInfo!.metaId === nft.ownerMetaId) {
            ElMessage.error(i18n.global.t('notCanBuySelf'))
            reject()
          } else {
            if (!nft.sellTxId || (nft.sellTxId && nft.sellTxId === '')) {
              ElMessage.error(i18n.global.t('buySellTxIdFail'))
              reject()
            } else {
              const params = {
                codehash: nft.codeHash,
                genesis: nft.genesis,
                tokenIndex: nft.tokenIndex,
                genesisTxid: nft.genesisTxId,
                sensibleId: nft.sensibleId,
                sellTxId: nft.sellTxId,
                sellContractTxId: nft.sellContractTxId,
                amount: new Decimal(nft.amount).toNumber(),
                issueMetaId: nft.nftIssueMetaId,
                issueAddress: nft.nftIssueAddress,
                isFirstSell: nft.nftIsFirstSell,
                ownerMetaId: nft.ownerMetaId,
              }
              // 需要消费金额
              const useAmountRes = await store.state.sdk
                ?.nftBuy({
                  checkOnly: true,
                  ...params,
                })
                .catch(() => {
                  reject()
                })
              if (useAmountRes?.code === 200) {
                const useAmount = useAmountRes.data.amount! + nft.amount
                // 查询用户余额
                const userBalanceRes = await store.state.sdk?.getBalance()
                if (userBalanceRes && userBalanceRes.code === 200) {
                  if (userBalanceRes.data.satoshis > useAmount) {
                    // 余额足够
                    ElMessageBox.confirm(
                      `${i18n.global.t('useAmountTips')}: ${useAmount} SATS`,
                      i18n.global.t('niceWarning'),
                      {
                        confirmButtonText: i18n.global.t('confirm'),
                        cancelButtonText: i18n.global.t('cancel'),
                        closeOnClickModal: false,
                      }
                    )
                      .then(async () => {
                        // 确认支付
                        const res = await store.state.sdk?.nftBuy(params).catch(() => reject())
                        if (res?.code === 200) {
                          resolve(true)
                        } else {
                          reject(res)
                        }
                      })
                      .catch(() => reject())
                  } else {
                    // 余额不足
                    ElMessageBox.alert(
                      `
                            <p>${i18n.global.t('useAmountTips')}: ${useAmount} SATS</p>
                            <p>${i18n.global.t('insufficientBalance')}</p>
                          `,
                      {
                        confirmButtonText: i18n.global.t('confirm'),
                        dangerouslyUseHTMLString: true,
                      }
                    )
                    reject()
                  }
                }
              } else {
                reject(useAmountRes)
                //   loading.close()
                //   if (useAmountRes) {
                //     nftNotCanBuy(useAmountRes)
                //   }
              }
            }
          }
        })
        .catch(() => {
          reject()
        })
    }
  })
}
