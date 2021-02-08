<template>
  <oxd-form-group
    :label="label"
    :message="message"
    class="oxd-input-field-bottom-space"
    :classes="classes"
  >
    <component
      :modelValue="modelValue"
      @update:modelValue="onUpdate"
      :hasError="hasError"
      :is="component"
      :buttonLabel="buttonLabel"
    ></component>
  </oxd-form-group>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FormGroup from '@orangehrm/oxd/core/components/Form/FormGroup.vue';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';
import FileInput from '@orangehrm/oxd/core/components/Input/FileInput.vue';
import Textarea from '@orangehrm/oxd/core/components/Textarea/Textarea.vue';
import {validatableMixin} from '../../../mixins/validatable';
import {OutputFile} from '../Input/types';
import {Types, Components, TYPES, TYPE_INPUT, TYPE_MAP} from './types';

export default defineComponent({
  name: 'oxd-input-field',

  components: {
    'oxd-form-group': FormGroup,
    'oxd-input': Input,
    'oxd-file-input': FileInput,
    'oxd-textarea': Textarea,
  },

  mixins: [validatableMixin],

  emits: ['update:modelValue'],

  props: {
    modelValue: {},
    label: {
      type: String,
    },
    // this prop only applicable for `type`='file'
    buttonLabel: {
      type: String,
    },
    type: {
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
    classes() {
      return {
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
    onUpdate(value: string | OutputFile) {
      this.validate(value);
      this.$emit('update:modelValue', value);
    },
  },
});
</script>

<style src="./input-field.scss" lang="scss"></style>
