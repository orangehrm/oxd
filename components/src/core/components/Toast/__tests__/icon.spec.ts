import {mount} from '@vue/test-utils';
import ToastIcon from '@orangehrm/oxd/core/components/Toast/Icon.vue';

describe('Toast > Icon.vue', () => {
  it('should renders OXD ToastIcon', () => {
    const wrapper = mount(ToastIcon, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastIcon success', () => {
    const wrapper = mount(ToastIcon, {
      props: {type: 'success'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastIcon warn', () => {
    const wrapper = mount(ToastIcon, {
      props: {type: 'warn'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastIcon error', () => {
    const wrapper = mount(ToastIcon, {
      props: {type: 'error'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastIcon info', () => {
    const wrapper = mount(ToastIcon, {
      props: {type: 'info'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Toast > Icon.vue accessibility', () => {
  it('hides the decorative icon from screen readers', () => {
    // The glyph is drawn by bootstrap-icons as ::before content - a
    // private-use character (U+F333 for exclamation-circle). Inside the
    // toast's aria-live region Orca spoke it literally, before the message.
    // The toast title ("Error") already carries what the icon means.
    const wrapper = mount(ToastIcon, {props: {type: 'error'}});
    expect(
      wrapper.find('.oxd-toast-icon-container').attributes('aria-hidden'),
    ).toBe('true');
  });
});
