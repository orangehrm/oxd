import RadioInput from '@orangehrm/oxd/core/components/Input/RadioInput';
import {
  RIGHT,
  LABEL_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';

export default {
  title: 'Inputs/RadioInput',
  component: RadioInput,
  argTypes: {
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the radio'},
      },
    },
    optionLabel: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set label for the radio'},
      },
    },
    modelValue: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set value for the radio'},
      },
    },
    value: {
      control: {type: 'text'},
      table: {
        type: {summary: 'Set native internal value property for the radio'},
      },
    },
    disabled: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set disabled attribute for the radio'},
      },
    },
    labelPosition: {
      control: {type: 'select', options: LABEL_POSITIONS},
      defaultValue: RIGHT,
      table: {
        type: {summary: 'Set label position for radio label'},
      },
    },
    blur: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  radio blur event'},
      },
    },
    focus: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  radio focus event'},
      },
    },
    change: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Emit  radio change event'},
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
    console.error(args);
    return {args};
  },
  components: {'oxd-radio-input': RadioInput},
  template: '<oxd-radio-input v-bind="args" />',
});

const VmodelSample = () => ({
  data() {
    return {
      selected: '',
    };
  },
  components: {'oxd-radio-input': RadioInput},
  template: `<div>
    <oxd-radio-input v-model="selected" id="check1" value="orange"  optionLabel="Orange" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

const VmodelDisabled = () => ({
  data() {
    return {
      selected: 'orange',
    };
  },
  components: {'oxd-radio-input': RadioInput},
  template: `<div>
    <oxd-radio-input v-model="selected" id="check1" value=""  optionLabel="Orange" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

const VmodelDefaultDisabled = () => ({
  data() {
    return {
      selected: 'selected',
    };
  },
  components: {'oxd-radio-input': RadioInput},
  template: `<div>
    <oxd-radio-input v-model="selected" id="check1" value="selected"  optionLabel="Orange" />
    <br/>
    <span>{{selected}}</span>
  </div>`,
});

const VmodelMultiSample = () => ({
  data() {
    return {
      selected: 'apple',
    };
  },
  components: {'oxd-radio-input': RadioInput},
  template: `<div>
    <oxd-radio-input v-model="selected" id="check1" value="orange" optionLabel="Orange" />
    <br/>
    <oxd-radio-input v-model="selected" id="check2" value="mango" optionLabel="Mango" />
    <br/>
    <oxd-radio-input v-model="selected" id="check3" value="apple" optionLabel="Apple" />
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
  <oxd-radio-input :optionLabel="Check this!" />
  <br/>
</div>`,
    },
  },
};

export const Disabled = VmodelDisabled.bind({});
Disabled.args = {
  optionLabel: 'Cant check this!',
  disabled: true,
  checked: false,
};

Disabled.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-radio-input  :optionLabel="Check this!" :disabled="true" :value=""/>
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const DisabledChecked = VmodelDefaultDisabled.bind({});
DisabledChecked.args = {
  optionLabel: 'Cant uncheck this!',
  value: 'selected',
  disabled: true,
};

DisabledChecked.parameters = {
  docs: {
    source: {
      code: `<div>
  <oxd-radio-input :optionLabel="Check this!" :disabled="true" :value="selected" />
  <br/>
  <span>{{selected}}</span>
</div>`,
    },
  },
};

export const VmodelSingle = VmodelSample.bind({});

VmodelSingle.parameters = {
  docs: {
    source: {
      code: `<div>
      <oxd-radio-input v-model="selected" id="check1" value="orange" optionLabel="Orange" />
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
      <oxd-radio-input v-model="selected" id="check1" value="orange" optionLabel="Orange" />
      <br/>
      <oxd-radio-input v-model="selected" id="check2" value="mango" optionLabel="Mango" />
      <br/>
      <oxd-radio-input v-model="selected" id="check3" value="apple" optionLabel="Apple" />
      <br/>
      <span>{{selected}}</span>
    </div>`,
    },
  },
};
