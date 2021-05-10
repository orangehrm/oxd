import {mount} from '@vue/test-utils';
import TableDataCell from '@orangehrm/oxd/core/components/CardTable/Table/TableDataCell.vue';

describe('CardTable > TableDataCell.vue', () => {
  it('renders OXD CardTable > TableDataCell', () => {
    const wrapper = mount(TableDataCell, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
