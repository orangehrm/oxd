import PasswordInput from '@orangehrm/oxd/core/components/Input/PasswordInput';
import PasswordInputEvents from './PasswordInputEvents.story.vue';

export default {
  title: 'Inputs/PasswordInput',
  component: PasswordInput,
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
    strength: {
      control: {type: 'select', options: [-1, 0, 1, 2, 3, 4, 5]},
      table: {
        type: {summary: 'Set the strength of the password'},
      },
    },
    hasMinimumPasswordStrength: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set minimum password strength'},
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
  components: {'oxd-password-input': PasswordInput},
  template: '<oxd-password-input v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  docs: {
    source: {
      code: '<oxd-password-input/>',
    },
  },
};

export const Colored = Template.bind({});
Colored.args = {
  style: {backgroundColor: 'aliceblue'},
};

Colored.parameters = {
  docs: {
    source: {
      code:
        '<oxd-password-input \n' + ':style={backgroundColor: "aliceblue"}/>',
    },
  },
};

export const Strength = Template.bind({});
Strength.args = {
  strength: 4,
  lable: 'Password',
};

export const MinimumStrength = Template.bind({});
MinimumStrength.args = {
  strength: 4,
  hasMinimumPasswordStrength: false,
};

export const Error = Template.bind({});
Error.args = {
  strength: 4,
  hasError: true,
};

Error.parameters = {
  docs: {
    source: {
      code: '<oxd-password-input \n' + ':hasError=true/>',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: '<oxd-password-input \n' + ':disabled=true/>',
    },
  },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readonly: true,
};

ReadOnly.parameters = {
  docs: {
    source: {
      code: '<oxd-password-input \n' + ':readonly=true/>',
    },
  },
};

export const Events = () => PasswordInputEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-password-input \n' +
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
        'File -> PasswordInputEvents.story.vue',
    },
  },
};
