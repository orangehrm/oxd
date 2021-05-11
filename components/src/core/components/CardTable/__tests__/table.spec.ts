import {mount} from '@vue/test-utils';
import Table from '@orangehrm/oxd/core/components/CardTable/Table/Table.vue';

describe('CardTable > Table.vue', () => {
  it('renders OXD CardTable > Table', () => {
    const wrapper = mount(Table, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
