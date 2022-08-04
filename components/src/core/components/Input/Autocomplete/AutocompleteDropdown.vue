<template>
  <div role="listbox" class="oxd-autocomplete-dropdown">
    <oxd-autocomplete-option v-if="loading">
      {{ $vt('Searching...') }}
    </oxd-autocomplete-option>
    <oxd-autocomplete-option v-else-if="empty">
      {{ $vt('No results found') }}
    </oxd-autocomplete-option>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AutocompleteOption from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteOption.vue';
import translateMixin from '../../../../mixins/translate';

export default defineComponent({
  name: 'oxd-autocomplete-dropdown',

  components: {
    'oxd-autocomplete-option': AutocompleteOption,
  },

  mixins: [translateMixin],

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style src="./autocomplete-input.scss" lang="scss" scoped></style>
