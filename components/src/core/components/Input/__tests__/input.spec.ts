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

  it('should renders OXD Input with custom color', () => {
    const label = 'Input';
    const wrapper = mount(Input, {
      props: {label, style: {backgroundColor: 'aliceblue'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with error', () => {
    const label = 'Input';
    const wrapper = mount(Input, {
      props: {label, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
