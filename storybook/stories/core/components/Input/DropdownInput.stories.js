import DropdownInput from '@orangehrm/oxd/core/components/Input/DropdownInput';

export default {
  title: 'Example/DropdownInput',
  component: DropdownInput,
  argTypes: {
    style: {control: {type: 'object'}},
    hasError: {control: {type: 'boolean'}},
  },
};

const Template = args => ({
  setup() {
    return {args};
  },
  components: {'oxd-dropdown-input': DropdownInput},
  template: '<oxd-dropdown-input v-bind="args" />',
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
  options: syncFunction,
};

export const DefaultSyncLazy = Template.bind({});
DefaultSyncLazy.args = {
  options: syncFunction,
  lazyLoad: true,
};

export const DefaultAsync = Template.bind({});
DefaultAsync.args = {
  options: asyncFunction,
};

export const DefaultAsyncLazy = Template.bind({});
DefaultAsyncLazy.args = {
  options: asyncLazyFunction,
  lazyLoad: true,
};

export const MultipleAsyncLazy = Template.bind({});
MultipleAsyncLazy.args = {
  options: asyncLazyFunction,
  multiple: true,
  lazyLoad: true,
};
