<template>
  <ul class="tab-list">
    <li class="tab-items" v-for="(tab, i) in tabs" :key="i">
      <span
        tabindex="0"
        class="tab-item"
        @click="onClick($event, tab)"
        @focus="onFocus($event, tab)"
        @blur="onBlur($event, tab)"
        :class="{active: currentTabId == tab.id}"
        @keyup.enter="onClick($event, tab)"
        :id="tab.id"
      >
        <oxd-icon class="tab-icon" :name="tab.icon" v-if="tab.icon" />{{
          $vt(tab.title)
        }}</span
      >
      <div
        class="selected-tab-indicator"
        :class="{active: currentTabId == tab.id}"
      ></div>
    </li>
  </ul>
  <div class="tab-content">
    <KeepAlive>
      <slot :name="currentTabId"></slot>
    </KeepAlive>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {Tab} from './types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import translateMixin from '../../../mixins/translate';

export default defineComponent({
  name: 'oxd-tabs',
  props: {
    tabs: {
      type: Array as () => Array<Tab>,
      required: true,
    },
  },
  components: {
    'oxd-icon': Icon,
  },
  mixins: [translateMixin],
  setup: function(props) {
    const currentTabId = ref<string>('');

    const setCurrentTabId = (tab: Tab): void => {
      currentTabId.value = tab.id;
    };

    setCurrentTabId(props.tabs[0]);
    return {
      currentTabId,
      setCurrentTabId,
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
