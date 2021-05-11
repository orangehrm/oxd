import {mount} from '@vue/test-utils';
import DefaultCell from '@orangehrm/oxd/core/components/CardTable/Cell/Default.vue';
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

describe('CardTable > Cell > Default.vue', () => {
  it('should renders OXD CardTable > Cell > Default', () => {
    const wrapper = mount(DefaultCell, {
      global: GLOBAL,
      props: {item: 'Test'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD CardTable > Cell > Default with number', () => {
    const wrapper = mount(DefaultCell, {
      global: GLOBAL,
      props: {item: 2},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD CardTable > Cell > Default with array', () => {
    const wrapper = mount(DefaultCell, {
      global: GLOBAL,
      props: {item: ['Test', 'Array']},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD CardTable > Cell > Default with object', () => {
    const wrapper = mount(DefaultCell, {
      global: GLOBAL,
      props: {item: {test: 'Object'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
