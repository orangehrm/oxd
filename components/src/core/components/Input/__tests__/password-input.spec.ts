import {mount} from '@vue/test-utils';
import PasswordInput from '@orangehrm/oxd/core/components/Input/PasswordInput.vue';

describe('PasswordInput.vue', () => {
  it('renders OXD Input', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with custom color', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, style: {backgroundColor: 'aliceblue'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with error', () => {
    const value = 'Input';
    const wrapper = mount(PasswordInput, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
