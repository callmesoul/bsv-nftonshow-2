<template>
  <div class="cropper flex flex-v" v-if="visible">
    <img id="imgCropper" :src="img" class="flex1" />
    <div class="operate flex flex-align-center">
      <ElButton class="flex1" type="primary" @click="confirm">{{ $t('confirm') }}</ElButton>
      <ElButton class="flex1" @click="emit('cancel')">{{ $t('cancel') }}</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { computed, nextTick, reactive, watch } from 'vue'

interface Props {
  img: string | null
  visible: boolean
}
const props = withDefaults(defineProps<Props>(), {
  img: null,
  visible: false,
})
let cropper: { val: Cropper | null } = reactive({ val: null })

const emit = defineEmits(['cancel', 'confirm'])

watch(
  () => props.visible,
  visible => {
    if (visible && props.img) {
      nextTick(() => {
        const target = document.getElementById('imgCropper')
        cropper.val = new Cropper(target, {
          /*
        * viewMode 视图控制
          - 0 无限制
          - 1 限制裁剪框不能超出图片的范围
          - 2 限制裁剪框不能超出图片的范围 且图片填充模式为 cover 最长边填充
          - 3 限制裁剪框不能超出图片的范围 且图片填充模式为 contain 最短边填充
        * */
          viewMode: 0,
          // 设置图片是否可以拖拽功能
          /*
        * dragMode 拖拽图片模式
          - crop 形成新的裁剪框
          - move 图片可移动
          - none 什么也没有
        * */
          dragMode: 'move',
          // 是否显示图片后面的网格背景,一般默认为true
          background: true,
          aspectRatio: 120 / 17,
          // 进行图片预览的效果
          preview: '.before',
          // 设置裁剪区域占图片的大小 值为 0-1 默认 0.8 表示 80%的区域
          autoCropArea: 0.8,
          // 设置图片是否可以进行收缩功能
          zoomOnWheel: true,
          // 是否显示 + 箭头
          center: true,
        })
      })
    } else {
      cropper.val = null
    }
  }
)

function confirm() {
  emit('confirm', cropper.val.getCroppedCanvas().toDataURL('image/jpeg'))
}
</script>

<style lang="scss" scoped src="./Cropper.scss"></style>
