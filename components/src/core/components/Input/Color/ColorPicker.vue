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
      ref="colorPallete"
      class="oxd-color-picker-pallete"
      width="230"
      height="230"
    ></canvas>
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
import {defineComponent, ref, watchEffect} from 'vue';
import usei18n from '../../../../composables/usei18n';
import Input from '@ohrm/oxd/core/components/Input/Input.vue';
import Label from '@ohrm/oxd/core/components/Label/Label.vue';

export default defineComponent({
  name: 'oxd-color-picker',

  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },

  components: {
    'oxd-input': Input,
    'oxd-label': Label,
  },

  emits: ['update:modelValue'],

  setup(props) {
    const colorPallete = ref<HTMLCanvasElement>();

    const rendercolorPallete = (color: string) => {
      const colorPalleteCTX = colorPallete.value?.getContext('2d');
      if (colorPalleteCTX) {
        const {width, height} = colorPalleteCTX.canvas;
        colorPalleteCTX.clearRect(0, 0, width, height);
        const gradientH = colorPalleteCTX.createLinearGradient(0, 0, width, 0);
        gradientH.addColorStop(0, 'rgba(255,255,255,1)');
        gradientH.addColorStop(1, color);
        colorPalleteCTX.fillStyle = gradientH;
        colorPalleteCTX.fillRect(0, 0, width, height);

        const gradientV = colorPalleteCTX.createLinearGradient(0, 0, 0, height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, 'rgba(0,0,0,1)');
        colorPalleteCTX.fillStyle = gradientV;
        colorPalleteCTX.fillRect(0, 0, width, height);
      }
    };

    watchEffect(() => {
      rendercolorPallete(props.modelValue);
    });

    return {
      colorPallete,
      ...usei18n(),
    };
  },
});
</script>

<style src="./color-input.scss" lang="scss" scoped></style>
