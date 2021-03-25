import {mount} from '@vue/test-utils';
import DefaultDecorator from '@orangehrm/oxd/core/components/CardTable/Decorator/Default.vue';

const GLOBAL = {
  provide: {
    tableProps() {
      return {
        items: [],
      };
    },
  },
};

describe('CardTable > Decorator > Default.vue', () => {
  it('should renders OXD CardTable > Decorator > Default', () => {
    const wrapper = mount(DefaultDecorator, {
      global: GLOBAL,
      slots: {default: 'Test'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
