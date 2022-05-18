import Input from '@orangehrm/oxd/core/components/Input/Input';

export default {
  title: 'Example/Input',
  component: Input,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-input': Input},
  template: '<oxd-input v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  value: 'Input',
};

Default.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + '/>',
    },
  },
};

export const Colored = Template.bind({});
Colored.args = {
  value: 'Input',
  style: {backgroundColor: 'aliceblue'},
};

Colored.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + ': style={"backgroundColor": "aliceblue"}/>',
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  value: 'Input',
  hasError: true,
};

Error.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + ': style={"backgroundColor": "aliceblue"}/>',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'Input',
  Disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + ': Disabled=true/>',
    },
  },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  value: 'Input',
  readonly: true,
};

ReadOnly.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + ':readonly=true/>',
    },
  },
};
