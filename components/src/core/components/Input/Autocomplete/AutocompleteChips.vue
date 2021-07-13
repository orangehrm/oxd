<template>
  <div class="oxd-autocomplete-chips-area">
    <oxd-chip
      v-for="(option, index) in selected"
      :key="`${index}-selected-${option.id}`"
      :label="option.label"
      class="oxd-autocomplete-chips-selected"
    >
      <oxd-icon
        name="x"
        @click="onClick(option)"
        :class="{
          '--clear': true,
          '--disabled': disabled,
          '--readonly': readonly,
        }"
      />
    </oxd-chip>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Option} from '../types';
import Chip from '@orangehrm/oxd/core/components/Chip/Chip.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

export default defineComponent({
  name: 'oxd-autocomplete-chips',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    'oxd-chip': Chip,
    'oxd-icon': Icon,
  },

  emits: ['chipRemoved'],

  methods: {
    onClick(option: Option) {
      if (this.disabled || this.readonly) return;
      this.$emit('chipRemoved', option);
    },
  },
});
</script>

<style src="./autocomplete-input.scss" lang="scss" scoped></style>
