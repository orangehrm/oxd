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

  describe('marked', () => {
    it('has no mark or label by default', () => {
      const button = mount(PageItem, {props: {page: 3}}).find('button');
      expect(button.classes()).not.toContain(
        'oxd-pagination-page-item--marked',
      );
      expect(button.attributes('aria-label')).toBeUndefined();
    });

    it('has no mark or label when marked is false', () => {
      const button = mount(PageItem, {
        props: {page: 3, marked: false, markedLabel: 'Has selected requests'},
      }).find('button');
      expect(button.classes()).not.toContain(
        'oxd-pagination-page-item--marked',
      );
      expect(button.attributes('aria-label')).toBeUndefined();
    });

    it('draws the mark with the default label', () => {
      const button = mount(PageItem, {props: {page: 3, marked: true}}).find(
        'button',
      );
      expect(button.classes()).toContain('oxd-pagination-page-item--marked');
      expect(button.attributes('aria-label')).toBe('3, Marked');
      expect(button.text()).toBe('3');
    });

    it('uses the given label', () => {
      const button = mount(PageItem, {
        props: {page: 3, marked: true, markedLabel: 'Has selected requests'},
      }).find('button');
      expect(button.attributes('aria-label')).toBe('3, Has selected requests');
    });

    it('translates the label', () => {
      const button = mount(PageItem, {
        props: {page: 3, marked: true, markedLabel: 'Has selected requests'},
        global: {mocks: {$t: (key: string) => `fr:${key}`}},
      }).find('button');
      expect(button.attributes('aria-label')).toBe(
        '3, fr:Has selected requests',
      );
    });

    it('keeps the selected style on a marked page', () => {
      const button = mount(PageItem, {
        props: {page: 2, selected: true, marked: true},
      }).find('button');
      expect(button.classes()).toEqual(
        expect.arrayContaining([
          'oxd-pagination-page-item--page-selected',
          'oxd-pagination-page-item--marked',
        ]),
      );
    });
  });
});
