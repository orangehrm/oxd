import RadioInput from '@orangehrm/oxd/core/components/Input/RadioInput';
import {
  RIGHT,
  LABEL_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';

export default {
  title: 'Example/RadioInput',
  component: RadioInput,
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
  components: {'oxd-radio-input': RadioInput},
  template: '<oxd-radio-input v-bind="args" />',
});

const VmodelSample = () => ({
  data() {
    return {
      selected: '',
    };
  },
  components: {'oxd-radio-input': RadioInput},
  template: `<div>
    <oxd-radio-input v-model="selected" id="check1" value="orange" true-value="yes" false-value="no" optionLabel="Orange" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

const VmodelMultiSample = () => ({
  data() {
    return {
      selected: 'apple',
    };
  },
  components: {'oxd-radio-input': RadioInput},
  template: `<div>
    <oxd-radio-input v-model="selected" id="check1" value="orange" optionLabel="Orange" />
    <br/>
    <oxd-radio-input v-model="selected" id="check2" value="mango" optionLabel="Mango" />
    <br/>
    <oxd-radio-input v-model="selected" id="check3" value="apple" optionLabel="Apple" />
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

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  optionLabel: 'Cant uncheck this!',
  checked: true,
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  optionLabel: 'Error!',
  hasError: true,
};

export const VmodelSingle = VmodelSample.bind({});

export const VmodelMultiple = VmodelMultiSample.bind({});
