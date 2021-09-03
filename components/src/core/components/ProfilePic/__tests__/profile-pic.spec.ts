import {mount} from '@vue/test-utils';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';

describe('ProfilePic.vue', () => {
  it('should renders OXD ProfilePic for image URL', () => {
    const wrapper = mount(ProfilePic, {
      props: {imageUrl: '../../assests/images/user-default-400.png'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
