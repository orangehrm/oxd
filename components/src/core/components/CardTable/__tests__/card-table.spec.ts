import {ComponentPublicInstance} from 'vue';
import {flushPromises, mount, VueWrapper} from '@vue/test-utils';
import CardTable from '@orangehrm/oxd/core/components/CardTable/CardTable.vue';
import DefaultCardHeader from '@orangehrm/oxd/core/components/CardTable/Header/DefaultCardHeader.vue';
import CheckboxInput from '@orangehrm/oxd/core/components/Input/CheckboxInput.vue';

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

type TableWrapper = VueWrapper<ComponentPublicInstance>;

describe('CardTable > CardTable.vue > selection when rows change', () => {
  const headers = [{name: 'name', title: 'Name'}];
  const pageOne = [
    {id: 1, name: 'A'},
    {id: 2, name: 'B'},
    {id: 3, name: 'C'},
  ];
  const pageTwo = [
    {id: 4, name: 'D'},
    {id: 5, name: 'E'},
  ];
  const keyed = {
    preserveSelection: true,
    selectionMode: 'property',
    selectionProperty: 'id',
  };

  // The header and row checkboxes only render at desktop widths.
  beforeAll(() => {
    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      value: 1280,
    });
  });

  afterAll(() => {
    Reflect.deleteProperty(document.documentElement, 'clientWidth');
  });

  // Binds `selected` back to the table, like v-model:selected.
  const mountTable = async (props = {}) => {
    const wrapper = mount(CardTable, {
      props: {
        headers,
        items: pageOne,
        selectable: true,
        selected: [],
        'onUpdate:selected': (selected: number[]) =>
          wrapper.setProps({selected}),
        ...props,
      },
    });
    await flushPromises();
    return wrapper;
  };

  const changePage = async (wrapper: TableWrapper, items: object[]) => {
    await wrapper.setProps({loading: true});
    await wrapper.setProps({items, loading: false});
    await flushPromises();
  };

  const rowCheckboxes = (wrapper: TableWrapper) =>
    wrapper.findAll('.oxd-table-body .checkbox-cell input[type="checkbox"]');

  const checkedRows = (wrapper: TableWrapper) =>
    rowCheckboxes(wrapper).map(
      input => (input.element as HTMLInputElement).checked,
    );

  const headerCheckbox = (wrapper: TableWrapper) =>
    wrapper.find('.oxd-table-header .checkbox-cell input[type="checkbox"]');

  const headerState = (wrapper: TableWrapper) => {
    const checkbox = wrapper
      .findComponent(DefaultCardHeader)
      .findComponent(CheckboxInput);
    return {
      checked: checkbox.props('modelValue'),
      icon: checkbox.props('checkIcon'),
    };
  };

  // Copied, because the table keeps mutating the array it emitted.
  const lastSelected = (wrapper: TableWrapper) => {
    const events = wrapper.emitted('update:selected') as number[][][];
    return [...events[events.length - 1][0]];
  };

  describe('by default', () => {
    it('clears the selection when the items change', async () => {
      const wrapper = await mountTable({selected: [0, 1]});
      await wrapper.setProps({items: pageTwo});
      expect(wrapper.emitted('update:selected')).toEqual([[[]]]);
    });

    it('clears the selection when loading starts and ends', async () => {
      const wrapper = await mountTable({selected: [0, 1]});
      await wrapper.setProps({loading: true});
      await wrapper.setProps({loading: false});
      expect(wrapper.emitted('update:selected')).toEqual([[[]], [[]]]);
    });

    it('matches rows by index', async () => {
      const wrapper = await mountTable({selected: [0, 2]});
      expect(checkedRows(wrapper)).toEqual([true, false, true]);
    });

    it('shows no row as selected after moving to another page', async () => {
      const wrapper = await mountTable({selected: [0]});
      await changePage(wrapper, pageTwo);
      expect(wrapper.props('selected')).toEqual([]);
      expect(checkedRows(wrapper)).toEqual([false, false]);
      expect(headerState(wrapper).checked).toBe(false);
    });
  });

  describe('with preserveSelection', () => {
    it('keeps the selection when the items change', async () => {
      const wrapper = await mountTable({
        preserveSelection: true,
        selected: [0],
      });
      await wrapper.setProps({items: pageTwo});
      expect(wrapper.emitted('update:selected')).toBeUndefined();
    });

    it('keeps the selection when loading starts and ends', async () => {
      const wrapper = await mountTable({
        preserveSelection: true,
        selected: [0],
      });
      await wrapper.setProps({loading: true});
      await wrapper.setProps({loading: false});
      expect(wrapper.emitted('update:selected')).toBeUndefined();
      expect(wrapper.props('selected')).toEqual([0]);
    });
  });

  describe('with selectionMode property', () => {
    it('matches rows by the selection property', async () => {
      const wrapper = await mountTable({...keyed, selected: [3, 9]});
      expect(checkedRows(wrapper)).toEqual([false, false, true]);
    });

    it('emits keys instead of indexes when a row is ticked', async () => {
      const wrapper = await mountTable(keyed);
      await rowCheckboxes(wrapper)[1].setValue(true);
      expect(lastSelected(wrapper)).toEqual([2]);
    });

    it('keeps rows from other pages when a row is unticked', async () => {
      const wrapper = await mountTable({...keyed, selected: [5, 2]});
      await rowCheckboxes(wrapper)[1].setValue(false);
      expect(lastSelected(wrapper)).toEqual([5]);
    });

    it('shows rows as selected again when their page comes back', async () => {
      const wrapper = await mountTable(keyed);
      await rowCheckboxes(wrapper)[1].setValue(true);

      await changePage(wrapper, pageTwo);
      expect(checkedRows(wrapper)).toEqual([false, false]);
      expect(headerState(wrapper).checked).toBe(false);

      await rowCheckboxes(wrapper)[1].setValue(true);
      expect(lastSelected(wrapper)).toEqual([2, 5]);

      await changePage(wrapper, pageOne);
      expect(checkedRows(wrapper)).toEqual([false, true, false]);
      expect(headerState(wrapper)).toEqual({checked: true, icon: 'dash'});
      expect(wrapper.props('selected')).toEqual([2, 5]);
    });

    it('marks the header as fully checked when every row on the page is selected', async () => {
      const wrapper = await mountTable({...keyed, selected: [5, 1, 2, 3]});
      expect(headerState(wrapper)).toEqual({checked: true, icon: 'oxd-check'});
    });

    it('leaves the header unchecked when only other pages have selected rows', async () => {
      const wrapper = await mountTable({...keyed, selected: [4, 5, 6]});
      expect(headerState(wrapper).checked).toBe(false);
    });

    it('clears only the current page when the header is unticked', async () => {
      const wrapper = await mountTable({...keyed, selected: [5, 1, 2, 3]});
      await headerCheckbox(wrapper).setValue(false);
      expect(lastSelected(wrapper)).toEqual([5]);
      expect(checkedRows(wrapper)).toEqual([false, false, false]);
      expect(headerState(wrapper).checked).toBe(false);
    });

    it('adds the current page to rows selected elsewhere when the header is ticked', async () => {
      const wrapper = await mountTable({...keyed, selected: [5]});
      await headerCheckbox(wrapper).setValue(true);
      expect(lastSelected(wrapper)).toEqual([5, 1, 2, 3]);
      expect(headerState(wrapper)).toEqual({checked: true, icon: 'oxd-check'});
    });

    it('updates the header when the items change without a loader', async () => {
      const wrapper = await mountTable({...keyed, selected: [4, 5]});
      await wrapper.setProps({items: pageTwo});
      expect(checkedRows(wrapper)).toEqual([true, true]);
      expect(headerState(wrapper)).toEqual({checked: true, icon: 'oxd-check'});

      await wrapper.setProps({items: pageOne});
      expect(headerState(wrapper).checked).toBe(false);
      expect(wrapper.emitted('update:selected')).toBeUndefined();
    });

    it('ignores rows that cannot be selected when setting the header state', async () => {
      const wrapper = await mountTable({
        ...keyed,
        items: [{id: 1}, {id: 2, isSelectable: false}],
        selected: [1],
      });
      expect(headerState(wrapper)).toEqual({checked: true, icon: 'oxd-check'});
    });
  });
});
