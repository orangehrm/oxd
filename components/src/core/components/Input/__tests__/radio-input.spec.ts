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

  it('classes added to elements when focused', async () => {
    const wrapper = mount(RadioInput, {
      props: {
        label: 'Test this button',
      },
    });
    wrapper.find("input[type='radio']").trigger('focus');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('label').classes()).toContain('--focus');
    expect(wrapper.find('span.oxd-radio-input').classes()).toContain(
      'oxd-radio-input--focus',
    );

    wrapper.find("input[type='radio']").trigger('blur');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('label').classes()).not.toContain('--focus');
    expect(wrapper.find('span.oxd-radio-input').classes()).not.toContain(
      'oxd-radio-input--focus',
    );
  });
});
