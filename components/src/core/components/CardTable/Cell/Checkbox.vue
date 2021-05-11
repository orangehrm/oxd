<template>
  <oxd-checkbox-input
    v-model="checkState"
    :value="item"
    @click="onClickCheckbox(item, $event)"
  />
</template>

<script lang="ts">
import {defineComponent, inject, ref, watch} from 'vue';
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
    const checkState = ref(false);

    const itemIndex = tableProps.selected.findIndex(
      item => item === props.item,
    );
    if (itemIndex > -1) {
      checkState.value = true;
    }

    emitter.on('datatable:selectAll', () => {
      checkState.value = true;
    });

    emitter.on('datatable:unselectAll', () => {
      checkState.value = false;
    });

    watch(
      () => checkState.value,
      function(newVal) {
        newVal
          ? emitter.emit('datatable:rowSelected', props.item)
          : emitter.emit('datatable:rowUnselected', props.item);
      },
    );

    return {
      checkState,
    };
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickCheckbox(item: any, e: Event) {
      emitter.emit('datatable:clickCheckboxCell', {item, native: e});
    },
  },
});
</script>

<style src="./default.scss" lang="scss" scoped></style>
