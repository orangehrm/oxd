import {mount} from '@vue/test-utils';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

describe('Button > Icon.vue', () => {
  it('renders OXD button', () => {
    const wrapper = mount(IconButton, {
      props: {name: 'trash'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
