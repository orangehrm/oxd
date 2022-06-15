import {shallowMount} from '@vue/test-utils';
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
  it('customize pageList and changed the initial selected page', () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        length: 20,
        pagesList: [5, 10, 20, 50, 100, 200],
        perPage: 50,
      },
    });
    expect(wrapper.props().pagesList).toMatchObject([5, 10, 20, 50, 100, 200]);
    expect(wrapper.props().perPage).toBe(50);
    // console.log(wrapper.find('.selected-content').html());
    // expect(wrapper.find('.selected-content'));
  });
});
