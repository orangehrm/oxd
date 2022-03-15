<template>
  <oxd-input-group
    :label="label"
    :labelIcon="labelIcon"
    :message="message"
    class="oxd-input-field-bottom-space"
    :classes="classes"
  >
    <component
      :is="component"
      v-bind="$attrs"
      :hasError="hasError"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
  </oxd-input-group>
</template>

<script lang="ts">
import {toRef, PropType, nextTick, defineComponent} from 'vue';
import InputGroup from '@orangehrm/oxd/core/components/InputField/InputGroup.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import FileInput from '@orangehrm/oxd/core/components/Input/FileInput.vue';
import Textarea from '@orangehrm/oxd/core/components/Textarea/Textarea.vue';
import DropdownInput from '@orangehrm/oxd/core/components/Input/DropdownInput.vue';
import PasswordInput from '@orangehrm/oxd/core/components/Input/PasswordInput.vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import SwitchInput from '@orangehrm/oxd/core/components/Input/SwitchInput.vue';
import RadioInput from '@orangehrm/oxd/core/components/Input/RadioInput.vue';
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput.vue';
import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import MultiSelectInput from '@orangehrm/oxd/core/components/Input/MultiSelect/MultiSelectInput.vue';
import TimeInput from '@orangehrm/oxd/core/components/Input/Time/TimeInput.vue';
import {Types, Components, TYPES, TYPE_INPUT, TYPE_MAP} from './types';
import useField from '../../../composables/useField';

export default defineComponent({
  name: 'oxd-input-field',
  inheritAttrs: false,

  components: {
    'oxd-input-group': InputGroup,
    'oxd-input': Input,
    'oxd-file-input': FileInput,
    'oxd-textarea': Textarea,
    'oxd-dropdown-input': DropdownInput,
    'oxd-password-input': PasswordInput,
    'oxd-checkbox-input': CheckboxInput,
    'oxd-switch-input': SwitchInput,
    'oxd-radio-input': RadioInput,
    'oxd-date-input': DateInput,
    'oxd-autocomplete-input': AutocompleteInput,
    'oxd-select-input': SelectInput,
    'oxd-multiselect-input': MultiSelectInput,
    'oxd-time-input': TimeInput,
  },

  emits: ['update:modelValue'],

  props: {
    modelValue: {},
    label: {
      type: String,
    },
    labelIcon: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: TYPE_INPUT,
      validator: (value: Types) => {
        return TYPES.indexOf(value) !== -1;
      },
    },
    errors: {
      type: String,
      default: TYPE_INPUT,
      validator: (value: Types) => {
        return TYPES.indexOf(value) !== -1;
      },
    },
    rules: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: Array as PropType<any>,
      default: () => [],
    },
  },

  setup(props, context) {
    const modelValue = toRef(props, 'modelValue');
    const initialValue = modelValue.value;

    const onReset = async () => {
      context.emit('update:modelValue', initialValue);
      await nextTick();
    };

    const {hasError, message} = useField({
      fieldLabel: props.label ? props.label : '',
      rules: props.rules,
      modelValue,
      onReset,
    });

    return {
      message,
      hasError,
    };
  },

  computed: {
    classes(): object {
      return {
        label: {
          'oxd-input-field-required': this.required,
        },
        message: {
          'oxd-input-field-error-message': this.hasError,
        },
      };
    },
    component(): Components {
      return TYPE_MAP[this.type as Types];
    },
  },
});
</script>

<style src="./input-field.scss" lang="scss"></style>
