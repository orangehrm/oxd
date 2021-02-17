import Button from '@orangehrm/oxd/core/components/Button/Button';
import {
  SIZES,
  TYPES,
  SIZE_LARGE,
  SIZE_SMALL,
  TYPE_MAIN,
  TYPE_SECONDARY,
  TYPE_GHOST,
  TYPE_LABEL,
  TYPE_LABEL_ERROR,
} from '@orangehrm/oxd/core/components/Button/types';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    size: {
      control: {type: 'select', options: SIZES},
    },
    type: {
      control: {type: 'select', options: TYPES},
    },
    style: {control: {type: 'object'}},
  },
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {'oxd-button': Button},
  template: '<oxd-button v-bind="$props" />',
});

export const Main = Template.bind({});
Main.args = {
  type: TYPE_MAIN,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: TYPE_SECONDARY,
  label: 'Button',
};

export const Ghost = Template.bind({});
Ghost.args = {
  type: TYPE_GHOST,
  label: 'Button',
};

export const Label = Template.bind({});
Label.args = {
  type: TYPE_LABEL,
  label: 'Button',
};

export const LabelError = Template.bind({});
LabelError.args = {
  type: TYPE_LABEL_ERROR,
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: SIZE_LARGE,
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: SIZE_SMALL,
  label: 'Button',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  label: 'Button',
  style: {backgroundColor: 'palegreen'},
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Button',
  disabled: true,
};
