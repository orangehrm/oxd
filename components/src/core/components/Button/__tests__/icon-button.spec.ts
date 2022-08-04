import {mount} from '@vue/test-utils';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

describe('Button > Icon.vue', () => {
  it('should renders OXD icon button', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', withContainer: false, flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD icon button with container', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', flow: 'up'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not render disabled attribute when disabled is not specified', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash'},
    });
    expect(wrapper.attributes('disabled')).toBeUndefined();
  });

  it('should not render disabled attribute when disabled is false', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', disabled: false},
    });
    expect(wrapper.attributes('disabled')).toBeUndefined();
  });

  it('should render disabled attribute when disabled is true', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', disabled: true},
    });
    expect(wrapper.attributes('disabled')).toBe('');
  });

  it('should render tooltip attribute when tooltip is given', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', tooltip: 'My Tooltip'},
    });
    expect(wrapper.attributes('tooltip')).toBe('My Tooltip');
  });

  it('should not render tooltip attribute when button is disabled', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', tooltip: 'My Tooltip', disabled: true},
    });
    expect(wrapper.attributes('tooltip')).toBeUndefined();
  });

  it('should render tooltip attribute when button is disabled if showTooltipWhenDisabled is true', () => {
    const wrapper = mount(IconButton, {
      props: {
        name: 'trash',
        tooltip: 'My Tooltip',
        disabled: true,
        showTooltipWhenDisabled: true,
      },
    });
    expect(wrapper.attributes('tooltip')).toBe('My Tooltip');
  });
});
