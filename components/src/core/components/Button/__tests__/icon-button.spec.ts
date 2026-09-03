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

  it('exposes the tooltip as the accessible name', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', tooltip: 'Delete record'},
    });
    // tooltip is surfaced through a CSS [tooltip]::after, which assistive
    // technology cannot see, so it has to be mirrored into a real name
    expect(wrapper.attributes('aria-label')).toBe('Delete record');
    expect(wrapper.find('i').attributes('aria-hidden')).toBe('true');
  });

  it('keeps its accessible name while disabled', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', tooltip: 'Delete record', disabled: true},
    });
    // the visible tooltip is suppressed when disabled, but a disabled
    // control still needs a name
    expect(wrapper.attributes('tooltip')).toBeUndefined();
    expect(wrapper.attributes('aria-label')).toBe('Delete record');
  });

  it('lets a consumer supplied aria-label win over the tooltip', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', tooltip: 'Delete record'},
      attrs: {'aria-label': 'Remove this row'},
    });
    expect(wrapper.attributes('aria-label')).toBe('Remove this row');
  });
});
