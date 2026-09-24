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
    const button = wrapper.find('[role="button"]');

    expect(button.attributes('aria-label')).toBe('Close');
    const glyph = button.find('[aria-hidden="true"]');
    expect(glyph.exists()).toBe(true);
    expect(glyph.text()).toBe('×');
  });
});
