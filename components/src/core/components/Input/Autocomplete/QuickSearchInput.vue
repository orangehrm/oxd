<template>
  <div class="oxd-autocomplete-search-wrapper">
    <oxd-autocomplete-input
      v-bind="$attrs"
      @update:modelValue="onModelUpdate($event)"
      @dropdown:clear="onClear()"
      @dropdown:opened="onOpen()"
      @dropdown:closed="onClosed()"
      @dropdown:blur="onBlur()"
    >
      <template v-for="(_, slot) of $slots" v-slot:[slot]="scope"
        >
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
    'dropdown:clear',
    'dropdown:opened',
    'dropdown:closed',
    'dropdown:blur',
  ],
  methods: {
    onModelUpdate($event: Option) {
      this.$emit('dropdown:modelValue', $event);
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
  padding-right: 0.25rem;
  border-radius: 2rem;
  min-height: 1rem;
  background-color: $oxd-background-pastel-white-color;
  border: 1px solid $oxd-interface-gray-lighten-2-color;
  .oxd-autocomplete-wrapper {
    display: flex;
    align-content: center;
  }
  &:deep(.oxd-icon-button) {
    background-color: $oxd-white-color;
    color: $oxd-interface-gray-darken-2-color;
    min-width: 33px;
    min-height: 33px;
  }
  &:deep(.oxd-autocomplete-text-input) {
    border: none;
    border-radius: 2rem;
    min-height: 1rem;
    background-color: transparent;
    input {
      padding: 0 0.5rem;
    }
  }
}
</style>
