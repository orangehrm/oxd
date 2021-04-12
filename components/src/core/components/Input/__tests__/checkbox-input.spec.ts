import {mount} from '@vue/test-utils';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';

describe('CheckboxInput.vue', () => {
  it('renders OXD Checkbox Input', () => {
    const value = 'Checkbox';
    const wrapper = mount(CheckboxInput, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with error', () => {
    const value = 'Checkbox';
    const wrapper = mount(CheckboxInput, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit checked value on click', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        value: '1',
        trueValue: 'yes',
        falseValue: 'no',
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toContain('yes');
  });

  it('should emit unchecked value on click', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        value: '1',
        checked: true,
        trueValue: 'yes',
        falseValue: 'no',
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toContain('no');
  });

  it('should not emit any value if disabled', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        value: '1',
        disabled: true,
        trueValue: 'yes',
        falseValue: 'no',
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
