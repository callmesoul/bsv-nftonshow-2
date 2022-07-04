<template>
  <div class="input-image">
    <div class="upload">
      <div class="add flex flex-align-center flex-pack-center">
        <template v-if="cover">
          <div class="cover-warp">
            <ElImage
              class="cover"
              fit="cover"
              :src="cover.base64Data"
              :preview-src-list="isPreview ? [cover.base64Data] : []"
              :append-to-body="true"
            />
            <a class="close" @click="emit('change', null)" v-if="isShowRemoveBtn && !disabled">{{
              $t('delete')
            }}</a>
          </div>
        </template>
        <div>
          <img class="icon" :src="UploadIcon" />
          <div class="label">{{ placeholder }}</div>
        </div>
        <input
          type="file"
          :accept="accept"
          :disabled="disabled"
          @change="onChange"
          :style="{ zIndex: isShowRemoveBtn ? 2 : 3 }"
          ref="fileRef"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tranfromImgFile } from '@/utils/util'
import UploadIcon from '@/assets/images/img_upload.svg?url'
import { ref } from 'vue'

const emit = defineEmits(['change'])

interface Props {
  cover: null | MetaFile
  placeholder?: string
  accept?: string
  isPreview?: boolean
  isShowRemoveBtn?: boolean
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  cover: null,
  placeholder: '',
  accept: 'image/*',
  isPreview: false,
  isShowRemoveBtn: true,
  disabled: false,
})

const fileRef = ref()

async function onChange(e: any) {
  const input = e.target as HTMLInputElement
  let files = input.files
  let metaFile: MetaFile | null = null
  if (files[0]) {
    metaFile = await tranfromImgFile(files[0])
  }
  emit('change', metaFile)
  fileRef.value.value = ''
}
</script>

<style lang="scss" scoped src="./InputImage.scss"></style>
