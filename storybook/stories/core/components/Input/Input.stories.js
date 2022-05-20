import Input from '@orangehrm/oxd/core/components/Input/Input';
import InputEvents from './InputEvents.story.vue';

export default {
  title: 'Form_Widgets/Input',
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
        type: {summary: 'Native Inherited Event: Emit focus event from input'},
      },
    },
    blur: {
      control: {type: 'function'},
      table: {
        type: {
          summary: `Native Inherited Event:` + 'Emit blur event from input',
        },
      },
    },
    keyUp: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Native Inherited Event:" Emit keyUp event from input'},
      },
    },
    click: {
      control: {type: 'function'},
      action: 'clicked',
      table: {
        type: {summary: 'Native Inherited Event:: Emit click event from input'},
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
  modelValue: 'input',
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
  modelValue: 'input',
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
  modelValue: 'input',
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
  modelValue: 'input',
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
  modelValue: 'input',
  readonly: true,
};

ReadOnly.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + ':readonly=true/>',
    },
  },
};

export const Events = () => InputEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-input \n' +
        '@input="onInput()"\n' +
        '@focus="onFocus()"\n' +
        '@blur="onBlur()"\n' +
        '@click="onClick()"\n' +
        '@keyup="onKeyUp()"\n' +
        '/>\n' +
        '</div>\n' +
        '<div style="margin-top: 2rem">\n' +
        '<span v-if="InputEvent">Input Event Triggered</span>\n' +
        '<span v-if="FocusEvent">Focus Event Triggered</span>\n' +
        '<span v-if="BlurEvent">Blur Event Triggered</span>\n' +
        '<span v-if="ClickEvent">Click Event Triggered</span>\n' +
        '<span v-if="KeyUpEvent">KeyUp Event Triggered</span>\n' +
        '</div>\n' +
        '//\n' +
        'File -> InputEvents.story.vue',
    },
  },
};
