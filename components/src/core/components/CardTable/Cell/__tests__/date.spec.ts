import {mount} from '@vue/test-utils';
import {ru} from 'date-fns/locale';
import DateCell from '@orangehrm/oxd/core/components/CardTable/Cell/Date.vue';
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

describe('CardTable > Cell > Date.vue', () => {
  it('should renders OXD CardTable > Cell > Date Cell with default format', () => {
    const wrapper = mount(DateCell, {
      global: GLOBAL,
      props: {item: '2022-03-03'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should renders OXD CardTable > Cell > Date Cell with l, d-M-Y format', () => {
    const wrapper = mount(DateCell, {
      global: GLOBAL,
      props: {
        item: '2022-03-03',
        displayFormat: 'l, d-M-Y',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should renders OXD CardTable > Cell > Date Cell Parse date from different format', () => {
    const wrapper = mount(DateCell, {
      global: GLOBAL,
      props: {
        item: '2022/03/31',
        ioFormat: 'Y/m/d',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('should renders OXD CardTable > Cell > Date Cell with l, d-M-Y format and russian locale', () => {
    const wrapper = mount(DateCell, {
      global: GLOBAL,
      props: {
        item: '2022-03-03',
        displayFormat: 'l, d-M-Y',
        locale: ru,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
