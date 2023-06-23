<template>
  <cropper
    class="cropper"
    :src="image"
    :canvas="canvasProperties"
    :stencil-component="$options.components.CircleStencil"
    :stencil-props="{
      handlers: {},
      movable: false,
      scalable: false,
      aspectRatio: 1,
    }"
    :default-size="defaultSize"
    :resize-image="{
      adjustStencil: false,
    }"
    image-restriction="stencil"
    @change="change"
  />
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
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
    resizeResult: {
      type: Boolean,
      default: true,
    },
    imageFormat: {
      type: String,
      default: 'image/png',
    },
    imageQuality: {
      type: Number,
      default: 0.9,
      validator: (val: number) => val >= 0 && val <= 1,
    },
  },
  emits: ['change'],

  setup(props, {emit}) {
    const croppedImage = ref('');
    const change = ({
      // eslint-disable-next-line
      coordinates,
      canvas,
    }: {
      coordinates: string;
      canvas: HTMLCanvasElement;
    }) => {
      croppedImage.value = canvas.toDataURL(
        props.imageFormat,
        Number(props.imageQuality),
      );
      emit('change', croppedImage.value);
    };

    const canvasProperties = computed(() => {
      return props.resizeResult
        ? {height: props.stencilHeight, width: props.stencilWidth}
        : true;
    });

    const defaultSize = ({
      imageSize,
      visibleArea,
    }: {
      // eslint-disable-next-line
      imageSize: any;
      // eslint-disable-next-line
      visibleArea: any;
    }) => {
      return {
        width: (visibleArea || imageSize).width,
        height: (visibleArea || imageSize).height,
      };
    };

    return {
      croppedImage,
      change,
      defaultSize,
      canvasProperties,
    };
  },
});
</script>
<style src="./image-cropper.scss" lang="scss" scoped></style>
