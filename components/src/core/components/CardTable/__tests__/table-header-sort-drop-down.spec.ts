import {shallowMount} from '@vue/test-utils';
import TableHeaderSortDropdown from '@orangehrm/oxd/core/components/CardTable/Table/TableHeaderSortDropdown.vue';
import IconButton from '@orangehrm/oxd/core/components/Button/Icon.vue';

describe('CardTable > TableHeaderCell > TableHeaderSortDropdown.vue', () => {
    it('renders sort icon for asc', () => {
        const wrapper = shallowMount(TableHeaderSortDropdown, {
            props: {order: 'ASC'},
        });
        expect(wrapper.findComponent(IconButton).attributes('name')).toBe('oxd-sort-asc');
    });
    it('renders sort icon for desc', () => {
        const wrapper = shallowMount(TableHeaderSortDropdown, {
            props: {order: 'DESC'},
        });
        expect(wrapper.findComponent(IconButton).attributes('name')).toBe('oxd-sort-desc');
    });
    it('renders sort icon for default', () => {
        const wrapper = shallowMount(TableHeaderSortDropdown, {
            props: {order: 'DEFAULT'},
        });
        expect(wrapper.findComponent(IconButton).attributes('name')).toBe('oxd-sort');
    });
    it('renders sort icon for any other value', () => {
        const wrapper = shallowMount(TableHeaderSortDropdown, {
            props: {order: 'A'},
        });
        expect(wrapper.findComponent(IconButton).attributes('name')).toBe('oxd-sort');
    });
});
