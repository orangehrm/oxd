import {mount} from '@vue/test-utils';
import AutocompleteSearchwidget from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteSearchwidget.vue';
import AutocompleteTextInput from '@orangehrm/oxd/core/components/Input/Autocomplete/AutocompleteTextInput.vue';

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
];

const syncFunction = function() {
  return options;
};

describe('AutocompleteSearchwidget.vue', () => {
  it('renders OXD Autocomplete Input', () => {
    const wrapper = mount(AutocompleteSearchwidget, {
      props: {
        createOptions: syncFunction,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
