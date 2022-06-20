import CheckboxGroupStory from './CheckboxGroup.story.vue';
import CheckboxGroupEvents from './CheckboxGroupEvents.story.vue';

export default {
  title: 'Inputs/CheckboxGroup',
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
        type: {summary: 'Set options for checkboxes'},
      },
    },
    'update:modelValue': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when select value updates'},
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
  options: options.slice(0, -1),
  class: 'check-box-row',
  id: 'check-box-id',
  style: {'font-style': 'italic'},
};

CustomClass.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-checkbox-group \n' +
        ':options="options"\n' +
        ':class="check-box-row"\n' +
        ':id="check-box-id"\n' +
        ':style="{font-style: italic}"\n' +
        'v-model="value""\n' +
        '/>\n' +
        '<div>\n' +
        '<span v-if="value">Value Selected : {{ value }}</span>\n' +
        '</div>\n',
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
