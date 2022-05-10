<!--
/*
 * This file is part of OrangeHRM Inc
 *
 * Copyright (C) 2020 onwards OrangeHRM Inc
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  http://www.gnu.org/licenses
 */
-->

<template>
  <div role="alert" class="oxd-color-picker">
    <canvas
      ref="colorPalette"
      width="230"
      height="230"
      class="oxd-color-picker-palette"
      @mousemove.prevent="pickColor"
      @touchmove.prevent="pickColor"
      @mousedown.prevent="captureOn"
      @touchstart.prevent="captureOn"
    ></canvas>
    <input
      v-model.lazy="hue"
      class="oxd-color-picker-range"
      type="range"
      max="359"
    />
    <oxd-label
      :label="t('general.hex', 'HEX')"
      class="oxd-color-picker-label"
    />
    <oxd-input
      :value="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script lang="ts">
import {
  ref,
  toRefs,
  reactive,
  watchEffect,
  onBeforeMount,
  onBeforeUnmount,
  defineComponent,
} from 'vue';
import usei18n from '../../../../composables/usei18n';
import Input from '@ohrm/oxd/core/components/Input/Input.vue';
import Label from '@ohrm/oxd/core/components/Label/Label.vue';
import {hex2Hsl, hsl2Hex, rgb2Hex, sanitizeHex} from '../../../../utils/color';

export default defineComponent({
  name: 'oxd-color-picker',

  props: {
    modelValue: {
      type: String,
      required: false,
    },
  },

  components: {
    'oxd-input': Input,
    'oxd-label': Label,
  },

  emits: ['update:modelValue'],

  setup(props, context) {
    const state = reactive({
      hue: 0,
      pickEnabled: false,
    });
    const colorPalette = ref<HTMLCanvasElement>();

    const rendercolorPalette = (color: string) => {
      const colorPaletteCTX = colorPalette.value?.getContext('2d');
      if (colorPaletteCTX) {
        const {width, height} = colorPaletteCTX.canvas;
        colorPaletteCTX.clearRect(0, 0, width, height);
        const gradientH = colorPaletteCTX.createLinearGradient(0, 0, width, 0);
        gradientH.addColorStop(0, 'rgba(255,255,255,1)');
        gradientH.addColorStop(1, color);
        colorPaletteCTX.fillStyle = gradientH;
        colorPaletteCTX.fillRect(0, 0, width, height);

        const gradientV = colorPaletteCTX.createLinearGradient(0, 0, 0, height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, 'rgba(0,0,0,1)');
        colorPaletteCTX.fillStyle = gradientV;
        colorPaletteCTX.fillRect(0, 0, width, height);
      }
    };

    const pickColor = ($e: MouseEvent) => {
      if (!state.pickEnabled) return;
      const {offsetX: x, offsetY: y} = $e;
      const colorPaletteCTX = colorPalette.value?.getContext('2d');
      if (colorPaletteCTX) {
        const pixel = colorPaletteCTX.getImageData(x, y, 1, 1)['data']; // Read pixel Color
        context.emit(
          'update:modelValue',
          rgb2Hex(pixel[0], pixel[1], pixel[2]),
        );
      }
    };

    const captureOn = ($e: MouseEvent) => {
      state.pickEnabled = true;
      pickColor($e);
    };

    const captureOff = () => {
      state.pickEnabled = false;
    };

    watchEffect(() => {
      const hex = sanitizeHex(props.modelValue);
      if (hex) [state.hue] = hex2Hsl(hex);
    });

    watchEffect(() => {
      rendercolorPalette(hsl2Hex(`hsl(${state.hue}, 100%, 50%)`));
    });

    onBeforeMount(() => {
      window.addEventListener('mouseup', captureOff);
      window.addEventListener('touchend', captureOff);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('mouseup', captureOff);
      window.removeEventListener('touchend', captureOff);
    });

    return {
      captureOn,
      pickColor,
      colorPalette,
      ...usei18n(),
      ...toRefs(state),
    };
  },
});
</script>

<style src="./color-input.scss" lang="scss" scoped></style>
