import DropdownInput from '@orangehrm/oxd/core/components/Input/DropdownInput';
import {h, ref} from 'vue';

export default {
  title: 'Deprecated/Inputs/DropdownInput',
  component: DropdownInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    const selected = ref([]);
    return {args, selected};
  },
  render() {
    return h(DropdownInput, {
      ...this.args,
      modelValue: this.selected,
      'onUpdate:modelValue': value => {
        this.selected = [...value];
      },
    });
  },
});

const dropdownOptions = [
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
];

const nestedOptions = [
  {
    id: 1,
    label: 'Organization',
  },
  {
    id: 2,
    label: 'Test',
    indent: 2,
  },
  {
    id: 3,
    label: 'HR Department',
    indent: 2,
  },
  {
    id: 4,
    label: 'Engineering',
    indent: 2,
  },
  {
    id: 5,
    label: 'Open Source',
    indent: 3,
  },
  {
    id: 7,
    label: 'OrangeHR Open Source Mobile',
    indent: 4,
  },
  {
    id: 8,
    label: 'OrangeHR Open Source Web',
    indent: 4,
  },
  {
    id: 9,
    label: 'OrangeHR Open Source Web - Customization',
    indent: 5,
  },
  {
    id: 6,
    label: 'Enterprise',
    indent: 3,
  },
];

const syncFunction = function(serachParam) {
  console.log(serachParam);
  return dropdownOptions;
};

const asyncFunction = async function(serachParam) {
  console.log(serachParam);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(dropdownOptions);
    }, 5000);
  });
};

const asyncLazyFunction = async function(serachParam) {
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

export const Default = Template.bind({});
Default.args = {
  options: dropdownOptions,
};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  options: dropdownOptions,
};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  options: dropdownOptions,
  disabled: true,
  preSelect: true,
  selectedOptions: [2],
};

export const DefaultSync = Template.bind({});
DefaultSync.args = {
  createOptions: syncFunction,
};

export const DefaultSyncLazy = Template.bind({});
DefaultSyncLazy.args = {
  createOptions: syncFunction,
  lazyLoad: true,
};

export const DefaultAsync = Template.bind({});
DefaultAsync.args = {
  createOptions: asyncFunction,
};

export const DefaultAsyncLazy = Template.bind({});
DefaultAsyncLazy.args = {
  createOptions: asyncLazyFunction,
  lazyLoad: true,
};

export const MultipleAsyncLazy = Template.bind({});
MultipleAsyncLazy.args = {
  createOptions: asyncLazyFunction,
  multiple: true,
  lazyLoad: true,
};

export const Nested = Template.bind({});
Nested.args = {
  options: nestedOptions,
};
