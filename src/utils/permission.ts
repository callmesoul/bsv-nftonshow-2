import { router } from '@/router'
import { Action, store } from '@/store'
import { ElMessage } from 'element-plus'
import i18n from './i18n'
import { checkUserCanIssueNft } from './util'

router.beforeEach(async (to, from, next) => {
  const isPhone = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  if (isPhone && to.name !== 'guide' && !store.state.isApp && import.meta.env.MODE === 'ruoxi') {
    document.title = '若喜'
    router.push({ name: 'guide' })
  } else {
    if (to.query && to.query.refCode && typeof to.query.refCode === 'string') {
      localStorage.setItem('refCode', to.query.refCode)
    }

    if (typeof to.name === 'string' && to.name.indexOf('app') !== -1) {
      next()
    } else if (store.getters.isExtConnected) {
      console.log('isConnected', store.getters.isExtConnected)
      if (!store.state.userInfo && !store.state.userInfoLoading) {
        store.dispatch(Action.getUserInfo)
      }
      next()
    } else {
      // 获取系统配置信息
      if (!store.state.isSetedSystemConfig) {
        await store.dispatch(Action.setSystemConfig)
      }
      // app
      const isApp = store.state.isApp
      if (isApp) {
        //  没有用户信息， 也没有正在加载用户信息，则去获取用户信息
        if (!store.state.userInfo && !store.state.userInfoLoading) {
          store.dispatch(Action.getUserInfo)
        }
      } else {
        // web
        const token = store.state.token
        if (token) {
          const now = new Date().getTime()
          // token 过期先刷新 token，没过期直接用
          // if (now >= token.expires_time!) {
          //   await store.dispatch(Action.refreshToken)
          // }
          // 有 token 没有初始化 sdk 就去初始化 sdk
          if (!store.state.sdk && !store.state.sdkInitIng) {
            store.dispatch(Action.initSdk)
          }

          if (to.name === 'create' && store.state.userInfo) {
            const result = await checkUserCanIssueNft()
            if (!result) return
          }
        } else {
          // 没有 token
          const isAuth = to.meta && to.meta.isAuth ? to.meta.isAuth : false
          if (isAuth) {
            // 需要权限的提示先登陆且不给予跳转
            ElMessage.error(i18n.global.t('toLoginTip'))
            return
          }
        }
      }
      next()
    }
  }
})
