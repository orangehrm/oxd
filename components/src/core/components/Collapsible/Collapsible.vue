<template>
  <div class="oxd-collapsible-container">
    <div class="oxd-collapsible-header-container">
      <label class="oxd-collapsible-title"> {{ $vt(headerTitle) }}</label>
      <div class="oxd-collapsible-caret-icon-wrapper">
        <oxd-icon-button
          :name="isExpanded ? 'oxd-caret-up' : 'oxd-caret-down'"
          @click="toggle"
          class="oxd-collapsible-caret-icon"
          size="xxx-small"
          :flow="tooltipFlow"
          :tooltip="isExpanded ? $vt('Show Less') : $vt('Show More')"
          v-if="collapsible"
        />
      </div>
    </div>
    <div class="oxd-common-content">
      <slot name="commonContent"></slot>
    </div>
    <div class="oxd-collapsed-content" v-if="!isExpanded">
      <slot name="collapsedContent"></slot>
    </div>
    <div class="oxd-expanded-content" v-if="isExpanded">
      <slot name="expandedContent"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import oxdIconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import translateMixin from '../../../mixins/translate';
import {TooltipPosition, TOOLTIP_TOP, TOOLTIP_POSITIONS} from '../Button/types';

export default defineComponent({
  name: 'CollapsibleComponent',
  components: {
    'oxd-icon-button': oxdIconButton,
  },
  mixins: [translateMixin],
  props: {
    headerTitle: {
      type: String,
      default: '',
    },
    defaultExpand: {
      type: Boolean,
      default: false,
    },
    collapsible: {
      type: Boolean,
      default: true,
    },
    tooltipFlow: {
      type: String,
      default: TOOLTIP_TOP,
      validator: (value: TooltipPosition) => {
        return TOOLTIP_POSITIONS.indexOf(value) !== 1;
      },
    },
  },
  data() {
    return {
      isExpanded: this.defaultExpand,
    };
  },
  methods: {
    toggle() {
      this.isExpanded = !this.isExpanded;
      this.$emit('toggle', {isExpanded: this.isExpanded});
    },
  },
});
</script>

<style src="./Collapsible.scss" lang="scss" scoped></style>
