<template>
  <div class="oxd-multiselect-chips-area">
    <oxd-chip
      v-for="(option, index) in selected"
      :key="`${index}-selected-${option.id}`"
      :label="option.label"
      class="oxd-multiselect-chips-selected"
    >
      <template v-slot>
        <slot name="chips" :data="option"></slot>
        <oxd-icon
          name="x"
          @click="onClick(option)"
          data-test="removeIcon"
          :class="{
            '--clear': true,
            '--disabled': disabled,
            '--readonly': readonly,
          }"
        />
      </template>
    </oxd-chip>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Option} from '../types';
import Chip from '@orangehrm/oxd/core/components/Chip/Chip.vue';
import Icon from '@orangehrm/oxd/core/components/Button/Icon.vue';

export default defineComponent({
  name: 'oxd-mutliselect-chips',

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

<style src="./multiselect-input.scss" lang="scss" scoped></style>
