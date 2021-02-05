import {mount} from '@vue/test-utils';
import Divider from '@orangehrm/oxd/core/components/Divider/Divider.vue';

describe('Divider.vue', () => {
  it('renders OXD Divider', () => {
    const wrapper = mount(Divider, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD Divider with style', () => {
    const wrapper = mount(Divider, {
      props: {style: {borderColor: 'red'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
