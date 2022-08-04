<template>
  <oxd-dropdown-menu @click="noOp" class="oxd-table-dropdown">
    <oxd-icon-button name="three-dots-vertical" />
    <template v-slot:content>
      <li
        v-for="option in options"
        :key="option.context"
        @click.once="onClick($event, option.context)"
        class="oxd-table-dropdown-item"
      >
        <oxd-icon v-if="option.icon" :name="option.icon" size="extra-small" />
        <oxd-text tag="p">{{ option.label }}</oxd-text>
      </li>
    </template>
  </oxd-dropdown-menu>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';
import DropdownMenu from '@orangehrm/oxd/core/components/DropdownMenu/DropdownMenu.vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';
import {ActionCellEvent, DropdownOption} from './types';

export default defineComponent({
  name: 'oxd-table-dropdown',
  props: {
    options: {
      type: Array as PropType<DropdownOption[]>,
      default: () => [],
    },
  },
  components: {
    'oxd-icon-button': IconButton,
    'oxd-dropdown-menu': DropdownMenu,
    'oxd-text': Text,
    'oxd-icon': Icon,
  },
  methods: {
    noOp(e: MouseEvent) {
      // stop event bubbling and prevent emiting event until selected
      e.stopImmediatePropagation();
    },
    onClick(e: MouseEvent, context: string) {
      const event: ActionCellEvent = e;
      event.context = context;
      this.$emit('click', event);
    },
  },
});
</script>

<style src="./dropdown.scss" lang="scss" scoped></style>
