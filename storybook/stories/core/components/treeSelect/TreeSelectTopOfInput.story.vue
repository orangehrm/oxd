<template>
  <div class="container">
    <oxd-tree-select-input
      :select-parents-on-child-selection="true"
      :count-topmost-parents="true"
      :options="options"
      :disabled="false"
      :readonly="false"
      :placeholder="'select placeholder'"
      :disable-unchecked-options="false"
      :remove-all-selection="false"
      :modelValue="['1212']"
    >
      <template v-slot:topOfInput>
        <span class="top-of-input-label">{{ topOfInputLabel }}</span>
      </template>
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
    const topOfInputLabel = 'Location';
    const options = ref<OptionProp[]>([]);
    options.value = [
      {
        id: '1a',
        label: 'Sri Lanka',
        children: [
          {id: 11, label: 'Colombo'},
          {
            id: 12,
            label:
              'Kalutaraaaaaaaaaaaaaaaaaaaaaaaaaaa_lengthy_text_aaaaaaaaaaaaaaaaaaaaa',
            children: [
              {
                id: '121ccc',
                label: 'Horana',
                children: [
                  {id: '1211', label: 'Ballapitiya'},
                  {
                    id: '1212',
                    label: 'Pokunuwita',
                    children: [
                      {id: '12121', label: 'pukunuwita_1'},
                      {
                        id: '12122',
                        label: 'Pokunuwita_2',
                        children: [
                          {id: '121221', label: 'pukunuwita_21'},
                          {id: '121222', label: 'Pokunuwita_22'},
                          {id: 121223, label: 'pukunuwita_23'},
                        ],
                      },
                      {id: 12123, label: 'pukunuwita_3'},
                    ],
                  },
                  {id: 1213, label: 'Dikhena'},
                ],
              },
              {id: 122, label: 'Panadura'},
              {id: 123, label: 'Mathugama'},
            ],
          },
          {id: 13, label: 'Galle'},
        ],
      },
      {id: '2b', label: 'Australia'},
      {
        id: '3c',
        label: 'India',
        children: [
          {id: 31, label: 'Keralaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
          {id: 32, label: 'Gujarat'},
          {
            id: 33,
            label: 'Panjab',
            children: [
              {id: '331', label: 'aaa'},
              {id: '332', label: 'bbb'},
              {id: 333, label: 'ccc'},
            ],
          },
        ],
      },
      {id: 'pak', label: 'Pakistan'},
      {id: 'nz', label: 'New Zealand'},
      {id: 'sa', label: 'South Africa'},
      {id: 'china', label: 'China'},
    ] as Array<OptionProp>;

    return {
      options,
      topOfInputLabel,
    };
  },
});
</script>

<style lang="scss" scoped></style>

