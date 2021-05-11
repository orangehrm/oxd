import {mount} from '@vue/test-utils';
import ActionsCell from '@orangehrm/oxd/core/components/CardTable/Cell/Actions.vue';
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

describe('CardTable > Cell > Actions.vue', () => {
  it('should renders OXD CardTable > Cell > Actions', () => {
    const wrapper = mount(ActionsCell, {
      global: GLOBAL,
      props: {
        item: {
          delete: {
            component: 'oxd-icon-button',
            props: {
              name: 'trash',
            },
          },
          edit: {
            props: {
              name: 'pencil-fill',
            },
          },
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
