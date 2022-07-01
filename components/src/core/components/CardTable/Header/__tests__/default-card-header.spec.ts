import {shallowMount} from '@vue/test-utils';
import DefaultCardHeader from '@orangehrm/oxd/core/components/CardTable/Header/DefaultCardHeader.vue';
import emitter from '@orangehrm/oxd/utils/emitter';
import {getCheckIconTestCases} from '../__fixtures__/default-card-header-testcases';

describe('DefaultCardHeader > DefaultCardHeader.vue', () => {
  getCheckIconTestCases.forEach(testCase => {
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
