<template>
  <UserCenter
    ref="root"
    :user-info-loading="store.state.userInfoLoading"
    :user="user"
    :isHideAuthor="true"
  >
    <router-view></router-view>
  </UserCenter>
</template>
<script setup lang="ts">
import { useStore } from '@/store'
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { router } from '@/router'
import UserCenter from '@/components/UserCenter/UserCenter.vue'

const root = ref()
const i18n = useI18n()
const store = useStore()

const user = reactive({
  name: store.state.userInfo?.name,
  metaId: store.state.userInfo?.metaId,
  address: store.state.userInfo?.address,
})

onMounted(() => {
  if (store.getters.isAuthed) {
    // 还没拿到用户信息的时候要等待拿用户信息完再调接口
    if (store.state.userInfo) {
    } else {
      store.watch(
        state => state.userInfo,
        userInfo => {
          if (userInfo) {
            ;(user.name = store.state.userInfo?.name),
              (user.metaId = store.state.userInfo?.metaId),
              (user.address = store.state.userInfo?.address)
          }
        }
      )
    }
  } else {
    ElMessage.warning(i18n.t('toLoginTip'))
    router.replace('/')
  }
})
</script>
<style lang="scss" scoped src="./Index.scss"></style>
