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
  it('should renders OXD CardTable > Cell > Actions from header cell config', () => {
    const wrapper = mount(ActionsCell, {
      global: GLOBAL,
      props: {
        header: {
          cellConfig: {
            edit: {
              props: {
                name: 'pencil-fill',
              },
            },
          },
        },
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should trigger onClick and onChange OXD CardTable > Cell > Actions cell', async () => {
    const mockFn = jest.fn();
    const wrapper = mount(ActionsCell, {
      global: GLOBAL,
      props: {
        item: {
          delete: {
            component: 'oxd-icon-button',
            props: {
              name: 'trash',
            },
            onClick: mockFn,
          },
        },
      },
    });
    const button = wrapper.find('.oxd-icon-button');
    expect(button.exists()).toBeTruthy();
    await button.trigger('click');
    wrapper.vm.onChangeAction({
      component: 'oxd-icon-button',
      props: {
        name: 'trash',
      },
      onChange: mockFn,
    });
    expect(mockFn.mock.calls.length).toBe(2);
  });
  it('should trigger onChange OXD CardTable > Cell > Actions cell', async () => {
    const mockFn = jest.fn();
    const wrapper = mount(ActionsCell, {
      global: GLOBAL,
      props: {
        header: {
          cellConfig: {
            delete: {
              component: 'oxd-icon-button',
              props: {
                name: 'trash',
              },
              onClick: mockFn,
            },
          },
        },
      },
    });
    const button = wrapper.find('.oxd-icon-button');
    expect(button.exists()).toBeTruthy();
    await button.trigger('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
