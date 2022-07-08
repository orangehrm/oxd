import Textarea from '@orangehrm/oxd/core/components/Textarea/Textarea';
import TextAreaEvents from './TextAreaEvents.story.vue';

export default {
  title: 'Inputs/Textarea',
  component: Textarea,
  argTypes: {
    resize: {
      control: {type: 'select', options: ['vertical', 'horizontal', 'none']},
      table: {
        type: {summary: 'Set resize attribute to the textarea'},
      },
    },
    hasError: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set error state to the textarea'},
      },
    },
    modelValue: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set value to the textarea'},
      },
    },
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the textarea'},
      },
    },
    disabled: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set native disabled attribute to the textarea'},
      },
    },
    readonly: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set native readonly attribute to the textarea'},
      },
    },
    focus: {
      control: {type: 'function'},
      table: {
        type: {
          summary: 'Native Inherited Event: Emit focus event from textarea',
        },
      },
    },
    blur: {
      control: {type: 'function'},
      table: {
        type: {
          summary: `Native Inherited Event:` + 'Emit blur event from textarea',
        },
      },
    },
    input: {
      control: {type: 'function'},
      table: {
        type: {
          summary: `Native Inherited Event:` + 'Emit input event from textarea',
        },
      },
    },
    keyUp: {
      control: {type: 'function'},
      table: {
        type: {
          summary: 'Native Inherited Event:" Emit keyUp event from textarea',
        },
      },
    },
    'update:modelValue': {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit value on adding a input'},
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-textarea': Textarea},
  template: '<oxd-textarea v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  modelValue: 'Textarea',
  style: {},
};

Default.parameters = {
  docs: {
    source: {
      code: '<oxd-textarea/>',
    },
  },
};

export const Colored = Template.bind({});
Colored.args = {
  modelValue: 'Textarea',
  style: {backgroundColor: 'aliceblue'},
};

Colored.parameters = {
  docs: {
    source: {
      code: '<oxd-textarea \n' + ':style={backgroundColor: "aliceblue"}/>',
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  modelValue: 'Textarea',
  hasError: true,
};

Error.parameters = {
  docs: {
    source: {
      code: '<oxd-textarea \n' + ':hasError=true/>',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  modelValue: 'Textarea',
  Disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: '<oxd-textarea \n' + ':disabled=true/>',
    },
  },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  modelValue: 'Textarea',
  readonly: true,
};

ReadOnly.parameters = {
  docs: {
    source: {
      code: '<oxd-textarea \n' + ':readonly=true/>',
    },
  },
};

export const Events = () => TextAreaEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-textarea \n' +
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
        'File -> TextAreaEvents.story.vue',
    },
  },
};
