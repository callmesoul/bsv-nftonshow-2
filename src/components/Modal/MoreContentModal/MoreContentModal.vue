<template>
  <!-- drsc detail -->
  <ElDialog v-model="visible" custom-class="modal" :title="title" @close="emit('change', false)">
    <div class="modal-drsc">
      <pre>
       <slot></slot>   
      </pre>
    </div>
    <template #footer>
      <div class="modal-footer" slot="footer">
        <div class="btn btn-default" @click="emit('change', false)">
          {{ $t('confirm') }}
        </div>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['change'])
interface Props {
  title: string
  visible: boolean
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '',
})
</script>

<style lang="scss" scoped></style>
