<template>
  <cropper
    class="cropper"
    :src="image"
    :stencil-component="$options.components.CircleStencil"
    :default-size="{
      width: stencilHeight,
      height: stencilHeight,
    }"
    :default-position="defaultPosition"
    :min-height="stencilHeight"
    :min-width="stencilHeight"
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
    CircleStencil,
  },
  props: {
    image: {
      type: String,
    },
    defaultPositionLeft: {
      type: String,
      default: '500',
    },
    defaultPositionTop: {
      type: String,
      default: '500',
    },
    stencilWidth: {
      type: String,
      default: '50',
    },
    stencilHeight: {
      type: String,
      default: '50',
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

    const defaultPosition = () => {
      return {
        left: props.defaultPositionLeft,
        top: props.defaultPositionTop,
      };
    };
    return {
      croppedImage,
      change,
      defaultPosition,
    };
  },
});
</script>
<style src="./image-cropper.scss" lang="scss" scoped></style>
