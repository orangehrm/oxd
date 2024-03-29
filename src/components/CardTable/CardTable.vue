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
  <oxd-card-table-container>
    <div v-if="loading" class="oxd-table-loader">
      <oxd-loading-spinner />
    </div>
    <template v-else>
      <!-- oxd-card-table header start -->
      <component :is="tableDeco.headerDecorator"></component>
      <!-- oxd-card-table header end -->

      <!-- oxd-card-table body start -->
      <component :is="tableDeco.bodyDecorator"></component>
      <!-- oxd-card-table body end -->
    </template>
  </oxd-card-table-container>
</template>

<script lang="ts">
import {nanoid} from 'nanoid';
import type {PropType} from 'vue';
import emitter from '@/utils/emitter';
import Spinner from '@/components/Loader/Spinner.vue';
import useResponsive from '@/composables/useResponsive';
import Table from '@/components/CardTable/Table/Table.vue';
import {defineComponent, onBeforeUnmount, watch} from 'vue';
import {useProvideTableProps} from '@/composables/useCardtable';
import type {CardSelector, CardHeaders, SortDefinition, RowItem} from './types';

// Body Decorators
import DefaultCardContainer from '@/components/CardTable/Decorator/DefaultCardContainer.vue';

// Headers Decorators
import DefaultCardHeader from '@/components/CardTable/Header/DefaultCardHeader.vue';

export default defineComponent({
  name: 'OxdCardCardTable',

  components: {
    'oxd-card-table-container': Table,
    'oxd-loading-spinner': Spinner,

    // Body Decorators
    'oxd-table-decorator-card': DefaultCardContainer,

    // Header Decorators
    'oxd-table-header-default': DefaultCardHeader,
  },

  props: {
    selector: {
      type: Object as PropType<CardSelector>,
      required: false,
      default: () => ({}),
    },
    headers: {
      type: Array as PropType<CardHeaders>,
      required: false,
      default: () => [],
    },
    items: {
      type: Array as PropType<RowItem>,
      required: false,
      default: () => [],
    },
    clickable: {
      type: Boolean,
      required: false,
      default: true,
    },
    selectable: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    selected: {
      type: Array as PropType<number[]>,
      required: false,
      default: () => [],
    },
    decorator: {
      type: String,
      required: false,
      default: 'oxd-table-decorator-card',
    },
    order: {
      type: Object as PropType<SortDefinition>,
      required: false,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    tableId: {
      type: String,
      required: false,
      default: () => nanoid(8),
    },
  },

  emits: [
    'click',
    'clickCheckbox',
    'update:order',
    'update:selected',
    'update:selectAll',
  ],

  setup(props, context) {
    const responsiveState = useResponsive();
    useProvideTableProps(props, responsiveState);

    emitter.on(`${props.tableId}-datatable:selectAll`, (value) => {
      context.emit('update:selectAll', value);
    });
    emitter.on(`${props.tableId}-datatable:unselectAll`, () => {
      context.emit('update:selectAll', []);
    });
    emitter.on(`${props.tableId}-datatable:updateOrder`, (value) => {
      context.emit('update:order', value);
    });
    emitter.on(`${props.tableId}-datatable:updateSelected`, (value) => {
      context.emit('update:selected', value);
    });
    emitter.on(`${props.tableId}-datatable:clickCheckboxCell`, (value) => {
      context.emit('clickCheckbox', value);
    });
    emitter.on(`${props.tableId}-datatable:clickRow`, (value) => {
      context.emit('click', value);
    });

    watch(
      () => props.loading,
      () => {
        context.emit('update:selected', []);
      },
    );

    onBeforeUnmount(() => {
      emitter.all.forEach((...[, key]) => {
        if ((key as string).substring(0, 8) === props.tableId) {
          emitter.all.delete(key);
        }
      });
    });
  },

  computed: {
    tableDeco() {
      return {
        headerDecorator: 'oxd-table-header-default',
        bodyDecorator: 'oxd-table-decorator-card',
      };
    },
  },
});
</script>
