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
      v-bind="$attrs"
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
import {uuid} from '../../../mixins/uuid';
import {injectStrict} from '../../../utils/injectable';
import {OutputFile} from '../Input/types';
import {Types, Components, TYPES, TYPE_INPUT, TYPE_MAP} from './types';
import IErrorField from '../Form/errorfield.interface';

export default defineComponent({
  name: 'oxd-input-field',
  inheritAttrs: false,

  components: {
    'oxd-form-group': FormGroup,
    'oxd-input': Input,
    'oxd-file-input': FileInput,
    'oxd-textarea': Textarea,
  },

  mixins: [validatableMixin, uuid],

  setup() {
    const form: any = injectStrict('form');
    return {
      form,
    };
  },

  mounted() {
    this.form && this.form.$el.addEventListener('submit', this.triggerUpdate);
  },

  unmounted() {
    this.form &&
      this.form.$el.removeEventListener('submit', this.triggerUpdate);
  },

  emits: ['update:modelValue', 'errors'],

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
      validator: function (value: Types) {
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
    triggerUpdate() {
      this.onUpdate(this.modelValue as string);
    },

    onUpdate(value: string | OutputFile) {
      this.validate(value);
      const field: IErrorField = {
        cid: this.cid,
        errors: this.errorBucket,
      };
      this.$emit('update:modelValue', value);
      if (this.errorBucket.length !== 0) {
        this.form && this.form.addError(field);
        this.$emit('errors', this.errorBucket);
      } else {
        this.form && this.form.removeError(field);
      }
    },
  },
});
</script>

<style src="./input-field.scss" lang="scss"></style>
