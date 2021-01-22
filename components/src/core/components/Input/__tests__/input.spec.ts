import {mount} from '@vue/test-utils';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';

describe('Input.vue', () => {
  it('renders OXD Input', () => {
    const label = 'Input';
    const wrapper = mount(Input, {
      props: {label},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
