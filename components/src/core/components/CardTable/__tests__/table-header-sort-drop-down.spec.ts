import {shallowMount} from '@vue/test-utils';
import TableHeaderSortDropdown from '@orangehrm/oxd/core/components/CardTable/Table/TableHeaderSortDropdown.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

describe('CardTable > TableHeaderCell > TableHeaderSortDropdown.vue', () => {
  it('renders sort icon for asc', () => {
    const wrapper = shallowMount(TableHeaderSortDropdown, {
      props: {order: {order: 'ASC', iconAsc: '', iconDesc: ''}},
    });
    expect(wrapper.findComponent(IconButton).attributes('name')).toBe(
      'oxd-sort-asc',
    );
  });
  it('renders sort icon for desc', () => {
    const wrapper = shallowMount(TableHeaderSortDropdown, {
      props: {order: {order: 'DESC', iconAsc: '', iconDesc: ''}},
    });
    expect(wrapper.findComponent(IconButton).attributes('name')).toBe(
      'oxd-sort-desc',
    );
  });
  it('renders sort icon for default', () => {
    const wrapper = shallowMount(TableHeaderSortDropdown, {
      props: {order: {order: 'DEFAULT', iconAsc: '', iconDesc: ''}},
    });
    expect(wrapper.findComponent(IconButton).attributes('name')).toBe(
      'oxd-sort',
    );
  });
  it('renders sort icon for any other value', () => {
    const wrapper = shallowMount(TableHeaderSortDropdown, {
      props: {order: {order: 'A', iconAsc: '', iconDesc: ''}},
    });
    expect(wrapper.findComponent(IconButton).attributes('name')).toBe(
      'oxd-sort',
    );
  });
  it('renders sort icon for asc with custom icon', () => {
    const wrapper = shallowMount(TableHeaderSortDropdown, {
      props: {
        order: {
          order: 'ASC',
          iconAsc: 'oxd-sort-asc-arrow',
          iconDesc: 'oxd-sort-desc-arrow',
        },
      },
    });
    expect(wrapper.findComponent(IconButton).attributes('name')).toBe(
      'oxd-sort-asc-arrow',
    );
  });
  it('renders sort icon for desc with custom icon', () => {
    const wrapper = shallowMount(TableHeaderSortDropdown, {
      props: {
        order: {
          order: 'DESC',
          iconAsc: 'oxd-sort-asc-arrow',
          iconDesc: 'oxd-sort-desc-arrow',
        },
      },
    });
    expect(wrapper.findComponent(IconButton).attributes('name')).toBe(
      'oxd-sort-desc-arrow',
    );
  });
});
