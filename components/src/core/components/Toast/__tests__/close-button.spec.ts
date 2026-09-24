import {mount} from '@vue/test-utils';
import Toast from '@orangehrm/oxd/core/components/Toast/CloseButton.vue';

describe('Toast > CloseButton.vue', () => {
  it('should renders OXD ToastCloseButton', () => {
    const wrapper = mount(Toast, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastCloseButton success', () => {
    const wrapper = mount(Toast, {
      props: {type: 'success'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastCloseButton warn', () => {
    const wrapper = mount(Toast, {
      props: {type: 'warn'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastCloseButton error', () => {
    const wrapper = mount(Toast, {
      props: {type: 'error'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ToastCloseButton info', () => {
    const wrapper = mount(Toast, {
      props: {type: 'info'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Toast > CloseButton.vue accessibility', () => {
  it('names the close control instead of exposing the "×" glyph', () => {
    // Orca read the bare "×" as part of the toast announcement. The glyph is
    // decorative; the control needs a real name.
    const wrapper = mount(Toast, {props: {type: 'error'}});
    const button = wrapper.find('.oxd-toast-close');

    expect(button.attributes('aria-label')).toBe('Close');
    const glyph = button.find('[aria-hidden="true"]');
    expect(glyph.exists()).toBe(true);
    expect(glyph.text()).toBe('×');
  });
});

describe('Toast > CloseButton.vue keyboard', () => {
  it('is a real button so the keyboard can reach and press it', () => {
    // It was a <div role="button"> with no tabindex: never in the tab order,
    // so a keyboard user could not dismiss a persistent (error) toast.
    // WCAG 2.1.1. A native button is focusable and fires click on
    // Enter/Space, which reaches the toast's existing close handler.
    const wrapper = mount(Toast, {props: {type: 'error'}});
    const button = wrapper.find('.oxd-toast-close');

    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('role')).toBeUndefined();
  });
});
