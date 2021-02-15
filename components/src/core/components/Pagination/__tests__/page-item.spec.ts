import {mount} from '@vue/test-utils';
import PageItem from '@orangehrm/oxd/core/components/Pagination/PageItem.vue';

describe('PageItem.vue', () => {
  it('renders OXD PageItem', () => {
    const wrapper = mount(PageItem, {
      props: {page: 1},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD PageItem previous', () => {
    const wrapper = mount(PageItem, {
      props: {previous: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD PageItem next', () => {
    const wrapper = mount(PageItem, {
      props: {next: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders OXD PageItem selected', () => {
    const wrapper = mount(PageItem, {
      props: {page: 2, selected: true},
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
