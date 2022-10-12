<template>
  <cropper
    class="cropper"
    :src="image"
    :stencil-props="{
      resizable: resizable,
    }"
    :stencil-size="stencilSize"
    :stencil-component="$options.components.CircleStencil"
    :default-position="defaultPosition"
    :min-height="10"
    :min-width="10"
    @change="change"
  />
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {Cropper, CircleStencil} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
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
      default: '700',
    },
    defaultPositionRight: {
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
    resizable: {
      type: Boolean,
      default: false,
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

    const stencilSize = () => {
      return {
        width: props.stencilWidth,
        height: props.stencilHeight,
      };
    };

    const defaultPosition = () => {
      return {
        left: props.defaultPositionLeft,
        top: props.defaultPositionRight,
      };
    };
    return {
      croppedImage,
      change,
      defaultPosition,
      stencilSize,
    };
  },
});
</script>
<style src="./image-crop.scss" lang="scss" scoped></style>
