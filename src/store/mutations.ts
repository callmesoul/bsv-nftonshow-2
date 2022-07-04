import { Login, GetMyFollowList, getExchangeRate } from '@/api'
import { MutationTree } from 'vuex'
import { State } from './state'

export enum Mutation {
  INCREMENT = 'INCREMENT',
  SETTOKEN = 'SETTOKEN',
  SETUSERINFO = 'SETUSERINFO',
  SETUSERINFOLOADING = 'SETUSERINFOLOADING',
  LOGOUT = 'LOGOUT',
  NFTLOGIN = 'NFTLOGIN',
  SETHEADIMG = 'SETHEADIMG',
  SETMYFOLLOWLIST = 'SETMYFOLLOWLIST',
  ADDSERIES = 'ADDSERIES',
  UPDATESERIESNUM = 'UPDATESERIESNUM',
  REMOVESERIES = 'REMOVESERIES',
  CHANGEPRICES = 'CHANGEPRICES',
  GETEXCHANGERATE = 'GETEXCHANGERATE',
  GetLimitedTime='GetLimitedTime'
}

export type Mutations<S = State> = {
  [Mutation.INCREMENT](state: S, payload: number): void
  [Mutation.SETTOKEN](state: S, payload: Token): void
  [Mutation.SETUSERINFO](state: S, payload: UserInfo): void
  [Mutation.SETUSERINFOLOADING](state: S, payload: boolean): void
  [Mutation.LOGOUT](state: S): void
  [Mutation.NFTLOGIN](state: S): void
  [Mutation.SETHEADIMG](state: S): void
  [Mutation.SETMYFOLLOWLIST](state: S): void
  [Mutation.ADDSERIES](state: S, seriesItem: SeriesItem): void
  [Mutation.UPDATESERIESNUM](state: S, payload: { series: string; currentNumber?: number }): void
  [Mutation.REMOVESERIES](state: S, series: string): void
  [Mutation.CHANGEPRICES](state: S, payload: string): void
  [Mutation.GETEXCHANGERATE](state: S, payload: boolean): void
  [Mutation.GetLimitedTime](state: S, payload: number): void
}

export const mutations: MutationTree<State> & Mutations = {
  async [Mutation.GetLimitedTime](state: State, payload: number){
    state.blindboxLimitedTime=payload
  },
  async [Mutation.GETEXCHANGERATE](state: State, payload: boolean) {
    const res = await getExchangeRate()
    if (res.code == 0) {
      state.exchangeRate = res.data
    }
  },
  [Mutation.CHANGEPRICES](state: State, payload: string) {
    state.currentPrice = payload
  },
  async [Mutation.SETMYFOLLOWLIST](state: State, payload: string = '') {
    const res: any = await GetMyFollowList({
      metaId: payload,
    })
    if (res.code == 0) {
      state.myFollowList = res.data
    }
  },
  [Mutation.SETHEADIMG](state: State, payload: any = {}) {
    state.headImgData = payload
  },
  [Mutation.INCREMENT](state: State, payload: number = 1) {
    state.count += payload
  },
  [Mutation.SETTOKEN](state: State, payload: Token) {
    localStorage.setItem('token', JSON.stringify(payload))
    state.token = payload
  },
  [Mutation.SETUSERINFO](state: State, payload: UserInfo) {
    state.userInfo = payload
    state.userInfoLoading = false
  },
  [Mutation.SETUSERINFOLOADING](state: State, payload: boolean) {
    state.userInfoLoading = payload
  },
  [Mutation.LOGOUT](state: State) {
    localStorage.removeItem('token')
    state.token = null
    state.userInfo = null
    state.sdk = null
    state.sdkInitIng = false
    state.userInfoLoading = false
  },
  async [Mutation.NFTLOGIN](state: State) {
    const timestamp = new Date().getTime()
    const message = state.userInfo!.metaId + timestamp.toString()
    const response = await state.sdk!.signMessage({
      message,
    })
    try {
      const res = await Login({
        metaId: state.userInfo!.metaId,
        xpub: state.userInfo!.xpub,
        msg: response.data.result,
        timestamp,
        type: state.isApp ? '0' : '2',
      })
      if (res?.code === 0) {
        state.nftToken = res.data.token
      }
    } catch (error) {
      if (error && typeof error === 'string') new Error(error)
      else {
        error ? new Error(JSON.stringify(error)) : ''
      }
    }
  },
  [Mutation.ADDSERIES](state: State, seriesItem: SeriesItem) {
    state.series.unshift(seriesItem)
    const key = `nftGenesis${state.userInfo.metaId}`
    localStorage.setItem(key, JSON.stringify(state.series))
  },
  [Mutation.UPDATESERIESNUM](state: State, payload: { series: string; currentNumber?: number }) {
    const index = state.series.findIndex(item => item.name === payload.series)
    if (index !== -1) {
      state.series[index].currentNumber = payload.currentNumber
        ? payload.currentNumber
        : state.series[index].currentNumber + 1

      const key = `nftGenesis${state.userInfo.metaId}`
      localStorage.setItem(key, JSON.stringify(state.series))
    }
  },
  [Mutation.REMOVESERIES](state: State, series: string) {
    const index = state.series.findIndex(item => item.name === series)
    if (index !== -1) {
      state.series.splice(index, 1)
      const key = `nftGenesis${state.userInfo.metaId}`
      localStorage.setItem(key, JSON.stringify(state.series))
    }
  },
}
