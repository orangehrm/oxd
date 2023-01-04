import SegmentsStory from './Segments.story.vue';
import Segments from '@orangehrm/oxd/core/components/Segments/Segments.vue';
import SegmentEvents from './SegmentEvents.story.vue';

export default {
  title: 'Inputs/Segments',
  component: Segments,
  argTypes: {
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the component'},
      },
    },
    options: {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {
          summary:
            'Set choises for segments. Each segment has a label and a value',
        },
      },
    },
    modelValue: {
      control: {type: 'array'},
      defaultValue: {},
      table: {
        type: {summary: 'Set value to the segment'},
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
          summary: 'Disable the segment',
        },
      },
    },

    id: {
      control: {type: 'text'},
      table: {
        type: {
          summary: 'Set individual id prefix',
        },
      },
      defaultValue: 'segment_id',
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
  components: {'oxd-segments-story': SegmentsStory},
  template: '<oxd-segments-story v-bind="args" />',
});

const options = [
  {
    id: 1,
    label: 'Single Assign',
  },
  {
    id: 2,
    label: 'Bulk Assign',
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
        '<oxd-segments \n' +
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
        '<oxd-segments \n' +
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

const optionsWithIcons = [
  {
    id: 1,
    label: 'Preview',
    icon: 'oxd-show',
    iconSize: 'small',
  },
  {
    id: 2,
    label: 'Edit',
    icon: 'oxd-edit',
    iconSize: 'xx-small',
  },
];

export const WithIcons = Template.bind({});
WithIcons.args = {
  options: optionsWithIcons,
};

WithIcons.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-segments \n' +
        ':options="options"\n' +
        'v-model="value""\n' +
        '/>\n' +
        '<div>\n' +
        '<span v-if="value">Value Selected : {{ value }}</span>\n' +
        '</div>\n',
    },
  },
};

export const Events = () => SegmentEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-segments \n' +
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
