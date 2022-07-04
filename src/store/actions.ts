import { ActionTree, ActionContext } from 'vuex'

import { State } from './state'
import { Mutations, Mutation } from './mutations'
import {
  GetBanners,
  GetCertMetaIdList,
  getExchangeRate,
  GetSeries,
  GetToken,
  getTopics,
  GetUserCanCreateClassify,
  GetUserDiscount,
  NftApiCode,
  QueryFindMetaDataForPost,
  // GetMyFollowList,
} from '@/api'
import Sdk from '@/utils/sdk'
import { store } from '.'
import { getUserSeries } from '@/utils/util'

export enum Action {
  initApp = 'initApp',
  initSdk = 'initSdk',
  connectExt = 'connectExt',
  getUserInfo = 'getUserInfo',
  refreshToken = 'refreshToken',
  checkToken = 'checkToken',
  setUserDiscount = 'setUserDiscount',
  setSystemConfig = 'setSystemConfig',
  setUserSeries = 'setUserSeries',
  setUserCanCreateClassify = 'setUserCanCreateClassify',
  GetExchangeRate = 'GetExchangeRate',

  // setMyFollowList = 'setUserCanCreateClassify',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [Action.initApp]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.connectExt]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.initSdk]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.getUserInfo]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.refreshToken]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.checkToken]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.setUserDiscount]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.setSystemConfig]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.setUserSeries]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.setUserCanCreateClassify]({ state, commit, dispatch }: AugmentedActionContext): void
  [Action.GetExchangeRate]({ state, commit, dispatch }: AugmentedActionContext): void

  // [Action.setMyFollowList]({ state, commit, dispatch }: AugmentedActionContext): void
}

