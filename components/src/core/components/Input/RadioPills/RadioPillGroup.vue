<template>
  <oxd-input-group
    :id="id"
    :classes="{wrapper: 'radio-pill-group'}"
    class="oxd-input-field-bottom-space"
    :style="style"
  >
    <oxd-radio-pill
      v-for="option in processedOptions"
      :key="option.id"
      :id="id + '_' + option.id"
      :value="option.id"
      :style="option.style"
      :autofocus="option.autofocus"
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
  </oxd-input-group>
</template>
<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup.vue';
import RadioPill from '@orangehrm/oxd/core/components/Input/RadioPills/RadioPill.vue';
import translateMixin from '@orangehrm/oxd/mixins/translate';

export interface RadioPillGroupOption {
  id: string;
  label: string;
  disabled?: boolean;
  // eslint-disable-next-line
  style?: Record<string, any>;
  autofocus?: boolean;
}

export default defineComponent({
  name: 'oxd-radio-pill-group',
  components: {
    'oxd-radio-pill': RadioPill,
    'oxd-input-group': InputGroup,
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
      type: Array as PropType<RadioPillGroupOption[]>,
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

    const processedOptions = computed(() => {
      if (context.attrs.autofocus) {
        // Find first non-disabled option and set autofocus = true
        let enabledOptionFound = false;
        return props.options.map(option => {
          const processedOption: RadioPillGroupOption = {
            id: option.id,
            label: option.label,
            disabled: option.disabled,
          };
          if (!enabledOptionFound && !option.disabled) {
            enabledOptionFound = true;
            processedOption.autofocus = true;
          }

          return processedOption;
        });
      } else {
        return props.options;
      }
    });

    return {
      processedOptions,
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
