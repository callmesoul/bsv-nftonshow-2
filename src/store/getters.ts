import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  isReady(state: State): boolean
  isCerted(state: State): boolean
  isExtConnected(): boolean
  isAuthed(state: State): boolean
  getterCurrentPrice(state: State): string
}

export const getters: GetterTree<State, State> & Getters = {
  isReady(state) {
    return !state.isInitialized
  },
  isCerted(state) {
    let value = false
    if (state.userInfo && state.isCertedMetaIds.length > 0) {
      const metaid = state.isCertedMetaIds.find(item => item === state.userInfo.metaId)
      if (metaid) {
        value = true
      }
    }
    return value
  },
  isExtConnected() {
    return window.Showmoney && window.Showmoney.isConnected
  },
  isAuthed(state) {
    return (window.Showmoney && window.Showmoney.isConnected) || !!state.token
  },
  getterCurrentPrice(state) {
    return window.localStorage.getItem('currentPrice') || state.currentPrice
  },
}
