import {mount} from '@vue/test-utils';
import CardTable from '@orangehrm/oxd/core/components/CardTable/CardTable.vue';

const DUMMY_DATA = {
  selector: {
    style: {flex: 1},
  },
  headers: [
    {name: 'col1', title: 'Column 1', style: {flex: 1}},
    {name: 'col2', title: 'Column 2', style: {flex: 5}},
  ],
  items: [
    {col1: 'Data 1', col2: 'Data 2'},
    {col1: 'Data 2', col2: 'Data 2'},
    {
      col1: 'Data 3',
      col2:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ],
  checkedItems: [2, 0],
};

describe('CardTable > CardTable.vue', () => {
  it('renders OXD CardTable > CardTable', () => {
    const wrapper = mount(CardTable, {
      props: {
        headers: DUMMY_DATA.headers,
        items: DUMMY_DATA.items,
        selectable: true,
        selected: DUMMY_DATA.checkedItems,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD CardTable > CardTable without selectable', () => {
    const wrapper = mount(CardTable, {
      props: {
        headers: DUMMY_DATA.headers,
        items: DUMMY_DATA.items,
        selectable: false,
        selected: DUMMY_DATA.checkedItems,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD CardTable > CardTable with card decorator', () => {
    const wrapper = mount(CardTable, {
      props: {
        headers: DUMMY_DATA.headers,
        items: DUMMY_DATA.items,
        selectable: true,
        selected: DUMMY_DATA.checkedItems,
        rowDecorator: 'oxd-table-decorator-card',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should renders OXD CardTable > CardTable with selector config', () => {
    const wrapper = mount(CardTable, {
      props: {
        selector: DUMMY_DATA.selector,
        headers: DUMMY_DATA.headers,
        items: DUMMY_DATA.items,
        selectable: true,
        selected: DUMMY_DATA.checkedItems,
        rowDecorator: 'oxd-table-decorator-card',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
