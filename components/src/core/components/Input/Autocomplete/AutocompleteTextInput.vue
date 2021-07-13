<template>
  <div :class="classes" :style="style">
    <div class="oxd-autocomplete-text-input--before">
      <slot name="beforeInput"></slot>
    </div>
    <input
      @focus="onFocus"
      @blur="onBlur"
      v-bind="$attrs"
      :disabled="disabled"
      :readonly="readonly"
    />
    <div class="oxd-autocomplete-text-input--after">
      <slot name="afterInput"></slot>
      <oxd-icon
        v-if="clear"
        class="oxd-autocomplete-text-input--clear"
        name="x"
        @click="onClear"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-autocomplete-text-input',
  inheritAttrs: false,

  emits: ['clear'],

  components: {
    'oxd-icon': Icon,
  },

  props: {
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    clear: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      focused: false,
    };
  },

  computed: {
    classes(): object {
      return {
        'oxd-autocomplete-text-input': true,
        'oxd-autocomplete-text-input--active': !this.focused,
        'oxd-autocomplete-text-input--focus': this.focused,
        'oxd-autocomplete-text-input--error': this.hasError,
        'oxd-autocomplete-text-input--disabled': this.disabled,
        'oxd-autocomplete-text-input--readonly': this.readonly,
      };
    },
  },

  methods: {
    onFocus($e: Event) {
      if (this.disabled || this.readonly) {
        $e.stopImmediatePropagation();
        return;
      }
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    onClear() {
      this.$emit('clear');
    },
  },
});
</script>

<style src="./autocomplete-input.scss" lang="scss" scoped></style>
