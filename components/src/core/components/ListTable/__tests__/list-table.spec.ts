import {mount} from '@vue/test-utils';
import ListTable from '@orangehrm/oxd/core/components/ListTable/ListTable.vue';

const DUMMY_DATA = {
  headers: [
    {name: 'col1', title: 'Column 1', style: {flex: 1}},
    {name: 'col2', title: 'Column 2', style: {flex: 5}},
  ],
  items: [
    {col1: 'Data 1', col2: 'Data 2'},
    {col1: 'Data 2', col2: 'Data 2'},
  ],
  checkedItems: [2, 0],
};

jest.mock('../../../../utils/emitter');

describe('ListTable > ListTable.vue', () => {
  it('renders OXD ListTable > ListTable', () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: DUMMY_DATA.checkedItems,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render OXD ListTable without selectable', () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: DUMMY_DATA.checkedItems,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render empty state when there is no data', () => {
    const wrapper = mount(ListTable, {
      props: {
        items: [],
        headers: DUMMY_DATA.headers,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should clear all listeners on unmount', () => {
    jest.clearAllMocks();
    const wrapper = mount(ListTable, {
      props: {
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
      },
    });
    wrapper.unmount();
  });
});
