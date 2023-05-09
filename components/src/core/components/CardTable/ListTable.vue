<template>
  <oxd-card-table-container>
    <div v-if="loading" class="oxd-table-loader">
      <oxd-loading-spinner :withContainer="false" />
    </div>
    <template v-else>
      <oxd-card-thead>
        <oxd-card-tr :clickable="false">
          <oxd-card-th v-if="selectable" class="oxd-padding-cell oxd-table-th">
            <oxd-checkbox-input v-model="selectAll" :checkIcon="checkIcon" />
          </oxd-card-th>

          <oxd-card-th
            v-for="header in headers"
            :key="header"
            :style="header.style"
            :class="header.class"
            :order="order[header.sortField]"
            class="oxd-padding-cell oxd-table-th"
            @order="onOrderChange($event, header)"
          >
            <oxd-icon
              v-if="header.iconName"
              :name="header.iconName"
              :style="header.iconStyle"
            />
            <span v-else>{{ $vt(header.title) }}</span>
          </oxd-card-th>
        </oxd-card-tr>
      </oxd-card-thead>

      <oxd-card-tbody>
        <div
          v-for="(item, index) in items"
          :key="item"
          :class="{
            'oxd-table-card': true,
            '--high': !diff[index],
          }"
          @click="onClickRow(item)($event)"
        >
          <oxd-card-tr :clickable="clickable">
            <oxd-card-cell
              class="oxd-padding-cell"
              :index="index"
              :headers="cardHeaders"
              :items="{selector: index, ...item}"
            ></oxd-card-cell>
          </oxd-card-tr>
        </div>
      </oxd-card-tbody>

      <div v-if="items.length === 0" class="empty-msg-container">
        <div class="empty-msg">
          <oxd-icon name="oxd-no-data" class="icon"></oxd-icon>
          <div class="caption">
            {{ $vt('Sorry, No Data Found!') }}
          </div>
        </div>
      </div>
    </template>
  </oxd-card-table-container>
</template>

<script lang="ts">
import {
  provide,
  readonly,
  PropType,
  computed,
  onBeforeUnmount,
  defineComponent,
  watch,
  ref,
} from 'vue';
import {
  Order,
  CardHeader,
  CardHeaders,
  CardSelector,
  SortDefinition,
} from './types';
import {nanoid} from 'nanoid';
import {RowItem} from './Cell/types';
import emitter from '../../../utils/emitter';
import translateMixin from '../../../mixins/translate';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner.vue';
import Table from '@orangehrm/oxd/core/components/CardTable/Table/Table.vue';
import TableRow from '@orangehrm/oxd/core/components/CardTable/Table/TableRow.vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import TableBody from '@orangehrm/oxd/core/components/CardTable/Table/TableBody.vue';
import TableHeader from '@orangehrm/oxd/core/components/CardTable/Table/TableHeader.vue';
import TableHeaderCell from '@orangehrm/oxd/core/components/CardTable/Table/TableHeaderCell.vue';
import DefaultCellContainer from '@orangehrm/oxd/core/components/CardTable/Cell/DefaultCellContainer.vue';

