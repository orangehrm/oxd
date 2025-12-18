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

  it('should render secondary label as provided by developer', () => {
    const wrapper = mount(RadioInput, {
      props: {
        optionLabel: 'Full Time',
        secondaryLabel: '(Permanent)',
      },
    });
    expect(wrapper.text()).toContain('Full Time');
    expect(wrapper.text()).toContain('(Permanent)');
    expect(
      wrapper.find('.oxd-radio-option-secondary-label').exists(),
    ).toBeTruthy();
  });

  it('should not render secondary label when not provided', () => {
    const wrapper = mount(RadioInput, {
      props: {
        optionLabel: 'Full Time',
      },
    });
    expect(wrapper.text()).toContain('Full Time');
    expect(
      wrapper.find('.oxd-radio-option-secondary-label').exists(),
    ).toBeFalsy();
  });

  it('should render secondary label with any format passed by developer', () => {
    const wrapper = mount(RadioInput, {
      props: {
        optionLabel: 'Part Time',
        secondaryLabel: '{Temporary}',
      },
    });
    expect(wrapper.text()).toContain('Part Time');
    expect(wrapper.text()).toContain('{Temporary}');
  });
});
