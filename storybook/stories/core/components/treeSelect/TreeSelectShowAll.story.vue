<template>
  <div class="container">
    <oxd-tree-select-input
      :select-parents-on-child-selection="true"
      :count-topmost-parents="true"
      :options="options"
      :disabled="false"
      :readonly="false"
      :placeholder="'Select options'"
      :disable-unchecked-options="false"
      :remove-all-selection="false"
      :all-selected-text="'All'"
      @update:modelValue="updateSelectedIdsFun"
      :modelValue="selectedIds"
    >
    </oxd-tree-select-input>
  </div>
</template>

<script lang="ts">
import TreeSelectInput from '@orangehrm/oxd/core/components/Input/TreeSelect/TreeSelect.vue';
import {OptionProp} from 'oxd-components/src/core/components/Input/TreeSelect/type';

import {defineComponent, ref} from 'vue';
export default defineComponent({
  components: {
    'oxd-tree-select-input': TreeSelectInput,
  },
  setup() {
    const options = ref<OptionProp[]>([]);
    options.value = [
      {
        id: '1',
        label: 'Option 1',
        children: [
          {id: '1-1', label: 'Option 1.1'},
          {id: '1-2', label: 'Option 1.2'},
        ],
      },
      {
        id: '2',
        label: 'Option 2',
        children: [
          {id: '2-1', label: 'Option 2.1'},
          {id: '2-2', label: 'Option 2.2'},
        ],
      },
      {id: '3', label: 'Option 3'},
      {id: '4', label: 'Option 4'},
    ] as Array<OptionProp>;

    const selectedIds = ref<string[]>([]);

    const updateSelectedIdsFun = (idsArray: string[]) => {
      selectedIds.value = idsArray;
    };

    return {
      options,
      selectedIds,
      updateSelectedIdsFun,
    };
  },
});
</script>

