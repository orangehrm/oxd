<template>
<div class="input-outer" :style="style" :class="classes">
  <div class="input-text-field-icon"> 
  <oxd-icon :name="Icon"/>
  </div>
 <oxd-divider :orientation="'vertical'" :style="{ height:'100%' }"/>
<div class="input-text-field">
<input
    :value="modelValue"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
    :style="{
      border:'none',
      width:'100%',
      backgroundColor : 'inherit',
      fontFamily : 'inherit',
      color: 'inherit',
      fontSize: 'inherit',
      fontEeight: 'inherit',
      lineHeight: 'inherit'
    }"
  />
</div>
</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';

export interface State {
  focused: boolean;
}

export default defineComponent({
  name: 'oxd-input-with-icon',

  props: {
    modelValue: {},
    style: {
      type: Object,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    Icon: {
      type: String,
      default: 'oxd-time',
    },
  },

  data(): State {
    return {
      focused: false,
    };
  },

  computed: {
    classes(): object {
      return {
        'input-outer--active': !this.focused,
        'input-outer--focus': this.focused,
        'input-outer--error': this.hasError,
      };
    },
  },

  components :{
    'oxd-icon' : Icon,
    'oxd-divider' : Divider
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
    }
  },
});
</script>

<style src="./InputWithIcon.scss" lang="scss" scoped></style>
