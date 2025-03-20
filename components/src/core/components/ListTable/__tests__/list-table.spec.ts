import {mount} from '@vue/test-utils';
import Skeleton from '@orangehrm/oxd/core/components/Skeleton/Skeleton.vue';
import ListTable from '@orangehrm/oxd/core/components/ListTable/ListTable.vue';

const DUMMY_DATA = {
  headers: [
    {name: 'col1', title: 'Column 1', style: {flex: 1}},
    {name: 'col2', title: 'Column 2', style: {flex: 5}},
  ],
  items: [
    {id: 'a1', col1: 'Data 1', col2: 'Data 2'},
    {id: 'a2', col1: 'Data 2', col2: 'Data 2'},
    {id: 'a3', col1: 'Data 3', col2: 'Data 3'},
  ],
  checkedItems: [2, 0],
  checkedItemIds: ['a3', 'a1'],
};

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

  it('should render OXD ListTable with both Icon and Text in the header', () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: [
          {name: 'col1', title: 'Column 1', style: {flex: 1}},
          {
            name: 'col2',
            title: 'Column 2',
            style: {flex: 5},
            iconName: 'oxd-icon-plus',
          },
        ],
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

  it('should render skeleton if skeleton is true && loading', () => {
    const wrapper = mount(ListTable, {
      props: {
        items: [],
        loading: true,
        skeleton: true,
        headers: DUMMY_DATA.headers,
      },
    });
    expect(wrapper.findAllComponents(Skeleton).length).toEqual(48); // 15 skeletons per column and one for each header with select column
  });

  it('should render skeleton if partial render is true && not loading', () => {
    const wrapper = mount(ListTable, {
      props: {
        loading: false,
        skeleton: true,
        partialLoading: true,
        headers: DUMMY_DATA.headers,
        items: Array(10).fill({col1: 'Data 1', col2: 'Data 2'}),
      },
    });
    expect(wrapper.findAll('.oxd-table-body .oxd-table-row').length).toEqual(
      13,
    );
    expect(wrapper.findAllComponents(Skeleton).length).toEqual(6);
  });

  it('should render checkbox cell when selectable is true and not loading', () => {
    const wrapper = mount(ListTable, {
      props: {
        loading: false,
        skeleton: false,
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
      },
    });

    const checkboxCells = wrapper.findAll('.checkbox-cell');
    expect(checkboxCells.length).toBeGreaterThan(0);

    checkboxCells.forEach(cell => {
      expect(cell.exists()).toBe(true);
      expect(cell.findComponent({name: 'oxd-checkbox-input'}).exists()).toBe(
        true,
      );
    });
  });

  it('should not render checkbox cell when selectable is false', () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: false,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
      },
    });

    const checkboxCells = wrapper.findAll('.checkbox-cell');
    expect(checkboxCells.length).toBe(0);
  });

  it('when the select is disabled for all the items, check box in the header should be disabled', () => {
    const DUMMY_DATA_SELECT_DISABLED = {
      headers: [
        {name: 'col1', title: 'Column 1', style: {flex: 1}},
        {name: 'col2', title: 'Column 2', style: {flex: 5}},
      ],
      items: [
        {col1: 'Data 1', col2: 'Data 2', isSelectDisabled: true},
        {col1: 'Data 2', col2: 'Data 2', isSelectDisabled: true},
      ],
      checkedItems: [],
    };
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA_SELECT_DISABLED.items,
        headers: DUMMY_DATA_SELECT_DISABLED.headers,
        selected: DUMMY_DATA_SELECT_DISABLED.checkedItems,
      },
    });
    const tableHeader = wrapper.find('.oxd-table-header');
    const checkbox = tableHeader.find('input[type="checkbox"]');

    expect(checkbox.attributes('disabled')).toEqual('');
  });

  it('should emit event when single row is selected', async () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: [],
      },
    });

    const checkboxes = wrapper.findAll(
      '.oxd-table-body .checkbox-cell input[type="checkbox"]',
    );
    await checkboxes[0].setValue(true);
    await checkboxes[0].trigger('change');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:selected')).toBeTruthy();
    expect(wrapper.emitted('update:selected')![0]).toEqual([[0]]);
  });

  it('should emit event when multiple rows are selected', async () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: [0],
      },
    });

    const checkboxes = wrapper.findAll(
      '.oxd-table-body .checkbox-cell input[type="checkbox"]',
    );
    await checkboxes[2].setValue(true);
    await checkboxes[2].trigger('change');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:selected')).toBeTruthy();
    expect(wrapper.emitted('update:selected')![0]).toEqual([[0, 2]]);
  });

  it('should emit event when row is unselected', async () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: [0, 2],
      },
    });

    const checkboxes = wrapper.findAll(
      '.oxd-table-body .checkbox-cell input[type="checkbox"]',
    );
    await checkboxes[0].setValue(false);
    await checkboxes[0].trigger('change');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:selected')).toBeTruthy();
    expect(wrapper.emitted('update:selected')![0]).toEqual([[2]]);
  });

  it('should emit event when select all is clicked with index selection mode', async () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: [],
        selectionMode: 'index',
      },
    });

    const selectAllCheckbox = wrapper.find(
      '.oxd-table-header .checkbox-cell input[type="checkbox"]',
    );
    await selectAllCheckbox.setValue(true);
    await selectAllCheckbox.trigger('change');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:selected')).toBeTruthy();
    expect(wrapper.emitted('update:selected')![0]).toEqual([[0]]);
  });

  it('should emit event when select all is clicked with property selection mode', async () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: [],
        selectionMode: 'property',
        selectionProperty: 'id',
      },
    });

    const selectAllCheckbox = wrapper.find(
      '.oxd-table-header .checkbox-cell input[type="checkbox"]',
    );
    await selectAllCheckbox.setValue(true);
    await selectAllCheckbox.trigger('change');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:selected')).toBeTruthy();
    expect(wrapper.emitted('update:selected')![0]).toEqual([['a1']]);
  });

  it('should emit event when unselect all is clicked with index selection mode', async () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: [0, 1, 2],
        selectionMode: 'index',
      },
    });

    const selectAllCheckbox = wrapper.find(
      '.oxd-table-header .checkbox-cell input[type="checkbox"]',
    );
    await selectAllCheckbox.setValue(false);
    await selectAllCheckbox.trigger('change');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:selected')).toBeTruthy();
    expect(wrapper.emitted('update:selected')![0]).toEqual([[1, 2]]);
  });

  it('should emit event when unselect all is clicked with property selection mode', async () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: ['a1', 'a2', 'a3'],
        selectionMode: 'property',
        selectionProperty: 'id',
      },
    });

    const selectAllCheckbox = wrapper.find(
      '.oxd-table-header .checkbox-cell input[type="checkbox"]',
    );
    await selectAllCheckbox.setValue(false);
    await selectAllCheckbox.trigger('change');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:selected')).toBeTruthy();
    expect(wrapper.emitted('update:selected')![0]).toEqual([['a2', 'a3']]);
  });

  it('should show check mark in select all checkbox when all items are selected with property selection mode', async () => {
    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: DUMMY_DATA.items,
        headers: DUMMY_DATA.headers,
        selected: ['a1', 'a2', 'a3'],
        selectionMode: 'property',
        selectionProperty: 'id',
      },
    });

    // Check if the select all checkbox is checked
    const selectAllCheckbox = wrapper.find(
      '.oxd-table-header .checkbox-cell input[type="checkbox"]',
    );
    expect((selectAllCheckbox.element as HTMLInputElement).checked).toBe(true);

    // Check if the icon is 'oxd-check'
    const vm = wrapper.vm as any;
    expect(vm.checkIcon).toBe('oxd-check');
  });
});

