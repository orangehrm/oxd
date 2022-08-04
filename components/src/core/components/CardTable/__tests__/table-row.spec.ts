import {mount} from '@vue/test-utils';
import TableRow from '@orangehrm/oxd/core/components/CardTable/Table/TableRow.vue';

describe('CardTable > TableRow.vue', () => {
  it('renders OXD CardTable > TableRow', () => {
    const wrapper = mount(TableRow, {
      props: {},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
