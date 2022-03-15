import {mount} from '@vue/test-utils';
import QuickSearchInput from '@orangehrm/oxd/core/components/Input/Autocomplete/QuickSearchInput.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

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
      slots: {
        iconSlot: '<icon-button name="oxd-search" displayType="label-info" size="small"></icon-button>'
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
