import {shallowMount} from '@vue/test-utils';
import ImageCropper from '@orangehrm/oxd/core/components/ImageCropper/ImageCropper.vue';

describe('ImageCropper.vue', () => {
  it('renders ImageCropper', () => {
    const wrapper = shallowMount(ImageCropper, {
      props: {
        image:
          'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
