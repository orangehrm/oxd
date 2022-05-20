import SwitchInput from '@orangehrm/oxd/core/components/Input/SwitchInput';
import {
  RIGHT,
  LABEL_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';

export default {
  title: 'Example/SwitchInput',
  component: SwitchInput,
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
  components: {'oxd-switch-input': SwitchInput},
  template: '<oxd-switch-input v-bind="args" />',
});

const VmodelSample = args => ({
  data() {
    return {
      selected: ['3'],
    };
  },
  components: {'oxd-switch-input': SwitchInput},
  template: `<div>
    <oxd-switch-input v-model="selected" id="switch1" value="1" optionLabel="Option 1" />
    <br/>
    <oxd-switch-input v-model="selected" id="switch2" value="2" optionLabel="Option 2" />
    <br/>
    <oxd-switch-input disabled v-model="selected" id="switch3" value="3" optionLabel="Option 2 (disabled)" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {
  optionLabel: 'Switch this!',
};

export const Disabled = Template.bind({});
Disabled.args = {
  optionLabel: 'Cant switch this on!',
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  optionLabel: 'Error!',
  hasError: true,
};

export const LabelRightWithHelpPopup = Template.bind({});
LabelRightWithHelpPopup.args = {
  optionLabel: 'Include in Bradford Factor Report',
  helpText: 'These leave will be excluded from reports unless there\'s some activity. E.g. maternity leave, jury duty leave.',
};

export const LabelLeftWithHelpPopup = Template.bind({});
LabelLeftWithHelpPopup.args = {
  optionLabel: 'Include in Bradford Factor Report',
  labelPosition: 'left',
  helpText: 'These leave will be excluded from reports unless there\'s some activity. E.g. maternity leave, jury duty leave.',
};

export const LabelLeftUseFullWidth = Template.bind({});
LabelLeftUseFullWidth.args = {
  optionLabel: 'Include in Bradford Factor Report',
  labelPosition: 'left',
  useFullWidth: true,
};


export const LabelRightUseFullWidth = Template.bind({});
LabelRightUseFullWidth.args = {
  optionLabel: 'Include in Bradford Factor Report',
  labelPosition: 'right',
  useFullWidth: true,
};


export const Vmodel = VmodelSample.bind({});
