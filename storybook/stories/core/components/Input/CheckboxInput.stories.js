import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput';
import {
  RIGHT,
  LABEL_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';

export default {
  title: 'Inputs/CheckboxInput',
  component: CheckboxInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
    labelPosition: {
      control: {type: 'select', options: LABEL_POSITIONS},
      defaultValue: RIGHT,
    },
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-checkbox-input': CheckboxInput},
  template: '<oxd-checkbox-input v-bind="args" />',
});

const VmodelSample = () => ({
  data() {
    return {
      selected: '',
    };
  },
  components: {'oxd-checkbox-input': CheckboxInput},
  template: `<div>
    <oxd-checkbox-input v-model="selected" id="check1" value="orange" true-value="yes" false-value="no" optionLabel="Orange" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

const VmodelMultiSample = () => ({
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

export const VmodelSingle = VmodelSample.bind({});

export const VmodelMultiple = VmodelMultiSample.bind({});
