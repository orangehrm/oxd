import {mount} from '@vue/test-utils';
import Textarea from '@orangehrm/oxd/core/components/Textarea/Textarea.vue';

describe('Textarea.vue', () => {
  it('renders OXD Textarea', () => {
    const value = 'Textarea';
    const wrapper = mount(Textarea, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Textarea with custom color', () => {
    const value = 'Textarea';
    const wrapper = mount(Textarea, {
      props: {label: value, style: {backgroundColor: 'aliceblue'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Textarea with error', () => {
    const value = 'Textarea';
    const wrapper = mount(Textarea, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('on input', async () => {
    const wrapper = mount(Textarea, {});
    const input = wrapper.find('textarea');
    await input.trigger('input');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()).toHaveProperty('input');
  });

  it('on blur', async () => {
    const wrapper = mount(Textarea, {});
    const input = wrapper.find('textarea');
    await input.trigger('blur');
    expect(wrapper.emitted()).toHaveProperty('blur');
  });

  it('on focus', async () => {
    const wrapper = mount(Textarea, {});
    const input = wrapper.find('textarea');
    await input.trigger('focus');
    expect(wrapper.emitted()).toHaveProperty('focus');
  });
});
