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
      :modelValue="modelValue"
      :hasError="hasError"
      @update:modelValue="onUpdate"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </component>
  </oxd-input-group>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
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
import {validatableMixin} from '../../../mixins/validatable';
import {uuid} from '../../../mixins/uuid';
import {injectStrict} from '../../../utils/injectable';
import {OutputFile} from '../Input/types';
import {Types, Components, TYPES, TYPE_INPUT, TYPE_MAP} from './types';
import ErrorField from '../Form/errorfield.interface';

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
  },

  mixins: [validatableMixin, uuid],

  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = injectStrict('form');
    return {
      form,
    };
  },

  mounted() {
    this.form && this.form.$el.addEventListener('submit', this.triggerUpdate);
  },

  unmounted() {
    this.removeErrors();
    this.form &&
      this.form.$el.removeEventListener('submit', this.triggerUpdate);
  },

  emits: ['update:modelValue', 'errors'],

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
      validator: function(value: Types) {
        return TYPES.indexOf(value) !== -1;
      },
    },
    errors: {
      type: String,
      default: TYPE_INPUT,
      validator: function(value: Types) {
        return TYPES.indexOf(value) !== -1;
      },
    },
  },

  computed: {
    hasError(): boolean {
      return this.errorBucket.length !== 0;
    },
    message(): string | null {
      return this.hasError ? this.errorBucket[0] : null;
    },
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

  methods: {
    triggerUpdate() {
      this.onUpdate(this.modelValue as string);
    },

    addErrors() {
      const field: ErrorField = {
        cid: this.cid,
        errors: this.errorBucket,
      };
      this.form && this.form.addError(field);
      this.$emit('errors', this.errorBucket);
    },

    removeErrors() {
      const field: ErrorField = {
        cid: this.cid,
        errors: this.errorBucket,
      };
      this.form && this.form.removeError(field);
    },

    onUpdate(value: string | OutputFile) {
      this.validate(value);
      this.$emit('update:modelValue', value);
      if (this.errorBucket.length !== 0) {
        this.addErrors();
      } else {
        this.removeErrors();
      }
    },
  },
});
</script>

<style src="./input-field.scss" lang="scss"></style>
