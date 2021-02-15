import {mount} from '@vue/test-utils';
import Icon from '@orangehrm/oxd/core/components/Icon/Icon.vue';

describe('Icon.vue', () => {
  it('renders OXD Icon', () => {
    const wrapper = mount(Icon, {
      props: {name: 'trash'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