export default defineComponent({
  name: 'oxd-list-table',

  props: {
    clickable: {
      type: Boolean,
      default: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    flashing: {
      type: Boolean,
      default: false,
    },
    tableId: {
      type: String,
      default: () => nanoid(8),
    },
    items: {
      type: Array as PropType<any>,
      default: () => [],
    },
    selected: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    selector: {
      type: Object as PropType<CardSelector>,
      default: () => ({}),
    },
    headers: {
      type: Array as PropType<CardHeaders>,
      default: () => [],
    },
    order: {
      type: Object as PropType<SortDefinition>,
      default: () => ({}),
    },
  },

  // directives: {
  //   mojo: {
  //     mounted(el) {
  //       el.dataset.flashable = 'true';
  //     },
  //     updated(el, binding, vnode, prevVnode) {
  //       console.log(el.dataset.flashable);
  //       if (el.dataset.flashable === 'true') {
  //         el.style.backgroundColor = '#c1f5be';
  //       }
  //     },
  //   },
  // },

  setup(props, context) {
    provide('tableProps', readonly(props));
    let selected = [...props.selected];
    const diff = ref(Array(props.items.length).fill(true));

    emitter.on(`${props.tableId}-datatable:rowSelected`, value => {
      selected = [...selected, value];
      context.emit('update:selected', selected);
    });
    emitter.on(`${props.tableId}-datatable:rowUnselected`, value => {
      selected = selected.filter(item => item !== value);
      context.emit('update:selected', selected);
    });

    const getCheckIcon = (
      selectedItems: Array<number>,
      allItems: Array<RowItem>,
    ) => {
      return allItems.filter(
        (item: RowItem) =>
          item?.isSelectable !== false && item?.isDisabled !== true,
      ).length === selectedItems.length
        ? 'oxd-check'
        : 'dash';
    };

    const selectAll = computed({
      get: () => {
        return props.selected.length > 0;
      },
      set: value => {
        if (value) {
          emitter.emit(`${props.tableId}-datatable:selectAll`);
        } else {
          emitter.emit(`${props.tableId}-datatable:unselectAll`);
        }
      },
    });

    // const cardItems = computed(() => {
    //   return props.items.map((item, index) => {
    //     return props.selectable ? {selector: index, ...item} : {...item};
    //   });
    // });

    const cardHeaders = computed(() => {
      if (props.selectable) {
        return [
          {
            name: 'selector',
            cellType: 'oxd-table-cell-checkbox',
          },
          ...props.headers,
        ];
      }
      return props.headers;
    });

    const checkIcon = computed(() => getCheckIcon(props.selected, props.items));

    const onOrderChange = (order: Order, column: CardHeader) => {
      const orderFields = {};
      for (const key in props.order) {
        orderFields[key] = 'DEFAULT';
      }
      context.emit('update:order', {
        ...orderFields,
        [column.sortField]: order,
      });
    };

    const onClickRow = item => {
      return (e: Event) => {
        context.emit('click', {
          item,
          native: e,
        });
      };
    };

    onBeforeUnmount(() => {
      emitter.all.forEach((...[, key]) => {
        if ((key as string).substring(0, 8) === props.tableId) {
          emitter.all.delete(key);
        }
      });
    });

    watch(
      () => [...props.items],
      (newValue, oldValue) => {
        diff.value = [];
        const length = Math.max(newValue.length, oldValue.length);
        diff.value.length = length;
        for (let i = 0; i < length; i++) {
          if (oldValue.includes(newValue[i])) {
            diff.value[i] = true;
          }
        }
      },
      {deep: true},
    );

    return {
      diff,
      // cardItems,
      checkIcon,
      selectAll,
      onClickRow,
      cardHeaders,
      onOrderChange,
    };
  },

  emits: ['click', 'update:order', 'update:selected'],

  components: {
    'oxd-icon': Icon,
    'oxd-card-tr': TableRow,
    'oxd-card-tbody': TableBody,
    'oxd-card-thead': TableHeader,
    'oxd-card-th': TableHeaderCell,
    'oxd-loading-spinner': Spinner,
    'oxd-card-table-container': Table,
    'oxd-checkbox-input': CheckboxInput,
    'oxd-card-cell': DefaultCellContainer,
  },

  mixins: [translateMixin],
});
</script>

<style lang="scss" scoped>
@import './Decorator/card.scss';
@import './Header/default-header.scss';

.empty-msg-container {
  vertical-align: top;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 230px);
  .empty-msg {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    .caption {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      text-align: center;
      color: #929baa;
    }
    .icon {
      width: 100% !important;
      height: unset !important;
    }
  }
}
.--high {
  background-color: #c1f5be;
}
::v-deep(.oxd-table-body) {
  grid-gap: unset !important;
}
::v-deep(.oxd-table-header) {
  padding: 10px 0;
  border-bottom: 2px solid #dee2e6;
}
::v-deep(.oxd-table-card) {
  border-radius: 0 !important;
  &:not(:first-child) {
    border-top: 1px solid #e8eaef;
  }
}
::v-deep(.oxd-table-cell-actions) {
  flex-wrap: nowrap;
}
::v-deep(.oxd-table-cell-actions .oxd-select-text) {
  max-width: 195px;
  width: fit-content;
}
</style>
