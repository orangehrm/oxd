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
    <div
      class="oxd-color-picker-indicator"
      :style="indicatorStyles"
      @mousedown.prevent="captureOn"
      @touchstart.prevent="captureOn"
    ></div>
    <canvas
      ref="colorPalette"
      width="228"
      height="228"
      class="oxd-color-picker-palette"
      @mousemove.prevent="pickColor"
      @touchmove.prevent="pickColor"
      @mousedown.prevent="captureOn"
      @touchstart.prevent="captureOn"
    ></canvas>
    <input
      :value="hue"
      class="oxd-color-picker-range"
      type="range"
      max="359"
      @change="onHueChange"
    />
    <oxd-label
      :label="t('general.hex', 'HEX')"
      class="oxd-color-picker-label"
    />
    <oxd-input :value="modelValue" @update:model-value="onHexInput" />
  </div>
</template>

<script lang="ts">
import {
  ref,
  toRefs,
  reactive,
  computed,
  watchEffect,
  onBeforeMount,
  onBeforeUnmount,
  defineComponent,
} from 'vue';
import usei18n from '@/composables/usei18n';
import Input from '@/components/Input/Input.vue';
import Label from '@/components/Label/Label.vue';
import {clamp, hex2Hsv, hsv2Hex, sanitizeHex} from '@/utils/color';

export default defineComponent({
  name: 'OxdColorPicker',

  components: {
    'oxd-input': Input,
    'oxd-label': Label,
  },

  props: {
    modelValue: {
      type: String,
      required: false,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup(props, context) {
    const state = reactive({
      hue: 0,
      sat: 0,
      val: 0,
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

    const pickColor = ($e: MouseEvent | TouchEvent) => {
      if (!state.pickEnabled) return;
      const boundry = colorPalette.value?.getBoundingClientRect();
      if (boundry) {
        const {width, height, top, left} = boundry;
        let x = 0,
          y = 0;
        if (window.TouchEvent && $e instanceof TouchEvent) {
          x = Math.max(0, $e.touches[0].clientX - left);
          y = Math.max(0, $e.touches[0].clientY - top);
        } else {
          x = Math.max(0, ($e as MouseEvent).clientX - left);
          y = Math.max(0, ($e as MouseEvent).clientY - top);
        }

        state.sat = clamp(x / width, 0, 1);
        state.val = clamp((height - y) / height, 0, 1);
        context.emit(
          'update:modelValue',
          hsv2Hex(state.hue, state.sat, state.val),
        );
      }
    };

    const captureOn = ($e: MouseEvent | TouchEvent) => {
      state.pickEnabled = true;
      pickColor($e);
    };

    const captureOff = () => {
      state.pickEnabled = false;
    };

    const setHue = (value: string | null) => {
      const hex = sanitizeHex(value);
      if (hex) [state.hue, state.sat, state.val] = hex2Hsv(hex);
    };

    const onHexInput = (value: string | null) => {
      setHue(value);
      context.emit('update:modelValue', value);
    };

    const onHueChange = ($e: Event) => {
      state.hue = parseInt(($e.target as HTMLInputElement).value);
      context.emit(
        'update:modelValue',
        hsv2Hex(state.hue, state.sat, state.val),
      );
    };

    const indicatorStyles = computed(() => {
      const boundry = colorPalette.value?.getBoundingClientRect();
      if (!boundry) return {};
      const {width, height} = boundry;
      return {
        top: `${height - Math.round(state.val * height)}px`,
        left: `${Math.round(state.sat * width)}px`,
      };
    });

    watchEffect(() => {
      rendercolorPalette(hsv2Hex(state.hue, 1, 1));
    });

    onBeforeMount(() => {
      setHue(props.modelValue);
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
      onHexInput,
      onHueChange,
      colorPalette,
      indicatorStyles,
      ...usei18n(),
      ...toRefs(state),
    };
  },
});
</script>

<style src="./color-input.scss" lang="scss" scoped></style>
