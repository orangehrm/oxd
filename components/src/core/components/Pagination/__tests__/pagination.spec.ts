import {mount, shallowMount} from '@vue/test-utils';
import Pagination from '@orangehrm/oxd/core/components/Pagination/Pagination.vue';

describe('Pageination.vue', () => {
  it('renders OXD Pagination', () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        length: 20,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('customize pageList and changed the initial selected page', async () => {
    const wrapper = mount(Pagination, {
      props: {
        length: 20,
        pagesList: [5, 10, 20, 50, 100, 200],
        perPage: 50,
      },
    });
    const selectInputWrapper = wrapper.find('.pagination-dropdown');
    await selectInputWrapper.trigger('click');
    expect(
      wrapper
        .find(
          '.oxd-select-wrapper > .oxd-select-dropdown > .oxd-select-dropdown-inner > .oxd-select-option:nth-child(4)',
        )
        .html(),
    ).toEqual(
      '<div role="option" class="oxd-select-option --selected"><span>50</span></div>',
    );
  });
  it('shows the first separator when first page is missing and pageItems starts from 3 or higher', async () => {
    const wrapper = mount(Pagination, {
      props: {
        length: 5,
        current: 10,
        max: 3,
      },
      data() {
        return {
          pageItems: [3, 4, 5],
        };
      },
    });

    expect(wrapper.find('.oxd-pagination-separator').exists()).toBe(true);
  });

  it('shows the second separator when last page is missing and last pageItem is less than (length - 1)', async () => {
    const wrapper = mount(Pagination, {
      props: {
        length: 5,
        current: 10,
        max: 3,
      },
      data() {
        return {
          pageItems: [1, 2, 3],
        };
      },
    });
    const separators = wrapper.findAll('.oxd-pagination-separator');
    expect(separators.length).toBe(1);
    expect(separators[0].exists()).toBe(true);
  });

  it('does not show separators when pageItems contain both first and last pages', async () => {
    const wrapper = mount(Pagination, {
      props: {
        length: 5,
        current: 10,
        max: 5,
      },
      data() {
        return {
          pageItems: [1, 2, 3, 4, 5],
        };
      },
    });
    expect(wrapper.find('.oxd-pagination-separator').exists()).toBe(false);
  });
});
