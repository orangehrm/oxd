import {mount} from '@vue/test-utils';
import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput.vue';
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

describe('QuickSearchInput.vue', () => {
  it('renders OXD Autocomplete Input', () => {
    const wrapper = mount(QuickSearchInput, {
      props: {
        createOptions: syncFunction,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
