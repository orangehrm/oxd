<template>
  <div class="oxd-status-tab-panel-header">
    <oxd-skeleton
      v-if="skeleton && loading"
      width="100%"
      :height="35"
      :animate="true"
    />
    <template v-else>
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
        :tooltip="$vt(mainButtonLabel)"
        :label="!collapsed ? $vt(mainButtonLabel) : ''"
        @click="onClickMainButton"
      />
    </template>
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
      <template v-if="skeleton && filterTabs.length === 0">
        <oxd-skeleton :lines="10" :height="30" :animate="true"></oxd-skeleton>
      </template>
      <template v-else>
        <li
          v-for="filter in filterTabs"
          :key="filter"
          :class="{
            'oxd-status-tab-panel-filter': true,
            '--selected': filter.selected,
            '--collapsed': collapsed,
          }"
          @click.stop="onClickFilter(filter)"
        >
          <oxd-text v-if="!collapsed" class="oxd-status-tab-panel-filter-name">
            {{ $vt(filter.name) }}
          </oxd-text>
          <oxd-text
            flow="right"
            class="oxd-status-tab-panel-filter-count"
            :tooltip="collapsed ? $vt(filter.name) : ''"
            :style="{color: filter.color, background: filter.backgroundColor}"
          >
            {{ filter.count }}
          </oxd-text>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import {Filter} from './types';
import translateMixin from '../../../mixins/translate';
import {computed, defineComponent, PropType} from 'vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Button from '@orangehrm/oxd/core/components/Button/Button.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

export default defineComponent({
  inheritAttrs: false,

  name: 'oxd-status-tab-panel',

  mixins: [translateMixin],

  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    skeleton: {
      type: Boolean,
      default: true,
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
      type: Array as PropType<Filter[]>,
      default: () => [],
    },
  },

  components: {
    'oxd-text': Text,
    'oxd-button': Button,
    'oxd-divider': Divider,
    'oxd-skeleton': Skeleton,
  },

  emits: ['clickMainButton', 'filter'],

  setup(props, context) {
    const filterTabs = computed(() => {
      return props.filters.map(filter => {
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

    const onClickFilter = (filter: Filter) => {
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
