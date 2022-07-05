import Input from '@orangehrm/oxd/core/components/Input/Input';
import InputEvents from './InputEvents.story.vue';

export default {
  title: 'Inputs/Text',
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
    imageIcon: {
      control: {type: 'string'},
      table: {
        type: {summary: 'Set path to the image icon'},
      },
    },
    isIconClickable: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set whether the input field should be clickable or not'},
      },
    },
    imageIconClick: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Can be any function which needs to be triggered in the click event on image icon'},
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
      code: '<oxd-input \n' + ':hasError="true"}/>',
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
      code: '<oxd-input \n' + ': disabled=true/>',
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

const openFacebookTab = function() {
  window.open('https://www.facebook.com/OrangeHRM/', "_blank");
};

export const DefaultWithIcon = Template.bind({});
DefaultWithIcon.args = {
  modelValue: 'https://www.facebook.com/OrangeHRM/',
  imageIcon : require('@orangehrm/oxd/assets/images/facebook_logo_icon.svg'),
};

DefaultWithIcon.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + ' :imageIcon="path to image" />',
    },
  },
};

export const WithClickableIcon = Template.bind({});
WithClickableIcon.args = {
  modelValue: 'https://www.facebook.com/OrangeHRM/',
  imageIcon : require('@orangehrm/oxd/assets/images/facebook_logo_icon.svg'),
  imageIconClick: openFacebookTab,
  isIconClickable: true
};

WithClickableIcon.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + ' :imageIcon="path to image" @click="imageIconClick()"/>',
    },
  },
};

export const ColoredWithIcon = Template.bind({});
ColoredWithIcon.args = {
  modelValue: 'https://www.facebook.com/OrangeHRM/',
  style: {backgroundColor: 'aliceblue'},
  imageIcon: require('@orangehrm/oxd/assets/images/facebook_logo_icon.svg'),
};

ColoredWithIcon.parameters = {
  docs: {
    source: {
      code:
        '<oxd-input \n' +
        ': style={"backgroundColor": "aliceblue"} :imageIcon="path to image" />',
    },
  },
};

export const ErrorWithIcon = Template.bind({});
ErrorWithIcon.args = {
  modelValue: 'https://www.facebook.com/OrangeHRM/',
  hasError: true,
  imageIcon: require('@orangehrm/oxd/assets/images/facebook_logo_icon.svg'),
};

ErrorWithIcon.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + ':hasError=true :imageIcon="path to image" />',
    },
  },
};

export const DisabledWithIcon = Template.bind({});
DisabledWithIcon.args = {
  modelValue: 'https://www.facebook.com/OrangeHRM/',
  Disabled: true,
  imageIcon: require('@orangehrm/oxd/assets/images/facebook_logo_icon.svg'),
};

DisabledWithIcon.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + ': Disabled=true :imageIcon="path to image" />',
    },
  },
};

export const ReadOnlyWithIcon = Template.bind({});
ReadOnlyWithIcon.args = {
  modelValue: 'https://www.facebook.com/OrangeHRM/',
  readonly: true,
  imageIcon: require('@orangehrm/oxd/assets/images/facebook_logo_icon.svg'),
};

ReadOnlyWithIcon.parameters = {
  docs: {
    source: {
      code: '<oxd-input \n' + ':readonly=true :imageIcon="path to image"/>',
    },
  },
};
