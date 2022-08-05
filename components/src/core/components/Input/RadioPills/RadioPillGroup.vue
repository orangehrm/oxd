<template>
  <div class="radio-pill-group">
    <oxd-radio-pill
      v-for="(option, index) in options"
      :key="option.id"
      :id="id + '_' + option.id"
      :value="option.id"
      :style="option.style"
      :autofocus="$attrs.autofocus && index === 0"
      :name="name"
      :label="$vt(option.label)"
      :modelValue="modelValue"
      :disabled="disabled || option.disabled"
      :readonly="readonly"
      @focus="onFocus"
      @blur="onBlur"
      @click="onClick"
      @change="onChange"
      @update:modelValue="onUpdateModelValue"
    >
    </oxd-radio-pill>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import RadioPill from '@orangehrm/oxd/core/components/Input/RadioPills/RadioPill.vue';
import translateMixin from '@orangehrm/oxd/mixins/translate';

export interface Options {
  id: number;
  label: string;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: Record<string, any>;
}

export default defineComponent({
  name: 'oxd-radio-pill-group',
  components: {
    'oxd-radio-pill': RadioPill,
  },

  mixins: [translateMixin],

  emits: ['update:modelValue', 'change', 'click', 'focus', 'blur'],

  props: {
    id: {
      type: String,
      default: 'radio-pill-group-id',
    },
    name: {
      type: String,
      required: true,
    },
    style: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
    },
  },

  setup(props, context) {
    const onFocus = (e: FocusEvent) => {
      context.emit('focus', e);
    };

    const onBlur = (e: FocusEvent) => {
      context.emit('blur', e);
    };

    const onClick = (e: FocusEvent) => {
      context.emit('click', e);
    };

    const onUpdateModelValue = (value: string) => {
      context.emit('update:modelValue', value);
    };

    const onChange = (e: Event) => {
      context.emit('change', e);
    };

    return {
      onFocus,
      onBlur,
      onClick,
      onUpdateModelValue,
      onChange,
    };
  },
});
</script>

<style src="./radio-pill-group.scss" lang="scss" scoped></style>
