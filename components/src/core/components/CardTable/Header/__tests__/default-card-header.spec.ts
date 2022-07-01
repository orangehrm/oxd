import {shallowMount} from '@vue/test-utils';
import DefaultCardHeader from '@orangehrm/oxd/core/components/CardTable/Header/DefaultCardHeader.vue';
import emitter from '@orangehrm/oxd/utils/emitter';

describe('DefaultCardHeader > DefaultCardHeader.vue', () => {
  const dataSet = [
    {
      message: 'renders OXD CardTable > TableBody with selected one',
      allItems: [
        {id: 1, isSelectable: true, isDisabled: false},
        {id: 2},
        {id: 3},
      ],
      selected: [1],
      rowToSelect: 2,
      icon: 'dash',
    },
    {
      message: 'renders OXD CardTable > TableBody with selecting all',
      allItems: [
        {id: 1, isSelectable: true, isDisabled: false},
        {id: 2},
        {id: 3},
      ],
      rowToSelect: 3,
      selected: [1, 2],
      icon: 'check',
    },
    {
      message: 'renders OXD CardTable > TableBody with unselecting one',
      allItems: [
        {id: 1, isSelectable: true, isDisabled: false},
        {id: 2},
        {id: 3},
      ],
      rowToUnSelect: 3,
      selected: [1, 2, 3],
      icon: 'dash',
    },
    {
      message: 'renders OXD CardTable > TableBody with selectable false',
      allItems: [
        {id: 1, isSelectable: false, isDisabled: false},
        {id: 2},
        {id: 3},
      ],
      rowToSelect: 3,
      selected: [2],
      icon: 'check',
    },
    {
      message:
        'renders OXD CardTable > TableBody with selectable false and unchecked',
      allItems: [
        {id: 1, isSelectable: false, isDisabled: false},
        {id: 2},
        {id: 3},
      ],
      rowToUnSelect: 3,
      selected: [2, 3],
      icon: 'dash',
    },
    {
      message: 'renders OXD CardTable > TableBody with disabled',
      allItems: [
        {id: 1, isSelectable: false, isDisabled: true},
        {id: 2},
        {id: 3},
      ],
      rowToSelect: 3,
      selected: [2],
      icon: 'check',
    },
  ];

  dataSet.forEach(testCase => {
    it(`${testCase.message}`, async () => {
      const {allItems, selected, icon, rowToSelect, rowToUnSelect} = testCase;
      const wrapper = shallowMount(DefaultCardHeader, {
        global: {
          provide: {
            tableProps: {
              selected: selected,
              items: allItems,
              tableId: 1,
            },
            screenState: {
              screenType: 'DEVICE_LG',
            },
          },
        },
      });

      if (rowToSelect) emitter.emit(`1-datatable:rowSelected`, rowToSelect);
      if (rowToUnSelect)
        emitter.emit(`1-datatable:rowUnselected`, rowToUnSelect);
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent(DefaultCardHeader).exists()).toBeTruthy();
      expect(wrapper.vm.checkIcon).toBe(icon);
    });
  });
});
