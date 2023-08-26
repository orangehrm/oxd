import Number from '@orangehrm/oxd/core/components/Input/Number/Number.vue';
import NumberEvents from './NumberEvents.story.vue';
import {nanoid} from 'nanoid';

export default {
  title: 'Inputs/Number',
  component: Number,
  argTypes: {
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom styles to the component'},
      },
    },
    modelValue: {
      control: {type: 'number'},
      defaultValue: "",
      table: {
        type: {summary: 'Set value to the Number element'},
      },
    },
    'update:modelValue': {
      control: {type: 'number'},
      table: {
        type: {summary: 'Emit event when value updates'},
      },
    },
    disabled: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary: 'Disable the input',
        },
      },
    },
    readonly: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary: 'Set the readonly mode to the input',
        },
      },
    },
    hasError: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary: 'Set the error state',
        },
      },
    },
    id: {
      control: {type: 'text'},
      table: {
        type: {
          summary: 'Set id by preference',
        },
      },
      defaultValue: `oxd-number-input-${nanoid(4)}`,
    },
    min: {
      control: {type: 'number'},
      table: {
        type: {
          summary: 'Set the bottom limit',
        },
      },
      defaultValue: 0,
    },
    max: {
      control: {type: 'number'},
      table: {
        type: {
          summary: 'Set the upper limit',
        },
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-number-input': Number},
  template: '<oxd-number-input v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  readonly: false,
  style: {
    'max-width': '100px',
  },
  max: 10,
  modelValue: 1
};

Default.parameters = {
  docs: {
    source: {
      code: `
<oxd-number-input
  id="oxd-number-input-1"
  :style="{'max-width': '100px'}"
  :min="0"
  :max="10"
  :disabled="false"
  :readonly="true"
  :modelValue="1"
  @update:model-value="onUpdateModelValue"
  @focus="onFocus()"
  @blur="onBlur()"
/>
      `,
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  style: {
    'max-width': '100px',
  },
  modelValue: 1
};

Disabled.parameters = {
  docs: {
    source: {
      code: `
<oxd-number-input
  id="oxd-number-input-1"
  :style="{'max-width': '100px'}"
  :disabled="true"
  :modelValue="1"
/>
      `,
    },
  },
};

export const Readonly = Template.bind({});
Readonly.args = {
  readonly: true,
  modelValue: 1,
  style: {
    'max-width': '100px',
  },
};

Readonly.parameters = {
  docs: {
    source: {
      code: `
<oxd-number-input
  id="oxd-number-input-1"
  :style="{'max-width': '100px'}"
  :readonly="true"
  :modelValue="1"
/>
      `,
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
  style: {
    'max-width': '100px',
  },
  modelValue: -1
};

Error.parameters = {
  docs: {
    source: {
      code: `
<oxd-number-input
  id="oxd-number-input-1"
  :style="{'max-width': '100px'}"
  :has-error="true"
  :modelValue="-1"
/>
      `,
    },
  },
};

export const Events = () => NumberEvents;
