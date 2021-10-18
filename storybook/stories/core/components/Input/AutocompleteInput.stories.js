import AutocompleteInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteInput';
import {
  BOTTOM,
  DROPDOWN_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';
import {h, ref} from 'vue';
import AutocompleteCustom from './AutocompleteCustom.story.vue';
import QuickSearchWidget from './QuickSearchInput.story.vue';

export default {
  title: 'Example/AutocompleteInput',
  component: AutocompleteInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
    dropdownPosition: {
      options: DROPDOWN_POSITIONS,
      defaultValue: BOTTOM,
    },
    createOptions: {
      control: {type: 'function'},
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

const syncFunction = function(serachParam) {
  const filter = new RegExp(serachParam, 'i');
  return options.filter(item => item.label.match(filter));
};

const asyncFunction = async function(serachParam) {
  const filter = new RegExp(serachParam, 'i');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(options.filter(item => item.label.match(filter)));
    }, 2500);
  });
};

const callAPI = async function(serachParam) {
  return new Promise(resolve => {
    if (serachParam.trim()) {
      fetch(`https://api.github.com/search/users?q=${serachParam}`)
        .then(response => response.json())
        .then(json => {
          const {items} = json;
          resolve(
            items.map(item => {
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

const Template = args => ({
  setup() {
    const selected = ref();
    return {args, selected};
  },
  render() {
    return h(AutocompleteInput, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': value => {
        this.selected = value;
      },
    });
  },
});

export const Default = Template.bind({});
Default.args = {};

export const Error = Template.bind({});
Error.args = {
  value: 'Input',
  hasError: true,
};

export const LoadSync = Template.bind({});
LoadSync.args = {
  createOptions: syncFunction,
};

export const LoadAsync = Template.bind({});
LoadAsync.args = {
  createOptions: asyncFunction,
};

export const LoadAPI = Template.bind({});
LoadAPI.args = {
  createOptions: callAPI,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  createOptions: syncFunction,
  multiple: true,
};

export const CustomTemplate = () => AutocompleteCustom;

export const QuickSearchInput = () => QuickSearchWidget;
