import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput';
import QuickSearchInputReadOnly from './QuickSearchInput.readonly.story.vue';
import QuickSearchInputDisabled from './QuickSearchInput.disabled.story.vue';
import QuickSearchWidget from './QuickSearchInput.story.vue';

export default {
  title: 'Inputs/QuickSearch',
  component: QuickSearchInput,
  argTypes: {
    style: {
      control: {type: 'object'},
      table: {
        type: {summary: 'Set custom style to the quicksearch'},
      },
    },
    disabled: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set disabled property for quicksearch'},
      },
    },
    readonly: {
      control: {type: 'boolean'},
      table: {
        type: {summary: 'Set readonly property for quicksearch'},
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
    'dropdown:closed': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'Emit event when dropdown closed'},
      },
    },
    'dropdown:blur': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'Emit event when dropdown blur'},
      },
    },
    'dropdown:clear': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'Emit event when dropdown clear'},
      },
    },
    'select:enter': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'Emit event when key enter is pressed'},
      },
    },
    'update:searchTerm': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'Emit updated searchTerm from quicksearch'},
      },
    },
    'update:modelValue': {
      control: {type: 'array'},
      defaultValue: [],
      table: {
        type: {summary: 'Emit event when quicksearch value updates'},
      },
    },
    beforeInput: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'Inherited beforeInput slot for  autocomplete'},
      },
    },
    afterInput: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'Inherited afterInput slot for  autocomplete'},
      },
    },
    default: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'Slot options for beforeInput,afterInput slots'},
      },
    },
    iconSlot: {
      control: {type: 'object'},
      defaultValue: [],
      table: {
        type: {summary: 'Prepend an icon to end of the quicksearch'},
      },
    },
    createOptions: {
      control: {type: 'function'},
      table: {
        type: {summary: 'function to load options for the quicksearch'},
      },
      defaultValue: () => [],
    },
  },
};

export const Default = () => QuickSearchWidget;

Default.parameters = {
  docs: {
    source: {
      code:
        '<oxd-quick-search :createOptions="callAPI">\n' +
        ' <template v-slot:iconSlot>\n' +
        '  <oxd-icon-button name="oxd-search"></oxd-icon-button>\n' +
        ' </template>\n' +
        ' <template v-slot:option="{data}">\n' +
        ' <span\n' +
        'class="auto-complete-img"\n' +
        ' style=" display: inline-block;padding-right: 15px;"\n' +
        ' >\n' +
        '<img\n' +
        ':src="data.avatar_url"\n' +
        'style=" border-radius: 50%;height: auto;cursor: pointer;width: 2.5rem;max-height: 2.5rem;"\n' +
        '/>\n' +
        '</span>\n' +
        ' <span> {{ data.label }}</span>\n' +
        ' </template>\n' +
        ' </oxd-quick-search>\n' +
        '//\n' +
        'File -> QuickSearch.story.vue',
    },
    description: {
      component:
        'This is extended component of AutoComplete component and supports all the behaviour of it',
    },
  },
};

export const ReadOnly = () => QuickSearchInputReadOnly;

ReadOnly.parameters = {
  docs: {
    source: {
      code:
        '<oxd-quick-search :createOptions="callAPI" :readonly="true">\n' +
        ' <template v-slot:iconSlot>\n' +
        '  <oxd-icon-button name="oxd-search"></oxd-icon-button>\n' +
        ' </template>\n' +
        ' <template v-slot:option="{data}">\n' +
        ' <span\n' +
        'class="auto-complete-img"\n' +
        ' style=" display: inline-block;padding-right: 15px;"\n' +
        ' >\n' +
        '<img\n' +
        ':src="data.avatar_url"\n' +
        'style=" border-radius: 50%;height: auto;cursor: pointer;width: 2.5rem;max-height: 2.5rem;"\n' +
        '/>\n' +
        '</span>\n' +
        ' <span> {{ data.label }}</span>\n' +
        ' </template>\n' +
        ' </oxd-quick-search>\n' +
        '//\n' +
        'File -> QuickSearch.story.vue',
    },
    description: {
      component:
        'This is extended component of AutoComplete component and supports all the behaviour of it',
    },
  },
};

export const Disabled = () => QuickSearchInputDisabled;

Disabled.parameters = {
  docs: {
    source: {
      code:
        '<oxd-quick-search :createOptions="callAPI" :disabled="true">\n' +
        ' <template v-slot:iconSlot>\n' +
        '  <oxd-icon-button name="oxd-search"></oxd-icon-button>\n' +
        ' </template>\n' +
        ' <template v-slot:option="{data}">\n' +
        ' <span\n' +
        'class="auto-complete-img"\n' +
        ' style=" display: inline-block;padding-right: 15px;"\n' +
        ' >\n' +
        '<img\n' +
        ':src="data.avatar_url"\n' +
        'style=" border-radius: 50%;height: auto;cursor: pointer;width: 2.5rem;max-height: 2.5rem;"\n' +
        '/>\n' +
        '</span>\n' +
        ' <span> {{ data.label }}</span>\n' +
        ' </template>\n' +
        ' </oxd-quick-search>\n' +
        '//\n' +
        'File -> QuickSearch.story.vue',
    },
    description: {
      component:
        'This is extended component of AutoComplete component and supports all the behaviour of it',
    },
  },
};
