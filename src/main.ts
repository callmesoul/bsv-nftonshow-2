import { createApp, DirectiveBinding } from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css'
import { router } from '@/router'
// element-plus
import { ElLoadingDirective } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/message-box/style/css'

import './index.scss'
import * as filters from '@/utils/filters'
import i18n from '@/utils/i18n'
import UserAvatar from '@/components/NftUserAvatar/NftUserAvatar.vue'
import '@/utils/permission'

// 销毁serviceWorker
if (navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (const registration of registrations) {
      registration.unregister()
    }
  })
}

const app = createApp(App)

// 挂载全局过滤器
app.config.globalProperties.$filters = {
  ...filters,
}

// 全局组件
app.component('UserAvatar', UserAvatar)
app.directive('loading', ElLoadingDirective)

// 去除空格
app.directive('trim', {
  // 当被绑定的元素挂载到 DOM 中时……
  beforeUpdate: function(el, binding) {
    el.value = el.value.replace(/\s*/g, '')
  },
})

/*
 * @Descripttion: 节流,单位时间内可触发一次
 * @param [function] func --执行事件
 * @param [?number|300] wait = 300 -- 时间间隔
 * @param [?string|"click"] event -- 事件类型
 * @param [?boolean|true] boolean -- 事件冒泡-false , 事件捕获--true
 * @param [Array] binding.value - [func,type,wait,true]
 * <a-button v-debounce="[throttle,'click',1000,true]">防抖测试</a-button>
 */
app.directive('debounce', {
  beforeMount(el: any, binding: any) {
    const [func, type = 'click', wait = 500, immediate = true] = binding.value
    let timer: any
    el.$type = type
    el.$handle = () => {
      timer && clearTimeout(timer)
      timer = setTimeout(() => func(), wait)
    }
    el.addEventListener(el.$type, el.$handle, immediate)
  },
  unmounted(el: any) {
    el.removeEventListener(el.$type, el.$handle)
  },
})

// @ts-ignore
window.showAvatarCallBack = (params: any) => {
  if (params.disabled) return
  router.push({
    name: 'user',
    params: {
      metaId: params.metaid,
    },
  })
}

app
  .use(router)
  .use(i18n)
  .mount('#app')
