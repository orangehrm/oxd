<template>
  <button
    :disabled="disabled"
    v-if="withContainer"
    type="button"
    :class="classes"
    @click="onClick"
    :tooltip="tooltipText"
    :aria-label="accessibleName"
    :flow="flow"
  >
    <oxd-icon
      :style="iconStyles"
      :size="size"
      :class="{'--disabled': disabled}"
      :name="name"
      aria-hidden="true"
    />
  </button>
  <oxd-icon
    v-else
    :style="iconStyles"
    :size="size"
    :name="name"
    :class="{'oxd-icon-button__icon': true, '--disabled': disabled}"
    @click="onClick"
    :tooltip="$vt(tooltip)"
    :flow="flow"
  />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TooltipPosition, TOOLTIP_TOP, TOOLTIP_POSITIONS} from './types';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import translateMixin from '../../../mixins/translate';

export default defineComponent({
  name: 'oxd-icon-button',

  components: {
    'oxd-icon': Icon,
  },

  mixins: [translateMixin],

  props: {
    name: {
      type: String,
      required: true,
    },
    withContainer: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: String,
      default: null,
    },
    flow: {
      type: String,
      default: TOOLTIP_TOP,
      validator: (value: TooltipPosition) => {
        return TOOLTIP_POSITIONS.indexOf(value) !== 1;
      },
    },
    iconStyles: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: String,
    },
    showTooltipWhenDisabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click'],

  computed: {
    classes(): object {
      return {
        'oxd-icon-button': true,
      };
    },
    tooltipText() {
      return this.disabled && !this.showTooltipWhenDisabled
        ? null
        : this.$vt(this.tooltip);
    },
    // tooltip is a CSS-only [tooltip]::after and invisible to AT, so an
    // icon-only button has no name. Reuse the tooltip text unless the
    // consumer supplied one. Must NOT null out when disabled — a disabled
    // control still needs a name. WCAG 4.1.2.
    accessibleName(): string | null {
      return (
        (this.$attrs['aria-label'] as string) || this.$vt(this.tooltip) || null
      );
    },
  },

  methods: {
    onClick(e: Event) {
      e.preventDefault();
      this.$emit('click', e);
    },
  },
});
</script>

<style src="./icon.scss" lang="scss" scoped></style>
