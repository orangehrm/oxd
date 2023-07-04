<template>
  <div class="oxd-list-tab">
    <div class="oxd-list-tab-content">
      <oxd-text
        v-for="tab in computedTabs"
        :key="tab.id"
        :id="tab.id"
        :class="{
          'oxd-list-tab-item': true,
          '--selected': modelValue === tab.id,
        }"
        tag="span"
        @click="$emit('update:modelValue', tab.id)"
      >
        <oxd-icon :name="tab.icon" size="large"></oxd-icon>
        {{ tab.label }}
      </oxd-text>
      <div class="oxd-list-tab-buttons">
        <slot></slot>
      </div>
    </div>
    <oxd-divider class="oxd-list-tab-divider" />
  </div>
</template>

<script lang="ts">
import {nanoid} from 'nanoid';
import {Tab} from './types';
import {computed, defineComponent, PropType} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';

export default defineComponent({
  name: 'oxd-list-tabs',

  components: {
    'oxd-icon': Icon,
    'oxd-text': Text,
    'oxd-divider': Divider,
  },

  emits: ['update:modelValue'],

  props: {
    tabs: {
      type: Array as PropType<Tab[]>,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    const computedTabs = computed(() =>
      props.tabs.map(tab => ({
        id: nanoid(),
        ...tab,
      })),
    );

    return {
      computedTabs,
    };
  },
});
</script>

<style lang="scss" src="./list2-tabs.scss" scoped></style>
