<template>
  <ul class="tab-list">
    <li
      class="tab-items"
      v-for="(tab, i) in tabs"
      :key="i"
      :class="[tab.class]"
    >
      <span
        tabindex="0"
        :id="tab.id"
        :class="{
          'tab-item': true,
          active: selectedTabId == tab.id,
        }"
        @blur="onBlur($event, tab)"
        @click="onClick($event, tab)"
        @focus="onFocus($event, tab)"
        @keyup.enter="onClick($event, tab)"
      >
        <oxd-icon
          class="tab-icon"
          :name="tab.icon"
          v-if="tab.icon"
          :flow="!tab.title && tab.tooltip ? 'bottom' : null"
          :tooltip="!tab.title && tab.tooltip ? $vt(tab.tooltip) : null"
        />{{ $vt(tab.title) }}</span
      >
      <div
        class="selected-tab-indicator"
        :class="{active: selectedTabId == tab.id}"
      ></div>
    </li>
    <li class="tab-actions">
      <slot name="tab-actions"></slot>
    </li>
  </ul>
  <div class="tab-content">
    <slot name="default"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, provide} from 'vue';
import {Tab} from './types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import translateMixin from '../../../mixins/translate';

export default defineComponent({
  name: 'oxd-tabs',
  components: {
    'oxd-icon': Icon,
  },
  mixins: [translateMixin],
  setup: function(props, {slots}) {
    const tabs = ref(
      slots.default
        ? slots
            .default()
            .filter(value => value.props?.tab)
            .map(value => {
              return {
                id: value.props?.tab.id,
                title: value.props?.tab.title,
                icon: value.props?.tab.icon,
                class: value.props?.tab.class,
                tooltip: value.props?.tab.tooltip,
              };
            })
        : [],
    );
    // eslint-disable-next-line
    const selectedTabId = ref(((tabs as unknown) as any)?.value[0].id);
    provide('selectedTabId', selectedTabId);

    const setCurrentTabId = (tab: Tab): void => {
      selectedTabId.value = tab.id;
    };
    return {
      setCurrentTabId,
      selectedTabId,
      tabs,
    };
  },
  emits: ['click', 'focus', 'blur', 'change'],
  methods: {
    onClick($e: Event, tab: Tab) {
      this.$emit('click', $e, tab);
      this.$emit('change', $e, tab);
      this.setCurrentTabId(tab);
    },
    onFocus($e: Event, tab: Tab) {
      this.$emit('focus', $e, tab);
    },
    onBlur($e: Event, tab: Tab) {
      this.$emit('blur', $e, tab);
    },
  },
});
</script>

<style src="./tabs.scss" lang="scss" scoped></style>
