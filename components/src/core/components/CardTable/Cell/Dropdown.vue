<template>
  <oxd-dropdown-menu @click="noOp" class="oxd-table-dropdown">
    <oxd-icon-button :name="iconName" :size="iconSize" :disabled="disabled" />
    <template v-slot:content>
      <li
        v-for="(option, i) in options"
        :key="option.context"
        @click.once="onClick($event, option.context)"
        :class="optionClasses[i]"
      >
        <div class="oxd-table-dropdown-item-left">
          <oxd-icon v-if="option.icon" :name="option.icon" size="extra-small" />
          <oxd-text tag="p">{{ option.label }}</oxd-text>
        </div>
        <div v-if="option.count" class="oxd-table-dropdown-item-right">
          {{ option.count }}
        </div>
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
    iconName: {
      type: String,
      default: 'three-dots-vertical',
    },
    iconSize: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
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
  computed: {
    optionClasses(): object[] {
      // eslint-disable-next-line
      return this.options.map((option: any) => {
        return {
          'oxd-table-dropdown-item': true,
          [option.class]: option.class,
        };
      });
    },
  },
});
</script>

<style src="./dropdown.scss" lang="scss" scoped></style>
