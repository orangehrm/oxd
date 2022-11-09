<template>
  <cropper
    class="cropper"
    :src="image"
    :stencil-component="$options.components.CircleStencil"
    :stencil-props="{
      handlers: {},
      movable: false,
      scalable: false,
      aspectRatio: 1,
    }"
    :stencil-size="{
      width: stencilWidth,
      height: stencilHeight,
    }"
    :resize-image="{
      adjustStencil: false,
    }"
    image-restriction="stencil"
    @change="change"
  />
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {Cropper, CircleStencil} from 'vue-advanced-cropper';
export default defineComponent({
  name: 'ImageCropper',
  components: {
    Cropper,
    /* eslint-disable vue/no-unused-components */
    CircleStencil,
  },
  props: {
    image: {
      type: String,
    },
    stencilWidth: {
      type: String,
      default: '280',
    },
    stencilHeight: {
      type: String,
      default: '280',
    },
  },
  emits: ['change'],

  setup(props, {emit}) {
    const croppedImage = ref('');
    const change = ({
      coordinates,
      canvas,
    }: {
      coordinates: string;
      canvas: HTMLCanvasElement;
    }) => {
      croppedImage.value = canvas.toDataURL();
      emit('change', croppedImage.value);
    };
    return {
      croppedImage,
      change,
    };
  },
});
</script>
<style src="./image-cropper.scss" lang="scss" scoped></style>
