import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput';
import {
  BOTTOM,
  DROPDOWN_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';
import {h, ref} from 'vue';
import AutocompleteCustom from './AutocompleteCustom.story.vue';
import AutoCompleteEvents from './AutoCompleteEvents.story.vue';
import AutocompleteCustomChips from './AutocompleteCustomChips.story.vue';

export default {
  title: 'Inputs/AutocompleteInput',
  component: AutocompleteInput,
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
      defaultValue: BOTTOM,
    },
    modelValue: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the select'},
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
    'select:enter': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when enter on selected value'},
      },
    },
    'update:searchTerm': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'emit event when search a value'},
      },
    },
    beforeSelected: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'A slot which  renders before the selected option'},
      },
    },
    afterSelected: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'A slot which  renders after the selected option'},
      },
    },
    option: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'Interal Slot to manage option'},
      },
    },
    createOptions: {
      control: {type: 'function'},
      table: {
        type: {summary: 'function to load options for the autocomplete'},
      },
      defaultValue: () => [],
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
    label: 'Appraiser',
  },
];

const syncFunction = function (serachParam) {
  const filter = new RegExp(serachParam, 'i');
  return options.filter((item) => item.label.match(filter));
};

const asyncFunction = async function (serachParam) {
  const filter = new RegExp(serachParam, 'i');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(options.filter((item) => item.label.match(filter)));
    }, 2500);
  });
};

const callAPI = async function (serachParam) {
  return new Promise((resolve) => {
    if (serachParam.trim()) {
      fetch(`https://api.github.com/search/users?q=${serachParam}`)
        .then((response) => response.json())
        .then((json) => {
          const {items} = json;
          resolve(
            items.map((item) => {
              return {
                id: item.id,
                label: item.login,
              };
            }),
          );
        });
    } else {
      resolve([]);
    }
  });
};

