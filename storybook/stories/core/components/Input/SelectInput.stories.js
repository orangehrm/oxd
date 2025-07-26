import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput';
import SelectInputEvents from './SelectInputEvents.story.vue';
import SelectInputAfterSelect from './SelectInputAfterSelect.story.vue';
import {h, ref} from 'vue';
import SelectInputCustomSelectStory from './SelectInputCustomSelect.story.vue';
import SelectInputTopOfInputStory from './SelectInputTopOfInput.story.vue';

export default {
  title: 'Inputs/SelectInput',
  component: SelectInput,
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
    translateOptions: {
      control: {type: 'boolean'},
      defaultValue: true,
      table: {
        type: {summary: 'Translate options'},
      },
    },
    forceDropdownPosition: {
      control: {type: 'boolean'},
      defaultValue: false,
      table: {
        type: {summary: 'Force the dropdown position'},
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
        category: 'Slots',
      },
    },
    afterSelected: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'Attend a specific text to the end of the select'},
        category: 'Slots',
      },
    },
    topOfInput: {
      control: {type: 'text'},
      defaultValue: '',
      table: {
        type: {summary: 'Inline label displayed above the input content'},
        category: 'Slots',
      },
    },
    isLoading: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set loading state to the select'},
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
    const selected = ref(args.value ?? null);
    return {args, selected};
  },
  render() {
    const slots = {};
    
    // Add topOfInput slot if provided
    if (this.args.topOfInput) {
      slots.topOfInput = () => this.args.topOfInput;
    }
    
    return h(SelectInput, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': (value) => {
        this.selected = value;
      },
    }, slots);
  },
});

export const Default = Template.bind({});
Default.args = {
  options: options,
};

Default.parameters = {
  docs: {
    source: {
      code: '<oxd-select \n :options=' + JSON.stringify(options) + '\n/>',
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
        '<oxd-select \n :hasError="true"\n :options=' +
        JSON.stringify(options) +
        '\n/>',
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
        '<oxd-select \n :disabled="true"\n :options=' +
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
        '<oxd-select \n :readonly="true"\n :options=' +
        JSON.stringify(options) +
        '\n/>',
    },
  },
};

export const LongLabels = Template.bind({});
const optionsLongLabel = [
  {id: 1, label: 'This is a very long label for testing the dropdown field'},
  {
    id: 2,
    label:
      'aaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbbbbbbbb cccccccccccccccccccccc ddddddddddddddddddddddddddddd',
  },
  {id: 3, label: 'normal length label'},
  {id: 4, label: null},
  {id: 5, label: 'ඔක්තෝබර්'},
];
LongLabels.args = {
  options: optionsLongLabel,
};

LongLabels.parameters = {
  docs: {
    source: {
      code:
        '<oxd-select \n :options=' + JSON.stringify(optionsLongLabel) + '\n/>',
    },
  },
};

export const PreSelected = Template.bind({});
PreSelected.args = {
  options: options,
  modelValue: {
    id: 4,
    label: 'Manager',
  },
  showEmptySelector: false,
};

PreSelected.parameters = {
  docs: {
    source: {
      code:
        '<oxd-select \n :modelValue={id:4,label:"Manager"}\n :options=' +
        JSON.stringify(options) +
        '\n/>',
    },
  },
};

const disabledOptions = [
  {id: 1, label: 'This is a very long label for testing the dropdown field'},
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
        '<oxd-select \n :options=' + JSON.stringify(disabledOptions) + '\n/>',
    },
  },
};

const nestedOptions = [
  {id: 1, label: 'This is a very long label for testing the dropdown field'},
  {id: 4, label: 'Test Field indented', _indent: 5},
];
export const NestedOptions = Template.bind({});
NestedOptions.args = {
  options: nestedOptions,
};

NestedOptions.parameters = {
  docs: {
    source: {
      code: '<oxd-select \n :options=' + JSON.stringify(nestedOptions) + '\n/>',
    },
  },
};

export const AfterSelect = () => SelectInputAfterSelect;

AfterSelect.parameters = {
  docs: {
    source: {
      code:
        ' <oxd-select :options="options" v-model="value">\n' +
        '<template v-slot:afterSelected> (Github ID) </template> \n' +
        '</oxd-select>"\n' +
        '//\n' +
        'File -> SelectInputAfterSelect.story.vue',
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  options,
  isLoading: true,
};

Loading.parameters = {
  docs: {
    source: {
      code:
        '<oxd-select \n :isLoading="true"\n :options=' +
        JSON.stringify(options) +
        '\n/>',
    },
  },
};

export const CustomTemplate = () => SelectInputCustomSelectStory;

CustomTemplate.parameters = {
  docs: {
    source: {
      code:
        ' <oxd-select :options="options" v-model="value">\n' +
        '<template v-slot:option> (Github ID) </template> \n' +
        '</oxd-select>"\n' +
        '//\n' +
        'File -> SelectInputCustomSelect.story.vue',
    },
  },
};

export const TopOfInputCustom = () => SelectInputTopOfInputStory;

TopOfInputCustom.parameters = {
  docs: {
    source: {
      code:
        '<oxd-select :options="options" v-model="value">\n' +
        '<template v-slot:topOfInput>\n' +
        '  <span class="top-of-input-label">Location</span>\n' +
        '</template>\n' +
        '</oxd-select>\n\n' +
        '<style scoped>\n' +
        '.top-of-input-label {\n' +
        '  position: absolute;\n' +
        '  top: 6px;\n' +
        '  left: 8px;\n' +
        '  font-size: 11px;\n' +
        '  color: #6c757d;\n' +
        '  font-weight: 400;\n' +
        '  z-index: 1;\n' +
        '  pointer-events: none;\n' +
        '  line-height: 1;\n' +
        '}\n' +
        '</style>',
    },
  },
};

export const ForceDropdownPosition = Template.bind({});
ForceDropdownPosition.args = {
  options: options,
  forceDropdownPosition: true,
  dropdownPosition: 'top',
  style: {
    marginTop: '200px',
  },
};

ForceDropdownPosition.parameters = {
  docs: {
    source: {
      code:
        '<oxd-select \n' +
        ' :options=' +
        JSON.stringify(options) +
        '\n' +
        ' :forceDropdownPosition="true"\n' +
        ' dropdownPosition="top"\n' +
        ' :style="{ marginTop: \'200px\' }"\n' +
        '/>',
    },
  },
};

export const Events = () => SelectInputEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-select \n' +
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
        'File -> SelectInputEvents.story.vue',
    },
  },
};
