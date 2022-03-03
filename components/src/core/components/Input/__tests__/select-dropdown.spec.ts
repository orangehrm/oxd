import {mount} from '@vue/test-utils';
import SelectDropdown from '@orangehrm/oxd/core/components/Input/Select/SelectDropdown.vue';

describe('SelectDropdown.vue', () => {
  it('renders OXD Select Dropdown not empty', () => {
    const wrapper = mount(SelectDropdown, {
      props: {
        empty: false,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD Select Dropdown empty', () => {
    const wrapper = mount(SelectDropdown, {
      props: {
        empty: true,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