const Template = (args) => ({
  setup() {
    const selected = ref();
    return {args, selected};
  },
  render() {
    return h(AutocompleteInput, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': (value) => {
        this.selected = value;
      },
    });
  },
});

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  docs: {
    source: {
      code: '<oxd-auto-complete \n :createOptions="() => []" \n/>',
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  value: 'Input',
  hasError: true,
  autocomplete: 'off',
};

Error.parameters = {
  docs: {
    source: {
      code: '<oxd-auto-complete \n :createOptions="() => []" \n :hasError="true" \n/>',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: 'Input',
  disabled: true,
};

Disabled.parameters = {
  docs: {
    source: {
      code: '<oxd-auto-complete \n :createOptions="() => []" \n :disabled="true" \n/>',
    },
  },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  value: 'Input',
  readonly: true,
};

ReadOnly.parameters = {
  docs: {
    source: {
      code: '<oxd-auto-complete \n :createOptions="() => []" \n :readonly="true" \n/>',
    },
  },
};

export const LoadSync = Template.bind({});
LoadSync.args = {
  createOptions: syncFunction,
};

LoadSync.parameters = {
  docs: {
    source: {
      code:
        '<oxd-auto-complete \n :createOptions="syncFunction" />\n' +
        '         const syncFunction = function (serachParam) {\n' +
        '           const filter = new RegExp(serachParam, "i");\n' +
        '           return options.filter((item) => item.label.match(filter));\n' +
        '         }',
    },
  },
};

export const LoadAsync = Template.bind({});
LoadAsync.args = {
  createOptions: asyncFunction,
};

LoadAsync.parameters = {
  docs: {
    source: {
      code:
        '<oxd-auto-complete \n :createOptions="asyncFunction" />\n' +
        '       const syncFunction = function (serachParam) {\n' +
        '       const filter = new RegExp(serachParam, "i");\n' +
        '       setTimeout(() => {\n' +
        '       resolve(options.filter((item) => item.label.match(filter)));\n' +
        '       }, 2500);\n' +
        '         });\n' +
        '       }',
    },
  },
};

export const LoadAPI = Template.bind({});
LoadAPI.args = {
  createOptions: callAPI,
};

LoadAPI.parameters = {
  docs: {
    source: {
      code:
        '<oxd-auto-complete \n :createOptions="callAPI" >\n/' +
        ' const callAPI = async function (serachParam) {\n' +
        '       if (serachParam.trim()) {\n' +
        '        fetch(`https://api.github.com/search/users?q=${serachParam}`)\n' +
        '       .then((response) => response.json())\n' +
        '       .then((json) => {\n' +
        '         const {items} = json;\n' +
        '         resolve(\n' +
        '         items.map((item) => {\n' +
        '         label: item.login,\n' +
        '         }),\n' +
        '         });\n' +
        '         } else {\n' +
        '         resolve([]);\n' +
        '         } \n' +
        '         });\n' +
        '         }',
    },
  },
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  createOptions: syncFunction,
  multiple: true,
};

MultiSelect.parameters = {
  docs: {
    source: {
      code:
        '<oxd-auto-complete \n  :multiple="true" \n :createOptions="syncFunction" />\n' +
        '        const syncFunction = function (serachParam) {\n' +
        '        const filter = new RegExp(serachParam, "i");\n' +
        '         return options.filter((item) => item.label.match(filter));\n' +
        '         }',
    },
  },
};

export const CustomTemplate = () => AutocompleteCustom;

CustomTemplate.parameters = {
  docs: {
    source: {
      code:
        '<oxd-autocomplete-input v-model="selected" :createOptions="callAPI">\n' +
        '<template v-slot:beforeSelected="{data}">\n' +
        '<img\n' +
        '  width="25"\n' +
        ' height="25"\n' +
        ' alt="orangehrm logo"\n' +
        ' :src="data.avatar_url"\n' +
        ' />\n' +
        ' </template>\n' +
        ' <template v-slot:afterSelected="{data}">\n' +
        ' (Github ID : {{ data.id }})\n' +
        ' </template>\n' +
        ' <template v-slot:option="{data, text}">\n' +
        ' <oxd-checkbox-input />\n' +
        ' <span v-html="text"></span>\n' +
        ' <div class="github-id">{{ data.id }}</div>\n' +
        '</template>\n' +
        '</oxd-autocomplete-input>\n' +
        ' <br />\n' +
        '<p>{{ selected }}</p>\n' +
        '<p>{{ selected }}</p>\n' +
        '//\n' +
        'File -> AutoCompleteCustom.story.vue',
    },
  },
};

export const CustomChipsTemplate = () => AutocompleteCustomChips;

CustomChipsTemplate.parameters = {
  docs: {
    source: {
      code:
        '<oxd-autocomplete-input v-model="selected" :createOptions="callAPI">\n' +
        '<template v-slot:beforeSelected="{data}">\n' +
        '<img\n' +
        '  width="25"\n' +
        ' height="25"\n' +
        ' alt="orangehrm logo"\n' +
        ' :src="data.avatar_url"\n' +
        ' />\n' +
        ' </template>\n' +
        ' <template v-slot:afterSelected="{data}">\n' +
        ' (Github ID : {{ data.id }})\n' +
        ' </template>\n' +
        ' <template v-slot:option="{data, text}">\n' +
        ' <oxd-checkbox-input />\n' +
        ' <span v-html="text"></span>\n' +
        ' <div class="github-id">{{ data.id }}</div>\n' +
        '</template>\n' +
        '</oxd-autocomplete-input>\n' +
        ' <br />\n' +
        '<p>{{ selected }}</p>\n' +
        '<p>{{ selected }}</p>\n' +
        '//\n' +
        'File -> AutoCompleteCustomChips.story.vue',
    },
  },
};

export const Events = () => AutoCompleteEvents;

Events.parameters = {
  docs: {
    source: {
      code:
        '  <div> \n' +
        '<oxd-autocomplete-input \n' +
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
        'File -> AutoCompleteEvents.story.vue',
    },
  },
};
