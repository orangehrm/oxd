import {mount, shallowMount} from '@vue/test-utils';
import Pagination from '@orangehrm/oxd/core/components/Pagination/Pagination.vue';
// import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput.vue';

const delayFunction = (time: number) => {
  return new Promise(reslove =>
    setTimeout(() => {
      reslove(true);
    }, time),
  );
};

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
});
