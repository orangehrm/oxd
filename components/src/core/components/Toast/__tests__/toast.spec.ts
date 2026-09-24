import {mount} from '@vue/test-utils';
import Toast from '@orangehrm/oxd/core/components/Toast/Toast.vue';

describe('Toast > Toast.vue', () => {
  it('should renders OXD Toast', () => {
    const wrapper = mount(Toast, {
      props: {title: 'Test Toast', show: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Toast success', () => {
    const wrapper = mount(Toast, {
      props: {title: 'Test Toast', show: true, type: 'success'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Toast warn', () => {
    const wrapper = mount(Toast, {
      props: {title: 'Test Toast', show: true, type: 'warn'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Toast error', () => {
    const wrapper = mount(Toast, {
      props: {title: 'Test Toast', show: true, type: 'error'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Toast info', () => {
    const wrapper = mount(Toast, {
      props: {title: 'Test Toast', show: true, type: 'info'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('Toast.vue close control', () => {
  it('closes a persistent toast when its close button is pressed', async () => {
    // Guards the switch from <div role="button"> to a native <button>: the
    // click must still reach onClickClose, including for a persistent toast
    // that ignores clicks on its body.
    const wrapper = mount(Toast, {
      props: {
        show: true,
        persistent: true,
        type: 'error',
        title: 'Error',
        message: 'm',
      },
    });
    await wrapper.find('.oxd-toast').trigger('click');
    expect(wrapper.emitted('update:show')).toBeUndefined();

    await wrapper.find('button.oxd-toast-close').trigger('click');
    expect(wrapper.emitted('update:show')).toEqual([[false]]);
  });
});
