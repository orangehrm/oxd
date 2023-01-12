<template>
  <div class="oxd-autocomplete-email-wrapper" :class="classes">
    <oxd-autocomplete-input
      ref="autocompleteEmailInput"
      v-bind="$attrs"
      :disabled="disabled"
      :readonly="readonly"
      @update:modelValue="onModelUpdate($event)"
      @update:searchTerm="onSearchTerm"
      @dropdown:clear="onClear()"
      @dropdown:closed="onClosed()"
      @dropdown:blur="onBlur()"
      @select:enter="onSelectEnter"
    >
      <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </oxd-autocomplete-input>
    <slot v-if="!disabled" name="iconSlot"></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue';
import {Option} from '../types';

export default defineComponent({
  name: 'oxd-autocomplete-email-input',
  inheritAttrs: false,

  components: {
    'oxd-autocomplete-input': AutocompleteInput,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:modelValue',
    'update:searchTerm',
    'dropdown:clear',
    'dropdown:closed',
    'dropdown:blur',
    'select:enter',
  ],
  computed: {
    classes(): object {
      return {
        'oxd-autocomplete-search-wrapper--readonly': this.readonly,
      };
    },
  },
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
    onClosed() {
      this.$emit('dropdown:closed');
    },
    onBlur() {
      const autocompleteEmailInput: any = this.$refs.autocompleteEmailInput;
      if (autocompleteEmailInput) {
        autocompleteEmailInput.dropdownOpen = false;
      }
      this.$emit('dropdown:blur');
    },
    onSelectEnter() {
      this.$emit('select:enter');
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../../../../styles';
@import '../variables';
:deep(.oxd-chip-label) {
  font-weight: 700;
}
</style>
