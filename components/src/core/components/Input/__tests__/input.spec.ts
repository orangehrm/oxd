import {mount} from '@vue/test-utils';
import Input from '@orangehrm/oxd/core/components/Input/Input.vue';

const callFunction = jest.fn();

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

  it('on pagedown', async () => {
    const wrapper = mount(Input, {});
    const input = wrapper.find('input');
    input.setValue('test');
    expect(input.element.selectionEnd).toBe(0);
    await input.trigger('keyup', {key: 'PageDown'});
    expect(input.element.selectionEnd).toBe(4);
  });

  it('on pageup', async () => {
    const wrapper = mount(Input, {});
    const input = wrapper.find('input');
    input.setValue('test');
    expect(input.element.selectionEnd).toBe(0);
    await input.trigger('keyup', {key: 'PageUp'});
    expect(input.element.selectionEnd).toBe(0);
  });

  it('input field with icon', () => {
    const wrapper = mount(Input, {
      props: {
        imageIcon: '@orangehrm/oxd/assets/images/facebook_logo_icon.svg',
      },
    });
    expect(wrapper.find('.input-text-field-icon').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('input field with icon - in default mode, the icon is not clickable', () => {
    const wrapper = mount(Input, {
      props: {
        imageIcon: '@orangehrm/oxd/assets/images/facebook_logo_icon.svg',
      },
    });
    expect(wrapper.find('.click-disabled').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('input field with clickable icon', () => {
    const wrapper = mount(Input, {
      props: {
        imageIcon: '@orangehrm/oxd/assets/images/facebook_logo_icon.svg',
        isIconClickable: true,
      },
    });
    expect(wrapper.find('.click-disabled').exists()).toBe(false);
  });
  callFunction;
  it('input field trigeer function in icon click', async () => {
    const wrapper = mount(Input, {
      props: {
        imageIcon: '@orangehrm/oxd/assets/images/facebook_logo_icon.svg',
        isIconClickable: true,
        imageIconClick: callFunction,
      },
    });
    expect(wrapper.find('.click-disabled').exists()).toBe(false);
    await wrapper.find('img').trigger('click');
    expect(callFunction).toHaveBeenCalled();
  });

  it('input field without icon', () => {
    const value = 'Input';
    const wrapper = mount(Input, {
      props: {label: value},
    });
    expect(wrapper.find('.input-text-field-icon').exists()).toBe(false);
  });

  it('should render topOfInput slot when provided', () => {
    const wrapper = mount(Input, {
      slots: {
        topOfInput: '<span class="test-label">Test Label</span>',
      },
    });
    const inlineLabel = wrapper.find('.oxd-input--inline-label');
    expect(inlineLabel.exists()).toBe(true);
    expect(inlineLabel.text()).toBe('Test Label');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not render topOfInput slot when not provided', () => {
    const wrapper = mount(Input, {});
    const inlineLabel = wrapper.find('.oxd-input--inline-label');
    expect(inlineLabel.exists()).toBe(false);
  });

  it('should apply has-inline-label class when topOfInput slot is provided', () => {
    const wrapper = mount(Input, {
      slots: {
        topOfInput: '<span>Label</span>',
      },
    });
    const outerWrapper = wrapper.find('.input-outer-wrapper');
    expect(outerWrapper.classes()).toContain('input-outer-wrapper--has-inline-label');
  });

  it('should not apply has-inline-label class when topOfInput slot is not provided', () => {
    const wrapper = mount(Input, {});
    const outerWrapper = wrapper.find('.input-outer-wrapper');
    expect(outerWrapper.classes()).not.toContain('input-outer-wrapper--has-inline-label');
  });

  it('should render topOfInput slot content correctly', () => {
    const wrapper = mount(Input, {
      slots: {
        topOfInput: '<span class="custom-label">Custom Inline Label</span>',
      },
    });
    const inlineLabel = wrapper.find('.oxd-input--inline-label');
    const customLabel = inlineLabel.find('.custom-label');
    expect(customLabel.exists()).toBe(true);
    expect(customLabel.text()).toBe('Custom Inline Label');
  });
});
