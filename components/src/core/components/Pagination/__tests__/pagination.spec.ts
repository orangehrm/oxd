import {ComponentPublicInstance} from 'vue';
import {mount, shallowMount, VueWrapper} from '@vue/test-utils';
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

  describe('markedPages', () => {
    const markedPageNumbers = (wrapper: VueWrapper<ComponentPublicInstance>) =>
      wrapper
        .findAll('.oxd-pagination-page-item--marked')
        .map(button => Number(button.text()));

    it('marks no page by default', () => {
      const wrapper = mount(Pagination, {
        props: {length: 20, current: 10},
      });
      expect(markedPageNumbers(wrapper)).toEqual([]);
      wrapper.findAll('.oxd-pagination-page-item').forEach(button => {
        expect(button.attributes('aria-label')).toBeUndefined();
      });
    });

    it('marks the listed pages inside the page window', () => {
      const wrapper = mount(Pagination, {
        props: {length: 20, markedPages: [2, 4]},
      });
      expect(markedPageNumbers(wrapper)).toEqual([2, 4]);
    });

    it('marks the first and last pages rendered outside the page window', () => {
      const wrapper = mount(Pagination, {
        props: {length: 20, current: 10, markedPages: [20, 1, 9]},
      });
      expect(markedPageNumbers(wrapper)).toEqual([1, 9, 20]);
    });

    it('ignores listed pages that are not rendered', () => {
      const wrapper = mount(Pagination, {
        props: {length: 20, markedPages: [15]},
      });
      expect(markedPageNumbers(wrapper)).toEqual([]);
    });

    it('never marks the previous and next buttons', () => {
      const wrapper = mount(Pagination, {
        props: {length: 20, current: 10, markedPages: [9, 10, 11]},
      });
      wrapper
        .findAll('.oxd-pagination-page-item--previous-next')
        .forEach(button => {
          expect(button.classes()).not.toContain(
            'oxd-pagination-page-item--marked',
          );
        });
    });

    it('labels marked pages with the default label', () => {
      const wrapper = mount(Pagination, {
        props: {length: 20, markedPages: [3]},
      });
      expect(
        wrapper
          .find('.oxd-pagination-page-item--marked')
          .attributes('aria-label'),
      ).toBe('3, Marked');
    });

    it('labels marked pages with markedPageLabel', () => {
      const wrapper = mount(Pagination, {
        props: {
          length: 20,
          current: 10,
          markedPages: [1, 20],
          markedPageLabel: 'Has selected requests',
        },
      });
      expect(
        wrapper
          .findAll('.oxd-pagination-page-item--marked')
          .map(button => button.attributes('aria-label')),
      ).toEqual(['1, Has selected requests', '20, Has selected requests']);
    });

    it('updates the marks when markedPages changes', async () => {
      const wrapper = mount(Pagination, {
        props: {length: 20, markedPages: [2]},
      });
      await wrapper.setProps({markedPages: [3, 20]});
      expect(markedPageNumbers(wrapper)).toEqual([3, 20]);
    });
  });
});
