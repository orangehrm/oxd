import Label from '@orangehrm/oxd/core/components/Label/Label';

export default {
  title: 'Information/Label',
  component: Label,
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-label': Label},
  argTypes: {
    label: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set label'}
      }
    },
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom styles to label'},
      },
    },
    labelHelpText: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set help text after the label if required'}
      }
    }
    
  },
  template: '<oxd-label v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
};

export const Colored = Template.bind({});
Colored.args = {
  label: 'Label',
  style: {color: 'red'},
};

export const WithHelpText = Template.bind({});
WithHelpText.args = {
  label: 'Label',
  labelHelpText: '(help text)'
};