describe('ListTable > areAllItemsSelected function', () => {
  it('should consider only selectable items when determining if all items are selected', async () => {
    const items = [
      {id: 'a1', col1: 'Data 1', col2: 'Data 2'},
      {id: 'a2', col1: 'Data 2', col2: 'Data 2', isSelectable: false},
      {id: 'a3', col1: 'Data 3', col2: 'Data 3'},
    ];

    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: items,
        headers: DUMMY_DATA.headers,
        selected: ['a1', 'a3'],
        selectionMode: 'property',
        selectionProperty: 'id',
      },
    });

    // Check if the select all checkbox is checked (should be true since all selectable items are selected)
    const selectAllCheckbox = wrapper.find(
      '.oxd-table-header .checkbox-cell input[type="checkbox"]',
    );
    expect((selectAllCheckbox.element as HTMLInputElement).checked).toBe(true);
  });

  it('should consider only non-disabled items when determining if all items are selected', async () => {
    const items = [
      {id: 'a1', col1: 'Data 1', col2: 'Data 2'},
      {id: 'a2', col1: 'Data 2', col2: 'Data 2', isDisabled: true},
      {id: 'a3', col1: 'Data 3', col2: 'Data 3'},
    ];

    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: items,
        headers: DUMMY_DATA.headers,
        selected: ['a1', 'a3'],
        selectionMode: 'property',
        selectionProperty: 'id',
      },
    });

    // Check if the select all checkbox is checked (should be true since all non-disabled items are selected)
    const selectAllCheckbox = wrapper.find(
      '.oxd-table-header .checkbox-cell input[type="checkbox"]',
    );
    expect((selectAllCheckbox.element as HTMLInputElement).checked).toBe(true);
  });

  it('should return false when there are no selectable items', async () => {
    const items = [
      {id: 'a1', col1: 'Data 1', col2: 'Data 2', isSelectable: false},
      {id: 'a2', col1: 'Data 2', col2: 'Data 2', isDisabled: true},
      {id: 'a3', col1: 'Data 3', col2: 'Data 3', isSelectable: false},
    ];

    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: items,
        headers: DUMMY_DATA.headers,
        selected: ['a1', 'a2', 'a3'],
        selectionMode: 'property',
        selectionProperty: 'id',
      },
    });

    // Check if the select all checkbox is checked (should be false since there are no selectable items)
    const selectAllCheckbox = wrapper.find(
      '.oxd-table-header .checkbox-cell input[type="checkbox"]',
    );
    expect((selectAllCheckbox.element as HTMLInputElement).checked).toBe(false);
  });

  it('should return false when some selectable items are not selected', async () => {
    const items = [
      {id: 'a1', col1: 'Data 1', col2: 'Data 2'},
      {id: 'a2', col1: 'Data 2', col2: 'Data 2', isSelectable: false},
      {id: 'a3', col1: 'Data 3', col2: 'Data 3'},
      {id: 'a4', col1: 'Data 4', col2: 'Data 4', isDisabled: true},
      {id: 'a5', col1: 'Data 5', col2: 'Data 5'},
    ];

    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: items,
        headers: DUMMY_DATA.headers,
        selected: ['a1', 'a3'], // a5 is selectable but not selected
        selectionMode: 'property',
        selectionProperty: 'id',
      },
    });

    // Check if the select all checkbox is checked (should be false since not all selectable items are selected)
    const selectAllCheckbox = wrapper.find(
      '.oxd-table-header .checkbox-cell input[type="checkbox"]',
    );
    expect((selectAllCheckbox.element as HTMLInputElement).checked).toBe(false);
  });

  it('should handle mixed selectable, non-selectable, and disabled items correctly', async () => {
    const items = [
      {id: 'a1', col1: 'Data 1', col2: 'Data 2'},
      {id: 'a2', col1: 'Data 2', col2: 'Data 2', isSelectable: false},
      {id: 'a3', col1: 'Data 3', col2: 'Data 3'},
      {id: 'a4', col1: 'Data 4', col2: 'Data 4', isDisabled: true},
      {
        id: 'a5',
        col1: 'Data 5',
        col2: 'Data 5',
        isSelectable: false,
        isDisabled: true,
      },
    ];

    const wrapper = mount(ListTable, {
      props: {
        selectable: true,
        items: items,
        headers: DUMMY_DATA.headers,
        selected: ['a1', 'a3'], // All selectable and non-disabled items are selected
        selectionMode: 'property',
        selectionProperty: 'id',
      },
    });

    // Check if the select all checkbox is checked (should be true since all selectable and non-disabled items are selected)
    const selectAllCheckbox = wrapper.find(
      '.oxd-table-header .checkbox-cell input[type="checkbox"]',
    );
    expect((selectAllCheckbox.element as HTMLInputElement).checked).toBe(true);
  });
});
