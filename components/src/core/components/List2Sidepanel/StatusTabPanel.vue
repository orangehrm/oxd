<template>
  <div class="oxd-status-tab-panel-header">
    <slot name="header" :collapsed="collapsed"></slot>
    <oxd-button
      v-if="!$slots['header']"
      size="long"
      flow="right"
      iconSize="xx-small"
      :class="mainButtonClasses"
      :displayType="mainButtonType"
      :iconName="mainButtonIconName"
      :disabled="mainButtonDisabled"
      :label="!collapsed ? mainButtonLabel : ''"
      :tooltip="collapsed ? mainButtonLabel : ''"
      @click="onClickMainButton"
    />
  </div>
  <oxd-divider></oxd-divider>
  <div class="oxd-status-tab-panel-body">
    <slot name="body" :collapsed="collapsed"></slot>
    <ul
      :class="{
        'oxd-status-tab-panel-filters': true,
        '--padtop': $slots['body'],
      }"
    >
      <li
        v-for="filter in filterTabs"
        :key="filter"
        :class="{
          'oxd-status-tab-panel-filter': true,
          '--selected': filter.selected,
          '--collapsed': collapsed,
        }"
        @click="onClickFilter(filter)"
      >
        <oxd-text v-if="!collapsed" class="oxd-status-tab-panel-filter-name">
          {{ $t(filter.name) }}
        </oxd-text>
        <oxd-text
          class="oxd-status-tab-panel-filter-count"
          :style="{color: filter.color, background: filter.backgroundColor}"
        >
          {{ filter.count }}
        </oxd-text>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';
import OxdButton from '@orangehrm/oxd/core/components/Button/Button.vue';

export default defineComponent({
  inheritAttrs: false,

  name: 'oxd-status-tab-panel',

  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    mainButtonLabel: {
      type: String,
      default: 'Main Button',
    },
    mainButtonType: {
      type: String,
      default: 'secondary',
    },
    mainButtonIconName: {
      type: String,
      default: 'oxd-add',
    },
    mainButtonDisabled: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    'oxd-text': Text,
    'oxd-divider': Divider,
    'oxd-button': OxdButton,
  },

  emits: ['clickMainButton', 'filter'],

  setup(props, context) {
    const filterTabs = computed(() => {
      return (props.filters as Array<{
        count: string;
        color: string;
        backgroundColor: string;
      }>).map(filter => {
        return {
          ...filter,
          color: filter.color,
          backgroundColor: filter.backgroundColor ?? '',
          count: String(filter.count ?? '0').substring(0, 6),
        };
      });
    });

    const mainButtonClasses = computed(() => ({
      'oxd-status-tab-panel-mainbutton': true,
      '--collapsed': props.collapsed,
    }));

    const onClickFilter = (filter: object) => {
      context.emit('filter', filter);
    };

    const onClickMainButton = ($event: Event) => {
      context.emit('clickMainButton', $event);
    };

    return {
      filterTabs,
      onClickFilter,
      onClickMainButton,
      mainButtonClasses,
    };
  },
});
</script>

<style lang="scss" src="./status-tab-panel.scss" scoped></style>
