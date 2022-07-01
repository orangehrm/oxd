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

  it('should renders OXD Checkbox with string values', () => {
    const wrapper = mount(CheckboxInput, {
      props: {trueValue: 'testtrue', falseValue: 'testfalse'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit checked value on click', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        modelValue: false,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual([true]);
  });

  it('should emit unchecked value on click', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        modelValue: true,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toContainEqual([false]);
  });

  it('should not emit any value if disabled', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        disabled: true,
      },
    });
    wrapper.find("input[type='checkbox']").trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
