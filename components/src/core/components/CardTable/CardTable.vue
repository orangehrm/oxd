<template>
  <oxd-card-table-container>
    <div v-if="loading" class="oxd-table-loader">
      <oxd-loading-spinner :withContainer="false" />
    </div>
    <template v-else>
      <!-- oxd-card-table header start -->
      <component :is="tableDeco.headerDecorator"></component>
      <!-- oxd-card-table header end -->
      <!-- oxd-card-table body start -->
      <component :is="tableDeco.bodyDecorator"></component>
      <!-- oxd-card-table body end -->
    </template>
  </oxd-card-table-container>
</template>

<script lang="ts">
import {nanoid} from 'nanoid';
import emitter from '../../../utils/emitter';
import {
  defineComponent,
  onBeforeUnmount,
  PropType,
  provide,
  readonly,
  watch,
} from 'vue';
import {
  CardSelector,
  CardHeaders,
  SortDefinition,
  HighlightRows,
  HighlightType,
  HIGHLIGHT_TYPES,
  HIGHLIGHT_TYPE_SUCCESS,
} from './types';
import useResponsive from '../../../composables/useResponsive';
import Table from '@orangehrm/oxd/core/components/CardTable/Table/Table.vue';
import Spinner from '@orangehrm/oxd/core/components/Loader/Spinner.vue';

// Body Decorators
import DefaultCardContainer from '@orangehrm/oxd/core/components/CardTable/Decorator/DefaultCardContainer.vue';

// Headers Decorators
import DefaultCardHeader from '@orangehrm/oxd/core/components/CardTable/Header/DefaultCardHeader.vue';

export default defineComponent({
  name: 'oxd-card-card-table',

  props: {
    selector: {
      type: Object as PropType<CardSelector>,
      default: () => ({}),
    },
    headers: {
      type: Array as PropType<CardHeaders>,
      default: () => [],
    },
    hideHeaders: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    highlightRows: {
      type: Object as PropType<HighlightRows>,
      default: () => ({
        rowIndexes: [],
        type: HIGHLIGHT_TYPE_SUCCESS,
      }),
      validator: (value: HighlightType) => {
        return HIGHLIGHT_TYPES.indexOf(value) !== -1;
      },
    },
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
    selected: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    decorator: {
      type: String,
      default: 'oxd-table-decorator-card',
    },
    order: {
      type: Object as PropType<SortDefinition>,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    tableId: {
      type: String,
      default: () => nanoid(8),
    },
  },

  setup(props, context) {
    const responsiveState = useResponsive();

    provide('tableProps', readonly(props));
    provide('screenState', readonly(responsiveState));

    emitter.on(`${props.tableId}-datatable:selectAll`, value => {
      context.emit('update:selectAll', value);
    });
    emitter.on(`${props.tableId}-datatable:unselectAll`, () => {
      context.emit('update:selectAll', []);
    });
    emitter.on(`${props.tableId}-datatable:updateOrder`, value => {
      context.emit('update:order', value);
    });
    emitter.on(`${props.tableId}-datatable:updateSelected`, value => {
      context.emit('update:selected', value);
    });
    emitter.on(`${props.tableId}-datatable:clickCheckboxCell`, value => {
      context.emit('clickCheckbox', value);
    });
    emitter.on(`${props.tableId}-datatable:clickRow`, value => {
      context.emit('click', value);
    });

    watch(
      () => props.loading,
      () => {
        context.emit('update:selected', []);
      },
    );

    watch(
      () => props.items,
      () => {
        context.emit('update:selected', []);
      },
    );

    onBeforeUnmount(() => {
      emitter.all.forEach((...[, key]) => {
        if ((key as string).substr(0, 8) === props.tableId) {
          emitter.all.delete(key);
        }
      });
    });
  },

  emits: [
    'click',
    'clickCheckbox',
    'update:selected',
    'update:selectAll',
    'update:order',
  ],

  components: {
    'oxd-card-table-container': Table,
    'oxd-loading-spinner': Spinner,

    // Body Decorators
    'oxd-table-decorator-card': DefaultCardContainer,

    // Header Decorators
    'oxd-table-header-default': DefaultCardHeader,
  },

  computed: {
    tableDeco(): object {
      return {
        headerDecorator: 'oxd-table-header-default',
        bodyDecorator: 'oxd-table-decorator-card',
      };
    },
  },
});
</script>
