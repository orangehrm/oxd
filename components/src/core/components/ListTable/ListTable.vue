<template>
  <oxd-card-table-container>
    <oxd-card-thead>
      <oxd-card-tr :clickable="false">
        <oxd-card-th
          v-if="loading && skeleton"
          class="oxd-padding-cell oxd-table-th"
        >
          <oxd-skeleton class="oxd-skeleton-checkbox" animateHighlighted />
        </oxd-card-th>
        <oxd-card-th
          v-else-if="selectable"
          class="oxd-padding-cell oxd-table-th"
        >
          <oxd-checkbox-input v-model="selectAll" :checkIcon="checkIcon" />
        </oxd-card-th>

        <oxd-card-th
          v-for="header in computedHeaders"
          :key="header"
          :style="header.style"
          :class="header.class"
          :order="sortFields[header.sortField]"
          class="oxd-padding-cell oxd-table-th"
          :loading="loading && skeleton"
          @order="onOrderChange($event, header)"
        >
          <oxd-icon
            v-if="header.iconName"
            :name="header.iconName"
            :style="header.iconStyle"
          />
          <span :tooltip="$vt(header.title)" v-else>
            <p class="oxd-table-th-txt">{{ $vt(header.title) }}</p>
          </span>
        </oxd-card-th>
      </oxd-card-tr>
    </oxd-card-thead>

    <div v-if="loading && !skeleton" class="oxd-table-loader">
      <oxd-loading-spinner :withContainer="false" />
    </div>

    <div v-else-if="!loading && items.length === 0" class="empty-msg-container">
      <div class="empty-msg">
        <oxd-icon name="oxd-no-data" class="icon"></oxd-icon>
        <div class="caption">
          {{ $vt('Sorry, No Data Found!') }}
        </div>
      </div>
    </div>

    <oxd-card-tbody v-else>
      <div
        v-for="(item, index) in computedItems"
        :key="item"
        :class="tableRowClasses[index]"
        @click="onClickRow(item)($event)"
      >
        <oxd-card-tr :clickable="clickable">
          <oxd-card-cell
            class="oxd-padding-cell"
            :index="index"
            :headers="cardHeaders"
            :loading="item._skeleton"
            :items="{selector: index, ...item}"
          ></oxd-card-cell>
        </oxd-card-tr>
      </div>
    </oxd-card-tbody>
  </oxd-card-table-container>
</template>

<script lang="ts">
import {
  watch,
  provide,
  readonly,
  PropType,
  computed,
  SetupContext,
  onBeforeUnmount,
  defineComponent,
} from 'vue';
import {
  Order,
  CardHeader,
  CardHeaders,
  CardSelector,
  SortDefinition,
} from '../CardTable/types';
import {nanoid} from 'nanoid';
import emitter from '../../../utils/emitter';
import {RowItem} from '../CardTable/Cell/types';
import translateMixin from '../../../mixins/translate';
import useFlashing from '../../../composables/useFlashing';
import {DEVICE_LG} from '../../../composables/useResponsive';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner.vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';
import Table from '@orangehrm/oxd/core/components/CardTable/Table/Table.vue';
import TableRow from '@orangehrm/oxd/core/components/CardTable/Table/TableRow.vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import TableBody from '@orangehrm/oxd/core/components/CardTable/Table/TableBody.vue';
import CellContainer from '@orangehrm/oxd/core/components/ListTable/CellContainer.vue';
import TableHeader from '@orangehrm/oxd/core/components/ListTable/TableHeader.vue';
import TableHeaderCell from '@orangehrm/oxd/core/components/ListTable/TableHeaderCell.vue';

export default defineComponent({
  name: 'oxd-list-table',

  props: {
    clickable: {
      type: Boolean,
      default: false,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    flashRows: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    skeleton: {
      type: Boolean,
      default: false,
    },
    skeletonCount: {
      type: Number,
      default: 15,
    },
    partialLoading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    provide('screenState', {
      screenType: DEVICE_LG,
    });
    provide('tableProps', readonly(props));

    let selected = [...props.selected];
    const flashIndexes = useFlashing(props, context as SetupContext);

    emitter.on(`${props.tableId}-datatable:rowSelected`, value => {
      selected = [...selected, value];
      context.emit('update:selected', selected);
    });
    emitter.on(`${props.tableId}-datatable:rowUnselected`, value => {
      selected = selected.filter(item => item !== value);
      context.emit('update:selected', selected);
    });

    watch(
      () => props.selected,
      newValue => {
        if (Array.isArray(newValue) && newValue.length === 0) {
          selected = [];
        }
      },
    );

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

    const computedHeaders = computed(() => {
      if (props.loading && props.skeleton) {
        return props.headers.filter(
          header => !(header.name === 'action' && !header.title),
        );
      }
      return props.headers;
    });
    const cardHeaders = computed(() => {
      if (props.selectable || (props.loading && props.skeleton)) {
        return [
          {
            name: 'selector',
            cellType: 'oxd-table-cell-checkbox',
          },
          ...computedHeaders.value,
        ];
      }
      return computedHeaders.value;
    });

    const checkIcon = computed(() => getCheckIcon(props.selected, props.items));

    const sortFields = computed(() => {
      const sort = {};
      for (const key in props.order) {
        const orderObj = props.order[key];
        if (typeof orderObj === 'object') {
          sort[key] = {
            order: orderObj.order,
            iconAsc: orderObj?.iconAsc,
            iconDesc: orderObj?.iconDesc,
          };
        } else {
          sort[key] = {
            order: props.order[key],
            iconAsc: '',
            iconDesc: '',
          };
        }
      }
      return sort;
    });

    const computedItems = computed(() => {
      if (props.skeleton) {
        const defaultValue = {
          _skeleton: true,
        };
        props.headers.forEach(header => {
          defaultValue['_id'] = nanoid();
          defaultValue[header.name] = null;
        });

        if (props.loading) {
          return Array(props.skeletonCount).fill(defaultValue);
        }
        if (props.partialLoading) {
          return Array(props.items.length + 3)
            .fill(defaultValue)
            .map((value, i) => props.items[i] || value);
        }
      }
      return props.items;
    });

    const tableRowClasses = computed(() =>
      computedItems.value.map((_, index: number) => ({
        'oxd-table-card': true,
        '--loaded': !(props.loading && props.skeleton),
        'oxd-row-highlight--success':
          [...flashIndexes.value, ...props.flashRows].find(i => i === index) !==
            undefined && !(props.loading && props.skeleton),
      })),
    );

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

    return {
      checkIcon,
      selectAll,
      sortFields,
      onClickRow,
      cardHeaders,
      flashIndexes,
      onOrderChange,
      computedItems,
      tableRowClasses,
      computedHeaders,
    };
  },

  emits: ['click', 'update:order', 'update:selected'],

  components: {
    'oxd-icon': Icon,
    'oxd-card-tr': TableRow,
    'oxd-skeleton': Skeleton,
    'oxd-card-tbody': TableBody,
    'oxd-card-thead': TableHeader,
    'oxd-card-th': TableHeaderCell,
    'oxd-loading-spinner': Spinner,
    'oxd-card-cell': CellContainer,
    'oxd-card-table-container': Table,
    'oxd-checkbox-input': CheckboxInput,
  },

  mixins: [translateMixin],
});
</script>

<style lang="scss" src="./list-table.scss" scoped></style>
