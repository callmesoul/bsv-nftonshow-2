<template>
  <el-dialog
    v-model="isCenterDialogVisible"
    :title="title"
    width="20%"
    :close-on-click-modal="false"
    center
  >
    <el-input
      v-model="input"
      :placeholder="title"
      clearable
      v-if="props.dialogType === 'metafile'"
    />
    <el-input
      v-model="signature"
      :autosize="{ minRows: 2, maxRows: 6 }"
      type="textarea"
      :placeholder="title"
      v-if="props.dialogType === 'signature'"
    >
    </el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="sendTx">{{ $t('confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, toRefs, computed } from 'vue'
import { ElDialog, ElInput, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  centerDialogVisible: {
    type: Boolean,
  },
  getMetafileTx: {
    type: Function,
  },
  dialogType: {
    type: String,
  },
})

const i18n = useI18n()
const title = computed(() => {
  if (props.dialogType === `${import.meta.env.VITE_DialogTypeMetafile}`) {
    return i18n.t('metafileTxTitle')
  } else {
    return i18n.t('editSignature')
  }
})
const input = ref('')
const signature = ref('')
const refProps = toRefs(props)
const emits = defineEmits(['update:centerDialogVisible', 'getMetafileTx'])
const isCenterDialogVisible = ref(false)
const closeDialog = () => {
  emits('update:centerDialogVisible', false)
}

function sendTx() {
  if (props.dialogType === `${import.meta.env.VITE_DialogTypeMetafile}`) {
    if (input.value) {
      emits('getMetafileTx', input.value)
    } else {
      ElMessage.error(i18n.t('metafileNotAllowNull'))
    }
  } else {
    if (signature.value) {
      emits('getMetafileTx', signature.value)
    } else {
      ElMessage.error(i18n.t('signatureNotAllowNull'))
    }
  }
}

watch(refProps.centerDialogVisible, (val, old) => {
  isCenterDialogVisible.value = val
  input.value = ''
  signature.value = ''
})
watch(isCenterDialogVisible, (val, old) => {
  emits('update:centerDialogVisible', val)
})
</script>

<style lang="scss" src="./dialog.scss"></style>
