import {shallowMount} from '@vue/test-utils';
import Pagination from '@orangehrm/oxd/core/components/Pagination/Pagination.vue';

describe('PageItem.vue', () => {
  it('renders OXD PageItem', () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        length: 100,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
