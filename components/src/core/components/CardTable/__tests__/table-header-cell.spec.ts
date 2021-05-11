import {mount} from '@vue/test-utils';
import TableHeaderCell from '@orangehrm/oxd/core/components/CardTable/Table/TableHeaderCell.vue';

describe('CardTable > TableHeaderCell.vue', () => {
  it('renders OXD CardTable > TableHeaderCell', () => {
    const wrapper = mount(TableHeaderCell, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
