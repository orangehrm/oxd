<template>
  <div class="container">
    <oxd-tree-select
      :select-parents-on-child-selection="false"
      :options="options"
      :placeholder="'select placeholder'"
      :pre-selected-ids="['1211', '333', 331, 1213, 'sa', 122, 123, 1212]"
      @updateSelectedIds="updateSelectedIdsFun"
      v-model="values"
    >
    </oxd-tree-select>
  </div>
</template>

<script lang="ts">
import TreeSelectInput from '@orangehrm/oxd/core/components/Input/TreeSelect/TreeSelect.vue';

import {defineComponent, ref, computed} from 'vue';
export default defineComponent({
  components: {
    'oxd-tree-select': TreeSelectInput,
  },
  setup() {
    let options = [
      {
        id: '1a',
        label: 'Sri Lanka',
        children: [
          {id: 11, label: 'Colombo'},
          {
            id: 12,
            label: 'Kalutara',
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
                      {id: '12122', label: 'Pokunuwita_2'},
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
      {id: 'nz', label: 'New zeland'},
      {id: 'sa', label: 'South Africa'},
      {id: 'china', label: 'China'},
    ];

    const values = ref<any[]>([]);

    const updateSelectedIdsFun = (idsObj: any) => {
      console.log(idsObj, 'idsObj');
    };

    return {
      options,
      values,
      updateSelectedIdsFun,
    };
  },
});
</script>

<style lang="scss" scoped></style>
