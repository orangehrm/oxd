import {mount} from '@vue/test-utils';
import Overlay from '@orangehrm/oxd/core/components/Dialog/Overlay.vue';

describe('Dialog > Overlay.vue', () => {
  it('should renders OXD Dialog > Overlay', () => {
    const wrapper = mount(Overlay, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Overlay show', () => {
    const wrapper = mount(Overlay, {
      props: {show: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Dialog > Overlay centered', () => {
    const wrapper = mount(Overlay, {
      props: {show: true, centered: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
