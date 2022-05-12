import {mount} from '@vue/test-utils';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';

describe('Input.vue', () => {
  it('renders OXD Input', () => {
    const value = 'Input';
    const wrapper = mount(Input, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with custom color', () => {
    const value = 'Input';
    const wrapper = mount(Input, {
      props: {label: value, style: {backgroundColor: 'aliceblue'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with error', () => {
    const value = 'Input';
    const wrapper = mount(Input, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('on input', async () => {
    const wrapper = mount(Input, {});
    const input = wrapper.find('input');
    await input.trigger('input');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()).toHaveProperty('input');
  });
});
