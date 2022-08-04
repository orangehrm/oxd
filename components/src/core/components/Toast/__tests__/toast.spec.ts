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
