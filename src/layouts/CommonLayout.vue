<template>
  <router-view v-slot="{ Component, route }">
    <Transition name="fade">
      <div class="transition-warp flex1" :class="{ setFull: route.meta?.isHideHeaderAndFooter }">
        <KeepAlive>
          <component
            :is="Component"
            :key="route.fullPath"
            v-if="route.meta && route.meta.keepAlive"
          />
        </KeepAlive>
        <component
          :is="Component"
          :key="route.fullPath"
          v-if="!route.meta || (route.meta && !route.meta.keepAlive)"
        />
      </div>
    </Transition>
  </router-view>
</template>
<script lang="ts" setup>
import { KeepAlive, Transition } from 'vue'
</script>
