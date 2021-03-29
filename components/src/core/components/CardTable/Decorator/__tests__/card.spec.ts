import {mount} from '@vue/test-utils';
import CardDecorator from '@orangehrm/oxd/core/components/CardTable/Decorator/Card.vue';

const GLOBAL = {
  provide: {
    tableProps() {
      return {
        items: [],
      };
    },
  },
};

describe('CardTable > Decorator > Card.vue', () => {
  it('should renders OXD CardTable > Decorator > Card', () => {
    const wrapper = mount(CardDecorator, {
      global: GLOBAL,
      slots: {default: 'Test'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
