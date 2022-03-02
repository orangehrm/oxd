<template>
  <div @click="onToggle" :class="classes" :style="style">
    <div
      class="oxd-select-text-input"
      :tabindex="tabIndex"
      @focus="onFocus"
      @blur="onBlur"
      v-bind="$attrs"
      ref="oxdInput"
    >
      {{ value }}
    </div>
    <div class="oxd-select-text--after">
      <slot name="afterInput"></slot>
      <oxd-icon
        v-if="!disabled"
        :class="dropdownIconClasses"
        :name="dropdownIcon"
        @click="onToggle"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import eventsMixin from './events-mixin';
import navigationMixin from './navigation-mixin';

export default defineComponent({
  name: 'oxd-select-text',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
  },

  mixins: [navigationMixin, eventsMixin],

  emits: ['icon:clicked'],

  props: {
    dropdownOpened: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
    },
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
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
        'oxd-select-text': true,
        'oxd-select-text--active': !this.focused,
        'oxd-select-text--focus': this.focused,
        'oxd-select-text--error': this.hasError,
        'oxd-select-text--disabled': this.disabled,
        'oxd-select-text--readonly': this.readonly,
      };
    },
    dropdownIcon(): string {
      return this.dropdownOpened ? 'caret-up-fill' : 'caret-down-fill';
    },
    dropdownIconClasses(): object {
      return {
        'oxd-select-text--arrow': true,
        '--disabled': this.disabled,
        '--readonly': this.readonly,
      };
    },
    tabIndex(): number {
      return this.disabled || this.readonly ? -1 : 0;
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
    onToggle() {
      this.$refs.oxdInput.focus();
      this.$emit('icon:clicked');
    },
  },
});
</script>

<style src="./select-input.scss" lang="scss" scoped></style>
