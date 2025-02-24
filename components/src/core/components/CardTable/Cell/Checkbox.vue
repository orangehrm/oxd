<template>
  <div v-if="!isSelectable" class="oxd-table-card-cell-hidden">
    <oxd-checkbox-input />
  </div>
  <oxd-skeleton v-else-if="loading" class="oxd-skeleton-checkbox" />
  <oxd-checkbox-input
    v-else
    v-model="checkState"
    :value="item"
    :disabled="isDisabled"
    :disabled-tooltip="disabledTooltip"
    :tooltip-position="tooltipPosition"
    @click="onClickCheckbox(item, $event)"
  />
</template>

<script lang="ts">
import {cellMixin} from './cell-mixin';
import emitter from '../../../../utils/emitter';
import {defineComponent, inject, computed, onBeforeUnmount} from 'vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import {TOP} from '../../../../core/components/Input/types';

export default defineComponent({
  name: 'oxd-table-cell-checkbox',
  components: {
    'oxd-skeleton': Skeleton,
    'oxd-checkbox-input': CheckboxInput,
  },
  mixins: [cellMixin],
  setup(props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableProps: any = inject('tableProps');

    const checkState = computed({
      get: () => {
        const selectionMode = tableProps?.selectionMode;
        const selectionValue =
          selectionMode === 'property' && tableProps?.selectionProperty
            ? props.rowItem[tableProps.selectionProperty]
            : props.item;

        const itemIndex = tableProps.selected.findIndex(
          value => value === selectionValue,
        );
        return itemIndex > -1;
      },
      set: newVal => {
        const selectionMode = tableProps?.selectionMode;
        const selectionValue =
          selectionMode === 'property' && tableProps?.selectionProperty
            ? props.rowItem[tableProps.selectionProperty]
            : props.item;

        newVal
          ? emitter.emit(
              `${tableProps.tableId}-datatable:rowSelected`,
              selectionValue,
            )
          : emitter.emit(
              `${tableProps.tableId}-datatable:rowUnselected`,
              selectionValue,
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
      const isSelectDisabled = Boolean(props.rowItem?.isSelectDisabled);
      return isTableDisabled || isRowDisabled || isSelectDisabled;
    });

    const tooltipPosition = computed(() => {
      return props.rowItem?.selectDisabledTooltipPosition
        ? props.rowItem?.selectDisabledTooltipPosition
        : TOP;
    });

    const disabledTooltip = computed(() => {
      return props.rowItem?.isSelectDisabled
        ? props.rowItem?.selectDisabledTooltip ?? null
        : null;
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
      tooltipPosition,
      disabledTooltip,
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
