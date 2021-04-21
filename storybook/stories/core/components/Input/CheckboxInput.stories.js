import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput';

export default {
  title: 'Example/CheckboxInput',
  component: CheckboxInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-checkbox-input': CheckboxInput},
  template: '<oxd-checkbox-input v-bind="args" />',
});

const VmodelSample = args => ({
  data() {
    return {
      selected: ['apple'],
    };
  },
  components: {'oxd-checkbox-input': CheckboxInput},
  template: `<div>
    <oxd-checkbox-input v-model="selected" id="check1" value="orange" optionLabel="Orange" />
    <br/>
    <oxd-checkbox-input v-model="selected" id="check2" value="mango" optionLabel="Mango" />
    <br/>
    <oxd-checkbox-input v-model="selected" id="check3" value="apple" disabled optionLabel="Apple (disabled)" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {
  optionLabel: 'Check this!',
};

export const Disabled = Template.bind({});
Disabled.args = {
  optionLabel: 'Cant check this!',
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  optionLabel: 'Error!',
  hasError: true,
};

export const Vmodel = VmodelSample.bind({});
