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
});
