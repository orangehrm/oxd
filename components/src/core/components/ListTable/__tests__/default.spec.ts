import {mount} from '@vue/test-utils';
import DefaultCell from '@orangehrm/oxd/core/components/ListTable/Default.vue';

describe('ListTable > Default.vue', () => {
  it('should renders OXD ListTable > Default cell', () => {
    const wrapper = mount(DefaultCell, {
      props: {item: 'Test'},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ListTable > Default cell with number', () => {
    const wrapper = mount(DefaultCell, {
      props: {item: 2},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ListTable > Default cell with array', () => {
    const wrapper = mount(DefaultCell, {
      props: {item: ['Test', 'Array']},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD ListTable > Default cell with object', () => {
    const wrapper = mount(DefaultCell, {
      props: {item: {test: 'Object'}},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
