<template>
  <div class="oxd-autocomplete-search-wrapper">
    <oxd-autocomplete-input
      v-bind="$attrs"
      @update:modelValue="onModelUpdate($event)"
      @update:searchTerm="onSearchTerm"
      @dropdown:clear="onClear()"
      @dropdown:opened="onOpen()"
      @dropdown:closed="onClosed()"
      @dropdown:blur="onBlur()"
    >
      <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </oxd-autocomplete-input>
    <slot name="iconSlot"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue';
import {Option} from '../types';

export default defineComponent({
  name: 'oxd-quick-search-input',
  inheritAttrs: false,

  components: {
    'oxd-autocomplete-input': AutocompleteInput,
  },
  emits: [
    'update:modelValue',
    'update:searchTerm',
    'dropdown:clear',
    'dropdown:opened',
    'dropdown:closed',
    'dropdown:blur',
  ],
  methods: {
    onModelUpdate($event: Option) {
      this.$emit('update:modelValue', $event);
    },
    onSearchTerm(searchTerm: string) {
      this.$emit('update:searchTerm', searchTerm);
    },
    onClear() {
      this.$emit('dropdown:clear');
    },
    onOpen() {
      this.$emit('dropdown:opened');
    },
    onClosed() {
      this.$emit('dropdown:closed');
    },
    onBlur() {
      this.$emit('dropdown:blur');
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../../../../styles';
@import '../variables';
.oxd-autocomplete-search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 2rem;
  min-height: 1rem;
  background-color: $oxd-background-pastel-white-color;
  .oxd-autocomplete-wrapper {
    display: flex;
    align-content: center;
  }
  &:deep(.oxd-icon-button) {
    background-color: $oxd-white-color;
    color: $oxd-interface-gray-darken-2-color;
    position: absolute;
    right: 3px;
  }
  &:deep(.oxd-autocomplete-text-input) {
    border: none;
    box-shadow: none;
    border-radius: 2rem;
    min-height: 1rem;
    background-color: transparent;
    input {
      border-radius: 2rem;
      font-size: 0.875rem;
      padding: 0.5rem 40px 0.5rem 0.5rem;
    }
  }
  &:deep(.oxd-autocomplete-text-input--active) {
    border: $oxd-input-border--active;
  }
  &:deep(.oxd-autocomplete-text-input--focus) {
    border: $oxd-input-border--focus;
    box-shadow: $oxd-input-box-shadow--focus;
    outline: 0;
  }
  &:deep(.oxd-autocomplete-text-input--error) {
    border: $oxd-input-border--error;
    box-shadow: $oxd-input-box-shadow--error;
  }
  &:deep(.oxd-autocomplete-text-input--disabled, .oxd-autocomplete-text-input--readonly) {
    background: $oxd-dropdown-dropdown-background--disabled;
  }
  &:deep(.oxd-autocomplete-dropdown) {
    margin-top: 44px;
  }
}
</style>
