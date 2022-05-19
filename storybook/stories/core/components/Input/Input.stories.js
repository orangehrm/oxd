import Input from '@orangehrm/oxd/core/components/Input/Input';
import InputEvents from './InputEvents.story.vue';

export default {
  title: 'Example/Input',
  component: Input,
  argTypes: {
    modelValue: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set value to the input'},
      },
    },
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the input'},
      },
    },
    focus: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit focus event from input'},
      },
    },
    blur: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit blur event from input'},
      },
    },
    keyUp: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit keyUp event from input'},
      },
    },
    click: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit click event from input'},
      },
    },
    input: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit input event on adding a input'},
      },
    },
    'update:modelValue': {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit value on adding a input'},
      },
    },
    hasError: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set error state to the input'},
      },
    },
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

export const InputEvent = () => InputEvents;

InputEvent.parameters = {
  docs: {
    source: {
      code:
        ' <oxd-input @input="onInput()" /> \n\n\n\n\n' +
        '// in method \n' +
        'onInput() {' +
        ' alert("input");' +
        ' },',
    },
  },
};
