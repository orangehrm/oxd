<template>
  <oxd-input-group
    :label="label"
    :labelIcon="labelIcon"
    :hint="hint"
    :hintPlacement="hintPlacement"
    :hintStyle="hintStyle"
    :id="id"
    :message="message"
    class="oxd-input-field-bottom-space"
    :classes="classes"
  >
    <component
      :is="component"
      v-bind="$attrs"
      :id="id"
      :disabled="disabled"
      :hasError="hasError"
      :modelValue="modelValue"
      @update:modelValue="onChange"
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
import PasswordInput from '@orangehrm/oxd/core/components/Input/PasswordInput.vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';
import SwitchInput from '@orangehrm/oxd/core/components/Input/SwitchInput.vue';
import RadioInput from '@orangehrm/oxd/core/components/Input/RadioInput.vue';
import DateInput from '@orangehrm/oxd/core/components/Input/DateInput.vue';
import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput.vue';
import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput.vue';
import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';
import MultiSelectInput from '@orangehrm/oxd/core/components/Input/MultiSelect/MultiSelectInput.vue';
import TimeInput from '@orangehrm/oxd/core/components/Input/Time/TimeInput.vue';
import Text from '@orangehrm/oxd/core/components/Text/Text.vue';
import InfoBox from '@orangehrm/oxd/core/components/InfoBox/InfoBox.vue';
import Comments from '@orangehrm/oxd/core/components/Comments/Comments.vue';
import TinyMce from '@orangehrm/oxd/core/components/TinyMce/TinyMce.vue';
import {
  Types,
  Components,
  TYPES,
  TYPE_INPUT,
  TYPE_MAP,
  HINT_PLACEMENT_TOP,
} from './types';
import useField from '../../../composables/useField';
import translateMixin from '../../../mixins/translate';
import CheckboxGroup from '@orangehrm/oxd/core/components/Input/CheckboxGroup.vue';
import RadioPillGroup from '@orangehrm/oxd/core/components/Input/RadioPills/RadioPillGroup.vue';
import TreeSelectInput from '@orangehrm/oxd/core/components/Input/TreeSelect/TreeSelect.vue';
import RadioGroup from '@orangehrm/oxd/core/components/Input/RadioGroup.vue';
import Number from '@orangehrm/oxd/core/components/Input/Number/Number.vue';

export default defineComponent({
  name: 'oxd-input-field',
  inheritAttrs: false,

  components: {
    'oxd-input-group': InputGroup,
    'oxd-input': Input,
    'oxd-file-input': FileInput,
    'oxd-textarea': Textarea,
    'oxd-password-input': PasswordInput,
    'oxd-checkbox-input': CheckboxInput,
    'oxd-switch-input': SwitchInput,
    'oxd-radio-input': RadioInput,
    'oxd-date-input': DateInput,
    'oxd-autocomplete-input': AutocompleteInput,
    'oxd-select-input': SelectInput,
    'oxd-multiselect-input': MultiSelectInput,
    'oxd-time-input': TimeInput,
    'oxd-text': Text,
    'oxd-checkboxgroup-input': CheckboxGroup,
    'oxd-infobox': InfoBox,
    'oxd-quicksearch-input': QuickSearchInput,
    'oxd-comments': Comments,
    'oxd-radio-pill-group': RadioPillGroup,
    'oxd-tree-select-input': TreeSelectInput,
    'oxd-radiogroup-input': RadioGroup,
    'oxd-tinymce': TinyMce,
    'oxd-number-input': Number,
  },

  mixins: [translateMixin],
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
    id: {
      type: String,
    },
    disabled: {
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
    hint: {
      type: String,
      default: null,
    },
    hintPlacement: {
      type: String,
      default: HINT_PLACEMENT_TOP,
    },
    hintStyle: {
      type: Object,
      default: () => ({}),
    },
    dirty: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    const modelValue = toRef(props, 'modelValue');
    const rules = toRef(props, 'rules');
    const isDisabled = toRef(props, 'disabled');
    const isDirty: boolean =
      props.dirty || Boolean(props.type === 'date' && modelValue.value);

    const initialValue = modelValue.value;

    const onReset = async () => {
      context.emit('update:modelValue', initialValue);
      await nextTick();
    };

    const {hasError, message, startWatcher, dirty} = useField({
      fieldLabel: props.label ? props.label : '',
      rules,
      modelValue,
      isDisabled,
      isDirty,
      onReset,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = ($event: any) => {
      if (!dirty.value) {
        dirty.value = true;
        startWatcher();
      }
      context.emit('update:modelValue', $event);
    };

    if (isDirty) startWatcher();

    return {
      message,
      hasError,
      onChange,
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
