import {mount} from '@vue/test-utils';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';

describe('ProfilePic.vue', () => {
  it('renders OXD ProfilePic', () => {
    const wrapper = mount(ProfilePic, {});
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('renders OXD ProfilePic with image', () => {
    const wrapper = mount(ProfilePic, {
      slots: {
        default: `<img/>`,
      },
    });
    expect(wrapper.find('img').exists()).toBe(true);
  });
});
