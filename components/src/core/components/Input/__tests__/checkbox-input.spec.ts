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

  it('should apply additional class to wrapper div', () => {
    const additionalClass = 'custom-class';
    const wrapper = mount(CheckboxInput, {
      props: {
        optionWrapperAdditionalClass: additionalClass,
      },
    });
    expect(wrapper.find('.oxd-checkbox-wrapper').classes()).toContain(
      additionalClass,
    );
  });

  it('should render optional info icon when optionInfoIcon is provided', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        optionInfoIcon: 'info-icon',
        optionInfoMessage: 'This is additional information',
        optionInfoIconStyle: {color: 'blue'},
        optionInfoIconSize: 'small',
      },
    });
    const optionalInfoIcon = wrapper.find('.oxd-optional-info-icon');
    expect(optionalInfoIcon.exists()).toBe(true);
  });

  it('should render border when optionBorder is provided', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        border: true,
      },
    });
    const border = wrapper.find('.border-enabled');
    expect(border.exists()).toBe(true);
  });

  it('if optionInfoIconPosition is left, should render info icon at left', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        optionInfoIcon: 'info-icon',
        optionInfoMessage: 'This is additional information',
        optionInfoIconStyle: {color: 'blue'},
        optionInfoIconSize: 'small',
        optionInfoIconPosition: 'left',
      },
    });
    const optionalInfoIcon = wrapper.find('.oxd-optional-info-icon');
    expect(optionalInfoIcon.exists()).toBe(true);
    expect(optionalInfoIcon.classes()).toContain('oxd-optional-info-icon-left');
  });

  it('if hasError is true, border should be red', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        border: true,
        hasError: true,
      },
    });
    const border = wrapper.find('.border-enabled');
    expect(border.classes()).toContain('--error');
  });
});
