<template>
  <div :class="outerClasses" class="input-outer-wrapper">
    <div v-if="imageIcon" class="input-text-field-icon">
      <img
        :src="imageIcon"
        :class="{'click-disabled': !isIconClickable}"
        @click="imageIconClick()"
      />
    </div>
    <oxd-divider
      v-if="imageIcon"
      :orientation="'vertical'"
      :style="{height: '100%'}"
    />
    <input
      :class="classes"
      :style="style"
      :value="modelValue"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @keyup.page-down="onPageDown"
      @keyup.page-up="onPageUp"
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';

export interface State {
  focused: boolean;
}

export default defineComponent({
  name: 'oxd-input',
  inheritAttrs: false,
  components: {
    'oxd-divider': Divider,
  },

  props: {
    // https://v3.vuejs.org/guide/migration/v-model.html#overview
    modelValue: {},
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    imageIcon: {
      type: String,
    },
    isIconClickable: {
      type: Boolean,
      default: false,
    },
    imageIconClick: {
      type: Function,
      required: false,
    },
  },

  data(): State {
    return {
      focused: false,
    };
  },

  computed: {
    classes(): object {
      const isIconExists = this.imageIcon ? '--with-icon' : '';
      return {
        [`oxd-input${isIconExists}`]: true,
        [`oxd-input${isIconExists}--active`]: !this.focused,
        [`oxd-input${isIconExists}--focus`]: this.focused,
        [`oxd-input${isIconExists}--error`]: this.hasError,
      };
    },
    outerClasses(): object {
      return this.imageIcon
        ? {
            'input-outer': true,
            'input-outer--active': !this.focused,
            'input-outer--focus': this.focused,
            'input-outer--error': this.hasError,
          }
        : {'input-outer': false};
    },
  },

  methods: {
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.focused = false;
    },
    onInput(e: Event) {
      e.preventDefault();
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value);
      this.$emit('input', e);
    },
    onPageDown(e: KeyboardEvent) {
      (e.target as HTMLInputElement).setSelectionRange(
        (e.target as HTMLInputElement).value.length - 1,
        (e.target as HTMLInputElement).value.length,
      );
    },

    onPageUp(e: KeyboardEvent) {
      (e.target as HTMLInputElement).setSelectionRange(0, 0);
    },
  },
});
</script>

<style src="./input.scss" lang="scss" scoped></style>
