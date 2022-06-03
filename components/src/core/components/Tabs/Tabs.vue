<template>
  <ul class="tab-list">
    <li class="tab-items" v-for="(tab, i) in tabs" :key="i">
      <span
        tabindex="0"
        class="tab-item"
        @click="setCurrentTabId(tab)"
        :class="{ active: currentTabId == tab.id }"
        @keyup.enter="setCurrentTabId(tab)"
        :id="tab.id"
      >
        <oxd-icon class="tab-icon" :name="tab.icon" v-if="tab.icon" />{{
          $vt(tab.title)
        }}</span
      >
      <div
        class="selected-tab-indicator"
        :class="{ active: currentTabId == tab.id }"
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
import { defineComponent, ref } from "vue";
import { Tab } from "./types";
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import translateMixin from '../../../mixins/translate';

export default defineComponent({
  name: "oxd-tabs",
  props: {
    tabs: {
      type: Array as () => Array<Tab>,
      required: true
    },
  },
  components: {
    "oxd-icon": Icon,
  },
  mixins: [translateMixin],
  setup: function (props, context) {
    const currentTabId = ref(props.tabs[0].id);
    context.emit('selectTabItem', props.tabs[0]);
    return {
      currentTabId
    };
  },
  emits: ['selectTabItem'], 
  methods: {
    setCurrentTabId(tab: Tab) {
      this.currentTabId = tab.id;
      this.$emit("selectTabItem", tab);
    }
  },
});
</script>

<style src="./tabs.scss" lang="scss" scoped></style>
