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

  it('renders with additional class when provided', () => {
    const additionalClass = 'custom-class';
    const wrapper = mount(CheckboxInput, {
      props: {
        additionalClass: additionalClass,
        labelPosition: 'left',
      },
      slots: {
        default: 'Checkbox',
      },
    });

    const labelDiv = wrapper.find('.oxd-checkbox-option-label');
    expect(labelDiv.classes()).toContain(additionalClass);
  });

  it('renders without additional class when not provided', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        labelPosition: 'left',
      },
      slots: {
        default: 'Checkbox',
      },
    });

    const labelDiv = wrapper.find('.oxd-checkbox-option-label');
    expect(labelDiv.classes()).not.toContain('custom-class');
  });

  it('renders with additional icon when additionalIcon prop is provided', () => {
    const additionalIcon = 'oxd-info';
    const additionalMessage =
      'This action will be applied only for the candidates who are not yet shortlisted';
    const wrapper = mount(CheckboxInput, {
      props: {
        additionalIcon: additionalIcon,
        additionalMessage: additionalMessage,
      },
    });

    const additionalIconSpan = wrapper.find('.oxd-additional-icon');
    expect(additionalIconSpan.exists()).toBe(true);
  });
});
