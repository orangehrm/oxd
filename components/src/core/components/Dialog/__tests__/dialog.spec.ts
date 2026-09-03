import {mount} from '@vue/test-utils';
import Dialog from '@orangehrm/oxd/core/components/Dialog/Dialog.vue';

describe('Dialog > Dialog.vue', () => {
  it('should renders OXD Dialog > Dialog', () => {
    const wrapper = mount(Dialog, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Dialog show', () => {
    const wrapper = mount(Dialog, {
      props: {show: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Dialog no shadow', () => {
    const wrapper = mount(Dialog, {
      props: {show: true, shadow: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Dialog witout close', () => {
    const wrapper = mount(Dialog, {
      props: {show: true, withClose: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Dialog persistent', () => {
    const wrapper = mount(Dialog, {
      props: {show: true, persistent: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Dialog dialogContainer-div', () => {
    const wrapper = mount(Dialog, {
      props: {show: true, dialogContainer: 'div'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('puts dialog semantics on the element that receives $attrs', () => {
    const wrapper = mount(Dialog, {
      props: {},
      attrs: {'aria-labelledby': 'dialog-title'},
    });
    const dialog = wrapper.find('[role="dialog"]');
    expect(dialog.exists()).toBe(true);
    expect(dialog.attributes('aria-modal')).toBe('true');
    // the whole point: consumer naming has to land on the dialog itself,
    // not on a sibling where it silently does nothing
    expect(dialog.attributes('aria-labelledby')).toBe('dialog-title');
  });

  it('exposes exactly one dialog and no stray document role', () => {
    const wrapper = mount(Dialog, {props: {}});
    expect(wrapper.findAll('[role="dialog"]')).toHaveLength(1);
    expect(wrapper.findAll('[role="document"]')).toHaveLength(0);
  });

  it('names the close button it renders internally', () => {
    // consumers cannot reach this button, so the library has to name it
    const wrapper = mount(Dialog, {props: {withClose: true}});
    expect(
      wrapper.find('.oxd-dialog-close-button').attributes('aria-label'),
    ).toBe('Close');
  });
});
