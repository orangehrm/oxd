import {mount} from '@vue/test-utils';
import RadioInput from '@orangehrm/oxd/core/components/Input/RadioInput.vue';

describe('RadioInput.vue', () => {
  it('renders OXD Radio Input', () => {
    const value = 'Radio';
    const wrapper = mount(RadioInput, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Radio input with error', () => {
    const value = 'Radio';
    const wrapper = mount(RadioInput, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit checked value on click', async () => {
    const wrapper = mount(RadioInput, {
      props: {
        modelValue: '',
        value: 'test',
      },
    });
    wrapper.find("input[type='radio']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual(['test']);
  });

  it('should not emit any value if disabled', async () => {
    const wrapper = mount(RadioInput, {
      props: {
        disabled: true,
      },
    });
    wrapper.find("input[type='radio']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
