<template>
  <oxd-checkbox-input
    v-if="isSelectable"
    v-model="checkState"
    :value="item"
    @click="onClickCheckbox(item, $event)"
    :disabled="isDisabled"
  />
  <div v-else class="oxd-table-card-cell-hidden">
    <oxd-checkbox-input />
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, computed, onBeforeUnmount} from 'vue';
import emitter from '../../../../utils/emitter';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import {cellMixin} from './cell-mixin';

export default defineComponent({
  name: 'oxd-table-cell-checkbox',
  components: {'oxd-checkbox-input': CheckboxInput},
  mixins: [cellMixin],
  setup(props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableProps: any = inject('tableProps');

    const checkState = computed({
      get: () => {
        const itemIndex = tableProps.selected.findIndex(
          item => item === props.item,
        );
        return itemIndex > -1;
      },
      set: newVal => {
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
      if (props.loading) return true;
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
