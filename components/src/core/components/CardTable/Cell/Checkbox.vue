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
  <div class="oxd-table-card-cell-checkbox" @click.stop>
    <oxd-checkbox-input
      v-if="isSelectable"
      v-model="checkState"
      :value="item"
      :disabled="isDisabled"
      @click="onClickCheckbox(item, $event)"
    />
    <div v-else class="oxd-table-card-cell-hidden">
      <oxd-checkbox-input />
    </div>
  </div>
</template>

<script lang="ts">
import {cellMixin} from './cell-mixin';
import emitter from '../../../../utils/emitter';
import {defineComponent, inject, computed, onBeforeUnmount} from 'vue';
import CheckboxInput from '@ohrm/oxd/core/components/Input/CheckboxInput.vue';

export default defineComponent({
  name: 'OxdTableCellCheckbox',

  components: {
    'oxd-checkbox-input': CheckboxInput,
  },

  mixins: [cellMixin],

  props: {
    item: {
      type: [String, Number, Boolean],
      required: true,
    },
  },

  setup(props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableProps: any = inject('tableProps');

    const checkState = computed({
      get: () => {
        const itemIndex = tableProps.selected.findIndex(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => item === props.item,
        );
        return itemIndex > -1;
      },
      set: (newVal) => {
        newVal
          ? emitter.emit(
              `${tableProps.tableId}-datatable:rowSelected`,
              props.item,
            )
          : emitter.emit(
              `${tableProps.tableId}-datatable:rowUnselected`,
              props.item,
            );
      },
    });

    const isDisabled = computed(() => {
      const isRowDisabled =
        props.rowItem?.isDisabled === undefined
          ? false
          : Boolean(props.rowItem.isDisabled);
      const isTableDisabled =
        tableProps?.disabled === undefined
          ? false
          : Boolean(tableProps?.disabled);
      return isTableDisabled ? isTableDisabled : isRowDisabled;
    });

    const isSelectable = computed(() => {
      return props.rowItem?.isSelectable === undefined
        ? true
        : Boolean(props.rowItem.isSelectable);
    });

    const setStateTrue = () => {
      if (!isDisabled.value && isSelectable.value) {
        checkState.value = true;
      }
    };
    const setStateFalse = () => {
      if (!isDisabled.value && isSelectable.value) {
        checkState.value = false;
      }
    };

    emitter.on(`${tableProps.tableId}-datatable:selectAll`, setStateTrue);
    emitter.on(`${tableProps.tableId}-datatable:unselectAll`, setStateFalse);

    onBeforeUnmount(() => {
      emitter.off(`${tableProps.tableId}-datatable:selectAll`, setStateTrue);
      emitter.off(`${tableProps.tableId}-datatable:unselectAll`, setStateFalse);
    });

    return {
      tableProps,
      checkState,
      isDisabled,
      isSelectable,
    };
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickCheckbox(item: any, e: Event) {
      emitter.emit(`${this.tableProps.tableId}-datatable:clickCheckboxCell`, {
        item,
        native: e,
      });
    },
  },
});
</script>

<style src="./default.scss" lang="scss"></style>
