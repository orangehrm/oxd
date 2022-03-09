import {mount} from '@vue/test-utils';
import LinkWithPill from '@orangehrm/oxd/core/components/CardTable/Cell/LinkWithPill.vue';
import {DEVICE_LG} from "@orangehrm/oxd/composables/useResponsive";

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

describe('CardTable > Cell > LinkWithPill.vue', () => {
  it('should render OXD CardTable > Cell > LinkWithPill Cell - no pill', async () => {
    const wrapper = mount(LinkWithPill, {
      global: GLOBAL,
      props: {
        item: 'This is a link',
        target: '_parent',
        link: 'url1',
        rowItem: {
          url1: 'https://orangehrm.com',
          tag: 'external',
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render OXD CardTable > Cell > LinkWithPill Cell - with pill', async () => {
    const wrapper = mount(LinkWithPill, {
      global: GLOBAL,
      props: {
        item: 'This is a link',
        target: '_parent',
        link: 'url1',
        pillProperty: 'tag',
        rowItem: {
          url1: 'https://orangehrm.com',
          tag: 'external',
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render OXD CardTable > Cell > LinkWithPill Cell - with nested property pill', async () => {
    const wrapper = mount(LinkWithPill, {
      global: GLOBAL,
      props: {
        item: 'This is a link',
        target: '_parent',
        link: 'url1',
        pillProperty: ['tag', 'name'],
        rowItem: {
          url1: 'https://orangehrm.com',
          tag: {
            name: 'external',
            type: 'http',
          },
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
