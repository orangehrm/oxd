import {mount} from '@vue/test-utils';
import SwitchInput from '@orangehrm/oxd/core/components/Input/SwitchInput.vue';

describe('SwitchInput.vue', () => {
  it('renders OXD Switch Input', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {label: value},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Input with error', () => {
    const value = 'Checkbox';
    const wrapper = mount(SwitchInput, {
      props: {label: value, hasError: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit checked value on click', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        modelValue: false,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual([true]);
  });

  it('should emit unchecked value on click', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        modelValue: true,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual([false]);
  });

  it('should not emit any value if disabled', async () => {
    const wrapper = mount(SwitchInput, {
      props: {
        disabled: true,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
