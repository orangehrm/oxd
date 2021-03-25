import InputField from '@orangehrm/oxd/core/components/InputField/InputField';
import {TYPES} from '@orangehrm/oxd/core/components/InputField/types';
import InputFieldValidation from './InputFieldValidation.story.vue';

export default {
  title: 'Example/InputField',
  component: InputField,
};

const argTypes = {
  type: {
    control: {type: 'select', options: TYPES},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-input-field': InputField},
  template: '<oxd-input-field v-bind="args" />',
});

export const Default = Template.bind({});
Default.argTypes = argTypes;
Default.args = {
  label: 'Input Field',
  type: 'input',
};

export const File = Template.bind({});
File.argTypes = argTypes;
File.args = {
  label: 'File Input Field',
  type: 'file',
  buttonLabel: 'Browse',
};

export const Textarea = Template.bind({});
Textarea.argTypes = argTypes;
Textarea.args = {
  label: 'Textarea Input Field',
  type: 'textarea',
};

export const WithIcon = Template.bind({});
WithIcon.argTypes = argTypes;
WithIcon.args = {
  label: 'Textarea Input Field',
  labelIcon: 'card-text',
  type: 'textarea',
};

export const WithValidation = () => InputFieldValidation;
