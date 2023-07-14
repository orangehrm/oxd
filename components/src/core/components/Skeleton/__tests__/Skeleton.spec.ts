import {mount} from '@vue/test-utils';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';

describe('Skeleton.vue', () => {
  it('should renders OXD Skeleton', () => {
    const wrapper = mount(Skeleton);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Skeleton, 3 lines', () => {
    const wrapper = mount(Skeleton, {
      props: {lines: 3},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Skeleton > Circle with custom height and width', () => {
    const wrapper = mount(Skeleton, {
      props: {
        circle: true,
        height: 100,
        width: 100,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Skeleton > with Animation', () => {
    const wrapper = mount(Skeleton, {
      props: {
        animate: true,
        height: 100,
        width: 100,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
