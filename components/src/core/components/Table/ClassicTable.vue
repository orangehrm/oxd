<template>
  <oxd-table>
    <colgroup>
      <col v-if="selectable" :style="{width: selector.width}" />
      <col
        v-for="header in headers"
        :style="{width: header.width}"
        :key="header"
      />
    </colgroup>
    <oxd-thead>
      <oxd-tr>
        <oxd-th
          v-if="selectable"
          class="oxd-padding-cell oxd-table-th"
          :style="{width: selector.width}"
        >
          <input
            type="checkbox"
            v-model="selectedAll"
            @change="onChangeSelectAll"
          />
        </oxd-th>
        <oxd-th
          class="oxd-padding-cell oxd-table-th"
          v-for="header in headers"
          :key="header"
          :style="{width: header.width}"
        >
          {{ header.title }}
        </oxd-th>
      </oxd-tr>
    </oxd-thead>

    <oxd-tbody :with-strip="withStrip">
      <oxd-tr
        v-for="(item, index) in items"
        :key="item"
        :clickable="clickable"
        :tabindex="0"
        @click="onClick(item)($event)"
      >
        <oxd-td
          v-if="selectable"
          class="oxd-padding-cell"
          :style="{width: selector.width}"
        >
          <input
            type="checkbox"
            :value="index"
            v-model="checkedItems"
            @click="onClickCheckbox(item, $event)"
          />
        </oxd-td>
        <oxd-td
          class="oxd-padding-cell"
          v-for="header in headers"
          :key="header"
          :style="{width: header.width}"
        >
          <div
            v-if="item[header.name].length > header.maxCharacterLength"
            :tooltip="item[header.name]"
            :flow="header.flow || 'bottom'"
            :style="header.style"
            :class="header.class"
          >
            {{
              item[header.name].slice(0, parseInt(header.maxCharacterLength)) +
                '...'
            }}
          </div>
          <div v-else :style="header.style" :class="header.class">
            {{ item[header.name] }}
          </div>
        </oxd-td>
      </oxd-tr>
    </oxd-tbody>

    <oxd-tfoot> </oxd-tfoot>
  </oxd-table>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Table from '@orangehrm/oxd/core/components/Table/Table.vue';
import TableHeader from '@orangehrm/oxd/core/components/Table/TableHeader.vue';
import TableBody from '@orangehrm/oxd/core/components/Table/TableBody.vue';
import TableFooter from '@orangehrm/oxd/core/components/Table/TableFooter.vue';
import TableRow from '@orangehrm/oxd/core/components/Table/TableRow.vue';
import TableHeaderCell from '@orangehrm/oxd/core/components/Table/TableHeaderCell.vue';
import TableDataCell from '@orangehrm/oxd/core/components/Table/TableDataCell.vue';

export default defineComponent({
  name: 'oxd-clasic-table',

  data() {
    return {
      checkedItems: this.selected as number[],
      selectedAll: (this.selected.length === this.items.length) as boolean,
    };
  },

  watch: {
    checkedItems(state) {
      this.selectedAll = state.length === this.items.length;
      this.$emit('update:selected', state);
    },
  },

  props: {
    selector: {
      type: Object,
      default() {
        return {width: '30px'};
      },
    },
    headers: {
      type: Array,
      default() {
        return [];
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    withStrip: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  emits: ['click', 'clickCheckbox', 'update:selected', 'update:selectAll'],

  components: {
    'oxd-table': Table,
    'oxd-thead': TableHeader,
    'oxd-tbody': TableBody,
    'oxd-tfoot': TableFooter,
    'oxd-tr': TableRow,
    'oxd-th': TableHeaderCell,
    'oxd-td': TableDataCell,
  },

  methods: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick(item: any) {
      return (e: Event) => {
        this.$emit('click', {item, native: e});
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickCheckbox(item: any, e: Event) {
      e.stopPropagation();
      this.$emit('clickCheckbox', {item, native: e});
    },
    onChangeSelectAll() {
      this.checkedItems = this.selectedAll
        ? [...Array(this.items.length).keys()]
        : [];
      this.$emit('update:selectAll', this.selectedAll);
    },
  },
});
</script>

<style src="./classic-table.scss" lang="scss" scoped></style>
