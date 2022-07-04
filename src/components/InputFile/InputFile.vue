<template>
  <div class="input-file" :class="{ disabled: disabled }">
    <input
      :disabled="disabled"
      type="file"
      :placeholder="placeholder"
      @change="onChange"
      :accept="accept"
      ref="inputRef"
      title=""
    />
    <div class="val" v-if="originalFile" :style="{ textAlign: align }">
      {{ originalFile.raw?.name }}
    </div>
    <div class="placeholder" :style="{ textAlign: align }" v-else>{{ placeholder }}</div>
  </div>
</template>

<script setup lang="ts">
import { TextAlign } from '@/enum'
import { tranfromImgFile } from '@/utils/util'
import { ref } from 'vue'

const emit = defineEmits(['change'])
const inputRef = ref()
interface Props {
  originalFile: null | MetaFile
  placeholder?: string
  accept?: string
  align?: TextAlign
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  originalFile: null,
  placeholder: '',
  accept: '*',
  align: TextAlign.Right,
  disabled: false,
})

async function onChange(e: any) {
  const input = e.target as HTMLInputElement
  let files = input.files
  const metaFiles: MetaFile[] = []
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const res = await tranfromImgFile(files[i])
      metaFiles.push(res)
    }
  }
  emit('change', metaFiles)
  inputRef.value.value = ''
}
</script>

<style lang="scss" scoped src="./InputFile.scss"></style>
