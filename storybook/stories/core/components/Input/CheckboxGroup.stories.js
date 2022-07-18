import CheckboxGroupStory from './CheckboxGroup.story.vue';
import CheckboxGroupEvents from './CheckboxGroupEvents.story.vue';
import CheckboxGroup from '@orangehrm/oxd/core/components/Input/CheckboxGroup';

export default {
  title: 'Inputs/Checkbox Group',
  component: CheckboxGroup,
  argTypes: {
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the checkboxes'},
      },
    },
    options: {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {
          summary:
            'Set choises for checkboxes. Currently only id, label, style and disable are supported',
        },
      },
    },
    modelValue: {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'Set value to the checkboxes'},
      },
    },
    'update:modelValue': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'Emit event when select value updates'},
      },
    },
    disabled: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {
          summary:
            'Disable the checkbox list (Individual checkboxes can be disabled via the options)',
        },
      },
    },
    class: {
      control: {type: 'text'},
      table: {
        type: {
          summary:
            'Set custom class (Can align row wise using "check-box-row")',
        },
      },
      defaultValue: 'check-box-column',
    },
    id: {
      control: {type: 'text'},
      table: {
        type: {
          summary: 'Set individual checkbox id prefix',
        },
      },
      defaultValue: 'check-box-column',
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
          summary: 'Native Inherited Event: Emit blur event from input',
        },
      },
    },
    change: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Native Inherited Event: Emit change event from input'},
      },
    },
    click: {
      control: {type: 'function'},
      table: {
        type: {summary: 'Native Inherited Event: Emit click event from input'},
      },
    },
  },
};

const Template = (args) => ({
  setup() {
    return {args};
  },
  components: {'oxd-check-box-group-story': CheckboxGroupStory},
  template: '<oxd-check-box-group-story v-bind="args" />',
});

const options = [
  {
    id: 1,
    label: 'Job',
  },
  {
    id: 2,
    label: 'Salary',
  },
  {
    id: 3,
    label: 'Other',
    disabled: true,
  },
];

export const Default = Template.bind({});
Default.args = {
  options: options,
};

Default.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-checkbox-group \n' +
        ':options=' +
        JSON.stringify(options) +
        '\n' +
        'v-model="selectedValue""\n' +
        '/>\n' +
        '<div>\n' +
        '<span v-if="value">Value Selected : {{ selectedValue }}</span>\n' +
        '</div>\n',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: options,
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-checkbox-group \n' +
        ':options="options"\n' +
        ':disabled="true"\n' +
        'v-model="value""\n' +
        '/>\n' +
        '<div>\n' +
        '<span v-if="value">Value Selected : {{ value }}</span>\n' +
        '</div>\n',
    },
  },
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  options: [
    {
      id: 1,
      label: 'Job',
      style: {'background-color': 'red'},
    },
    {
      id: 2,
      label: 'Salary',
      style: {'background-color': 'blue'},
    },
  ],
  class: 'check-box-row',
  id: 'check-box-id',
  style: {border: '2px solid black', padding: '5px'},
};

CustomClass.parameters = {
  docs: {
    source: {
      code: `  <div> 
        <oxd-checkbox-group 
        :options="[
          {
            id: 1,
            label: 'Job',
            style:{'background-color':'red'}
          },
          {
            id: 2,
            label: 'Salary',
            style:{'background-color':'blue'}
          },
        ]"
        :class="check-box-row"
        :id="check-box-id"
        :style="{border: '2px solid black', padding: '5px'}"
        v-model="value""
        />
        <div>
        <span v-if="value">Value Selected : {{ value }}</span>
  </div>,`,
    },
  },
};

export const Events = () => CheckboxGroupEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-checkbox-group \n' +
        ':options="options"\n' +
        'v-model="value""\n' +
        '@focus="onFocus()"\n' +
        '@blur="onBlur()"\n' +
        '/>\n' +
        '</div>\n' +
        '<div style="margin-top: 2rem">\n' +
        '<span v-if="FocusEvent">Focus Event Triggered</span>\n' +
        '<span v-if="BlurEvent">Blur Event Triggered</span>\n' +
        '<span v-if="ChangeEvent">Change Event Triggered</span>\n' +
        '</div>\n' +
        '<div>\n' +
        '<span v-if="value">Value Selected : {{ value }}</span>\n' +
        '</div>\n',
    },
  },
};
