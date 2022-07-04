import { checkSdkStatus, confirmToSendMetaData } from './util'
import { store } from '@/store'

export function auctionConfirmSend(params: any) {
  return new Promise<boolean>(async (resolve, reject) => {
    checkSdkStatus()

    try {
      const res = await store.state.sdk.nftAuctionWithdraw({
        ...params,
        checkOnly: true,
      })
      if (res.code === 200) {
        const result = await confirmToSendMetaData(res.data.amount)
        if (result) {
          const response = await store.state.sdk.nftAuctionWithdraw(params)
          if (response.code === 200) {
            resolve(true)
          }
        }
      }
    } catch (error) {
      reject(error)
    }
  })
}
