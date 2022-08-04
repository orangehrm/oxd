import {shallowMount} from '@vue/test-utils';
import TableSelectInput from '@orangehrm/oxd/core/components/CardTable/Cell/TableSelectInput.vue';

describe('TableSelectInput.vue', () => {
  it('should render TableSelectInput', async () => {
    const wrapper = shallowMount(TableSelectInput, {
      props: {
        options: [
          {id: 1, name: 'Option 1'},
          {id: 2, name: 'Option 2'},
        ],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
