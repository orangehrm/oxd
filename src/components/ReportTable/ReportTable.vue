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
  <div ref="tableRef" :class="classes" @fullscreenchange="onFullScreenChange">
    <div class="oxd-report-table-header">
      <div class="oxd-report-table-header--toggable">
        <oxd-icon-button
          class="--toggable-icon"
          :name="fullScreenIcon"
          :with-container="false"
          @click="toggleFullScreen"
        />
        <template v-if="hasScrolling">
          <oxd-icon-button
            class="--toggable-icon"
            name="chevron-left"
            :with-container="false"
            @click="scrollLeft"
          />
          <oxd-icon-button
            class="--toggable-icon"
            name="chevron-right"
            :with-container="false"
            @click="scrollRight"
          />
        </template>
        <slot name="toggable"></slot>
      </div>
      <div class="oxd-report-table-header--pagination">
        <slot name="pagination"></slot>
      </div>
    </div>
    <div v-if="loading" class="oxd-report-table-loader">
      <oxd-loading-spinner />
    </div>
    <v-grid
      v-else
      ref="vgridRef"
      :key="key"
      theme="compact"
      :source="items"
      :columns="headers"
      :resize="true"
      :readonly="true"
      :can-focus="false"
      :col-size="colSize"
      :row-definitions="rowDefinitions"
      v-bind="$attrs"
    ></v-grid>
    <div class="oxd-report-table-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {VGrid} from '@revolist/vue3-datagrid';
import useResize from '@/composables/useResize';
import type {ComponentPublicInstance} from 'vue';
import IconButton from '@/components/Button/Icon.vue';
import Spinner from '@/components/Loader/Spinner.vue';
import {ref, watch, unref, computed, defineComponent} from 'vue';

export default defineComponent({
  name: 'OxdReportTable',

  components: {
    'v-grid': VGrid,
    'oxd-icon-button': IconButton,
    'oxd-loading-spinner': Spinner,
  },

  inheritAttrs: false,

  props: {
    height: {
      type: Number,
      required: false,
      default: 400,
    },
    headers: {
      type: null,
      required: false,
      default: () => [],
    },
    items: {
      type: null,
      required: false,
      default: () => [],
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    columnCount: {
      type: Number,
      required: false,
      default: null,
    },
    columnSize: {
      type: Number,
      required: false,
      default: 150,
    },
  },

  setup(props) {
    const isFullScreen = ref(false);
    const tableRef = ref<HTMLElement | null>(null);
    const vgridRef = ref<ComponentPublicInstance | null>(null);
    const horizontalScroller = ref<HTMLElement | null>(null);
    const {width} = useResize(tableRef);

    const scrollLeft = () => {
      const scrollbar = unref(horizontalScroller);
      if (scrollbar) {
        scrollbar.scrollLeft -= 50;
      }
    };

    const scrollRight = () => {
      const scrollbar = unref(horizontalScroller);
      if (scrollbar) {
        scrollbar.scrollLeft += 50;
      }
    };

    const onFullScreenChange = ($event: Event) => {
      isFullScreen.value = document.fullscreenElement === $event.target;
    };

    const toggleFullScreen = () => {
      const table = unref(tableRef);
      if (!isFullScreen.value && table) {
        table.requestFullscreen();
      } else {
        isFullScreen.value && document.exitFullscreen();
      }
    };

    const classes = computed(() => {
      return {
        'oxd-report-table': true,
        '--frame': !isFullScreen.value,
      };
    });

    const colSize = computed(() => {
      const numberOfColumns = props.columnCount
        ? props.columnCount
        : props.headers.length;
      const size = Math.floor(width.value / numberOfColumns);
      return size > props.columnSize ? size : props.columnSize;
    });

    const fullScreenIcon = computed(() => {
      return isFullScreen.value ? 'fullscreen-exit' : 'arrows-fullscreen';
    });

    const key = computed(() => {
      return JSON.stringify({
        c: colSize.value,
        h: props.headers.length,
        i: props.items.length,
      });
    });

    const hasScrolling = computed(() => {
      const scrollbar = unref(horizontalScroller);
      if (scrollbar) {
        return scrollbar.style.minHeight !== '0px' ? true : false;
      }
      return false;
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rowDefinitions = computed<any[]>(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return props.items.map((item: any, index: number) => {
        return {type: 'rgRow', index, size: parseInt(item?._rows) * 32};
      });
    });

    watch(vgridRef, (vgrid: ComponentPublicInstance | null) => {
      if (vgrid && vgrid.$el) {
        setTimeout(() => {
          const scrollBars: HTMLCollection = vgrid.$el.getElementsByTagName(
            'revogr-scroll-virtual',
          );
          horizontalScroller.value = scrollBars.item(1) as HTMLElement;
        }, 500);
      }
    });

    return {
      key,
      classes,
      colSize,
      vgridRef,
      tableRef,
      scrollLeft,
      scrollRight,
      hasScrolling,
      isFullScreen,
      rowDefinitions,
      fullScreenIcon,
      toggleFullScreen,
      onFullScreenChange,
    };
  },
});
</script>

<style src="./report-table.scss" lang="scss"></style>
