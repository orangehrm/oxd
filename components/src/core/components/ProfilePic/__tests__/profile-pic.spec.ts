import {mount} from '@vue/test-utils';
import ProfilePic from '@orangehrm/oxd/core/components/ProfilePic/ProfilePic.vue';
import {SIZE_SMALL} from '@orangehrm/oxd/core/components/ProfilePic/types';

describe('ProfilePic.vue', () => {
  it('renders OXD ProfilePic with image', () => {
    const wrapper = mount(ProfilePic, {
      slots: {
        default: `<img/>`,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD ProfilePic with small image', () => {
    const wrapper = mount(ProfilePic, {
      props: {
        displayType: SIZE_SMALL,
      },
      slots: {
        default: `<img/>`,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
