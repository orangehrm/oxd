import MultiSelectInput from '@orangehrm/oxd/core/components/Input/MultiSelect/MultiSelectInput';
import MultiSelectInputEvents from './MultiSelectInputEvents.story.vue';
import MultiSelectInputAfterSelect from './MultiSelectInputAfterSelect.story.vue';
import MultiSelectInputCustomChips from './MultiSelectInputCustomChips.story.vue';
import {h, ref} from 'vue';

export default {
  title: 'Inputs/MultiSelectInput',
  component: MultiSelectInput,
  argTypes: {
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the select'},
      },
    },
    hasError: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set error state to the select'},
      },
    },
    dropdownPosition: {
      options: ['top', 'bottom'],
      control: {type: 'select'},
      defaultValue: 'bottom',
      table: {
        type: {summary: 'Set drop down position for select'},
      },
    },
    options: {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'Set options for select'},
      },
    },
    'dropdown:opened': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when dropdown opened'},
      },
    },
    'dropdown:closed': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when dropdown closed'},
      },
    },
    'dropdown:blur': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when dropdown blur'},
      },
    },
    'dropdown:clear': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when dropdown clear'},
      },
    },
    'update:modelValue': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when select value updates'},
      },
    },
    option: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'Interal Slot to manage option'},
      },
    },
    afterSelected: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'Attend a specific text to the end of the select'},
      },
    },
  },
};

const options = [
  {
    id: 1,
    label: 'HR Admin',
  },
  {
    id: 2,
    label: 'ESS User',
  },
  {
    id: 3,
    label: 'Supervisor',
  },
  {
    id: 4,
    label: 'Manager',
  },
  {
    id: 5,
    label: 'Employee',
  },
  {
    id: 6,
    label: 'Assistant Manager',
  },
  {
    id: 7,
    label: 'Director',
  },
  {
    id: 8,
    label: 'Officer',
  },
  {
    id: 9,
    label: 'Appraiser',
  },
  {
    id: 10,
    label: 'Senior Executive',
  },
];

const Template = (args) => ({
  setup() {
    const selected = ref(args.modelValue ?? []);
    return {args, selected};
  },
  render() {
    return h(MultiSelectInput, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': (value) => {
        this.selected = value;
      },
    });
  },
});

export const Default = Template.bind({});
Default.args = {
  options: options,
};

Default.parameters = {
  docs: {
    source: {
      code: '<oxd-multi-select \n :options=' + JSON.stringify(options) + '\n/>',
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  hasError: true,
};

Error.parameters = {
  docs: {
    source: {
      code:
        '<oxd-multi-select \n :hasError="true":options=' +
        JSON.stringify(options) +
        '\n/>',
    },
  },
};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  options: options,
  disabled: true,
};

DefaultDisabled.parameters = {
  docs: {
    source: {
      code:
        '<oxd-multi-select \n :disabled="true":options=' +
        JSON.stringify(options) +
        '\n/>',
    },
  },
};

export const Readonly = Template.bind({});
Readonly.args = {
  options: options,
  readonly: true,
};

Readonly.parameters = {
  docs: {
    source: {
      code:
        '<oxd-multiselect-input \n :readonly="true"\n :options=' +
        JSON.stringify(options) +
        '\n/>',
    },
  },
};

export const PreSelected = Template.bind({});
PreSelected.args = {
  options: options,
  modelValue: [
    {
      id: 4,
      label: 'Manager',
    },
  ],
};

PreSelected.parameters = {
  docs: {
    source: {
      code:
        '<oxd-multiselect-input \n :modelValue=[{id:4,label:"Manager"}]\n :options=' +
        JSON.stringify(options) +
        '\n/>',
    },
  },
};

const disabledOptions = [
  {id: 2, label: 'This field is disabled', _disabled: true},
  {id: 3, label: 'test field'},
  {id: 4, label: 'Test'},
];

export const DisabledOption = Template.bind({});
DisabledOption.args = {
  options: disabledOptions,
};

DisabledOption.parameters = {
  docs: {
    source: {
      code:
        '<oxd-multiselect-input \n :options=' +
        JSON.stringify(disabledOptions) +
        '\n/>',
    },
  },
};

const nestedOptions = [
  {id: 1, label: 'Test'},
  {id: 4, label: 'Test Field indented', _indent: 5},
];
export const NestedOptions = Template.bind({});
NestedOptions.args = {
  options: nestedOptions,
};

NestedOptions.parameters = {
  docs: {
    source: {
      code:
        '<oxd-multiselect-input \n :options=' +
        JSON.stringify(nestedOptions) +
        '\n/>',
    },
  },
};

export const AfterSelect = () => MultiSelectInputAfterSelect;

AfterSelect.parameters = {
  docs: {
    source: {
      code:
        ' <oxd-multiselect-input :options="options" v-model="value">\n' +
        '<template v-slot:afterSelected> (Github ID) </template> \n' +
        '</oxd-multiselect-input>"\n' +
        '//\n' +
        'File -> MultiSelectInputAfterSelect.story.vue',
    },
  },
};

export const CustomChips = () => MultiSelectInputCustomChips;

CustomChips.parameters = {
  docs: {
    source: {
      code:
        ' <oxd-multiselect-input :options="options" v-model="value">\n' +
        '</oxd-multiselect-input>"\n' +
        '//\n' +
        'File -> MultiSelectInputCustomChips.story.vue',
    },
  },
};

export const Events = () => MultiSelectInputEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-multiselect-input \n' +
        ':options="options"\n' +
        '@input="onInput()"\n' +
        '@focus="onFocus()"\n' +
        '@click="onClick()"\n' +
        '@keyup="onKeyUp()"\n' +
        '@dropdown:opened="onDropDownOpen()"\n' +
        '@dropdown:closed="onDropDownClosed()"\n' +
        '@dropdown:blur="onDropDownBlur()"\n' +
        '@dropdown:clear="onDropDownClear()"\n' +
        'v-model="value""\n' +
        ' @update:modelValue="updatedValue(event)' +
        '@keyup="onKeyUp()"\n' +
        '/>\n' +
        '</div>\n' +
        '<div style="margin-top: 2rem">\n' +
        '<span v-if="InputEvent">Input Event Triggered</span>\n' +
        '<span v-if="FocusEvent">Focus Event Triggered</span>\n' +
        '<span v-if="ClickEvent">Click Event Triggered</span>\n' +
        '<span v-if="KeyUpEvent">KeyUp Event Triggered</span>\n' +
        ' <span v-if="DropDownOpen">DropDownOpen Event Triggered</span>\n' +
        '<span v-if="DropDownClosed">DropDownClosed Event Triggered</span>\n' +
        '<span v-if="DropDownBlur">DropDownBlur Event Triggered</span>\n' +
        '<span v-if="DropDownClear">DropDownClear Event Triggered</span>\n' +
        '</div>\n' +
        '<div>\n' +
        '<span v-if="value">Value Selected : {{ value }}</span>\n' +
        '</div>\n' +
        '//\n' +
        'File -> MultiSelectInputEvents.story.vue',
    },
  },
};
