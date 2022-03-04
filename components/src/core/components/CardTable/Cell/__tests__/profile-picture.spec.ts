import {mount} from '@vue/test-utils';
import ProfilePicture from '@orangehrm/oxd/core/components/CardTable/Cell/ProfilePicture.vue';
import {DEVICE_LG} from '@orangehrm/oxd/composables/useResponsive';

const imgSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=';

const GLOBAL = {
  provide: {
    tableProps() {
      return {
        items: [],
      };
    },
    screenState() {
      return {
        screenType: DEVICE_LG,
      };
    },
  },
};

describe('CardTable > Cell > ProfilePicture.vue', () => {
  it('should renders OXD CardTable > Cell > Profile Picture Cell defaut values', () => {
    const wrapper = mount(ProfilePicture, {
      global: GLOBAL,
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should renders OXD CardTable > Cell > Profile Picture Cell with custom image', () => {
    const wrapper = mount(ProfilePicture, {
      global: GLOBAL,
      props: {
        item: imgSrc,
        size: 'small',
        target: '_parent',
        link: 'url1',
        rowItem: {
          url1: 'https://orangehrm.com',
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
