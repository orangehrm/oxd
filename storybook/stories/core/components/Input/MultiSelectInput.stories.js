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
    id: 27,
    label: 'Account Manager',
  },
  {
    id: 67,
    label: 'Actuary',
  },
  {
    id: 64,
    label: 'Analytics Engineer',
  },
  {
    id: 56,
    label: 'API Developer',
  },
  {
    id: 9,
    label: 'Appraiser',
  },
  {
    id: 6,
    label: 'Assistant Manager',
  },
  {
    id: 73,
    label: 'Auditor',
  },
  {
    id: 50,
    label: 'Automation Engineer',
  },
  {
    id: 42,
    label: 'Backend Developer',
  },
  {
    id: 33,
    label: 'Benefits Coordinator',
  },
  {
    id: 100,
    label: 'Board Member',
  },
  {
    id: 12,
    label: 'Business Analyst',
  },
  {
    id: 62,
    label: 'Business Intelligence Analyst',
  },
  {
    id: 78,
    label: 'CFO',
  },
  {
    id: 82,
    label: 'CHRO',
  },
  {
    id: 81,
    label: 'CMO',
  },
  {
    id: 99,
    label: 'Chief Executive Officer',
  },
  {
    id: 94,
    label: 'Chief Customer Officer',
  },
  {
    id: 92,
    label: 'Chief Data Officer',
  },
  {
    id: 96,
    label: 'Chief Digital Officer',
  },
  {
    id: 97,
    label: 'Chief Information Officer',
  },
  {
    id: 93,
    label: 'Chief Innovation Officer',
  },
  {
    id: 89,
    label: 'Chief Product Officer',
  },
  {
    id: 90,
    label: 'Chief Revenue Officer',
  },
  {
    id: 91,
    label: 'Chief Security Officer',
  },
  {
    id: 95,
    label: 'Chief Strategy Officer',
  },
  {
    id: 98,
    label: 'Chief Technology Officer',
  },
  {
    id: 39,
    label: 'Cloud Architect',
  },
  {
    id: 34,
    label: 'Compliance Officer',
  },
  {
    id: 23,
    label: 'Content Writer',
  },
  {
    id: 80,
    label: 'COO',
  },
  {
    id: 75,
    label: 'Cost Accountant',
  },
  {
    id: 72,
    label: 'Credit Analyst',
  },
  {
    id: 79,
    label: 'CTO',
  },
  {
    id: 26,
    label: 'Customer Support',
  },
  {
    id: 60,
    label: 'Data Engineer',
  },
  {
    id: 37,
    label: 'Data Scientist',
  },
  {
    id: 63,
    label: 'Data Warehouse Specialist',
  },
  {
    id: 19,
    label: 'Database Administrator',
  },
  {
    id: 22,
    label: 'DevOps Engineer',
  },
  {
    id: 7,
    label: 'Director',
  },
  {
    id: 66,
    label: 'Economist',
  },
  {
    id: 46,
    label: 'Embedded Systems Engineer',
  },
  {
    id: 5,
    label: 'Employee',
  },
  {
    id: 59,
    label: 'Enterprise Architect',
  },
  {
    id: 2,
    label: 'ESS User',
  },
  {
    id: 61,
    label: 'ETL Developer',
  },
  {
    id: 28,
    label: 'Financial Analyst',
  },
  {
    id: 77,
    label: 'Financial Controller',
  },
  {
    id: 47,
    label: 'Firmware Engineer',
  },
  {
    id: 41,
    label: 'Frontend Developer',
  },
  {
    id: 43,
    label: 'Full Stack Developer',
  },
  {
    id: 45,
    label: 'Game Developer',
  },
  {
    id: 48,
    label: 'Hardware Engineer',
  },
  {
    id: 1,
    label: 'HR Admin',
  },
  {
    id: 53,
    label: 'Infrastructure Engineer',
  },
  {
    id: 55,
    label: 'Integration Specialist',
  },
  {
    id: 69,
    label: 'Investment Analyst',
  },
  {
    id: 35,
    label: 'Legal Advisor',
  },
  {
    id: 38,
    label: 'Machine Learning Engineer',
  },
  {
    id: 76,
    label: 'Management Accountant',
  },
  {
    id: 4,
    label: 'Manager',
  },
  {
    id: 24,
    label: 'Marketing Manager',
  },
  {
    id: 57,
    label: 'Microservices Architect',
  },
  {
    id: 44,
    label: 'Mobile Developer',
  },
  {
    id: 20,
    label: 'Network Engineer',
  },
  {
    id: 8,
    label: 'Officer',
  },
  {
    id: 29,
    label: 'Operations Manager',
  },
  {
    id: 32,
    label: 'Payroll Administrator',
  },
  {
    id: 51,
    label: 'Performance Engineer',
  },
  {
    id: 54,
    label: 'Platform Engineer',
  },
  {
    id: 70,
    label: 'Portfolio Manager',
  },
  {
    id: 15,
    label: 'Product Owner',
  },
  {
    id: 11,
    label: 'Project Coordinator',
  },
  {
    id: 13,
    label: 'Quality Assurance',
  },
  {
    id: 31,
    label: 'Recruitment Officer',
  },
  {
    id: 36,
    label: 'Research Analyst',
  },
  {
    id: 68,
    label: 'Risk Analyst',
  },
  {
    id: 25,
    label: 'Sales Representative',
  },
  {
    id: 16,
    label: 'Scrum Master',
  },
  {
    id: 21,
    label: 'Security Specialist',
  },
  {
    id: 10,
    label: 'Senior Executive',
  },
  {
    id: 52,
    label: 'Site Reliability Engineer',
  },
  {
    id: 58,
    label: 'Solution Architect',
  },
  {
    id: 65,
    label: 'Statistician',
  },
  {
    id: 3,
    label: 'Supervisor',
  },
  {
    id: 40,
    label: 'System Administrator',
  },
  {
    id: 74,
    label: 'Tax Specialist',
  },
  {
    id: 14,
    label: 'Technical Lead',
  },
  {
    id: 49,
    label: 'Test Engineer',
  },
  {
    id: 30,
    label: 'Training Specialist',
  },
  {
    id: 71,
    label: 'Treasury Analyst',
  },
  {
    id: 18,
    label: 'UI Developer',
  },
  {
    id: 17,
    label: 'UX Designer',
  },
  {
    id: 83,
    label: 'VP of Engineering',
  },
  {
    id: 88,
    label: 'VP of Human Resources',
  },
  {
    id: 85,
    label: 'VP of Marketing',
  },
  {
    id: 86,
    label: 'VP of Operations',
  },
  {
    id: 87,
    label: 'VP of Product',
  },
  {
    id: 84,
    label: 'VP of Sales',
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
