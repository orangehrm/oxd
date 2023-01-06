<template>
  <div
    :class="classes"
    :style="style"
    :tabindex="tabIndex"
    v-bind="defaultAttrs"
    @focus="onFocus"
    @blur="onBlur"
  >
    <div class="oxd-select-text-input">
      <div v-if="!value" class="select-placeholder">{{ $vt(placeholder) }}</div>
      <div v-else class="selected-content">{{ value }}</div>
      <input
        type="text"
        readonly="readonly"
        tabIndex="-1"
        v-bind="inputAttrs"
        @blur="onBlur"
      />
    </div>

    <div class="oxd-select-text--after">
      <slot name="afterInput"></slot>
      <div
        class="oxd-select-text--arrow"
        :class="dropdownIconClasses"
        v-if="!disabled"
      >
        <oxd-icon
          :class="dropdownIconClasses"
          :size="dropdownIconSize"
          :name="dropdownIcon"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import eventsMixin from './events-mixin';
import navigationMixin from './navigation-mixin';
import translateMixin from '../../../../mixins/translate';

export default defineComponent({
  name: 'oxd-select-text',
  inheritAttrs: false,

  components: {
    'oxd-icon': Icon,
  },

  mixins: [navigationMixin, eventsMixin, translateMixin],

  emits: ['icon:clicked'],

  props: {
    dropdownOpened: {
      type: Boolean,
      default: true,
    },
    value: {
      type: String,
    },
    placeholder: {
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
    downIcon: {
      type: String,
      default: 'caret-down-fill',
    },
    upIcon: {
      type: String,
      default: 'caret-up-fill',
    },
    dropdownIconSize: {
      type: String,
      default: 'medium',
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
      return this.dropdownOpened ? this.upIcon : this.downIcon;
    },
    dropdownIconClasses(): object {
      return {
        '--disabled': this.disabled,
        '--readonly': this.readonly,
      };
    },
    tabIndex(): number {
      return this.disabled ? -1 : 0;
    },
    inputAttrs() {
      const allowed = ['id'];
      return Object.keys(this.$attrs)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = this.$attrs[key];
          return obj;
        }, {});
    },
    defaultAttrs() {
      const notAllowed = ['id'];
      return Object.keys(this.$attrs)
        .filter(key => !notAllowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = this.$attrs[key];
          return obj;
        }, {});
    },
  },

  methods: {
    onFocus($e: Event) {
      if (this.disabled) {
        $e.stopImmediatePropagation();
        return;
      }
      this.focused = true;
    },
    onBlur($e: Event) {
      $e.stopImmediatePropagation();
      this.focused = false;
      this.$emit('blur', $e);
    },
  },
});
</script>

<style src="./select-input.scss" lang="scss" scoped></style>
