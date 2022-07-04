<template>
  <div id="tab-warp">
    <ElSkeleton :loading="isSkeleton" animated>
      <template #template>
        <div id="tabs">
          <template v-for="tab in Array.from({ length: 3 })">
            <ElSkeletonItem variant="button" />
          </template>
        </div>
      </template>
      <template #default>
        <div id="tabs">
          <template v-for="tab in tabs" :key="tab.val">
            <router-link :to="tab.path" v-if="tab.path">
              {{ tab.name }}
            </router-link>
            <a :class="{ active: val === tab.val }" v-else @click="change(tab.val)">
              {{ tab.name }}
            </a>
          </template>
        </div>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['change'])

interface Props {
  tabs: TabItem[]
  val?: any
  isSkeleton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSkeleton: false,
})
console.log('zxzxz22asasz', props.tabs)
function change(val: any) {
  if (props.val === val) return

  emit('change', val)
}
</script>

<style lang="scss" scoped src="./Tab.scss"></style>
