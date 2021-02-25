import {mount} from '@vue/test-utils';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

describe('Button > Icon.vue', () => {
  it('should renders OXD icon button', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash', withContainer: false},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD icon button with container', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
