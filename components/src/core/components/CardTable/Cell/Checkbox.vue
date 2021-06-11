<template>
  <oxd-checkbox-input
    v-model="checkState"
    :value="item"
    @click="onClickCheckbox(item, $event)"
  />
</template>

<script lang="ts">
import {defineComponent, inject, computed, onBeforeUnmount} from 'vue';
import emitter from '../../../../utils/emitter';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';

export default defineComponent({
  name: 'oxd-table-cell-checkbox',
  components: {'oxd-checkbox-input': CheckboxInput},
  props: {
    item: {
      required: true,
    },
  },
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

    const setStateTrue = () => {
      checkState.value = true;
    };
    const setStateFalse = () => {
      checkState.value = false;
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

<style src="./default.scss" lang="scss" scoped></style>
