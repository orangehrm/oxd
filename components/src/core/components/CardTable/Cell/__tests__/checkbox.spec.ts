import {mount} from '@vue/test-utils';
import {DEVICE_LG} from '@orangehrm/oxd/composables/useResponsive';
import Checkbox from '@orangehrm/oxd/core/components/CardTable/Cell/Checkbox.vue';

const tableId = '0001';
const GLOBAL = {
  provide: {
    tableProps: {
      selected: [1],
      tableId: tableId,
    },
    screenState: {
      screenType: DEVICE_LG,
    },
  },
};

describe('CardTable > Cell > Checkbox.vue', () => {
  it('should renders OXD CardTable > Cell > Checkbox Cell', () => {
    const _global = {...GLOBAL};
    const wrapper = mount(Checkbox, {
      global: _global,
      props: {item: 0},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should renders OXD CardTable > Cell > Checkbox Cell should be checked', () => {
    const _global = {...GLOBAL};
    const wrapper = mount(Checkbox, {
      global: _global,
      props: {item: 1},
    });
    expect(wrapper.find("input[type='checkbox']").element).toHaveProperty(
      'checked',
      true,
    );
  });
  it('should renders OXD CardTable > Cell > Checkbox Cell should not be checked', () => {
    const _global = {...GLOBAL};
    const wrapper = mount(Checkbox, {
      global: _global,
      props: {item: 24},
    });
    expect(wrapper.find("input[type='checkbox']").element).toHaveProperty(
      'checked',
      false,
    );
  });
  it('should renders OXD CardTable > Cell > Checkbox Cell should be disabled', () => {
    const _global = {...GLOBAL};
    const wrapper = mount(Checkbox, {
      global: _global,
      props: {
        item: 24,
        rowItem: {
          isDisabled: true,
        },
      },
    });
    expect(wrapper.find("input[type='checkbox']").element).toHaveProperty(
      'disabled',
    );
  });
});
