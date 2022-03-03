import {mount, shallowMount} from '@vue/test-utils';
import TableFilter from '@orangehrm/oxd/core/components/TableFilter/TableFilter.vue';

describe('TableFilter', () => {
  it('renders', () => {
    const wrapper = shallowMount(TableFilter, {
      props: {
        filterTitle: '1 item slected',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
