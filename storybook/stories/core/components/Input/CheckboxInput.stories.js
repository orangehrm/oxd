import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput';
import {
  RIGHT,
  LABEL_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';
import CheckboxInputEvents from './CheckboxInputEvents.story.vue';

export default {
  title: 'Inputs/CheckboxInput',
  component: CheckboxInput,
  argTypes: {
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the checkbox'},
      },
    },
    optionLabel: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set label for the checkbox'},
      },
    },
    modelValue: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set value for the checkbox'},
      },
    },
    disabled: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set disabled attribute for the checkbox'},
      },
    },
    checkIcon: {
      control: {type: 'string'},
      table: {
        type: {summary: 'Set icon to be display in the  checkbox'},
      },
    },
    checkIconSize: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set icon size to be display in the checkbox'},
      },
    },
    trueValue: {
      control: {type: 'string'},
      table: {
        type: {
          summary:
            'Set custom string value to be display in the checkbox  checked  state instead default true',
        },
      },
    },
    falseValue: {
      control: {type: 'string'},
      table: {
        type: {
          summary:
            'Set custom string value to be display in the checkbox  not checked  state instead default false',
        },
      },
    },
    labelPosition: {
      control: {type: 'select', options: LABEL_POSITIONS},
      defaultValue: RIGHT,
      table: {
        type: {summary: 'Set label position for checkbox label'},
      },
    },
    border: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set border for the checkbox'},
      },
    },
    optionInfoIcon:{
      control: {type: 'text'},
      table: {
        type: {summary: 'Set icon to be display in the  checkbox'},
      },
    },
    blur: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  checkbox blur event'},
      },
    },
    focus: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  checkbox focus event'},
      },
    },
    change: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  checkbox change event'},
      },
    },
    'update:modelValue': {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  when update the value'},
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-checkbox-input': CheckboxInput},
  template: '<oxd-checkbox-input v-bind="args" />',
});

const VmodelSample = () => ({
  data() {
    return {
      selected: '',
    };
  },
  components: {'oxd-checkbox-input': CheckboxInput},
  template: `<div>
    <oxd-checkbox-input v-model="selected" id="check1"  optionLabel="Orange" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

const VmodelSingleStringValuesSample = () => ({
  data() {
    return {
      selected: '',
    };
  },
  components: {'oxd-checkbox-input': CheckboxInput},
  template: `<div>
   <oxd-checkbox-input v-model="selected" id="check1"  true-value="checked" false-value="not checked" optionLabel="Orange" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

const VmodelMultiSample = () => ({
  data() {
    return {
      selected: ['apple'],
    };
  },
  components: {'oxd-checkbox-input': CheckboxInput},
  template: `<div>
    <oxd-checkbox-input v-model="selected" id="check1" value="orange" optionLabel="Orange" />
    <br/>
    <oxd-checkbox-input v-model="selected" id="check2" value="mango" optionLabel="Mango" />
    <br/>
    <oxd-checkbox-input v-model="selected" id="check3" value="apple" disabled optionLabel="Apple (disabled)" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

export const Default = Template.bind({});
Default.args = {
  optionLabel: 'Check this!',
};

Default.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-checkbox-input :optionLabel="Check this!" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  optionLabel: 'Cant check this!',
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-checkbox-input :disabled="true" :optionLabel="Check this!" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const Colored = Template.bind({});
Colored.args = {
  optionLabel: 'Styled checkbox',
  style: {'background-color': 'blue'},
};

Colored.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-checkbox-input :disabled="true" :style="{'background-color':'blue'}" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const OptionInfoIcon = Template.bind({
  optionInfoIcon: 'oxd-eye',
});

OptionInfoIcon.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-checkbox-input optionInfoIcon="oxd-eye"  />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const EnableBorder= Template.bind({
  optionLabel: 'check this!',
  border: true,
});

EnableBorder.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-checkbox-input :border="true"  optionLabel="Check this!"/>
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },  
};

export const VmodelSingleDefault = VmodelSample.bind({});

VmodelSingleDefault.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-checkbox-input v-model="selected" id="check1" value="orange" true-value="yes" false-value="no" optionLabel="Orange" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const VmodelSingleString = VmodelSingleStringValuesSample.bind({});

VmodelSingleString.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-checkbox-input v-model="selected" id="check1" value="orange" true-value="checked" false-value="not checked" optionLabel="Orange" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const VmodelMultiple = VmodelMultiSample.bind({});

VmodelMultiple.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-checkbox-input v-model="selected" id="check1" value="orange" optionLabel="Orange" />
  <br/>
  <oxd-checkbox-input v-model="selected" id="check2" value="mango" optionLabel="Mango" />
  <br/>
  <oxd-checkbox-input v-model="selected" id="check3" value="apple" disabled optionLabel="Apple (disabled)" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const Events = () => CheckboxInputEvents;

Events.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-checkbox-input
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

File -> CheckboxInputEvents.story.vue
`,
    },
  },
};
