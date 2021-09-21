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
  <div ref="tableRef" :class="classes">
    <div class="oxd-report-table-header">
      <div class="oxd-report-table-header --toggable">
        <oxd-icon-button
          class="--toggable-icon"
          :name="fullScreenIcon"
          :withContainer="false"
          @click="toggleFullScreen"
        />
        <oxd-icon-button
          class="--toggable-icon"
          name="chevron-left"
          :withContainer="false"
          @click="scrollLeft"
        />
        <oxd-icon-button
          class="--toggable-icon"
          name="chevron-right"
          :withContainer="false"
          @click="scrollRight"
        />
        <slot name="toggable"></slot>
      </div>
      <div class="oxd-report-table-header --pagination">
        <slot name="pagination"></slot>
      </div>
    </div>
    <div v-if="loading" class="oxd-report-table-loader">
      <oxd-loading-spinner />
    </div>
    <v-grid
      v-else
      ref="vgridRef"
      theme="compact"
      :source="rows"
      :columns="columns"
      :readonly="true"
      :resize="true"
      :canFocus="false"
      :style="styles"
      v-bind="$attrs"
    ></v-grid>
    <div class="oxd-report-table-footer"></div>
  </div>
</template>

<script lang="ts">
import VGrid from '@revolist/vue3-datagrid';
import {computed, defineComponent, reactive, ref, toRefs} from 'vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner.vue';

export default defineComponent({
  name: 'oxd-report-table',
  inheritAttrs: false,
  components: {
    'v-grid': VGrid,
    'oxd-icon-button': IconButton,
    'oxd-loading-spinner': Spinner,
  },
  props: {
    height: {
      type: Number,
      default: 200,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    style: {
      type: Object,
    },
  },
  setup(props) {
    const tableRef = ref(null);
    const vgridRef = ref(null);
    const state = reactive({
      columns: [...props.headers],
      rows: [...props.items],
      isFullScreen: false,
    });

    const scrollLeft = () => {
      if (vgridRef.value) {
        vgridRef.value.$el.scrollToColumnIndex(0);
      }
    };

    const scrollRight = () => {
      if (vgridRef.value && state.columns.length > 1) {
        vgridRef.value.$el.scrollToColumnIndex(state.columns.length - 1);
      }
    };

    const toggleFullScreen = () => {
      if (!state.isFullScreen && tableRef) {
        tableRef.value.requestFullscreen();
        state.isFullScreen = true;
      } else {
        state.isFullScreen && document.exitFullscreen();
        state.isFullScreen = false;
      }
    };

    const styles = computed(() => {
      return {
        ...props.style,
        height: state.isFullScreen ? '100%' : props.height + 'px',
      };
    });

    const classes = computed(() => {
      return {
        'oxd-report-table': true,
        '--frame': !state.isFullScreen,
      };
    });

    const fullScreenIcon = computed(() => {
      return state.isFullScreen ? 'fullscreen-exit' : 'arrows-fullscreen';
    });

    return {
      ...toRefs(state),
      styles,
      classes,
      vgridRef,
      tableRef,
      scrollLeft,
      scrollRight,
      fullScreenIcon,
      toggleFullScreen,
    };
  },
});
</script>

<style src="./report-table.scss" lang="scss"></style>
