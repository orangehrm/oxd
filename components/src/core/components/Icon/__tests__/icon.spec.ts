import {mount} from '@vue/test-utils';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

describe('Icon.vue', () => {
  it('renders OXD Icon', () => {
    const wrapper = mount(Icon, {
      props: {name: 'trash'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should renders ohrm icon', () => {
    const wrapper = mount(Icon, {
      props: {name: 'oxd-likes'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should not renders ohrm icon', () => {
    const wrapper = mount(Icon, {
      props: {name: 'oxd-test'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