export const actions: ActionTree<State, State> & Actions = {
  [Action.initApp]({ state, commit, dispatch }) {},
  [Action.initSdk]({ state, commit, dispatch }) {
    const initSdkTimeOut = setTimeout(() => {
      commit(Mutation.LOGOUT)
    }, 60000)
    state.sdkInitIng = true
    state.userInfoLoading = true
    state.sdk = new Sdk({
      baseUri: import.meta.env.VITE_AuthUrl,
      oauthSettings: {
        clientId: import.meta.env.VITE_AppId,
        redirectUri: import.meta.env.VITE_Hosts + import.meta.env.VITE_RedirectPath,
        clientSecret: import.meta.env.VITE_AppSecret,
      },
      onLoaded: () => {
        clearTimeout(initSdkTimeOut)
        state.sdkInitIng = false
        dispatch(Action.getUserInfo)
      },
      onError: () => {
        clearTimeout(initSdkTimeOut)
        commit(Mutation.LOGOUT)
      },
    })
  },
  [Action.connectExt]({ state, getters, commit, dispatch }) {
    state.userInfoLoading = true
    if (state.hasExtension) {
      window.Showmoney.connect({
        callback: (res: any) => {
          if (res.code === 200) {
            state.sdk = new Sdk()
            dispatch(Action.getUserInfo)
          } else {
            state.userInfoLoading = false
          }
        },
      })
    } else {
      console.error('未安装插件')
      state.userInfoLoading = false
    }
  },

  async [Action.getUserInfo]({ state, commit, dispatch }) {
    const res = await state.sdk?.getUserInfo().catch(() => {
      state.sdkInitIng = false
      state.userInfoLoading = false
      commit(Mutation.LOGOUT)
    })
    if (res && res.code === 200 && res.data.metaId) {
      const userInfo = res.data
      // 数据兼容
      if (userInfo.rootAddress) {
        userInfo.address = userInfo.rootAddress
      }
      if (userInfo.metaId) {
        userInfo.showId = userInfo.metaId
      }
      commit(Mutation.SETUSERINFO, userInfo.metaId ? userInfo : null)
      await dispatch(Action.setUserSeries)
      if (state.isApp && res.appAccessToken) {
        commit(Mutation.SETTOKEN, {
          access_token: res.appAccessToken,
        })
      }
      // 中心化登陆
      if (!state.sdk?.isExtension) {
        commit(Mutation.NFTLOGIN)
      }
      dispatch(Action.setUserDiscount)
      dispatch(Action.setUserCanCreateClassify)
      // dispatch(Action.setUserSeries)
    } else {
      state.sdkInitIng = false
      state.userInfoLoading = false
      commit(Mutation.LOGOUT)
    }
    // state.sdk?.getUserInfo({
    //   accessToken: state.token ? state.token?.access_token : '',
    //   callback: (res: { data: UserInfo }) => {
    //     commit(Mutation.SETUSERINFO, res.data)
    //   }
    // })
  },
  [Action.refreshToken]({ state, commit, dispatch }) {
    return new Promise<void>(async (resolve, reject) => {
      if (state.token) {
        const res = await refreshToken(state.token!.refresh_token!).catch(() => {
          reject('refresh_token fail')
        })
        if (res) {
          commit(Mutation.SETTOKEN, res)
          resolve()
        } else {
          new Error('refresh_token fail')
          reject('refresh_token fail')
        }
      } else {
        new Error('refresh_token fail')
        reject('refresh_token fail')
      }
    })
  },
  [Action.checkToken]({ state, commit, dispatch }) {
    return new Promise<string | null>(async resolve => {
      if (state.token) {
        const now = new Date().getTime()
        if (now < state.token.expires_time!) {
          const res = await refreshToken(state.token?.refresh_token!).catch(() => {
            commit(Mutation.SETTOKEN, undefined)
            resolve(null)
          })
          if (res) {
            commit(Mutation.SETTOKEN, res)
            resolve(res.access_token)
          } else {
            new Error('refresh_token fail')
            resolve(null)
          }
        } else {
          resolve(state.token.access_token)
        }
      } else {
        resolve(null)
      }
    })
  },
  [Action.setUserDiscount]({ state, commit, dispatch }) {
    return new Promise<string | null>(async resolve => {
      const res = await GetUserDiscount({
        metaId: state.userInfo?.metaId,
        zeroAddress: state.userInfo?.address || state.userInfo?.rootAddress,
      })
      if (res.code === 0) {
        state.userDiscount = parseFloat(res.data.nosRate)
      }
    })
  },
  [Action.setSystemConfig]({ state, commit, dispatch }) {
    return new Promise<void>(async resolve => {
      state.isSetedSystemConfig = true
      const result = await Promise.all([
        GetCertMetaIdList(),
        GetBanners(),
        getTopics(),
        getExchangeRate(),
      ]).catch(() => {
        state.isSetedSystemConfig = false
      })
      if (result) {
        if (result[0].code === 0) {
          state.isCertedMetaIds = result[0].data
        }
        if (result[1].code === 0) {
          state.banners = result[1].data.result
        }
        if (result[2].code === 0) {
          // state.topics = result[2].data.result

          // let legalItem: any[] = [
          //   {
          //     coverPicUrlEn: '',
          //     coverPicUrlJp: '',
          //     coverPicUrlZh: '',
          //     createAvatarTxId: '',
          //     createAvatarType: 'avatar',
          //     createMetaId: '4a147017b565ca0af515c2928148281426f1a427d8c6c83ab0f69324f0a2f423',
          //     createName: 'CNY上架专辑',
          //     info: {},
          //     key: 'legal',
          //     name: 'CNY上架专辑',
          //     sort: 20,
          //     tabList: [],
          //     tag: 'string',
          //     timestamp: 0,
          //     url: '',
          //   },
          // ]
          state.topics = result[2].data.result
        }
        if (result[3].code === 0) {
          if (result[3].data.cnyRate != 0) {
            window.localStorage.setItem('exchangeRate', JSON.stringify(result[3].data))
            state.exchangeRate = result[3].data
          } else {
            state.exchangeRate = JSON.parse(window.localStorage.getItem('exchangeRate'))
          }
        }
      }
      resolve()
    })
  },
  [Action.setUserSeries]({ state, commit, dispatch }) {
    return new Promise<void>(async resolve => {
      /* const res = await QueryFindMetaDataForPost({
        find: {
          parentNodeName: 'NftGenesis',
          // 'data.totalSupply': { $gt: 1 },
          'data.seriesName': { $exists: true },
          rootTxId: state.userInfo.metaId,
        },
        skip: 0,
        limit: 99,
        sort: { timestamp: -1 },
      })
      if (res.code === 200) {
        res.result.data
      } */

      state.series.length = 0
      const key = `nftGenesis${state.userInfo.metaId}`
      const string = localStorage.getItem(key)
      const isHasGetOldSeriesKey = `isHasGetOldSeriesKey${state.userInfo.metaId}`
      if (string) {
        const list = JSON.parse(string)
        state.series.push(
          ...list.filter((item: any) => item.metaId === store.state.userInfo?.metaId)
        )
      }
      const isHasGetOldSeries = localStorage.getItem(isHasGetOldSeriesKey)
      if (!isHasGetOldSeries) {
        const res = await GetSeries({ page: 1, pageSize: 99 })
        if (res.code === NftApiCode.success) {
          if (res.data.length > 0) {
            res.data.map((item: any) => {
              state.series.push({
                name: item.series,
                currentNumber: item.currentNumber,
                maxNumber: item.maxNumber,
                codeHash: item.codeHash,
                genesis: item.genesis,
                genesisTxId: item.genesisTxId,
                sensibleId: item.sensibleId,
                metaId: store.state.userInfo.metaId,
              })
            })
          }
        }
        localStorage.setItem(key, JSON.stringify(state.series))
        localStorage.setItem(isHasGetOldSeriesKey, 'true')
      }

      resolve()
    })
  },
  [Action.setUserCanCreateClassify]({ state, commit, dispatch }) {
    return new Promise<void>(async resolve => {
      const res = await Promise.all([
        GetUserCanCreateClassify('avatar'),
        GetUserCanCreateClassify('card'),
        GetUserCanCreateClassify('rights'),
        GetUserCanCreateClassify('emoji'),
        GetUserCanCreateClassify('background'),
      ])
      if (res) {
        if (res[0] && res[0].code === 0) {
          const index = res[0].data.findIndex(item => item === state.userInfo.metaId)
          if (index !== -1) {
            const avatarIndex = state.classifyList.findIndex(item => item.classify === 'avatar')
            state.classifyList[avatarIndex].disabled = false
          }
        }

        if (res[1] && res[1].code === 0) {
          const index = res[1].data.findIndex(item => item === state.userInfo.metaId)
          if (index !== -1) {
            const cardIndex = state.classifyList.findIndex(item => item.classify === 'card')
            state.classifyList[cardIndex].disabled = false
          }
        }

        if (res[2] && res[2].code === 0) {
          const index = res[2].data.findIndex(item => item === state.userInfo.metaId)
          if (index !== -1) {
            const rightsIndex = state.classifyList.findIndex(item => item.classify === 'rights')
            state.classifyList[rightsIndex].disabled = false
          }
        }

        if (res[3] && res[3].code === 0) {
          const index = res[3].data.findIndex(item => item === state.userInfo.metaId)
          if (index !== -1) {
            const emojiIndex = state.classifyList.findIndex(item => item.classify === 'emoji')
            state.classifyList[emojiIndex].disabled = false
          }
        }

        if (res[4] && res[4].code === 0) {
          const index = res[4].data.findIndex(item => item === state.userInfo.metaId)
          if (index !== -1) {
            const backgroundIndex = state.classifyList.findIndex(
              item => item.classify === 'background'
            )
            state.classifyList[backgroundIndex].disabled = false
          }
        }
      }
      resolve()
    })
  },
  [Action.GetExchangeRate]({ state, commit, dispatch }) {
    return new Promise<void>(async resolve => {
      const res = await getExchangeRate()
      if (res.code == 0) {
        state.exchangeRate = res.data
      }
      if (!state.isSetedSystemConfig) {
        setInterval(() => {
          dispatch(Action.GetExchangeRate)
        }, 60 * 1000)
      }
      resolve()
    })
  },
  // [Action.setMyFollowList]({ state, commit, dispatch }) {
  //   return new Promise<void>(async resovle => {
  //     const res: any = await GetMyFollowList({
  //       metaId: state.userInfo?.metaId,
  //     })
  //     if (res.code == 0) {
  //       commit(Mutation.SETMYFOLLOWLIST, res.data)
  //     }
  //     resovle()
  //   })
  // },
}

function refreshToken(refresh_token: string) {
  return new Promise<Token>(async (resolve, reject) => {
    const res = await GetToken({
      grant_type: 'refresh_token',
      client_id: import.meta.env.VITE_AppId,
      client_secret: import.meta.env.VITE_AppSecret,
      refresh_token: refresh_token,
    }).catch(() => {
      store.commit(Mutation.LOGOUT)
    })
    if (res) {
      resolve(res)
    } else {
      new Error('refresh_token fail')
      reject('refresh_token fail')
    }
  })
}
