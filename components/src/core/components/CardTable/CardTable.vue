<template>
  <oxd-card-table-container>
    <!-- oxd-card-table header start -->
    <component :is="theme.headerDecorator"></component>
    <!-- oxd-card-table header end -->

    <!-- oxd-card-table body start -->
    <component :is="theme.bodyDecorator"></component>
    <!-- oxd-card-table body end -->
  </oxd-card-table-container>
</template>

<script lang="ts">
import {defineComponent, PropType, provide, readonly} from 'vue';
import {CardSelector, CardHeaders, Order} from './types';
import useResponsive from '../../../composables/useResponsive';
import Table from '@orangehrm/oxd/core/components/CardTable/Table/Table.vue';

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
    items: {
      type: Array,
      default: () => [],
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
      type: Array as PropType<number[]>,
      default: () => [],
    },
    decorator: {
      type: String,
      default: 'oxd-table-decorator-card',
    },
    order: {
      type: Array as PropType<Order[]>,
      default: () => [],
    },
  },

  setup(props) {
    const responsiveState = useResponsive();

    provide('tableProps', readonly(props));
    provide('screenState', readonly(responsiveState));
  },

  emits: [
    'click',
    'clickCheckbox',
    'update:selected',
    'update:selectAll',
    'update:sort',
  ],

  components: {
    'oxd-card-table-container': Table,

    // Body Decorators
    'oxd-table-decorator-card': DefaultCardContainer,

    // Header Decorators
    'oxd-table-header-default': DefaultCardHeader,
  },

  computed: {
    theme(): object {
      return {
        headerDecorator: 'oxd-table-header-default',
        bodyDecorator: 'oxd-table-decorator-card',
      };
    },
  },
});
</script>
