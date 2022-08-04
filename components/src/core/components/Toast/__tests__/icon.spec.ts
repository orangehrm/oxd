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
