import {mount} from '@vue/test-utils';
import CheckboxGroup from '@orangehrm/oxd/core/components/Input/CheckboxGroup.vue';

describe('CheckboxGroup > CheckboxGroup.vue', () => {
  it('renders OXD MultiCheckBox', () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        options: [
          {
            id: 1,
            label: 'Item one',
          },
          {
            id: 2,
            label: 'Item two',
          },
        ],
        class: 'check-box-column',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
