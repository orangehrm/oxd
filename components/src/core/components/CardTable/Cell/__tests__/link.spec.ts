import {mount} from '@vue/test-utils';
import Link from '@orangehrm/oxd/core/components/CardTable/Cell/Link.vue';
import {DEVICE_LG} from '@orangehrm/oxd/composables/useResponsive';

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

describe('CardTable > Cell > Link.vue', () => {
  it('should renders OXD CardTable > Cell > Link Cell', () => {
    const wrapper = mount(Link, {
      global: GLOBAL,
      props: {item: 'This is a link'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should renders OXD CardTable > Cell > Cell with custom link', () => {
    const wrapper = mount(Link, {
      global: GLOBAL,
      props: {
        header: {
          name: 'url',
          target: '_blank',
        },
        rowItem: {
          link: 'https://orangehrm.com',
        },
        item: 'This is a link',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
