import {shallowMount} from '@vue/test-utils';
import TableFilter from '@orangehrm/oxd/core/components/TableFilter/TableFilter.vue';

describe('TableFilter', () => {
  it('Renders', () => {
    const wrapper = shallowMount(TableFilter, {
      props: {
        filterTitle: '1 item slected',
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Checked action buttons', () => {
    const wrapper = shallowMount(TableFilter, {
      props: {
        filterTitle: '1 item slected',
      },
      slots: {
        actionOptions: '<div id="actionOptions">Action Options</div>',
      },
    });
    expect(wrapper.find('.--actions').html()).toContain(
      '<div id="actionOptions">Action Options</div>',
    );
  });
});
