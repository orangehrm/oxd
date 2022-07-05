import SwitchInput from '@orangehrm/oxd/core/components/Input/SwitchInput';
import {
  RIGHT,
  LABEL_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';
import {
  BOTTOM_RIGHT,
  HELP_POSITIONS,
} from '@orangehrm/oxd/core/components/Icon/types';
import SwitchInputEvents from './SwitchInputEvents.story.vue';

export default {
  title: 'Inputs/SwitchInput',
  component: SwitchInput,
  argTypes: {
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the switch'},
      },
    },
    optionLabel: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set label for the switch'},
      },
    },
    modelValue: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set value for the switch'},
      },
    },
    trueValue: {
      control: {type: 'string'},
      table: {
        type: {
          summary:
            'Set custom string value to be display in the switch  checked  state instead default true',
        },
      },
    },
    falseValue: {
      control: {type: 'string'},
      table: {
        type: {
          summary:
            'Set custom string value to be display in the switch  not checked  state instead default false',
        },
      },
    },
    disabled: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set disabled attribute for the switch'},
      },
    },
    checkIcon: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set icon to be display in the  switch'},
      },
    },
    checkIconSize: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set icon size to be display in the switch'},
      },
    },
    labelPosition: {
      control: {type: 'select', options: LABEL_POSITIONS},
      defaultValue: RIGHT,
      table: {
        type: {summary: 'Set label position for switch label'},
      },
    },
    blur: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  switch blur event'},
      },
    },
    focus: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  switch focus event'},
      },
    },
    change: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  switch change event'},
      },
    },
    'update:modelValue': {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  when update the value'},
      },
    },
    helpText: {
      control: {type: 'text'},
      table: {
        type: {
          summary: 'Set help text for switch component',
        },
      },
    },
    helpTextPosition: {
      control: {type: 'select', options: HELP_POSITIONS},
      table: {
        type: {
          summary:
            'Set help text position for help text when text is available',
        },
      },
      defaultValue: BOTTOM_RIGHT,
    },
    useFullWidth: {
      control: {type: 'boolean'},
      table: {
        type: {
          summary:
            'Enable/ Disable to take the  full width available for switch element or not',
        },
      },
      defaultValue: BOTTOM_RIGHT,
    },
  },
  decorators: [
    () => ({
      template: '<div style="max-width: 400px; margin-top:3em"><story/></div>',
    }),
  ],
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-switch-input': SwitchInput},
  template: '<oxd-switch-input v-bind="args" />',
});

const VmodelSample = (args) => ({
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

Default.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-switch-input :optionLabel="Switch this!" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  optionLabel: 'Cant switch this on!',
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-switch-input :optionLabel="Switch this!" : disabled="true" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const LabelRightWithHelpPopup = Template.bind({});
LabelRightWithHelpPopup.args = {
  optionLabel: 'Include in Bradford Factor Report',
  helpText:
    "These leave will be excluded from reports unless there's some activity. E.g. maternity leave, jury duty leave.",
};

LabelRightWithHelpPopup.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-switch-input :optionLabel="Include in Bradford Factor Report" :helpText="These leave will be excluded from reports unless there's some activity. E.g. maternity leave, jury duty leave." />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const LabelLeftWithHelpPopup = Template.bind({});
LabelLeftWithHelpPopup.args = {
  optionLabel: 'Include in Bradford Factor Report',
  labelPosition: 'left',
  helpText:
    "These leave will be excluded from reports unless there's some activity. E.g. maternity leave, jury duty leave.",
};

LabelLeftWithHelpPopup.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-switch-input :optionLabel="Include in Bradford Factor Report" :labelPosition="left" :helpText="These leave will be excluded from reports unless there's some activity. E.g. maternity leave, jury duty leave." />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const LabelLeftUseFullWidth = Template.bind({});
LabelLeftUseFullWidth.args = {
  optionLabel: 'Include in Bradford Factor Report',
  labelPosition: 'left',
  useFullWidth: true,
};

LabelLeftUseFullWidth.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-switch-input :optionLabel="Include in Bradford Factor Report" :labelPosition="left" :useFullWidth="true" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const LabelRightUseFullWidth = Template.bind({});
LabelRightUseFullWidth.args = {
  optionLabel: 'Include in Bradford Factor Report',
  labelPosition: 'right',
  useFullWidth: true,
};

LabelRightUseFullWidth.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-switch-input :optionLabel="Include in Bradford Factor Report" :labelPosition="right" :useFullWidth="true" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const Vmodel = VmodelSample.bind({});

Vmodel.parameters = {
  docs: {
    source: {
      code: `<div>
      <oxd-switch-input v-model="selected" id="switch1" value="1" optionLabel="Option 1" />
      <br/>
      <oxd-switch-input v-model="selected" id="switch2" value="2" optionLabel="Option 2" />
      <br/>
      <oxd-switch-input disabled v-model="selected" id="switch3" value="3" optionLabel="Option 2 (disabled)" />
      <br/>
      <span>{{selected}}</span>
    </div>`,
    },
  },
};

export const Events = () => SwitchInputEvents;

Events.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-switch-input
    @focus="onFocus()"
    @blur="onBlur()"
    @change="onChange()"
    @onClick="onClick()"
    :modelValue="value"
    @update:modelValue="updatedValue(event)"
  >
  </oxd-checkbox-input>
  <br />
  <div style="margin-top: 2rem; margin-bottom: 2rem">
    <span v-if="FocusEvent">Focus Event Triggered</span>
    <span v-if="BlurEvent">Blur Event Triggered</span>
    <span v-if="ChangeEvent">Change Event Triggered</span>
    <span v-if="ClickEvent">Click Event Triggered</span>
  </div>
</div>

File -> SwitchInputEvents.story.vue
`,
    },
  },
};
